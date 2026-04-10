import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';
import { Button } from 'flowbite-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useModal from '@/Components/hooks/useModal';
import useCreateModal from '@/Components/hooks/useCreateModal';
import useEditModal from '@/Components/hooks/useEditModal';
import CreateModalComponent from './Create';
import Show from './Show';
import EditModalComponent from './Edit';
import { debounce } from 'lodash';
import { printAssetTag } from '@/Components/hooks/printAssetTag';
import bulkPrintAssetTags from '@/Components/hooks/bulkPrintAssetTags';

export default function Index({
  auth,
  tv,
  queryParams = null,
  success,
}) {
  const { showModal, selected, openModal, closeModal } = useModal();
  const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
  const { showEditModal, selectedEdit, openEditModal, closeEditModal } = useEditModal();

  queryParams = queryParams || {};

  const initialFilters = {
    search: queryParams.search || '',
    status: queryParams.status || '',
    sort_field: queryParams.sort_field || '',
    sort_direction: queryParams.sort_direction || ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [selectedItems, setSelectedItems] = useState([]);
  const filtersRef = useRef(filters);

  useEffect(() => { filtersRef.current = filters }, [filters]);

  useEffect(() => {
    setFilters({
      search: queryParams.search || '',
      status: queryParams.status || '',
      sort_field: queryParams.sort_field || '',
      sort_direction: queryParams.sort_direction || ''
    });
  }, [queryParams.search, queryParams.status, queryParams.sort_field, queryParams.sort_direction]);

  useEffect(() => {
    const savedSelectedItems = JSON.parse(localStorage.getItem('selectedTVItems')) || [];
    setSelectedItems(savedSelectedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTVItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const debouncedSearch = useMemo(() =>
    debounce((q) => {
      const next = { ...filtersRef.current, search: q };
      setFilters(next);
      router.get(
        route('tv.index'),
        { ...queryParams, ...next, page: 1 },
        { preserveState: true, preserveScroll: true }
      );
    }, 300)
  , [queryParams]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const navigateWithFilters = useCallback((nextFilters, opts = { preserveScroll: true }) => {
    setFilters(nextFilters);
    router.get(
      route('tv.index'),
      { ...queryParams, ...nextFilters, page: 1 },
      { preserveState: true, preserveScroll: opts.preserveScroll }
    );
  }, [queryParams]);

  const handleSearchChange = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    debouncedSearch(value);
  };

  const onKeyPress = (e) => {
    if (e.key !== 'Enter') return;
    debouncedSearch.cancel();
    const next = { ...filtersRef.current, search: e.target.value };
    navigateWithFilters(next, { preserveScroll: false });
  };

  const handleSelectChange = (name, value) => {
    const next = { ...filters, [name]: value };
    navigateWithFilters(next);
  };

  const sortChanged = (name) => {
    const next = { ...filters };
    if (name === next.sort_field) {
      next.sort_direction = next.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      next.sort_field = name;
      next.sort_direction = 'asc';
    }
    navigateWithFilters(next);
  };

  const deleteTV = (item) => {
    if (!window.confirm('Are you sure you want to delete this TV?')) {
      return;
    }
    router.delete(route('tv.destroy', item.TID));
  };

  const handlePrint = (item) => {
    printAssetTag(item, 'tv');
  };

  const handleSelectAll = (e) => {
    const allIDsOnPage = (tv?.data || []).map((item) => item.TID);
    if (e.target.checked) {
      setSelectedItems((prevSelected) => [
        ...new Set([...(prevSelected || []), ...allIDsOnPage]),
      ]);
    } else {
      setSelectedItems((prevSelected) =>
        (prevSelected || []).filter((id) => !allIDsOnPage.includes(id))
      );
    }
  };

  const handleSelectItem = (TID) => {
    setSelectedItems((prevSelected) =>
      (prevSelected || []).includes(TID)
        ? prevSelected.filter((id) => id !== TID)
        : [...(prevSelected || []), TID]
    );
  };

  const handleBulkPrint = () => {
    const selectedItemDetails = (tv?.data || []).filter((item) =>
      selectedItems.includes(item.TID)
    );

    if (selectedItemDetails.length > 0) {
      bulkPrintAssetTags(selectedItemDetails, 'tv');
      setSelectedItems([]);
      localStorage.removeItem('selectedTVItems');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Deployed':
        return 'bg-green-600';
      case 'Spare':
        return 'bg-yellow-500';
      case 'For Disposal':
        return 'bg-red-500';
      case 'Borrow':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Television List</h2>
          <div className='flex justify-between w-auto lg:w-1/4 gap-auto gap-2'>
            <Button
              onClick={() => openCreateModal()}
              className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
            >
              <span className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v9A2.25 2.25 0 0 1 18.75 16.5H5.25A2.25 2.25 0 0 1 3 14.25v-9Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21h7.5M12 16.5V21" />
                </svg>
                Add
              </span>
            </Button>

            <button
              onClick={handleBulkPrint}
              disabled={selectedItems.length === 0}
              className="bg-blue-500 text-white rounded shadow p-2"
            >
              Bulk Print Asset Tags
            </button>
          </div>
        </div>
      }
    >
      <Head title="TV" />
      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-slate-800 dark:border-green-800">
              {success}
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <div className="w-[1000px] md:w-full lg:w-auto flex justify-between items-center py-2 gap-2">
                  <div>
                    <TextInput
                      className="w-full"
                      value={filters.search}
                      placeholder="TV"
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onKeyPress={onKeyPress}
                    />
                  </div>

                  <div>
                    <SelectInput
                      className="w-full text-sm h-8 py-1"
                      value={filters.status}
                      onChange={(e) => handleSelectChange('status', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Deployed">Deployed</option>
                      <option value="Spare">Spare</option>
                      <option value="For Disposal">For Disposal</option>
                      <option value="Borrow">Borrow</option>
                    </SelectInput>
                  </div>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th>
                        <input type="checkbox" onChange={handleSelectAll} />
                      </th>

                      <TableHeading
                        name="brand"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Brand
                      </TableHeading>

                      <TableHeading
                        name="model"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Model
                      </TableHeading>

                      <TableHeading
                        name="asset_tag"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Asset Tag
                      </TableHeading>

                      <TableHeading
                        name="location"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Location
                      </TableHeading>

                      <TableHeading
                        name="serial_number"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Serial Number
                      </TableHeading>

                      <TableHeading
                        name="datePurchased"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Date Purchased
                      </TableHeading>

                      <TableHeading
                        name="status"
                        sort_field={filters.sort_field}
                        sort_direction={filters.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(tv?.data || []).length > 0 ? (
                      (tv?.data || []).map((item) => (
                        <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={item.TID}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.TID)}
                              onChange={() => handleSelectItem(item.TID)}
                            />
                          </td>

                          <th className="px-3 py-2 hover:underline hover:text-white text-nowrap">
                            <Link href="#" onClick={(e) => openModal(item, e)}>
                              {item.brand}
                            </Link>
                          </th>

                          <td className="px-3 py-2">{item.model}</td>
                          <td className="px-3 py-2">{item.asset_tag}</td>
                          <td className="px-3 py-2">{item.location}</td>
                          <td className="px-3 py-2">{item.serial_number}</td>
                          <td className="px-3 py-2">{item.datePurchased || 'N/A'}</td>
                          <td className="px-3 py-2 text-nowrap">
                            <span className={'px-2 rounded-e-full text-white ' + getStatusClass(item.status)}>
                              {item.status}
                            </span>
                          </td>

                          <td className="px-3 py-2 text-center text-nowrap">
                            <button
                              className="inline-block py-1 px-2 text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1"
                              onClick={(e) => { e.stopPropagation(); openEditModal(item); }}
                            >
                              <span className='flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                              </span>
                            </button>

                            <button
                              onClick={(e) => { e.stopPropagation(); deleteTV(item); }}
                              className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1"
                            >
                              <span className='flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.108 0 0 0-7.5 0" />
                                </svg>
                              </span>
                            </button>

                            <button
                              className="inline-block py-1 px-2 text-green-500 hover:text-green-300 hover:scale-110 mx-1"
                              onClick={(e) => { e.stopPropagation(); handlePrint(item); }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className='text-center'>
                        <td className='font-medium text-base py-4' colSpan="8">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                links={tv?.meta?.links || []}
                queryParams={{
                  search: filters.search,
                  status: filters.status,
                  sort_field: filters.sort_field,
                  sort_direction: filters.sort_direction
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Show show={showModal} onClose={closeModal} user={selected} />

      <CreateModalComponent
        show={showCreateModal}
        onClose={closeCreateModal}
      />

      <EditModalComponent
        show={showEditModal}
        onClose={closeEditModal}
        selected={selectedEdit}
      />
    </AuthenticatedLayout>
  );
}
import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PHONES_STATUS_CLASS_MAP, PHONES_STATUS_TEXT_MAP, TABLETS_STATUS_CLASS_MAP, TABLETS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import { Modal, Button } from 'flowbite-react';
import { useCallback, useEffect, useMemo, useState } from 'react'

// import useModal from './hooks/useModal'
// import useCreateModal from './hooks/useCreateModal'
// import useEditModal from './hooks/useEditModal'
import useModal from '@/Components/hooks/useModal'
import useCreateModal from '@/Components/hooks/useCreateModal'
import useEditModal from '@/Components/hooks/useEditModal'

import Show from './Show'
import CreateModalComponent from './Create'
import EditModalComponent from './Edit'
import { debounce } from 'lodash'
import { printAssetTag } from '@/Components/hooks/printAssetTag'
import bulkPrintAssetTags from '@/Components/hooks/bulkPrintAssetTags'

export default function Index({auth, phones, departmentsList, phoneUsersFnameList, queryParams = null, success}) {
    
    const { showModal, selected, openModal, closeModal } = useModal();
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    const { showEditModal, selectedEdit, openEditModal, closeEditModal } = useEditModal();

    queryParams = queryParams || {}
    const [searchQuery, setSearchQuery] = useState(queryParams.search || '');
    const [phoneStatus, setPhoneStatus] = useState(queryParams.phone_status || '');
    const [assetClass, setAssetClass] = useState(queryParams.asset_class || '');
    const [departmentPhone, setDepartmentPhone] = useState(queryParams.department_phone || '');
    const [selectedItems, setSelectedItems] = useState([]);

    // Load selectedItems from localStorage on component mount
    useEffect(() => {
        const savedSelectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        setSelectedItems(savedSelectedItems);
    }, []);

    // Save selectedItems to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }, [selectedItems]);

    // Handle search query change with debouncing to improve performance
    const handleSearchChange = useMemo(() =>
        debounce((query) => {
    
          setSearchQuery(query);
    
          router.get(
            route('phones.index'),
            {
              ...queryParams,
              search: query,
              
              // This time add other filters 
              phone_status: phoneStatus,
              asset_class: assetClass,
              department_phone: departmentPhone,
              page: 1
            },
            {preserveState: true, preserveScroll: true}
          )
        }, 300), [queryParams, phoneStatus, assetClass, departmentPhone]); // need to add dependency for queryParams changes
    //end

    const handleFilterChange = useCallback((name, value) => {
        router.get(
          route('phones.index'),
            {
                ...queryParams,
                [name]: value,
                search: searchQuery,
                page: 1
            },
            {preserveScroll: true}
        );
      }, [queryParams]);
    //end
    
    const searchFieldChanged = (value) => {
        handleSearchChange(value);
    }; 

    // Key press event handler (specifically for Enter key)
    const onKeyPress = (e) => {
        if(e.key !== 'Enter') return;
        
        searchFieldChanged(e.target.value);
    }

    const [loading, setLoading] = useState(false);
    // Update loading state based on filtering
     useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // Simulate a delay, adjust based on actual data processing
        return () => clearTimeout(timer); // Cleanup timer on component unmount or if effect dependencies change
    }, [phoneStatus, assetClass, departmentPhone, searchQuery]);

    const handleSelectChange = (name, value) => {
        setLoading(true);
        switch (name) {
          case 'phone_status':
            setPhoneStatus(value);
            break;
          case 'asset_class':
            setAssetClass(value);
            break;
          case 'department_phone':
            setDepartmentPhone(value);
            break;
          default:
            break;
        }
        handleFilterChange(name, value);
    };

    // Sort change handler
    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('phones.index'), queryParams, { preserveScroll: true });
    };

    const deletePhones = (phone) => {
        if (!window.confirm('Are you sure you want to delete this Phone?')) {
            return;
        }
        router.delete(route('phones.destroy', phone.phone_id))
    };    

    const handlePrint = (phone) => {
        printAssetTag(phone, 'phone');
    };
    
    // const handleSelectAll = (e) => {
    //     if (e.target.checked) {
    //         const allIDs = phones.data.map((item) => item.phone_id);
    //         setSelectedItems(allIDs);
    //     } else {
    //         setSelectedItems([]);
    //     }
    // };
    const handleSelectAll = (e) => {
        const allIDsOnPage = phones.data.map((item) => item.phone_id);
    
        if (e.target.checked) {
            setSelectedItems((prevSelected) => [
                ...new Set([...prevSelected, ...allIDsOnPage]),
            ]);
        } else {
            setSelectedItems((prevSelected) =>
                prevSelected.filter((id) => !allIDsOnPage.includes(id))
            );
        }
    };

    const handleSelectItem = (phone_id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(phone_id)
            ? prevSelected.filter((id) => id !== phone_id)
            : [...prevSelected, phone_id]
        );
    };

    const handleBulkPrint = () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        // console.log('CSRF Token:', csrfToken);
        if (!csrfToken) {
            console.error('CSRF token not found in the document.');
            return;
        }
    
        const selectedItemDetails = phones.data.filter((item) =>
            selectedItems.includes(item.phone_id)
        );
    
        const missingItemIDs = selectedItems.filter(
            (id) => !phones.data.some((item) => item.phone_id === id)
        );
    
        if (missingItemIDs.length > 0) {
            fetch(route('phones.bulkFetch'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ ids: missingItemIDs }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((missingItems) => {
                const allItemsToPrint = [...selectedItemDetails, ...missingItems];
                bulkPrintAssetTags(allItemsToPrint, 'phone');

                // Clear selected items and remove from localStorage
                setSelectedItems([]);
                localStorage.removeItem('selectedItems');
            })
            .catch((error) => {
                console.error('Error fetching missing items:', error);
            });
        } else {
            // console.log('All Selected Items:', selectedItemDetails);
            bulkPrintAssetTags(selectedItemDetails, 'phone'); 
            
            // Clear selected items and remove from localStorage
            setSelectedItems([]);
            localStorage.removeItem('selectedItems');
        }
    };
  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Phones</h2>
                <div className='flex justify-between w-auto lg:w-1/4 gap-auto gap-2'>
                    {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                        <Button 
                            onClick={() => openCreateModal()} 
                            className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                        >
                            <span className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                Add
                            </span>
                        </Button>
                    )}
                    {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                        <button
                            onClick={handleBulkPrint}
                            disabled={selectedItems.length === 0}
                            className="bg-blue-500 text-white rounded shadow p-2"
                        >
                            Bulk Print Asset Tags
                        </button>
                    )}
                </div>
            </div>
        }
    >
        <Head title="Phones" />
        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-slate-800 dark:border-green-800" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button onClick={() => router.get(route('phones.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(phones, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <TextInput 
                                            className="w-full"
                                            defaultValue={searchQuery} 
                                            placeholder="Phone Name / User"
                                            onBlur={e => searchFieldChanged(e.target.value)}
                                            onChange={(e) => searchFieldChanged(e.target.value)}
                                            onKeyPress={e => onKeyPress(e)}
                                        />
                                    </div>
                                    <div>
                                        <SelectInput 
                                            className="w-full text-sm h-8 py-1"
                                            defaultValue={phoneStatus} 
                                            onChange={ (e) => handleSelectChange('phone_status', e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Deployed">Deployed</option>
                                            <option value="Spare">Spare</option>
                                            <option value="For Disposal">For Disposal</option>
                                            <option value="Already Disposed">Already Disposed</option>
                                            <option value="Borrow">Borrow</option>
                                        </SelectInput>
                                    </div>

                                    <div>
                                        <SelectInput 
                                            className="w-full text-sm h-8 py-1"
                                            defaultValue={assetClass}
                                            onChange={(e) => handleSelectChange('asset_class', e.target.value)}
                                        >
                                            <option value="">Choose Asset Classification</option>
                                            <option value="Office Supplies">Office Supplies</option>
                                            <option value="Consumables">Consumables</option>
                                            <option value="Repair and Maintenance">Repair and Maintenance</option>
                                            <option value="Capital">Capital</option>
                                            <option value="N/A">N/A</option>
                                        </SelectInput>
                                    </div>

                                    <div>
                                        <SelectInput 
                                            className="w-full text-sm h-8 py-1"
                                            defaultValue={departmentPhone}
                                            onChange={(e) => handleSelectChange('department_phone', e.target.value)}
                                        >
                                            <option value="">Select Department</option>
                                            {departmentsList.data.map(dept => (
                                                <option key={dept.dept_id} value={dept.dept_list}>
                                                    {dept.dept_list}
                                                </option>
                                            ))}
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
                                                name="phone_id"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                PID
                                            </TableHeading>
                                            <TableHeading
                                                name="phone_name"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Phone Name
                                            </TableHeading>

                                            <TableHeading
                                                name="phone_num"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Phone NO
                                            </TableHeading>

                                            <th className="px-3 py-3">IMG</th>
                                            <TableHeading
                                                name="phone_model"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Phone Model
                                            </TableHeading>
                                        
                                            
                                            <TableHeading
                                                name="fullName"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Full Name
                                            </TableHeading>

                                            <TableHeading
                                                name="department_phone"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Department
                                            </TableHeading>
                                            
                                            {/* <TableHeading
                                                name="phone_storage"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Phone Storage
                                            </TableHeading>

                                            <TableHeading
                                                name="phone_ram"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                RAM
                                            </TableHeading> */}

                                            {/* <TableHeading
                                                name="phone_serial"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Phone Serial
                                            </TableHeading> */}
                                            <TableHeading
                                                name="phone_asset"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Phone Asset
                                            </TableHeading>
                                            {/* <TableHeading
                                                name="phone_cpu"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Processor
                                            </TableHeading>
                                            
                                            <TableHeading
                                                name="phone_address"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Mac Address
                                            </TableHeading> */}
                                            {/* <TableHeading
                                                name="phone_imei"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                IMEI
                                            </TableHeading> */}

                                            <TableHeading
                                                name="phone_status"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Status
                                            </TableHeading>
                                            <TableHeading
                                                name="remarks"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Remarks
                                            </TableHeading>
                                            <th className="px-3 py-3">Created By</th>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>
                                            <th className="px-3 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr className="text-center">
                                                <td colSpan="17" className="py-4 text-gray-500">Please wait while rendering...</td>
                                            </tr>
                                        ) : phones.data && phones.data.length > 0 ? (
                                                phones.data.map(phone => (
                                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={phone.phone_id}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedItems.includes(phone.phone_id)}
                                                                onChange={() => handleSelectItem(phone.phone_id)}
                                                            />
                                                        </td>
                                                        <td className="px-3 py-2">{phone.phone_id}</td>
                                                        <th className="px-3 py-2 hover:underline hover:text-white text-nowrap">
                                                            {/* <Link href={route("phones.show", { phone_id: phone.phone_id })}>
                                                                {phone.phone_name}
                                                            </Link> */}
                                                            <Link href="#" onClick={(e) => openModal(phone, e)}>
                                                                {phone.phone_name}
                                                            </Link>
                                                        </th>
                                                        <td className="px-3 py-2">{phone.phone_num}</td>
                                                        <td className="px-3 py-2">
                                                            <img src={phone.img_path} alt="" style={{width: 60}} />
                                                        </td>
                                                        <td className="px-3 py-2">{phone.phone_model}</td>
                                                        <td className="px-3 py-2 font-bold text-slate-300">{phone.fullName}</td>
                                                        <td className="px-3 py-2">{phone.department_phone}</td>
                                                        {/* <td className="px-3 py-2">{phone.phone_storage}</td>
                                                        <td className="px-3 py-2">{phone.phone_ram}</td> */}
                                                        {/* <td className="px-3 py-2">{phone.phone_serial}</td> */}
                                                        <td className="px-3 py-2">{phone.phone_asset}</td>
                                                        {/* <td className="px-3 py-2">{phone.phone_cpu}</td> */}
                                                        {/* <td className="px-3 py-2">{phone.phone_address}</td> */}
                                                        {/* <td className="px-3 py-2">{phone.phone_imei}</td> */}
                                                        <td className="px-3 py-2 text-nowrap">
                                                            <span className={'px-2 rounded-e-full text-white ' + PHONES_STATUS_CLASS_MAP[phone.phone_status]}>{PHONES_STATUS_TEXT_MAP[phone.phone_status]}</span>
                                                        </td>
                                                        <td className="px-3 py-2">{phone.remarks}</td>
                                                        <td className="px-3 py-2">{phone.createdBy.name}</td>
                                                        <td className="px-3 py-2 text-nowrap">{phone.created_at}</td>
                                                        <td className="px-3 py-2 text-right text-nowrap">
                                                            {/* <Link href={route('phones.edit', phone.phone_id)} className="font-medium inline-block py-1 px-2 rounded-lg  text-white  bg-blue-600 hover:bg-blue-700 mx-1">Edit</Link> */}
                                                            <button
                                                                className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1"
                                                                onClick={(e) => openModal(phone, e)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg>
                                                            </button>
                                                            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                                <button
                                                                    className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1" 
                                                                    onClick={() => openEditModal(phone)}
                                                                >
                                                                    <span className='flex items-center justify-center'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            )}
                                                            
                                                            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                                <button 
                                                                    onClick={(e) => deletePhones(phone)}
                                                                    className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1"
                                                                >
                                                                    <span className='flex items-center justify-center'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            )}
                                                            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                                <button 
                                                                    className="inline-block py-1 px-2 text-green-500 hover:text-green-300 hover:scale-110 mx-1"
                                                                    onClick={() => handlePrint(phone)}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className='text-center'>
                                                    <td className='font-medium text-base py-4' colSpan="17">No data available</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination 
                                links={phones.meta.links}
                                queryParams={{
                                    search: searchQuery,
                                    phone_status: phoneStatus,
                                    asset_class: assetClass,
                                    department_phone: departmentPhone
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Show show={showModal} onClose={closeModal} user={selected} />
            <CreateModalComponent show={showCreateModal} onClose={closeCreateModal} departmentsList={departmentsList.data} phoneUsersFnameList={phoneUsersFnameList.data}  />
            <EditModalComponent 
                show={showEditModal} 
                onClose={closeEditModal} 
                listDepartments={departmentsList.data}
                listPhoneUsersFname={phoneUsersFnameList.data}
                selectedEditPhone={selectedEdit}
            />
    </AuthenticatedLayout>
  )
}

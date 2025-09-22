// ...existing code...
import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { SERVERUPS_STATUS_CLASS_MAP, SERVERUPS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import useModal from '@/Components/hooks/useModal'
import Show from './Show'
import TableHeading from '@/Components/TableHeading'
import { Button } from 'flowbite-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import useCreateModal from '@/Components/hooks/useCreateModal'
import useEditModal from '@/Components/hooks/useEditModal'

import CreateModalComponent from './Create'
import EditModalComponent from './Edit'
import { debounce } from 'lodash'
import { printAssetTag } from '@/Components/hooks/printAssetTag'
import bulkPrintAssetTags from '@/Components/hooks/bulkPrintAssetTags'

export default function Index({ auth, serverUps, departmentsList, generations, serverUpsUsersList, queryParams = null, success }) {
  queryParams = queryParams || {}

  const { showModal, selected, openModal, closeModal } = useModal()
  const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal()
  const { showEditModal, selectedEdit, openEditModal, closeEditModal } = useEditModal()

  // local controlled filter state (initialized from incoming query params)
  const [searchQuery, setSearchQuery] = useState(queryParams.search || '')
  const [serverUpsStatus, setServerUpsStatus] = useState(queryParams.S_UStatus || '')
  const [assetClass, setAssetClass] = useState(queryParams.asset_class || '')
  const [serverUpsType, setServerUpsType] = useState(queryParams.S_UType || '')
  const [serverUpsGen, setServerUpsGen] = useState(queryParams.S_UGen || '')
  const [departmentSU, setdepartmentSU] = useState(queryParams.department_S_U || '')
  const [selectedItems, setSelectedItems] = useState([])

  // keep a ref for latest filters to use inside debounced function
  const filtersRef = useRef({
    search: searchQuery,
    S_UStatus: serverUpsStatus,
    asset_class: assetClass,
    S_UType: serverUpsType,
    S_UGen: serverUpsGen,
    department_S_U: departmentSU,
  })

  useEffect(() => {
    filtersRef.current = {
      search: searchQuery,
      S_UStatus: serverUpsStatus,
      asset_class: assetClass,
      S_UType: serverUpsType,
      S_UGen: serverUpsGen,
      department_S_U: departmentSU,
    }
  }, [searchQuery, serverUpsStatus, assetClass, serverUpsType, serverUpsGen, departmentSU])

  // sync when parent queryParams change (e.g. pagination navigation)
  useEffect(() => {
    setSearchQuery(queryParams.search || '')
    setServerUpsStatus(queryParams.S_UStatus || '')
    setAssetClass(queryParams.asset_class || '')
    setServerUpsType(queryParams.S_UType || '')
    setServerUpsGen(queryParams.S_UGen || '')
    setdepartmentSU(queryParams.department_S_U || '')
  }, [queryParams.search, queryParams.S_UStatus, queryParams.asset_class, queryParams.S_UType, queryParams.S_UGen, queryParams.department_S_U])

  // persist selectedItems to localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('selectedItems')) || []
    setSelectedItems(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
  }, [selectedItems])

  // debounced search (uses filtersRef to include latest selects in request)
  const debouncedSearch = useMemo(
    () =>
      debounce((q) => {
        const f = { ...filtersRef.current, search: q, page: 1 }
        router.get(route('serverUps.index'), { ...queryParams, ...f }, { preserveState: true, preserveScroll: true })
      }, 300),
    [queryParams]
  )

  useEffect(() => {
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  // helper to navigate with merged filters, resets page to 1 by default
  const navigateWithFilters = useCallback(
    (overrides = {}) => {
      const merged = {
        search: searchQuery,
        S_UStatus: serverUpsStatus,
        asset_class: assetClass,
        S_UType: serverUpsType,
        S_UGen: serverUpsGen,
        department_S_U: departmentSU,
        ...overrides,
        page: overrides.page || 1,
      }
      router.get(route('serverUps.index'), { ...queryParams, ...merged }, { preserveScroll: true })
    },
    [queryParams, searchQuery, serverUpsStatus, assetClass, serverUpsType, serverUpsGen, departmentSU]
  )

  const searchFieldChanged = (value) => {
    setSearchQuery(value)
    debouncedSearch(value)
  }

  const onKeyPress = (e) => {
    if (e.key !== 'Enter') return
    debouncedSearch.cancel()
    const val = e.target.value
    setSearchQuery(val)
    navigateWithFilters({ search: val, page: 1 })
  }

  const handleSelectChange = (name, value) => {
    // update local state for controlled selects
    switch (name) {
      case 'S_UStatus':
        setServerUpsStatus(value)
        break
      case 'asset_class':
        setAssetClass(value)
        break
      case 'S_UType':
        setServerUpsType(value)
        break
      case 'S_UGen':
        setServerUpsGen(value)
        break
      case 'department_S_U':
        setdepartmentSU(value)
        break
      default:
        break
    }

    // navigate with merged filters
    navigateWithFilters({ [name]: value, page: 1 })
  }

  const sortChanged = (name) => {
    const next = { ...queryParams }
    if (name === next.sort_field) {
      next.sort_direction = next.sort_direction === 'asc' ? 'desc' : 'asc'
    } else {
      next.sort_field = name
      next.sort_direction = 'asc'
    }
    router.get(route('serverUps.index'), next, { preserveScroll: true })
  }

  const deleteComputers = (serverups) => {
    if (!window.confirm('Are you sure you want to delete this Server / UPS?')) return
    router.delete(route('serverUps.destroy', serverups.S_UID))
  }

  const handlePrint = (serverups) => {
    printAssetTag(serverups, 'serverups')
  }

  const handleSelectAll = (e) => {
    const allIDsOnPage = (serverUps?.data || []).map((item) => item.S_UID)
    if (e.target.checked) {
      setSelectedItems((prev) => [...new Set([...prev, ...allIDsOnPage])])
    } else {
      setSelectedItems((prev) => prev.filter((id) => !allIDsOnPage.includes(id)))
    }
  }

  const handleSelectItem = (S_UID) => {
    setSelectedItems((prev) => (prev.includes(S_UID) ? prev.filter((id) => id !== S_UID) : [...prev, S_UID]))
  }

  const handleBulkPrint = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    if (!csrfToken) {
      console.error('CSRF token not found in the document.')
      return
    }

    const selectedItemDetails = (serverUps?.data || []).filter((item) => selectedItems.includes(item.S_UID))
    const missingItemIDs = selectedItems.filter((id) => !(serverUps?.data || []).some((i) => i.S_UID === id))

    if (missingItemIDs.length > 0) {
      fetch(route('serverups.bulkFetch'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ ids: missingItemIDs }),
      })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`)
          return r.json()
        })
        .then((missingItems) => {
          const allItemsToPrint = [...selectedItemDetails, ...missingItems]
          bulkPrintAssetTags(allItemsToPrint, 'serverups')
          setSelectedItems([])
          localStorage.removeItem('selectedItems')
        })
        .catch((err) => console.error('Error fetching missing items:', err))
    } else {
      bulkPrintAssetTags(selectedItemDetails, 'serverups')
      setSelectedItems([])
      localStorage.removeItem('selectedItems')
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Server / UPS</h2>
          <div className="flex justify-between w-auto lg:w-1/4 gap-auto gap-2">
            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
              <Button onClick={() => openCreateModal()} className="bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                  </svg>
                  Add
                </span>
              </Button>
            )}
            <button onClick={handleBulkPrint} disabled={selectedItems.length === 0} className="bg-blue-500 text-white rounded shadow p-2">
              Bulk Print Asset Tags
            </button>
          </div>
        </div>
      }
    >
      <Head title="Server/Ups" />
      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-slate-800 dark:border-green-800" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div className="ms-3 text-sm font-medium">{success}</div>
              <button onClick={() => router.get(route('serverUps.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <div className="w-[1000px] md:w-full lg:w-auto flex justify-between items-center py-2">
                  <div>
                    <TextInput className="w-full" value={searchQuery} placeholder="SERVER/UPS /User" onChange={(e) => searchFieldChanged(e.target.value)} onKeyPress={onKeyPress} />
                  </div>

                  <div>
                    <SelectInput className="w-full text-sm h-8 py-1" value={serverUpsStatus} onChange={(e) => handleSelectChange('S_UStatus', e.target.value)}>
                      <option value="">Select Status</option>
                      <option value="Deployed">Deployed</option>
                      <option value="Spare">Spare</option>
                      <option value="For Disposal">For Disposal</option>
                      <option value="Already Disposed">Already Disposed</option>
                      <option value="Borrow">Borrow</option>
                    </SelectInput>
                  </div>

                  <div>
                    <SelectInput className="w-full text-sm h-8 py-1" value={assetClass} onChange={(e) => handleSelectChange('asset_class', e.target.value)}>
                      <option value="">Choose Asset Classification</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Consumables">Consumables</option>
                      <option value="Repair and Maintenance">Repair and Maintenance</option>
                      <option value="Capital">Capital</option>
                      <option value="N/A">N/A</option>
                    </SelectInput>
                  </div>

                  <div>
                    <SelectInput className="w-full text-sm h-8 py-1" value={serverUpsType} onChange={(e) => handleSelectChange('S_UType', e.target.value)}>
                      <option value="">Type</option>
                      <option value="SERVER">SERVER</option>
                      <option value="UPS">UPS</option>
                    </SelectInput>
                  </div>

                  <div>
                    <SelectInput className="w-full text-sm h-8 py-1" value={serverUpsGen} onChange={(e) => handleSelectChange('S_UGen', e.target.value)}>
                      <option value="">Select Generation </option>
                      {generations.map((gen, index) => (
                        <option key={index} value={gen}>
                          {gen}
                        </option>
                      ))}
                    </SelectInput>
                  </div>

                  <div>
                    <SelectInput className="w-full text-sm h-8 py-1" value={departmentSU} onChange={(e) => handleSelectChange('department_S_U', e.target.value)}>
                      <option value="">Select Department</option>
                      {departmentsList?.data?.map((dept) => (
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
                      <TableHeading name="S_UID" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        S&UID
                      </TableHeading>
                      <TableHeading name="S_UName" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        S & U Name
                      </TableHeading>
                      <th className="px-3 py-3">IMG</th>
                      <TableHeading name="S_UModel" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        S & U Model
                      </TableHeading>
                      <TableHeading name="S_UType" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        Type
                      </TableHeading>
                      <TableHeading name="S_UUser" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        User
                      </TableHeading>
                      <TableHeading name="department_S_U" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        Department
                      </TableHeading>
                      <TableHeading name="S_UAsset" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        S & U Asset
                      </TableHeading>
                      <TableHeading name="S_UStatus" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        Status
                      </TableHeading>
                      <TableHeading name="S_URemarks" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        Remarks
                      </TableHeading>
                      <th className="px-3 py-3">Created By</th>
                      <TableHeading name="created_at" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                        Created Date
                      </TableHeading>
                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serverUps?.data && serverUps.data.length > 0 ? (
                      serverUps.data.map((serverups) => (
                        <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={serverups.S_UID}>
                          <td>
                            <input type="checkbox" checked={selectedItems.includes(serverups.S_UID)} onChange={() => handleSelectItem(serverups.S_UID)} onClick={(e) => e.stopPropagation()} />
                          </td>
                          <td className="px-3 py-2">{serverups.S_UID}</td>
                          <th className="px-3 py-2 hover:underline hover:text-white text-nowrap">
                            <Link href="#" onClick={(e) => openModal(serverups, e)}>
                              {serverups.S_UName}
                            </Link>
                          </th>
                          <td className="px-3 py-2">
                            {serverups.img_path ? <img src={serverups.img_path} alt="" style={{ width: 60 }} /> : null}
                          </td>
                          <td className="px-3 py-2">{serverups.S_UModel}</td>
                          <td className="px-3 py-2">{serverups.S_UType}</td>
                          <td className="px-3 py-2">{serverups.S_UUser}</td>
                          <td className="px-3 py-2">{serverups.department_S_U}</td>
                          <td className="px-3 py-2">{serverups.S_UAsset}</td>
                          <td className="px-3 py-2 text-nowrap">
                            <span className={'px-2 rounded-e-full text-white ' + SERVERUPS_STATUS_CLASS_MAP[serverups.S_UStatus]}>{SERVERUPS_STATUS_TEXT_MAP[serverups.S_UStatus]}</span>
                          </td>
                          <td className="px-3 py-2">{serverups.S_URemarks}</td>
                          <td className="px-3 py-2">{serverups.createdBy?.name}</td>
                          <td className="px-3 py-2 text-nowrap">{serverups.created_at}</td>
                          <td className="px-3 py-2 text-right text-nowrap">
                            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                              <button className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1" onClick={(e) => { e.stopPropagation(); openEditModal(serverups); }}>
                                <span className="flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                  </svg>
                                </span>
                              </button>
                            )}
                            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                              <button onClick={(e) => { e.stopPropagation(); deleteComputers(serverups); }} className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1">
                                <span className="flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                </span>
                              </button>
                            )}
                            <button className="inline-block py-1 px-2 text-green-500 hover:text-green-300 hover:scale-110 mx-1" onClick={(e) => { e.stopPropagation(); handlePrint(serverups); }}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center">
                        <td className="font-medium text-base py-4" colSpan="17">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                links={serverUps?.meta?.links || []}
                queryParams={{
                  search: searchQuery,
                  S_UStatus: serverUpsStatus,
                  asset_class: assetClass,
                  S_UType: serverUpsType,
                  S_UGen: serverUpsGen,
                  department_S_U: departmentSU,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <CreateModalComponent show={showCreateModal} onClose={closeCreateModal} departmentsList={departmentsList.data} serverUpsUsersList={serverUpsUsersList.data} generations={generations} />
      <EditModalComponent show={showEditModal} onClose={closeEditModal} listDepartments={departmentsList.data} listServerUPSUsers={serverUpsUsersList.data} selectedEditServerUps={selectedEdit} generations={generations} />
      <Show show={showModal} onClose={closeModal} user={selected} />
    </AuthenticatedLayout>
  )
}
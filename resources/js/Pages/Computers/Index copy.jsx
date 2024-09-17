import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { COMPUTERS_STATUS_CLASS_MAP, COMPUTERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import { Modal, Button } from 'flowbite-react';
import { useCallback, useEffect, useMemo, useState } from 'react'

import useModal from './hooks/useModal'
import useCreateModal from './hooks/useCreateModal'
import useEditModal from './hooks/useEditModal'
import Show from './Show'
import CreateModalComponent from './Create'
import EditModalComponent from './Edit'
import { debounce } from 'lodash'
import { printAssetTag } from '@/Components/hooks/printAssetTag'
import { bulkPrintAssetTags } from '@/Components/hooks/printUtils/printUtils'

export default function Index({auth, computers, departmentsList, compUsersList, compUsersFnameList, queryParams = null, success}) {
    
    const { showModal, selectedComp, openModal, closeModal } = useModal();
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    const { showEditModal, selectedEditComp, openEditModal, closeEditModal } = useEditModal();
    
    queryParams = queryParams || {}
    const [searchQuery, setSearchQuery] = useState(queryParams.search || '');
    
    // Handle search query change with debouncing to improve performance
    const handleSearchChange = useMemo(() =>
        debounce((query) => {
    
          setSearchQuery(query);
    
          router.get(
            route('computers.index'),
            {
              ...queryParams,
              search: query,
              
              // This time add other filters 
              comp_status: compStatus,
              asset_class: assetClass,
              comp_type: compType,
              comp_gen: compGen,
              department_comp: departmentComp,
              page: 1
            },
            {preserveState: true, preserveScroll: true}
          )
        }, 300), [queryParams, compStatus, assetClass, compType, compGen, departmentComp]); // need to add dependency for queryParams changes
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
    }, [compStatus, assetClass, compType, compGen, departmentComp, searchQuery]);
    
    // Sort change handler
    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('computers.index'), queryParams, { preserveScroll: true });
    };

    const deleteComputers = (computer) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }
        router.delete(route('computers.destroy', computer.CID))
    };    

    const handlePrint = (computer) => {
        printAssetTag(computer, 'computer');
    };        

    const [selectedComputers, setSelectedComputers] = useState([]);

    const handleSelectComputer = (CID) => {
        setSelectedComputers((prevSelected) =>
            prevSelected.includes(CID)
            ? prevSelected.filter((id) => id !== CID)
            : [...prevSelected, CID]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allComputerIDs = computers.data.map((comp) => comp.CID);
            setSelectedComputers(allComputerIDs);
        } else {
            setSelectedComputers([]);
        }
    };

    const handleBulkPrint = () => {
        const selectedComputerDetails = computers.data.filter((comp) =>
            selectedComputers.includes(comp.CID)
        );
        //??
    };

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Computers</h2>
                {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                    <Button 
                        onClick={() => openCreateModal()} 
                        className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                    >
                        <span className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                            </svg>
                            Add
                        </span>
                    </Button>
                )}
            </div>
        }
    >
        <Head title="Computers" />
        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(computers, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <TextInput 
                                            className="w-full"
                                            defaultValue={searchQuery} 
                                            placeholder="Computer"
                                            onBlur={e => searchFieldChanged(e.target.value)}
                                            onChange={(e) => searchFieldChanged(e.target.value)}
                                            onKeyPress={e => onKeyPress(e)}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleBulkPrint}
                                    disabled={selectedComputers.length === 0}
                                    className="bg-blue-500 text-white rounded shadow p-2"
                                >
                                    Bulk Print Asset Tags
                                </button>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th>
                                                <input type="checkbox" onChange={handleSelectAll} />
                                            </th>
                                            <TableHeading
                                                name="CID"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                CID
                                            </TableHeading>
                                            <TableHeading
                                                name="comp_name"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Computer Name
                                            </TableHeading>
                                            <th className="px-3 py-3">IMG</th>
                                            
                                            <TableHeading
                                                name="comp_type"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Computer Type
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
                                                name="department_comp"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Department
                                            </TableHeading>
                                            
                                            <TableHeading
                                                name="comp_asset"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Computer Asset
                                            </TableHeading>
                                            
                                            <TableHeading
                                                name="comp_gen"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Computer Gen
                                            </TableHeading>
                                            <TableHeading
                                                name="comp_address"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Mac Address
                                            </TableHeading>

                                            <TableHeading
                                                name="comp_status"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Status
                                            </TableHeading>
                                            
                                            <th className="px-3 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {loading ? (
                                            <tr className="text-center">
                                                <td colSpan="17" className="py-4 text-gray-500">Please wait while rendering...</td>
                                            </tr>
                                        ) : computers.data && computers.data.length > 0 ? (
                                                computers.data.map((computer) => (
                                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={computer.CID}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedComputers.includes(computer.CID)}
                                                                onChange={() => handleSelectComputer(computer.CID)}
                                                            />
                                                        </td>
                                                        <td className="px-3 py-2">{computer.CID}</td>
                                                        <th className="px-3 py-2 hover:underline hover:text-white text-nowrap">
                                                            <Link href="#" onClick={(e) => openModal(computer, e)}>
                                                                {computer.comp_name}
                                                            </Link>
                                                        </th>
                                                        <td className="px-3 py-2">
                                                            <img src={computer.img_path} alt="" style={{width: 60}} />
                                                        </td>
                                                        <td className="px-3 py-2">{computer.comp_type}</td>
                                                        <td className="px-3 py-2 font-bold text-slate-300">{computer.fullName}</td>
                                                        <td className="px-3 py-2">{computer.department_comp}</td>
                                                        <td className="px-3 py-2">{computer.comp_asset}</td>
                                                        <td className="px-3 py-2">{computer.comp_gen}</td>
                                                        <td className="px-3 py-2">{computer.comp_address}</td>
                                                        <td className="px-3 py-2 text-nowrap">
                                                            <span className={'px-2 rounded-e-full text-white ' + COMPUTERS_STATUS_CLASS_MAP[computer.comp_status]}>{COMPUTERS_STATUS_TEXT_MAP[computer.comp_status]}</span>
                                                        </td>
                                                        <td className="px-3 py-2 text-right text-nowrap">
                                                            <button 
                                                                className="inline-block py-1 px-2 text-green-500 hover:text-green-300 hover:scale-110 mx-1"
                                                                onClick={() => handlePrint(computer)}
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
                                                    <td className='font-medium text-base py-4' colSpan="17">No data available</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination  
                                links={computers.meta.links} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Show show={showModal} onClose={closeModal} user={selectedComp} />
            <CreateModalComponent show={showCreateModal} onClose={closeCreateModal} departmentsList={departmentsList.data} compUsersList={compUsersList.data} compUsersFnameList={compUsersFnameList.data}  />
            <EditModalComponent 
                show={showEditModal} 
                onClose={closeEditModal} 
                listDepartments={departmentsList.data}
                listCompUsers={compUsersList.data}
                listCompUsersFname={compUsersFnameList.data}
                selectedEditComp={selectedEditComp}
            />
    </AuthenticatedLayout>
  )
}

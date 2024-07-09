import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import { Modal, Button } from 'flowbite-react';
import { useState } from 'react'
// import ModalComponent from '@/Components/ModalComponent' -old component on show accountUser showModal
import Show from './Show'
import useModal from './hooks/useModal'
import useCreateModal from './hooks/useCreateModal'
import CreateModalComponent from './Create'
import EditModalComponent from './Edit'
import useEditModal from './hooks/useEditModal'

export default function Index({auth, accountUsers, departmentsList, queryParams = null, success}) {
    
    queryParams = queryParams || {}
    const { showModal, selectedUser, openModal, closeModal } = useModal();
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    const { showEditModal, openEditModal, closeEditModal } = useEditModal();
    
    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name] = value;
        }
        else{
            delete queryParams[name];
        }
        router.get(route('accountUsers.index'), queryParams)
    };

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;
        
        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = "desc";
            }
            else{
                queryParams.sort_direction = "asc";
            }
        }
        else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('accountUsers.index'), queryParams)
    };

    const deleteAccountUsers = (accountusers) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }
        router.delete(route('accountUsers.destroy', accountusers.account_id))
    };    
    
  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Employees</h2>
                <Button onClick={() => openCreateModal()} className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'>Add</Button>
            </div>
        }
    >
        <Head title="Employees" />
        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button onClick={() => router.get(route('accountUsers.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(accountUsers, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <div className="flex justify-end py-2">
                                    <div>
                                        <TextInput 
                                            className="w-full"
                                            defaultValue={queryParams.name} 
                                            placeholder="Employee Name"
                                            onBlur={e => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={ e => onKeyPress('name', e)} 
                                        />
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="account_id"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ACC_ID
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>
                                            <th className="px-3 py-3">Profile</th>
                                            <TableHeading
                                                name="department_users"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Department
                                            </TableHeading>
                                            <TableHeading
                                                name="initial"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Initials
                                            </TableHeading>
                                            <TableHeading
                                                name="status"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Status
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
                                            <th className="px-3 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput 
                                                    className="w-full text-sm h-8 py-1"
                                                    defaultValue={queryParams.status} 
                                                    onChange={ e => searchFieldChanged('status', e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Employed">Employed</option>
                                                    <option value="Resigned">Resigned</option>
                                                    <option value="Terminated">Terminated</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountUsers.data.map(accountusers => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={accountusers.account_id}>
                                                <td className="px-3 py-2">{accountusers.account_id}</td>
                                                <th className="px-3 py-2 hover:underline hover:text-white">
                                                    {/* <Link href={route("accountUsers.show", { account_id: accountusers.account_id })}>
                                                        {accountusers.name}
                                                    </Link> */}
                                                    <Link href="#" onClick={(e) => openModal(accountusers, e)}>
                                                        {accountusers.name}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2">
                                                    <img src={accountusers.profile_path} alt="" style={{width: 60}} />
                                                </td>
                                                <td className="px-3 py-2">{accountusers.department_users}</td>
                                                <td className="px-3 py-2">{accountusers.initial}</td>
                                                <td className="px-3 py-2">
                                                    <span className={'px-2 rounded-e-full text-white ' + ACCOUNTUSERS_STATUS_CLASS_MAP[accountusers.status]}>{ACCOUNTUSERS_STATUS_TEXT_MAP[accountusers.status]}</span>
                                                </td>
                                                <td className="px-3 py-2">{accountusers.createdBy.name}</td>
                                                <td className="px-3 py-2 text-nowrap">{accountusers.created_at}</td>
                                                <td className="px-3 py-2 text-right">
                                                    {/* <Link href={route('accountUsers.edit', accountusers.account_id)} className="font-medium inline-block py-1 px-2 rounded-lg  text-white  bg-blue-600 hover:bg-blue-700 mx-1">Edit</Link> */}
                                                    <button
                                                        className="font-medium inline-block py-1 px-2 rounded-lg  text-white  bg-blue-600 hover:bg-blue-700 mx-1" 
                                                        onClick={() => openEditModal()}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={(e) => deleteAccountUsers(accountusers)}
                                                        className="font-medium inline-block py-1 px-2 rounded-lg text-white bg-red-500 hover:bg-red-700 mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={accountUsers.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
            <Show show={showModal} onClose={closeModal} user={selectedUser} />
            <CreateModalComponent show={showCreateModal} onClose={closeCreateModal} departmentsList={departmentsList.data} />
            <EditModalComponent 
                show={showEditModal} 
                onClose={closeEditModal} 
                listDepartments={departmentsList.data}
                accountUsersEdit={accountUsers}

            />

    </AuthenticatedLayout>
  )
}

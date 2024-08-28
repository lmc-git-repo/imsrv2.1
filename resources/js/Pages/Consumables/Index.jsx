import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PHONES_STATUS_CLASS_MAP, PHONES_STATUS_TEXT_MAP, TABLETS_STATUS_CLASS_MAP, TABLETS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import { Modal, Button } from 'flowbite-react';
import { useState } from 'react'

import useModal from './hooks/useModal'
import useCreateModal from './hooks/useCreateModal'
import useEditModal from './hooks/useEditModal'
import Show from './Show'
import CreateModalComponent from './Create'
import EditModalComponent from './Edit'

export default function Index({auth, consumables, departmentsList, consumablesUsersFnameList, queryParams = null, success}) {
    
    queryParams = queryParams || {}
    const { showModal, selectedConsumables, openModal, closeModal } = useModal();
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    const { showEditModal, selectedEditConsumables, openEditModal, closeEditModal } = useEditModal();
    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name] = value;
        }
        else{
            delete queryParams[name];
        }
        router.get(route('consumables.index'), queryParams)
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
        router.get(route('consumables.index'), queryParams)
    };

    const deleteConsumables = (consumable) => {
        if (!window.confirm('Are you sure you want to delete this Consumable?')) {
            return;
        }
        router.delete(route('consumables.destroy', consumable.consumables_id))
    };    
    
  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Consumables</h2>
                {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                    <Button 
                        onClick={() => openCreateModal()} 
                        className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                    >
                        <span className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                            </svg>
                            Add
                        </span>
                    </Button>
                )}
            </div>
        }
    >
        <Head title="Consumables" />
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
                            <button onClick={() => router.get(route('consumables.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(consumables, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <div className="flex justify-start py-2">
                                    <div>
                                        <TextInput 
                                            className="w-full"
                                            defaultValue={queryParams.search} 
                                            placeholder="PO / SI / Name"
                                            onBlur={e => searchFieldChanged('search', e.target.value)}
                                            onKeyPress={ e => onKeyPress('search', e)} 
                                        />
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="consumables_id"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ConID
                                            </TableHeading>
                                            <TableHeading
                                                name="po_num"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                PO NO
                                            </TableHeading>

                                            {/* <TableHeading
                                                name="serial_no"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Serial No
                                            </TableHeading> */}

                                            <th className="px-3 py-3">IMG</th>
                                            <TableHeading
                                                name="si_code"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                SI Code
                                            </TableHeading>
                                            <TableHeading
                                                name="brand"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Brand
                                            </TableHeading>
                                            {/* <TableHeading
                                                name="model"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Model
                                            </TableHeading> */}
                                            {/* <TableHeading
                                                name="storage_capacity"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Storage Capacity
                                            </TableHeading> */}

                                            <TableHeading
                                                name="qty"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                QTY
                                            </TableHeading>

                                            <TableHeading
                                                name="price"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Price
                                            </TableHeading>

                                            <TableHeading
                                                name="total"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Total
                                            </TableHeading>

                                            <TableHeading
                                                name="dateIssued"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Date Issued
                                            </TableHeading>
                                            
                                            {/* <TableHeading
                                                name="installedTo"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Installed To
                                            </TableHeading> */}

                                            <TableHeading
                                                name="deliveryRecieptDate"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Delivery Date
                                            </TableHeading>

                                            <TableHeading
                                                name="department_consumables"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Department
                                            </TableHeading>
                                            
                                            {/* <TableHeading
                                                name="remarks"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Remarks
                                            </TableHeading> */}
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
                                        {consumables.data ? (
                                                consumables.data.map(consumable => (
                                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={consumable.consumables_id}>
                                                        <td className="px-3 py-2">{consumable.consumables_id}</td>
                                                        <th className="px-3 py-2 hover:underline hover:text-white text-nowrap">
                                                            {/* <Link href={route("consumables.show", { consumables_id: consumable.consumables_id })}>
                                                                {consumable.po_num}
                                                            </Link> */}
                                                            <Link href="#" onClick={(e) => openModal(consumable, e)}>
                                                                {consumable.po_num}
                                                            </Link>
                                                        </th>
                                                        {/* <td className="px-3 py-2">{consumable.serial_no}</td> */}
                                                        <td className="px-3 py-2">
                                                            <img src={consumable.img_path} alt="" style={{width: 60}} />
                                                        </td>
                                                        <td className="px-3 py-2">{consumable.si_code}</td>
                                                        <td className="px-3 py-2">{consumable.brand}</td>
                                                        {/* <td className="px-3 py-2">{consumable.model}</td> */}
                                                        {/* <td className="px-3 py-2">{consumable.storage_capacity}</td> */}
                                                        <td className="px-3 py-2">{consumable.qty}</td>
                                                        <td className="px-3 py-2 text-nowrap">{'₱ ' + consumable.price}</td>
                                                        <td className="px-3 py-2 text-nowrap">{'₱ ' + consumable.total}</td>
                                                        <td className="px-3 py-2">{consumable.dateIssued}</td>
                                                        {/* <td className="px-3 py-2">{consumable.installedTo}</td> */}
                                                        <td className="px-3 py-2">{consumable.deliveryRecieptDate}</td>
                                                        <td className="px-3 py-2">{consumable.department_consumables}</td>
                                                        {/* <td className="px-3 py-2">{consumable.remarks}</td> */}
                                                        <td className="px-3 py-2">{consumable.createdBy.name}</td>
                                                        <td className="px-3 py-2 text-nowrap">{consumable.created_at}</td>
                                                        <td className="px-3 py-2 text-right text-nowrap">
                                                            {/* <Link href={route('consumables.edit', consumable.consumables_id)} className="font-medium inline-block py-1 px-2 rounded-lg  text-white  bg-blue-600 hover:bg-blue-700 mx-1">Edit</Link> */}
                                                            <button
                                                                className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1"
                                                                onClick={(e) => openModal(consumable, e)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg>
                                                            </button>
                                                            {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                                <button
                                                                    className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1" 
                                                                    onClick={() => openEditModal(consumable)}
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
                                                                    onClick={(e) => deleteConsumables(consumable)}
                                                                    className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1"
                                                                >
                                                                    <span className='flex items-center justify-center'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="17">No data available</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={consumables.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
            <Show show={showModal} onClose={closeModal} user={selectedConsumables} />
            <CreateModalComponent show={showCreateModal} onClose={closeCreateModal} departmentsList={departmentsList.data} consumablesUsersFnameList={consumablesUsersFnameList.data}  />
            <EditModalComponent 
                show={showEditModal} 
                onClose={closeEditModal} 
                listDepartments={departmentsList.data}
                listConsumablesUsersFname={consumablesUsersFnameList.data}
                selectedEditConsumables={selectedEditConsumables}
            />
    </AuthenticatedLayout>
  )
}

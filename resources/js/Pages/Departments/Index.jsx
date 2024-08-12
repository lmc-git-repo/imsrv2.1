import Pagination from '@/Components/Pagination'
// import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
// import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import useModal from './hooks/useModal'
import useCreateModal from './hooks/useCreateModal'
import useEditModal from './hooks/useEditModal'
import { Button } from 'flowbite-react'
import Show from './Show'
import CreateModalComponent from './Create'
import EditModalComponent from './Edit'

export default function Index({auth, departments, queryParams = null, success}) {
    
    queryParams = queryParams || {}
    const { showModal, selected, openModal, closeModal } = useModal();
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    // const { showEditModal, selectedEdit, openEditModal, closeEditModal } = useEditModal();
    const searchFieldChanged = (dept_list, value) =>{
        if(value){
            queryParams[dept_list] = value;
        }
        else{
            delete queryParams[dept_list];
        }
        router.get(route('departments.index'), queryParams)
    };

    const onKeyPress = (dept_list, e) => {
        if(e.key !== 'Enter') return;
        
        searchFieldChanged(dept_list, e.target.value);
    }

    const sortChanged = (dept_list) => {
        if(dept_list === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = "desc";
            }
            else{
                queryParams.sort_direction = "asc";
            }
        }
        else{
            queryParams.sort_field = dept_list;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('departments.index'), queryParams)
    }

    const deleteData = (department) => {
        if (!window.confirm('Are you sure you want to delete this Department?')) {
            return;
        }
        router.delete(route('departments.destroy', department.dept_id))
    };
     


  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Departments</h2>
                <Button 
                    onClick={() => openCreateModal()} 
                    className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                >
                    <span className='flex items-center'>
                        Add
                    </span>
                </Button>
            </div>
        }
    >
        <Head title="Departments" />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button onClick={() => router.get(route('departments.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(departments, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <div className="flex justify-end py-2">
                                    <div>
                                        <TextInput 
                                            className="w-full"
                                            defaultValue={queryParams.dept_list} 
                                            placeholder="Department Name"
                                            onBlur={e => searchFieldChanged('dept_list', e.target.value)}
                                            onKeyPress={ e => onKeyPress('dept_list', e)} 
                                        />
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="dept_id"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                DEPT ID
                                            </TableHeading>
                                            <TableHeading
                                                name="dept_list"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                DEPARTMENT NAME
                                            </TableHeading>
                                            <TableHeading
                                                name="created_by"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                CREATED BY
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                DATE CREATED
                                            </TableHeading>
                                            <th className="px-3 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {departments.data.map(department => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={department.dept_id}>
                                                <td className="px-3 py-2">{department.dept_id}</td>
                                                <td className="px-3 py-2">{department.dept_list}</td>
                                                <td className="px-3 py-2">{department.createdBy.name}</td>
                                                <td className="px-3 py-2 text-nowrap">{department.created_at}</td>
                                                <td className="px-3 py-2 text-right">
                                                    <button
                                                        className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1"
                                                        onClick={(e) => openModal(department, e)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={(e) => deleteData(department)}
                                                        className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1"
                                                    >
                                                        <span className='flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={departments.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
            <Show show={showModal} onClose={closeModal} user={selected} />
            <CreateModalComponent show={showCreateModal} onClose={closeCreateModal}  />
    </AuthenticatedLayout>
  )
}
import Pagination from '@/Components/Pagination'
// import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
// import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import useModal from '../../Components/hooks/useModal'
import useCreateModal from '../../Components/hooks/useCreateModal'
import useEditModal from '../../Components/hooks/useEditModal'
import { Button } from 'flowbite-react'
import Show from './Show'
import CreateModalComponent from './Create'
import EditModalComponent from './Edit'

export default function Index({auth, users, queryParams = null, success}) {
    
    queryParams = queryParams || {}
    const { showModal, selected, openModal, closeModal } = useModal();
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    const { showEditModal, selectedEdit, openEditModal, closeEditModal } = useEditModal();
    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name] = value;
        }
        else{
            delete queryParams[name];
        }
        router.get(route('user.index'), queryParams)
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
        router.get(route('user.index'), queryParams)
    }

    const deleteData = (user) => {
        if (!window.confirm('Are you sure you want to delete this User?')) {
            return;
        }
        router.delete(route('user.destroy', user.id))
    };
     


  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Users</h2>
                {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                    <Button 
                        onClick={() => openCreateModal()} 
                        className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                    >
                        <span className='flex items-center'>
                            Add
                        </span>
                    </Button>
                )}
            </div>
        }
    >
        <Head title="Users" />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-slate-800 dark:border-green-800" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button onClick={() => router.get(route('user.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <div className="flex justify-start py-2">
                                    <div>
                                        <TextInput 
                                            className="w-full"
                                            defaultValue={queryParams.name} 
                                            placeholder="User Name"
                                            onBlur={e => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={ e => onKeyPress('name', e)} 
                                        />
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                USER NAME
                                            </TableHeading>

                                            <TableHeading
                                                name="email"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                EMAIL
                                            </TableHeading>

                                            <TableHeading
                                                name="role"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ROLE
                                            </TableHeading>

                                            {/* <TableHeading
                                                name="created_by"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                CREATED BY
                                            </TableHeading> */}
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                DATE CREATED
                                            </TableHeading>
                                            <th className="px-3 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {users.data.map(user => (
                                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={user.id}>
                                                <td className="px-3 py-2">{user.id}</td>
                                                <th className="px-3 py-2 hover:underline hover:text-white text-nowrap">
                                                    <Link href="#" onClick={(e) => openModal(user, e)}>
                                                        {user.name}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2">{user.email}</td>
                                                <td className="px-3 py-2">{user.role}</td>
                                                {/* <td className="px-3 py-2">{user.createdBy.name}</td> */}
                                                <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                                                <td className="px-3 py-2 text-center text-nowrap">
                                                    {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                        <button
                                                            className="inline-block py-1 px-2  text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1" 
                                                            onClick={() => openEditModal(user)}
                                                        >
                                                            <span className='flex items-center justify-center'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    )}
                                                    {/* Conditionally render the delete button */}
                                                    {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                        <button 
                                                            onClick={() => deleteData(user)}
                                                            className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1"
                                                        >
                                                            <span className='flex items-center justify-center'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m0 0L7.5 3.373A2.25 2.25 0 0 1 9.621 1.5h4.758a2.25 2.25 0 0 1 2.122 1.873L17.23 5.79m-10.953.562L5.84 19.673a2.25 2.25 0 0 0 2.244 2.077h7.832a2.25 2.25 0 0 0 2.244-2.077L18.16 5.79m-10.953.562a48.12 48.12 0 0 1 6.553 0" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
            <Show show={showModal} onClose={closeModal} user={selected} />
            <CreateModalComponent show={showCreateModal} onClose={closeCreateModal}  />
            <EditModalComponent 
                show={showEditModal} 
                onClose={closeEditModal} 
                selectedEdit={selectedEdit}
            />
    </AuthenticatedLayout>
  )
}
import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from '@/Components/TableHeading'

export default function Index({auth, accountUsers, queryParams = null}) {
    
    queryParams = queryParams || {}
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
    }
     


  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Employees</h2>}
    >
        <Head title="Employees" />
        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(accountUsers, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
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
                                            <th className="px-3 py-3">
                                                <TextInput 
                                                    className="w-full"
                                                    defaultValue={queryParams.name} 
                                                    placeholder="Employee Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={ e => onKeyPress('name', e)} 
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput 
                                                    className="w-full"
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
                                                <td className="px-3 py-2">{accountusers.name}</td>
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
                                                    <Link href={route('accountUsers.edit', accountusers.account_id)} className="font-medium inline-block py-1 px-2 rounded-lg  text-white  bg-blue-600 hover:bg-blue-700 mx-1">Edit</Link>
                                                    <Link href={route('accountUsers.destroy', accountusers.account_id)} className="font-medium inline-block py-1 px-2 rounded-lg text-white bg-red-500 hover:bg-red-700 mx-1">Delete</Link>
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
    </AuthenticatedLayout>
  )
}

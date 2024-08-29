import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'

import { Head } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import PublicLayout from '@/Layouts/PublicLayout'

export default function Index({accountUsers, queryParams = null}) {
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name] = value;
        }
        else{
            delete queryParams[name];
        }
        router.get(route('public-view'), queryParams)
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
        router.get(route('public-view'), queryParams)
    };
    
    
  return (
    <PublicLayout>   
        <div className='flex justify-between items-center'>
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Employees</h2>
        </div>
        <Head title="Employees Email" />
        <div className="py-12">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {/* <pre>{JSON.stringify(accountUsers, undefined, 2)}</pre> */}
                        <div className="overflow-auto">
                            <div className="flex justify-start py-2">
                                <div>
                                    <TextInput 
                                        className="w-full"
                                        defaultValue={queryParams.search} 
                                        placeholder="Employee Name"
                                        onBlur={e => searchFieldChanged('search', e.target.value)}
                                        onKeyPress={ e => onKeyPress('search', e)} 
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
                                            name="outlookEmail"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Email
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountUsers?.data?.map(accountusers => (
                                        <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={accountusers.account_id}>
                                            <td className="px-3 py-2">{accountusers.account_id}</td>
                                            <th className="px-3 py-2 hover:underline hover:text-white">
                                                {/* <Link href="#" onClick={(e) => openModal(accountusers, e)}>
                                                    {accountusers.name}
                                                </Link> */}
                                                {accountusers.name}
                                            </th>
                                            <td className="px-3 py-2">
                                                <img src={accountusers.profile_path} alt="" style={{width: 60}} />
                                            </td>
                                            <td className="px-3 py-2">{accountusers.department_users}</td>
                                            <td className="px-3 py-2">{accountusers.initial}</td>
                                            <td className="px-3 py-2">{accountusers.outlookEmail}</td>
                                            <td className="px-3 py-2">
                                                <span className={'px-2 rounded-e-full text-white ' + ACCOUNTUSERS_STATUS_CLASS_MAP[accountusers.status]}>{ACCOUNTUSERS_STATUS_TEXT_MAP[accountusers.status]}</span>
                                            </td>
                                            <td className="px-3 py-2">{accountusers.createdBy.name}</td>
                                            <td className="px-3 py-2 text-nowrap">{accountusers.created_at}</td>
                                        </tr>
                                    )) || (
                                        <tr>
                                            <td colSpan="9" className="px-3 py-2 text-center">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* <Pagination links={accountUsers.meta.links} /> */}
                        <Pagination links={accountUsers?.meta?.links || []} />
                    </div>
                </div>
            </div>
        </div>

    </PublicLayout>
  )
}

import Pagination from '@/Components/Pagination'
// import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
// import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'

export default function Index({auth, departments, queryParams = null}) {
    
    queryParams = queryParams || {}
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
     


  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Department</h2>}
    >
        <Head title="Departments" />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                    <Link href={route('departments.edit', department.dept_id)} className="font-medium inline-block py-1 px-2 rounded-lg  text-white  bg-blue-600 hover:bg-blue-700 mx-1">Edit</Link>
                                                    <Link href={route('departments.destroy', department.dept_id)} className="font-medium inline-block py-1 px-2 rounded-lg text-white bg-red-500 hover:bg-red-700 mx-1">Delete</Link>
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
    </AuthenticatedLayout>
  )
}
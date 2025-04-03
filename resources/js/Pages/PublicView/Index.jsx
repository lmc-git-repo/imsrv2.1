import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'

import { Head, Link, router } from '@inertiajs/react'
import TableHeading from '@/Components/TableHeading'
import PublicLayout from '@/Layouts/PublicLayout'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'

export default function Index({employees, queryParams = null}) {
    queryParams = queryParams || {}
    const [searchQuery, setSearchQuery] = useState(queryParams.search || '');

    // Handle search query change with debouncing to improve performance
    const handleSearchChange = useMemo(() =>
        debounce((query) => {
    
          setSearchQuery(query);
    
          router.get(
            route('public.view'),
            {
              ...queryParams,
              search: query,
              
              page: 1
            },
            {preserveState: true, preserveScroll: true}
          )
        }, 300), [queryParams]); // need to add dependency for queryParams changes
    //end

    const handleFilterChange = useCallback((name, value) => {
        router.get(
          route('public.view'),
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
    }, [searchQuery]);

    const handleSelectChange = (name, value) => {
        setLoading(true);
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
        router.get(route('public.view'), queryParams, { preserveScroll: true });
    };
    
    
  return (
    <PublicLayout>   
        <div className='flex justify-between items-center'>
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Employees </h2>
            <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 hover:scale-110">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
            </Link>
        </div>
        <Head title="Employees Email" />
        <div className="py-12">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {/* <pre>{JSON.stringify(employees, undefined, 2)}</pre> */}
                        <div className="overflow-auto">
                            <div className="flex justify-start py-2">
                                <div>
                                    <TextInput 
                                        className="w-full"
                                        defaultValue={searchQuery} 
                                        placeholder="Employee Name"
                                        onBlur={e => searchFieldChanged(e.target.value)}
                                        onChange={(e) => searchFieldChanged(e.target.value)}
                                        onKeyPress={e => onKeyPress(e)}
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
                                            name="outlookEmail"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Email
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr className="text-center">
                                            <td colSpan="17" className="py-4 text-gray-500">Please wait while rendering...</td>
                                        </tr>
                                    ) : employees.data && employees?.data?.length > 0 ? (
                                        employees.data.map(employee => (
                                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={employee.account_id}>
                                                <td className="px-3 py-2">{employee.account_id}</td>
                                                <th className="px-3 py-2 hover:underline hover:text-white">
                                                    {/* <Link href="#" onClick={(e) => openModal(employee, e)}>
                                                        {employee.name}
                                                    </Link> */}
                                                    {employee.name}
                                                </th>
                                                <td className="px-3 py-2">
                                                    <img src={employee.profile_path} alt="" style={{width: 60}} />
                                                </td>
                                                <td className="px-3 py-2">{employee.department_users}</td>
                                                <td className="px-3 py-2">{employee.outlookEmail}</td>
                                                {/* <td className="px-3 py-2">
                                                    <span className={'px-2 rounded-e-full text-white ' + ACCOUNTUSERS_STATUS_CLASS_MAP[employee.status]}>{ACCOUNTUSERS_STATUS_TEXT_MAP[employee.status]}</span>
                                                </td> */}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className='text-center'>
                                            <td className='font-medium text-base py-4' colSpan="9">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination 
                            links={employees?.meta?.links || []}
                            queryParams={{
                                search: searchQuery,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>

    </PublicLayout>
  )
}

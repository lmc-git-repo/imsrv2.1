import Pagination from '@/Components/Pagination'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link } from '@inertiajs/react'

export default function Index({auth, accountUsers}) {
  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Employees</h2>}
    >
        <Head title="Employees" />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(accountUsers, undefined, 2)}</pre> */}
                            
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ACC_ID</th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Profile</th>
                                        <th className="px-3 py-3">Department</th>
                                        <th className="px-3 py-3">Initial</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3">Created Date</th>
                                        <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput />
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
                            <Pagination links={accountUsers.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
  )
}

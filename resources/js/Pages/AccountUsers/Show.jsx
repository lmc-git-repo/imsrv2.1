import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({accountUsers, auth}) {
  return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {`Account User "${accountUsers.name}"`}
            </h2>
        }
        >
        <Head title={`Account User ${accountUsers.name}`} />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Account User Details
                </h3>
                <div className="mt-5">
                    <p><strong>Account ID:</strong> {accountUsers.account_id}</p>
                    <p><strong>Name:</strong> {accountUsers.name}</p>
                    <p><strong>Department:</strong> {accountUsers.department_users}</p>
                    <p><strong>Initials:</strong> {accountUsers.initial}</p>
                    <p><strong>Status:</strong> {accountUsers.status}</p>
                    <p><strong>Created By:</strong> {accountUsers.createdBy.name}</p>
                    <p><strong>Created At:</strong> {accountUsers.created_at}</p>
                    <img src={accountUsers.profile_path} alt={`${accountUsers.name}'s profile`} className="mt-3" />
                </div>
                <Link href={route('accountUsers.index')} className="mt-3 text-blue-500 hover:underline">
                    Back to List
                </Link>
                </div>
            </div>
            </div>
        </div>

        
    </AuthenticatedLayout>
  )
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import useCreateModal from '@/Components/hooks/useCreateModal'
import useEditModal from '@/Components/hooks/useEditModal'
import Create from './Create'
import Edit from './Edit'
import Pagination from '@/Components/Pagination'
import TextInput from '@/Components/TextInput'
import SelectInput from '@/Components/SelectInput'
import { useState } from 'react'

export default function Index({ auth, tv, success, queryParams = null }) {
    const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();
    const { showEditModal, selectedEdit, openEditModal, closeEditModal } = useEditModal();

    queryParams = queryParams || {};

    const [filters, setFilters] = useState({
        search: queryParams.search || '',
        status: queryParams.status || '',
    });

    const deleteTV = (item) => {
        if (!confirm('Delete this TV?')) return;
        router.delete(route('tv.destroy', item.TID));
    };

    const applyFilters = (nextFilters) => {
        setFilters(nextFilters);

        router.get(
            route('tv.index'),
            {
                ...queryParams,
                ...nextFilters,
                page: 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSearchChange = (value) => {
        const nextFilters = {
            ...filters,
            search: value,
        };

        applyFilters(nextFilters);
    };

    const handleStatusChange = (value) => {
        const nextFilters = {
            ...filters,
            status: value,
        };

        applyFilters(nextFilters);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Television List
                    </h2>

                    <div className='flex gap-2'>
                        <Button
                            onClick={() => openCreateModal()}
                            className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                        >
                            <span className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v9A2.25 2.25 0 0 1 18.75 16.5H5.25A2.25 2.25 0 0 1 3 14.25v-9Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21h7.5M12 16.5V21" />
                                </svg>
                                Add
                            </span>
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title="TV" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">

                    {success && (
                        <div className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-slate-800 dark:border-green-800">
                            {success}
                        </div>
                    )}

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="overflow-auto">

                                <div className="w-[1000px] md:w-full lg:w-auto flex justify-between items-center py-2 gap-2">
                                    <div>
                                        <TextInput
                                            className="w-full"
                                            placeholder="TV"
                                            value={filters.search}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <SelectInput
                                            className="w-full text-sm h-8 py-1"
                                            value={filters.status}
                                            onChange={(e) => handleStatusChange(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Deployed">Deployed</option>
                                            <option value="Spare">Spare</option>
                                            <option value="For Disposal">For Disposal</option>
                                            <option value="Borrow">Borrow</option>
                                        </SelectInput>
                                    </div>
                                </div>

                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">Brand</th>
                                            <th className="px-3 py-3">Model</th>
                                            <th className="px-3 py-3">Asset Tag</th>
                                            <th className="px-3 py-3">Location</th>
                                            <th className="px-3 py-3">Serial Number</th>
                                            <th className="px-3 py-3">Status</th>
                                            <th className="px-3 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {(tv?.data || []).length > 0 ? (
                                            tv.data.map(item => (
                                                <tr key={item.TID} className="bg-white border-b dark:bg-slate-800 dark:border-gray-700">

                                                    <td className="px-3 py-2">{item.brand}</td>
                                                    <td className="px-3 py-2">{item.model}</td>
                                                    <td className="px-3 py-2">{item.asset_tag}</td>
                                                    <td className="px-3 py-2">{item.location}</td>
                                                    <td className="px-3 py-2">{item.serial_number}</td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        <span className={`px-2 rounded-e-full text-white
                                                            ${item.status === 'Deployed' ? 'bg-green-600' : ''}
                                                            ${item.status === 'Spare' ? 'bg-yellow-500' : ''}
                                                            ${item.status === 'For Disposal' ? 'bg-red-500' : ''}
                                                            ${item.status === 'Borrow' ? 'bg-blue-500' : ''}
                                                        `}>
                                                            {item.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-3 py-2 text-center text-nowrap">
                                                        <button
                                                            className="inline-block py-1 px-2 text-blue-500 hover:text-blue-300 hover:scale-110 hover:animate-spin mx-1"
                                                            onClick={(e) => { e.stopPropagation(); openEditModal(item); }}
                                                        >
                                                            <span className='flex items-center justify-center'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                            </span>
                                                        </button>

                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); deleteTV(item); }}
                                                            className="inline-block py-1 px-2 text-red-500 hover:text-red-700 hover:scale-110 hover:animate-bounce mx-1"
                                                        >
                                                            <span className='flex items-center justify-center'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.108 0 0 0-7.5 0" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className='text-center'>
                                                <td className='font-medium text-base py-4' colSpan="7">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>

                            <Pagination links={tv?.meta?.links || []} />

                        </div>
                    </div>

                </div>
            </div>

            <Create show={showCreateModal} onClose={closeCreateModal} />
            <Edit show={showEditModal} onClose={closeEditModal} selected={selectedEdit} />

        </AuthenticatedLayout>
    )
}
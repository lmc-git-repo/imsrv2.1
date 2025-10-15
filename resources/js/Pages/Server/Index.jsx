import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { debounce } from 'lodash';
import ShowServer from './Show';
import CreateServer from './Create';
import EditServer from './Edit';

export default function Index({
    auth,
    servers,
    queryParams = null,
    success
}) {
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const openModal = (server, e) => {
        e.preventDefault();
        setSelected(server);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelected(null);
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const openEditModal = (server) => {
        setSelectedEdit(server);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setSelectedEdit(null);
        setShowEditModal(false);
    };

    queryParams = queryParams || {};
    const [searchQuery, setSearchQuery] = useState(queryParams.search || '');

    const handleSearchChange = debounce((query) => {
        setSearchQuery(query);
        router.get(
            route('server.index'),
            {
                ...queryParams,
                search: query,
                page: 1
            },
            { preserveState: true, preserveScroll: true }
        );
    }, 300);

    const searchFieldChanged = (value) => {
        handleSearchChange(value);
    };

    const onKeyPress = (e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('server.index'), queryParams, { preserveScroll: true });
    };

    const deleteServer = (server) => {
        if (!window.confirm('Are you sure you want to delete this Server?')) {
            return;
        }
        router.delete(route('server.destroy', server.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">List of Servers</h2>
                    <div className='flex justify-end'>
                        {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                            <Button
                                id="add-server-button"
                                onClick={openCreateModal}
                                className='bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600'
                                aria-label="Add new server"
                            >
                                <span className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v3.75H3.75V3.75zm0 6.75h16.5v3.75H3.75V10.5zm0 6.75h16.5v3.75H3.75V17.25z" />
                                    </svg>
                                    Add
                                </span>
                            </Button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Servers" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-slate-800 dark:border-green-800" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button onClick={() => router.get(route('server.index'))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-gray-700" aria-label="Close">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <TextInput
                                            id="server-search"
                                            name="server-search"
                                            className="w-full"
                                            defaultValue={searchQuery}
                                            placeholder="Search..."
                                            onBlur={e => searchFieldChanged(e.target.value)}
                                            onChange={(e) => searchFieldChanged(e.target.value)}
                                            onKeyPress={onKeyPress}
                                        />
                                    </div>
                                </div>

                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading name="device_name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Device Name</TableHeading>
                                            <TableHeading name="ip_address" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>IP Address</TableHeading>
                                            <TableHeading name="username" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Username</TableHeading>
                                            <TableHeading name="password" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Password</TableHeading>
                                            <TableHeading name="switch_connected" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Switch Connected</TableHeading>
                                            <TableHeading name="port_number" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Port Number</TableHeading>
                                            <th className="px-3 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servers.data && servers.data.length > 0 ? (
                                            servers.data.map(server => (
                                                <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700" key={server.id}>
                                                    <th className="px-3 py-2 text-nowrap">
                                                        <button
                                                            id={`view-server-${server.id}`}
                                                            className="text-left hover:text-white hover:underline cursor-pointer"
                                                            onClick={(e) => openModal(server, e)}
                                                            aria-label={`View ${server.device_name} details`}
                                                        >
                                                            {server.device_name}
                                                        </button>
                                                    </th>
                                                    <td className="px-3 py-2">{server.ip_address}</td>
                                                    <td className="px-3 py-2">{server.username || 'N/A'}</td>
                                                    <td className="px-3 py-2">{server.password || 'N/A'}</td>
                                                    <td className="px-3 py-2">{server.switch_connected || 'N/A'}</td>
                                                    <td className="px-3 py-2">{server.port_number || 'N/A'}</td>
                                                    <td className="px-3 py-2 text-center text-nowrap">
                                                        {(auth.user.role === 'super admin' || auth.user.role === 'admin') && (
                                                            <>
                                                                <button
                                                                    className="inline-block py-1 px-2 text-blue-500 hover:text-white hover:underline hover:scale-110 hover:animate-spin mx-1"
                                                                    onClick={() => openEditModal(server)}
                                                                    aria-label={`Edit ${server.device_name}`}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={(e) => deleteServer(server)}
                                                                    className="inline-block py-1 px-2 text-red-500 hover:text-white hover:underline hover:scale-110 hover:animate-bounce mx-1"
                                                                    aria-label={`Delete ${server.device_name}`}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className='text-center'>
                                                <td className='font-medium text-base py-4' colSpan="7">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={servers.meta.links}
                                queryParams={{ search: searchQuery }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ShowServer show={showModal} onClose={closeModal} server={selected} />
            <CreateServer show={showCreateModal} onClose={closeCreateModal} />
            <EditServer show={showEditModal} onClose={closeEditModal} selectedServer={selectedEdit} />
        </AuthenticatedLayout>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-4 gap-2">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-green-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-600 text-xl font-semibold'>Operationals</h3>
                            {/* <p>{totalOperationals}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-amber-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-amber-600 text-xl font-semibold'>Users</h3>
                            {/* <p>{totalUsers}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-gray-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-400 text-xl font-semibold'>Spare Computers</h3>
                            {/* <p>{totalSpareComputers}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-sky-600 text-xl font-semibold'>Desktop</h3>
                            {/* <p>{totalDesktop}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-sky-600 text-xl font-semibold'>Laptop</h3>
                            {/* <p>{totalLaptop}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-sky-600 text-xl font-semibold'>Tablets</h3>
                            {/* <p>{totalTablets}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-sky-600 text-xl font-semibold'>Phones</h3>
                            {/* <p>{totalPhones}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>N/A and Celeron</h3>
                            {/* <p>{totalNACeleron}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>Pentium</h3>
                            {/* <p>{totalPentium}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>3rd Gen</h3>
                            {/* <p>{total3rdGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>4th Gen</h3>
                            {/* <p>{total4thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>5th Gen</h3>
                            {/* <p>{total5thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>6th Gen</h3>
                            {/* <p>{total6thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>7th Gen</h3>
                            {/* <p>{total7thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-yellow-400 text-xl font-semibold'>8th Gen</h3>
                            {/* <p>{total8thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-yellow-400 text-xl font-semibold'>9th Gen</h3>
                            {/* <p>{total9thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-yellow-400 text-xl font-semibold'>10th Gen</h3>
                            {/* <p>{total10thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-yellow-400 text-xl font-semibold'>11th Gen</h3>
                            {/* <p>{total11thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-yellow-400 text-xl font-semibold'>12th Gen</h3>
                            {/* <p>{total12thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-green-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-400 text-xl font-semibold'>13th Gen</h3>
                            {/* <p>{total13thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-gray-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-400 text-xl font-semibold'>Total Laptop (Pentium - 7th Generation)</h3>
                            {/* <p>{totalLaptopPentium7thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-gray-400">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-400 text-xl font-semibold'>Total Desktop (Pentium - 7th Generation)</h3>
                            {/* <p>{totalDesktopPentium7thGen}</p> */}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-600 text-xl font-semibold'>DISPOSED/DISPOSAL</h3>
                            {/* <p>{totalDisposedDisposal}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

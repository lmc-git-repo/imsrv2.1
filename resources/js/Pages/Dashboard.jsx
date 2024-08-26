// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard({ 
//     auth, totalOperationals, totalUsers, totalSpareUnits, totalDesktops, totalLaptops, totalTablets, totalPhones,
//     totalNACeleron,totalPentium,total3rdGen,total4thGen,total5thGen,total6thGen,total7thGen,total8thGen,
//     total9thGen,total10thGen,total11thGen,total12thGen,total13thGen,totalDesktopPentiumto7thGen,
//     totalLaptopPentiumto7thGen,totalDisposedOrDisposal
//  }) {
//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-4 gap-2">
//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-green-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-green-600 text-xl font-semibold'>Operationals</h3>
//                             <p>{totalOperationals}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-amber-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-amber-600 text-xl font-semibold'>Users</h3>
//                             <p>{totalUsers}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-gray-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-gray-400 text-xl font-semibold'>Spare Computers</h3>
//                             <p>{totalSpareUnits}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-sky-600 text-xl font-semibold'>Desktop</h3>
//                             <p>{totalDesktops}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-sky-600 text-xl font-semibold'>Laptop</h3>
//                             <p>{totalLaptops}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-sky-600 text-xl font-semibold'>Tablets</h3>
//                             <p>{totalTablets}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-sky-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-sky-600 text-xl font-semibold'>Phones</h3>
//                             <p>{totalPhones}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>N/A and Celeron</h3>
//                             <p>{totalNACeleron}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>Pentium</h3>
//                             <p>{totalPentium}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>3rd Gen</h3>
//                             <p>{total3rdGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>4th Gen</h3>
//                             <p>{total4thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>5th Gen</h3>
//                             <p>{total5thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>6th Gen</h3>
//                             <p>{total6thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>7th Gen</h3>
//                             <p>{total7thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-yellow-400 text-xl font-semibold'>8th Gen</h3>
//                             <p>{total8thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-yellow-400 text-xl font-semibold'>9th Gen</h3>
//                             <p>{total9thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-yellow-400 text-xl font-semibold'>10th Gen</h3>
//                             <p>{total10thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-yellow-400 text-xl font-semibold'>11th Gen</h3>
//                             <p>{total11thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-yellow-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-yellow-400 text-xl font-semibold'>12th Gen</h3>
//                             <p>{total12thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-green-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-green-400 text-xl font-semibold'>13th Gen</h3>
//                             <p>{total13thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-gray-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-gray-400 text-xl font-semibold'>Total Laptop (Pentium - 7th Generation)</h3>
//                             <p>{totalLaptopPentiumto7thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-gray-400">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-gray-400 text-xl font-semibold'>Total Desktop (Pentium - 7th Generation)</h3>
//                             <p>{totalDesktopPentiumto7thGen}</p>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-red-600">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <h3 className='text-red-600 text-xl font-semibold'>DISPOSED/DISPOSAL</h3>
//                             <p>{totalDisposedOrDisposal}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Reusable Card Component
const Card = ({ title, value = 0, color, textColor }) => (
    <div className={`bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 ${color}`}>
        <div className="p-6 text-gray-900 dark:text-gray-100">
            <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

export default function Dashboard({ 
    auth, 
    totalOperationals, totalUsers, totalSpareUnits, totalDesktops, totalLaptops, totalTablets, totalPhones,
    totalNACeleron, totalPentium, total3rdGen, total4thGen, total5thGen, total6thGen, total7thGen, total8thGen,
    total9thGen, total10thGen, total11thGen, total12thGen, total13thGen, totalDesktopPentiumto7thGen,
    totalLaptopPentiumto7thGen, totalDisposedOrDisposal
 }) {
    const generations = [
        { title: 'N/A and Celeron', value: totalNACeleron, color: 'border-red-600', textColor: 'text-red-600' },
        { title: 'Pentium', value: totalPentium, color: 'border-red-600', textColor: 'text-red-600' },
        { title: '3rd Gen', value: total3rdGen, color: 'border-red-600', textColor: 'text-red-600' },
        { title: '4th Gen', value: total4thGen, color: 'border-red-600', textColor: 'text-red-600' },
        { title: '5th Gen', value: total5thGen, color: 'border-red-600', textColor: 'text-red-600' },
        { title: '6th Gen', value: total6thGen, color: 'border-red-600', textColor: 'text-red-600' },
        { title: '7th Gen', value: total7thGen, color: 'border-red-600', textColor: 'text-red-600' },
        { title: '8th Gen', value: total8thGen, color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '9th Gen', value: total9thGen, color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '10th Gen', value: total10thGen, color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '11th Gen', value: total11thGen, color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '12th Gen', value: total12thGen, color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '13th Gen', value: total13thGen, color: 'border-green-400', textColor: 'text-green-400' }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* General Metrics */}
                    <Card title="Operationals" value={totalOperationals} color="border-green-400" textColor="text-green-600" />
                    <Card title="Users" value={totalUsers} color="border-amber-400" textColor="text-amber-600" />
                    <Card title="Spare Computers" value={totalSpareUnits} color="border-gray-400" textColor="text-gray-400" />
                    <Card title="Desktop" value={totalDesktops} color="border-sky-400" textColor="text-sky-600" />
                    <Card title="Laptop" value={totalLaptops} color="border-sky-400" textColor="text-sky-600" />
                    <Card title="Tablets" value={totalTablets} color="border-sky-400" textColor="text-sky-600" />
                    <Card title="Phones" value={totalPhones} color="border-sky-400" textColor="text-sky-600" />
                    
                    {/* Generations */}
                    {generations.map((gen) => (
                        <Card 
                            key={gen.title}
                            title={gen.title} 
                            value={gen.value} 
                            color={gen.color} 
                            textColor={gen.textColor} 
                        />
                    ))}
                    <Card title="Total Laptop (Pentium - 7th Generation)" value={totalLaptopPentiumto7thGen} color="border-gray-400" textColor="text-gray-400" />
                    <Card title="Total Desktop (Pentium - 7th Generation)" value={totalDesktopPentiumto7thGen} color="border-gray-400" textColor="text-gray-400" />
                    <Card title="DISPOSED / DISPOSAL" value={totalDisposedOrDisposal} color="border-red-600" textColor="text-red-600" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

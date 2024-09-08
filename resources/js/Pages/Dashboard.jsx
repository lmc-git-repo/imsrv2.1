import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Show from './Show';

// Reusable Card Component
const Card = ({ title, value = 0, color, textColor }) => (
    <div className={`bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 ${color} hover:scale-105 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 text-gray-900 dark:text-gray-100">
            <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

export default function Dashboard({ 
    auth, 
    totalOperationals, operationalsTotal, totalUsers, totalSpareUnits, totalDesktops, totalLaptops, totalTablets, totalPhones,
    totalNACeleron, totalPentium, total3rdGen, total4thGen, total5thGen, total6thGen, total7thGen, total8thGen,
    total9thGen, total10thGen, total11thGen, total12thGen, total13thGen, totalDesktopPentiumto7thGen,
    totalLaptopPentiumto7thGen, totalDisposedOrDisposal
 }) {
    useEffect(() => {
        console.log(operationalsTotal);
    }, [operationalsTotal]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [tableData, setTableData] = useState([]);

    const exampleTableData1 = [
        { column1: 'Operational 1', column2: 'Data 2', column3: 'Data 3' },
        { column1: 'Operational 2', column2: 'Data 5', column3: 'Data 6' },
        { column1: 'Operational 3', column2: 'Data 8', column3: 'Data 9' },
    ];

    const exampleTableData2 = [
        { column1: 'User 1', column2: 'Info 2', column3: 'Info 3' },
        { column1: 'User 2', column2: 'Info 5', column3: 'Info 6' },
        { column1: 'User 3', column2: 'Info 8', column3: 'Info 9' },
    ];

    // Add more example table data as needed...

    const openModal = (data, tableData) => {
        setSelectedData(data);
        setTableData(tableData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                    <div onClick={() => openModal({ title: "Operationals", value: totalOperationals }, exampleTableData1)}>
                        <Card title="Operationals" value={totalOperationals} color="border-green-400" textColor="text-green-600"/>
                    </div>
                    <div onClick={() => openModal({ title: "Total Users", value: totalUsers }, exampleTableData2)}>
                        <Card title="Users" value={totalUsers} color="border-amber-400" textColor="text-amber-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Spare Units", value: totalSpareUnits })}>
                        <Card title="Spare Computers" value={totalSpareUnits} color="border-gray-400" textColor="text-gray-400" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Desktops", value: totalDesktops })}>
                        <Card title="Desktop" value={totalDesktops} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Laptops", value: totalLaptops })}>
                        <Card title="Laptop" value={totalLaptops} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Tablets", value: totalTablets })}>
                        <Card title="Tablets" value={totalTablets} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Phones", value: totalPhones })}>
                        <Card title="Phones" value={totalPhones} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    
                    {/* Generations */}
                    {generations.map((gen) => (
                        <div key={gen.title} onClick={() => openModal(gen, [])}>
                            <Card 
                                key={gen.title}
                                title={gen.title} 
                                value={gen.value} 
                                color={gen.color} 
                                textColor={gen.textColor} 
                            />
                        </div>
                    ))}
                    <div onClick={() => openModal({ title: "Total Laptop Pentium to 7th Gen", value: totalLaptopPentiumto7thGen })}>
                        <Card title="Total Laptop (Pentium - 7th Generation)" value={totalLaptopPentiumto7thGen} color="border-gray-400" textColor="text-gray-400" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Desktop Pentium to 7th Gen", value: totalDesktopPentiumto7thGen })}>
                        <Card title="Total Desktop (Pentium - 7th Generation)" value={totalDesktopPentiumto7thGen} color="border-gray-400" textColor="text-gray-400" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Disposed/Disposal", value: totalDisposedOrDisposal })}>
                        <Card title="DISPOSED / DISPOSAL" value={totalDisposedOrDisposal} color="border-red-600" textColor="text-red-600" />
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <Show isOpen={isModalOpen} closeModal={closeModal} data={selectedData} tableData={tableData} />
        </AuthenticatedLayout>
    );
}

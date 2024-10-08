import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Modal from './Show';

// Reusable Card Component
const Card = ({ title, value = 0, color, textColor, onClick  }) => (
    <div onClick={onClick} className={`bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border-l-4 ${color} hover:scale-105 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 text-gray-900 dark:text-gray-100">
            <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

export default function Dashboard({ 
    auth, 
    totalOperationals, operationalsTotal, totalUsers, usersTotal, totalSpareUnits, spareUnitsTotal, totalDesktops, desktopsTotal, totalLaptops, laptopsTotal, 
    totalTablets, tabletsTotal, totalPhones, phonesTotal,
    totalNACeleron,naCeleronTotal, totalPentium, pentiumTotal, total3rdGen, total4thGen, total5thGen, total6thGen, total7thGen, total8thGen,
    total9thGen, total10thGen, total11thGen, total12thGen, total13thGen, totalDesktopPentiumto7thGen, desktopPentiumto7thGenTotal,
    totalLaptopPentiumto7thGen, laptopPentiumto7thGenTotal, totalDisposedOrDisposal, disposedOrDisposalTotal
 }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const openModal = (cardData) => {
        // console.log(cardData.value);
        // console.log(cardData.title);
        setSelectedCard({
            title: cardData.title,
            value: cardData.value,  // Default to 0 if count is undefined
        });
        setIsModalOpen(true);
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // console.log(naCeleronTotal);
    // console.log('Pentium', totalPentium);
    // console.log('3rd Gen', total3rdGen);
    // console.log('4th Gen', total4thGen);
    // console.log('5th Gen', total5thGen);
    // console.log('6th Gen', total6thGen);
    // console.log('7th Gen', total7thGen);
    // console.log('8th Gen', total8thGen);
    // console.log('9th Gen', total9thGen);
    // console.log('10th Gen', total10thGen);
    // console.log('11th Gen', total11thGen);
    // console.log('12th Gen', total12thGen);
    // console.log('13th Gen', total13thGen);


    const generations = [
        { title: 'N/A and Celeron', value: naCeleronTotal, color: 'border-red-600', textColor: 'text-red-600' },
        { title: 'Pentium', value: [...totalPentium.computers, ...totalPentium.serverUPS], color: 'border-red-600', textColor: 'text-red-600' },
        { title: '3rd Gen', value: [...total3rdGen.computers, ...total3rdGen.serverUPS], color: 'border-red-600', textColor: 'text-red-600' },
        { title: '4th Gen', value: [...total4thGen.computers, ...total4thGen.serverUPS], color: 'border-red-600', textColor: 'text-red-600' },
        { title: '5th Gen', value: [...total5thGen.computers, ...total5thGen.serverUPS], color: 'border-red-600', textColor: 'text-red-600' },
        { title: '6th Gen', value: [...total6thGen.computers, ...total6thGen.serverUPS] , color: 'border-red-600', textColor: 'text-red-600' },
        { title: '7th Gen', value: [...total7thGen.computers, ...total7thGen.serverUPS], color: 'border-red-600', textColor: 'text-red-600' },
        { title: '8th Gen', value: [...total8thGen.computers, ...total8thGen.serverUPS], color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '9th Gen', value: [...total9thGen.computers, ...total9thGen.serverUPS], color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '10th Gen', value: [...total10thGen.computers, ...total10thGen.serverUPS], color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '11th Gen', value: [...total11thGen.computers, ...total11thGen.serverUPS], color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '12th Gen', value: [...total12thGen.computers, ...total12thGen.serverUPS], color: 'border-yellow-400', textColor: 'text-yellow-400' },
        { title: '13th Gen', value: [...total13thGen.computers, ...total13thGen.serverUPS], color: 'border-green-400', textColor: 'text-green-400' }
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
                    <div onClick={() => openModal({ title: "Operationals", value: operationalsTotal })}>
                        <Card title="Operationals" value={totalOperationals} color="border-green-400" textColor="text-green-600"/>
                    </div>
                    <div onClick={() => openModal({ title: "Total Users", value: usersTotal })}>
                        <Card title="Users" value={totalUsers} color="border-amber-400" textColor="text-amber-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Spare Units", value: spareUnitsTotal })}>
                        <Card title="Spare Computers" value={totalSpareUnits} color="border-gray-400" textColor="text-gray-400" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Desktops", value: desktopsTotal })}>
                        <Card title="Desktop" value={totalDesktops} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Laptops", value: laptopsTotal })}>
                        <Card title="Laptop" value={totalLaptops} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Tablets", value: tabletsTotal })}>
                        <Card title="Tablets" value={totalTablets} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Phones", value: phonesTotal })}>
                        <Card title="Phones" value={totalPhones} color="border-sky-400" textColor="text-sky-600" />
                    </div>
                    
                    {/* Generations */}
                    {generations.map((gen) => (
                        <div key={gen.title} onClick={() => openModal({ title: gen.title, value: gen.value })}>
                            <Card 
                                title={gen.title} 
                                value={gen.value.length}
                                color={gen.color} 
                                textColor={gen.textColor} 
                            />
                        </div>
                    ))}
                    <div onClick={() => openModal({ title: "Total Laptop Pentium to 7th Gen", value: laptopPentiumto7thGenTotal })}>
                        <Card title="Total Laptop (Pentium - 7th Generation)" value={totalLaptopPentiumto7thGen} color="border-gray-400" textColor="text-gray-400" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Desktop Pentium to 7th Gen", value: desktopPentiumto7thGenTotal })}>
                        <Card title="Total Desktop (Pentium - 7th Generation)" value={totalDesktopPentiumto7thGen} color="border-gray-400" textColor="text-gray-400" />
                    </div>
                    <div onClick={() => openModal({ title: "Total Disposed/Disposal", value: disposedOrDisposalTotal })}>
                        <Card title="DISPOSED / DISPOSAL" value={totalDisposedOrDisposal} color="border-red-600" textColor="text-red-600" />
                    </div>
                </div>
            </div>
            {/* Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                title={selectedCard.title} 
                value={selectedCard.value} 
            />
        </AuthenticatedLayout>
    );
}

import React from 'react';
import { Modal as FlowbiteModal, Button } from 'flowbite-react';

const Modal = ({ isOpen, onClose, title, value }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
            className="absolute inset-0 bg-black opacity-50"
        ></div> {/* Backdrop */}
        <FlowbiteModal show={isOpen} onClose={onClose} className="relative mx-auto !overflow-hidden" style={{ maxWidth: '60vw' }}>
        <FlowbiteModal.Header className="p-4">
            {title}
        </FlowbiteModal.Header>
        <FlowbiteModal.Body className=''>
            <div className="space-y-6">
            <div className="text-center">
                <p className="text-base leading-relaxed text-white">
                    {/* <strong>{typeof value === 'object' ? JSON.stringify(value.length) : value}</strong> */}
                    <strong>{Array.isArray(value) ? value.length : value}</strong> items found.
                </p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full" style={{maxHeight: '400px', overflowY: 'auto'}}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-3">Name</th>
                                <th className="px-3 py-3">User</th>
                                <th className="px-3 py-3">Department</th>
                                <th className="px-3 py-3">Type</th>
                                <th className="px-3 py-3">Model</th>
                                <th className="px-3 py-3">Operating System</th>
                                <th className="px-3 py-3">Ram</th>
                                <th className="px-3 py-3">Asset Tag</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(value) && value.length > 0 ? (
                                value.map((item, index) => {
                                    let name, user, department, type, model, os, storage, assetTag; 

                                    // Using switch to handle different totals
                                    switch (title) {
                                        case 'Operationals':
                                        name = item.comp_name || item.S_UName || item.tablet_name || item.phone_name || 'N/A';
                                        user = item.fullName || item.S_UUser || item.fullName || item.fullName || 'N/A';
                                        department = item.department_comp || item.department_S_U || item.department_tablet || item.department_phone || 'N/A';
                                        type = item.comp_type || item.S_UType || (item.tablet_name ? 'Tablet' : (item.phone_name ? 'Phone' : 'N/A'));
                                        model = item.comp_model || item.S_UModel || item.tablet_model || item.phone_model || 'N/A';
                                        os = item.comp_os || item.S_UOs || item.tablet_os || item.phone_os || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || item.tablet_storage || item.phone_ram || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || item.tablet_asset || item.phone_asset || 'N/A';
                                        break;

                                        case 'Total Users':
                                        name = item.comp_name || item.S_UName || item.tablet_name || item.phone_name || 'N/A';
                                        user = item.comp_user || item.S_UUser || item.tablet_user || item.phone_user || 'N/A';
                                        department = item.department_comp || item.department_S_U || item.department_tablet || item.department_phone || 'N/A';
                                        type = item.comp_type || item.S_UType || (item.tablet_name ? 'Tablet' : (item.phone_name ? 'Phone' : 'N/A'));
                                        model = item.comp_model || item.S_UModel || item.tablet_model || item.phone_model || 'N/A';
                                        os = item.comp_os || item.S_UOs || item.tablet_os || item.phone_os || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || item.tablet_storage || item.phone_ram || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || item.tablet_asset || item.phone_asset || 'N/A';
                                        break;

                                        case 'Total Spare Units':
                                        name = item.comp_name || 'Spare Unit Name';
                                        user = item.comp_user || 'N/A';
                                        department = item.department_comp || 'N/A';
                                        type = item.comp_type || 'Spare Unit';
                                        model = item.comp_model || 'N/A';
                                        os = item.comp_os || 'N/A';
                                        storage = item.comp_storage || 'N/A';
                                        assetTag = item.comp_asset || 'N/A';
                                        break;

                                        case 'Total Desktops':
                                        name = item.comp_name || 'Desktop Name';
                                        user = item.comp_user || 'N/A';
                                        department = item.department_comp || 'N/A';
                                        type = item.comp_type || 'N/A';
                                        model = item.comp_model || 'N/A';
                                        os = item.comp_os || 'N/A';
                                        storage = item.comp_storage || 'N/A';
                                        assetTag = item.comp_asset || 'N/A';
                                        break;

                                        case 'Total Laptops':
                                        name = item.comp_name || 'Laptop Name';
                                        user = item.comp_user || 'N/A';
                                        department = item.department_comp || 'N/A';
                                        type = item.comp_type || 'N/A';;
                                        model = item.comp_model || 'N/A';
                                        os = item.comp_os || 'N/A';
                                        storage = item.comp_storage || 'N/A';
                                        assetTag = item.comp_asset || 'N/A';
                                        break;

                                        case 'Total Tablets':
                                        name = item.tablet_name || 'Tablet Name';
                                        user = item.fullName || 'N/A';
                                        department = item.department_tablet || 'N/A';
                                        type = 'Tablet';
                                        model = item.tablet_model || 'N/A';
                                        os = item.talbet_os || 'N/A';
                                        storage = item.tablet_storage || 'N/A';
                                        assetTag = item.tablet_asset || 'N/A';
                                        break;

                                        case 'Total Phones':
                                        name = item.phone_name || 'Phone Name';
                                        user = item.fullName || 'N/A';
                                        department = item.department_phone || 'N/A';
                                        type = 'Phone';
                                        model = item.phone_model || 'N/A';
                                        os = 'N/A';
                                        storage = item.phone_ram || 'N/A';
                                        assetTag = item.phone_asset || 'N/A';
                                        break;

                                        case 'N/A and Celeron':
                                        name = item.comp_name || item.tablet_name || 'Device Name';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_tablet || 'N/A';
                                        type = item.comp_type || 'Tablet' || 'N/A';;
                                        model = item.comp_model || item.tablet_model || 'N/A';
                                        os = item.comp_os || item.tablet_os || 'N/A';
                                        storage = item.comp_storage || item.tablet_storage || 'N/A';
                                        assetTag = item.comp_asset || item.tablet_asset || 'N/A';
                                        break;

                                        case 'Pentium':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '3rd Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '4th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '5th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '6th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '7th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '8th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '9th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '10th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '11th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '12th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case '13th Gen':
                                        name = item.comp_name || item.S_UName || 'N/A';
                                        user = item.fullName || item.S_UUser || 'N/A';
                                        department = item.department_comp || item.department_S_U || 'N/A';
                                        type = item.comp_type || item.S_UType || 'N/A';
                                        model = item.comp_model || item.S_UModel || 'N/A';
                                        os = item.comp_os || item.S_UOs || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || 'N/A';
                                        break;

                                        case 'Total Laptop Pentium to 7th Gen':
                                        name = item.comp_name || 'Laptop Name';
                                        user = item.fullName || 'N/A';
                                        department = item.department_comp || 'N/A';
                                        type = item.comp_type || 'N/A';;
                                        model = item.comp_model || 'N/A';
                                        os = item.comp_os || 'N/A';
                                        storage = item.comp_storage || 'N/A';
                                        assetTag = item.comp_asset || 'N/A';
                                        break;

                                        case 'Total Desktop Pentium to 7th Gen':
                                        name = item.comp_name || 'Desktop Name';
                                        user = item.fullName || 'N/A';
                                        department = item.department_comp || 'N/A';
                                        type = item.comp_type || 'N/A';
                                        model = item.comp_model || 'N/A';
                                        os = item.comp_os || 'N/A';
                                        storage = item.comp_storage || 'N/A';
                                        assetTag = item.comp_asset || 'N/A';
                                        break;

                                        case 'Total Disposed/Disposal':
                                        name = item.comp_name || item.S_UName || item.tablet_name || item.phone_name || 'N/A';
                                        user = item.fullName || item.S_UUser || item.fullName || item.fullName || 'N/A';
                                        department = item.department_comp || item.department_S_U || item.department_tablet || item.department_phone || 'N/A';
                                        type = item.comp_type || item.S_UType || (item.tablet_name ? 'Tablet' : (item.phone_name ? 'Phone' : 'N/A'));
                                        model = item.comp_model || item.S_UModel || item.tablet_model || item.phone_model || 'N/A';
                                        os = item.comp_os || item.S_UOs || item.tablet_os || item.phone_os || 'N/A';
                                        storage = item.comp_storage || item.S_UStorage || item.tablet_storage || item.phone_ram || 'N/A';
                                        assetTag = item.comp_asset || item.S_UAsset || item.tablet_asset || item.phone_asset || 'N/A';
                                        break;

                                        default:
                                        name = 'N/A';
                                        user = 'N/A';
                                        department = 'N/A';
                                        type = 'Unknown';
                                        model = 'N/A';
                                        os = 'N/A';
                                        storage = 'N/A';
                                        assetTag = 'N/A';
                                    }

                                    return (
                                    <tr key={index} className="bg-white border-b dark:bg-slate-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{name}</td>
                                        <td className="px-3 py-2">{user}</td>
                                        <td className="px-3 py-2">{department}</td>
                                        <td className="px-3 py-2">{type}</td>
                                        <td className="px-3 py-2">{model}</td>
                                        <td className="px-3 py-2">{os}</td>
                                        <td className="px-3 py-2">{storage}</td>
                                        <td className="px-3 py-2">{assetTag}</td>
                                    </tr>
                                    );
                                })
                                ) : (
                                <tr>
                                    <td colSpan="8" className="text-center px-3 py-2">
                                    No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </FlowbiteModal.Body>
        <FlowbiteModal.Footer>
            <Button onClick={onClose} color="blue">
            Close
            </Button>
        </FlowbiteModal.Footer>
        </FlowbiteModal>
    </div>
  );
};

export default Modal;

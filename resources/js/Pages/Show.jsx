import React from 'react';
import { Modal as FlowbiteModal, Button } from 'flowbite-react';

const Modal = ({ isOpen, onClose, title, value }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
            className="absolute inset-0 bg-black opacity-50"
        ></div> {/* Backdrop */}
        <FlowbiteModal show={isOpen} onClose={onClose} className="relative mx-auto" style={{ maxWidth: '60vw' }}>
        <FlowbiteModal.Header className="p-4">
            {title}
        </FlowbiteModal.Header>
        <FlowbiteModal.Body className=''>
            <div className="space-y-6">
            <div className="text-center">
                <p className="text-base leading-relaxed text-white">
                <strong>{typeof value === 'object' ? JSON.stringify(value) : value}</strong>
                </p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
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
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-gray-700">
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                                <td className="px-3 py-2"></td>
                            </tr>
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

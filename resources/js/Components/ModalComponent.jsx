// Components/Modal.jsx
import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
                <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}

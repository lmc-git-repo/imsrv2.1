import InputError from '@/Components/InputError';
import { useForm, router } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState, forwardRef } from 'react';

const CreateWAP = forwardRef(function CreateWAP({ show, onClose }, ref) {
    const { data, setData, post, errors, reset } = useForm({
        device_name: '',
        model: '',
        ip_address: '',
        username: '',
        password: '',
        serial_number: '',
        switch_connected: '',
        port_number: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (loading || submitted) return;

        setLoading(true);
        setSubmitted(true);

        // Use router.post to send the exact payload object so backend receives switch_connected / port_number
        router.post(route("wap.store"), data, {
            onSuccess: () => {
                setLoading(false);
                setSubmitted(false);
                onClose();
                reset();
            },
            onError: () => {
                setLoading(false);
                setSubmitted(false);
            },
        });
    };

    // Move the early return AFTER all hooks
    if (!show) return null;

    const SWITCH_OPTIONS = [
        'CCTV Room Ruijie SW',
        'DC_OFFICE_Ruijie_SW',
        'ASSY_Ruijie_SW',
        'DB_Ruijie_SW',
        'Machining_Ruijie_SW',
        'LMC-AdminOfficeL2',
        'SERVER_RM_Ruijie_SW',
    ];

    const PORT_OPTIONS = Array.from({ length: 24 }, (_, i) => `Port ${i + 1}`);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-700 rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-600">
                    <h2 className="text-xl font-semibold text-white">Add New WAP</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="device_name" className="block text-sm font-medium text-gray-300 mb-2">
                                Enter Device Name
                            </label>
                            <input
                                id="device_name"
                                name="device_name"
                                type="text"
                                value={data.device_name}
                                onChange={(e) => setData("device_name", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                autoComplete="name"
                            />
                            <InputError message={errors.device_name} className="mt-1 text-red-400" />
                        </div>

                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">
                                Enter Model
                            </label>
                            <input
                                id="model"
                                name="model"
                                type="text"
                                value={data.model}
                                onChange={(e) => setData("model", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                autoComplete="model"
                            />
                            <InputError message={errors.model} className="mt-1 text-red-400" />
                        </div>

                        <div>
                            <label htmlFor="ip_address" className="block text-sm font-medium text-gray-300 mb-2">
                                Enter IP Address
                            </label>
                            <input
                                id="ip_address"
                                name="ip_address"
                                type="text"
                                value={data.ip_address}
                                onChange={(e) => setData("ip_address", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                autoComplete="address-line1"
                            />
                            <InputError message={errors.ip_address} className="mt-1 text-red-400" />
                        </div>

                        {/* New: Switch Connected dropdown */}
                        <div>
                            <label htmlFor="switch_connected" className="block text-sm font-medium text-gray-300 mb-2">
                                Switch Connected
                            </label>
                            <select
                                id="switch_connected"
                                name="switch_connected"
                                value={data.switch_connected}
                                onChange={(e) => setData("switch_connected", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select switch</option>
                                {SWITCH_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <InputError message={errors.switch_connected} className="mt-1 text-red-400" />
                        </div>

                        {/* New: Port Number dropdown */}
                        <div>
                            <label htmlFor="port_number" className="block text-sm font-medium text-gray-300 mb-2">
                                Port Number
                            </label>
                            <select
                                id="port_number"
                                name="port_number"
                                value={data.port_number}
                                onChange={(e) => setData("port_number", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select port</option>
                                {PORT_OPTIONS.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <InputError message={errors.port_number} className="mt-1 text-red-400" />
                        </div>

                        <div>
                            <label htmlFor="serial_number" className="block text-sm font-medium text-gray-300 mb-2">
                                Enter Serial Number
                            </label>
                            <input
                                id="serial_number"
                                name="serial_number"
                                type="text"
                                value={data.serial_number}
                                onChange={(e) => setData("serial_number", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                autoComplete="serial-number"
                            />
                            <InputError message={errors.serial_number} className="mt-1 text-red-400" />
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Enter Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                autoComplete="username"
                            />
                            <InputError message={errors.username} className="mt-1 text-red-400" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Enter Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                autoComplete="off"
                            />
                            <InputError message={errors.password} className="mt-1 text-red-400" />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || submitted}
                                className={`px-4 py-2 bg-green-600 text-white rounded-md transition-colors ${
                                    loading || submitted ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                                }`}
                            >
                                {loading ? "Submitting..." : submitted ? "Submitted" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

CreateWAP.displayName = 'CreateWAP';

export default CreateWAP;
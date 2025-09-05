import InputError from '@/Components/InputError';
import { useForm, router } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState, forwardRef } from 'react';

const CreateL2Switch = forwardRef(function CreateL2Switch({ show, onClose }, ref) {
    const { data, setData, post, errors, reset } = useForm({
        device_name: '',
        model: '',
        ip_address: '',
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (loading || submitted) return;

        setLoading(true);
        setSubmitted(true);

        post(route("l2sw.store"), {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-700 rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-600">
                    <h2 className="text-xl font-semibold text-white">Add New L2 Switch</h2>
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

CreateL2Switch.displayName = 'CreateL2Switch';

export default CreateL2Switch;
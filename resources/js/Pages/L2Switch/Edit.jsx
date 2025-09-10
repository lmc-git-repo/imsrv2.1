import InputError from '@/Components/InputError';
import { useForm, router } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState, forwardRef } from 'react';

const EditL2Switch = forwardRef(function EditL2Switch({ show, onClose, selectedL2Switch }, ref) {
  const { data, setData, put, errors, reset } = useForm({
    device_name: '',
    model: '',
    ip_address: '',
    username: '',
    password: '',
    serial_number: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Update form data when selectedL2Switch changes
  useEffect(() => {
    if (selectedL2Switch) {
      const newData = {
        device_name: selectedL2Switch.device_name || '',
        model: selectedL2Switch.model || '',
        ip_address: selectedL2Switch.ip_address || '',
        username: selectedL2Switch.username || '',
        password: selectedL2Switch.password || '',
        serial_number: selectedL2Switch.serial_number || '',
      };
      setData(newData);
      setHasChanges(false);
    }
  }, [selectedL2Switch]);

  // Check for changes
  useEffect(() => {
    if (selectedL2Switch) {
      const original = {
        device_name: selectedL2Switch.device_name || '',
        model: selectedL2Switch.model || '',
        ip_address: selectedL2Switch.ip_address || '',
        username: selectedL2Switch.username || '',
        password: selectedL2Switch.password || '',
        serial_number: selectedL2Switch.serial_number || '',
      };
      const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
      setHasChanges(isChanged);
    }
  }, [data, selectedL2Switch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedL2Switch?.id || loading || submitted) return;

    setLoading(true);
    setSubmitted(true);
    put(route('l2sw.update', selectedL2Switch.id), {
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
  if (!show || !selectedL2Switch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-700 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-600">
          <h2 className="text-xl font-semibold text-white">Edit L2 Switch - {selectedL2Switch.device_name || 'Unknown'}</h2>
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
                onChange={(e) => setData('device_name', e.target.value)}
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
                onChange={(e) => setData('model', e.target.value)}
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
                onChange={(e) => setData('ip_address', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                autoComplete="address-line1"
              />
              <InputError message={errors.ip_address} className="mt-1 text-red-400" />
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
                onChange={(e) => setData('serial_number', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                onChange={(e) => setData('username', e.target.value)}
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
                onChange={(e) => setData('password', e.target.value)}
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
                disabled={!hasChanges || loading || submitted}
                className={`px-4 py-2 bg-green-600 text-white rounded-md transition-colors ${
                  !hasChanges || loading || submitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {loading ? 'Updating...' : submitted ? 'Updated' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

EditL2Switch.displayName = 'EditL2Switch';

export default EditL2Switch;
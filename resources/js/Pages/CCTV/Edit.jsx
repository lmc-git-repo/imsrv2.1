import InputError from '@/Components/InputError';
import { useForm, router } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState, forwardRef } from 'react';

const EditCCTV = forwardRef(function EditCCTV({ show, onClose, selectedCctv }, ref) {
  const { data, setData, put, errors, reset } = useForm({
    cctv_name: '',
    hikvision_model: '',
    ip_address: '',
    username: '',
    password: '',
    installer_supplier: '',
    _method: 'PUT',
  });

  const [loading, setLoading] = useState(false);

  // Update form data when selectedCctv changes
  useEffect(() => {
    if (selectedCctv) {
      setData({
        cctv_name: selectedCctv.cctv_name || '',
        hikvision_model: selectedCctv.hikvision_model || '',
        ip_address: selectedCctv.ip_address || '',
        username: selectedCctv.username || '',
        password: selectedCctv.password || '',
        installer_supplier: selectedCctv.installer_supplier || '',
        _method: 'PUT',
      });
    }
  }, [selectedCctv]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedCctv?.id) return;

    setLoading(true);
    put(route('cctv.update', selectedCctv.id), {
      onSuccess: () => {
        setLoading(false);
        onClose();
        reset();
      },
      onError: () => setLoading(false),
    });
  };

  // Move the early return AFTER all hooks
  if (!show || !selectedCctv) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-700 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-600">
          <h2 className="text-xl font-semibold text-white">Edit CCTV - {selectedCctv.cctv_name || 'Unknown'}</h2>
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
              <label htmlFor="cctv_name" className="block text-sm font-medium text-gray-300 mb-2">
                Enter CCTV Name
              </label>
              <input
                id="cctv_name"
                name="cctv_name"
                type="text"
                value={data.cctv_name}
                onChange={(e) => setData('cctv_name', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                autoComplete="name"
              />
              <InputError message={errors.cctv_name} className="mt-1 text-red-400" />
            </div>

            <div>
              <label htmlFor="hikvision_model" className="block text-sm font-medium text-gray-300 mb-2">
                Enter Hikvision Model
              </label>
              <input
                id="hikvision_model"
                name="hikvision_model"
                type="text"
                value={data.hikvision_model}
                onChange={(e) => setData('hikvision_model', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                autoComplete="model"
              />
              <InputError message={errors.hikvision_model} className="mt-1 text-red-400" />
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

            <div>
              <label htmlFor="installer_supplier" className="block text-sm font-medium text-gray-300 mb-2">
                Enter Installer/Supplier
              </label>
              <input
                id="installer_supplier"
                name="installer_supplier"
                type="text"
                value={data.installer_supplier}
                onChange={(e) => setData('installer_supplier', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                autoComplete="organization"
              />
              <InputError message={errors.installer_supplier} className="mt-1 text-red-400" />
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
                disabled={loading}
                className={`px-4 py-2 bg-green-600 text-white rounded-md transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

EditCCTV.displayName = 'EditCCTV';

export default EditCCTV;
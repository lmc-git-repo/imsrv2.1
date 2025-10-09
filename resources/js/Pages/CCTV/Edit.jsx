import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useEffect, useState, forwardRef } from 'react';

const EditCCTV = forwardRef(function EditCCTV({ show, onClose, selectedCctv }, ref) {
  const { data, setData, put, errors, reset } = useForm({
    cctv_name: '',
    hikvision_model: '',
    ip_address: '',
    username: '',
    password: '',
    installer_supplier: '',
    switch_connected: '',  // ✅ NEW
    port_number: '',       // ✅ NEW
    _method: 'PUT',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

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
        switch_connected: selectedCctv.switch_connected || '',  // ✅
        port_number: selectedCctv.port_number || '',            // ✅
        _method: 'PUT',
      });
      setHasChanges(false);
    }
  }, [selectedCctv]);

  // Check for changes
  useEffect(() => {
    if (selectedCctv) {
      const original = {
        cctv_name: selectedCctv.cctv_name || '',
        hikvision_model: selectedCctv.hikvision_model || '',
        ip_address: selectedCctv.ip_address || '',
        username: selectedCctv.username || '',
        password: selectedCctv.password || '',
        installer_supplier: selectedCctv.installer_supplier || '',
        switch_connected: selectedCctv.switch_connected || '',
        port_number: selectedCctv.port_number || '',
      };
      const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
      setHasChanges(isChanged);
    }
  }, [data, selectedCctv]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedCctv?.id || loading || submitted) return;

    setLoading(true);
    setSubmitted(true);
    put(route('cctv.update', selectedCctv.id), {
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
            {/* CCTV Name */}
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
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
                required
              />
              <InputError message={errors.cctv_name} className="mt-1 text-red-400" />
            </div>

            {/* Hikvision Model */}
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
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
                required
              />
              <InputError message={errors.hikvision_model} className="mt-1 text-red-400" />
            </div>

            {/* IP Address */}
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
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
                required
              />
              <InputError message={errors.ip_address} className="mt-1 text-red-400" />
            </div>

            {/* Username */}
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
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
              />
              <InputError message={errors.username} className="mt-1 text-red-400" />
            </div>

            {/* Password */}
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
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
              />
              <InputError message={errors.password} className="mt-1 text-red-400" />
            </div>

            {/* Installer/Supplier */}
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
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
              />
              <InputError message={errors.installer_supplier} className="mt-1 text-red-400" />
            </div>

            {/* Switch Connected - NEW */}
            <div>
              <label htmlFor="switch_connected" className="block text-sm font-medium text-gray-300 mb-2">
                Switch Connected
              </label>
              <select
                id="switch_connected"
                name="switch_connected"
                value={data.switch_connected}
                onChange={(e) => setData('switch_connected', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
                required
              >
                <option value="">Select switch</option>
                {SWITCH_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <InputError message={errors.switch_connected} className="mt-1 text-red-400" />
            </div>

            {/* Port Number - NEW */}
            <div>
              <label htmlFor="port_number" className="block text-sm font-medium text-gray-300 mb-2">
                Port Number
              </label>
              <select
                id="port_number"
                name="port_number"
                value={data.port_number}
                onChange={(e) => setData('port_number', e.target.value)}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
                required
              >
                <option value="">Select port</option>
                {PORT_OPTIONS.map(port => (
                  <option key={port} value={port}>{port}</option>
                ))}
              </select>
              <InputError message={errors.port_number} className="mt-1 text-red-400" />
            </div>

            {/* Buttons */}
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

EditCCTV.displayName = 'EditCCTV';

export default EditCCTV;
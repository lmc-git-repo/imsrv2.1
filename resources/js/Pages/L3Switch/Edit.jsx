import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useEffect, useState, forwardRef } from 'react';

const EditL3Switch = forwardRef(function EditL3Switch({ show, onClose, selectedL3Switch }, ref) {
  const { data, setData, put, errors, reset } = useForm({
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
  const [hasChanges, setHasChanges] = useState(false);

  const SWITCH_OPTIONS = [
    'CCTV Room Ruijie SW',
    'DC_OFFICE_Ruijie_SW',
    'ASSY_Ruijie_SW',
    'DB_Ruijie_SW',
    'Machining_Ruijie_SW',
    'LMC-AdminOfficeL2',
    'SERVER_RM_Ruijie_SW',
    'TPLINK Server Room',
    'Ruijie Layer SW',
  ];

  const PORT_OPTIONS = Array.from({ length: 28 }, (_, i) => {
    const portNum = i + 1;
    return portNum >= 25 ? `SFP ${portNum}` : `Port ${portNum}`;
  });

  // Sync selectedL3Switch to form data
  useEffect(() => {
    if (selectedL3Switch) {
      const newData = {
        device_name: selectedL3Switch.device_name || '',
        model: selectedL3Switch.model || '',
        ip_address: selectedL3Switch.ip_address || '',
        username: selectedL3Switch.username || '',
        password: selectedL3Switch.password || '',
        serial_number: selectedL3Switch.serial_number || '',
        switch_connected: selectedL3Switch.switch_connected || '',
        port_number: selectedL3Switch.port_number || '',
      };
      setData(newData);
      setHasChanges(false);
    }
  }, [selectedL3Switch]);

  // Detect form changes
  useEffect(() => {
    if (selectedL3Switch) {
      const original = {
        device_name: selectedL3Switch.device_name || '',
        model: selectedL3Switch.model || '',
        ip_address: selectedL3Switch.ip_address || '',
        username: selectedL3Switch.username || '',
        password: selectedL3Switch.password || '',
        serial_number: selectedL3Switch.serial_number || '',
        switch_connected: selectedL3Switch.switch_connected || '',
        port_number: selectedL3Switch.port_number || '',
      };
      const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
      setHasChanges(isChanged);
    }
  }, [data, selectedL3Switch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedL3Switch?.id || loading || submitted) return;

    setLoading(true);
    setSubmitted(true);
    put(route('l3sw.update', selectedL3Switch.id), {
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

  if (!show || !selectedL3Switch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-700 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-600">
          <h2 className="text-xl font-semibold text-white">
            Edit L3 Switch - {selectedL3Switch.device_name || 'Unknown'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Device Name */}
            <Input label="Device Name" name="device_name" value={data.device_name} setData={setData} error={errors.device_name} />

            {/* Model */}
            <Input label="Model" name="model" value={data.model} setData={setData} error={errors.model} />

            {/* IP Address */}
            <Input label="IP Address" name="ip_address" value={data.ip_address} setData={setData} error={errors.ip_address} />

            {/* Switch Connected */}
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
                {SWITCH_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <InputError message={errors.switch_connected} className="mt-1 text-red-400" />
            </div>

            {/* Port Number */}
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
                {PORT_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <InputError message={errors.port_number} className="mt-1 text-red-400" />
            </div>

            {/* Serial Number */}
            <Input label="Serial Number" name="serial_number" value={data.serial_number} setData={setData} error={errors.serial_number} />

            {/* Username */}
            <Input label="Username" name="username" value={data.username} setData={setData} error={errors.username} />

            {/* Password */}
            <Input label="Password" name="password" type="password" value={data.password} setData={setData} error={errors.password} />

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

// Reusable input field component inside same file for brevity
function Input({ label, name, value, setData, error, type = 'text' }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setData(name, e.target.value)}
        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white"
        required
      />
      <InputError message={error} className="mt-1 text-red-400" />
    </div>
  );
}
EditL3Switch.displayName = 'EditL3Switch';

export default EditL3Switch;
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';

const EditModalComponent = ({ show, onClose, selected }) => {
    if (!show || !selected) return null;

    const { data, setData, post, errors, reset } = useForm({
        brand: selected.brand || '',
        model: selected.model || '',
        asset_tag: selected.asset_tag || '',
        location: selected.location || '',
        serial_number: selected.serial_number || '',
        status: selected.status || '',
        datePurchased: selected.datePurchased || '',
        _method: 'PUT',
    });

    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (selected) {
            setData({
                brand: selected.brand || '',
                model: selected.model || '',
                asset_tag: selected.asset_tag || '',
                location: selected.location || '',
                serial_number: selected.serial_number || '',
                status: selected.status || '',
                datePurchased: selected.datePurchased || '',
                _method: 'PUT',
            });
            setHasChanges(false);
        }
    }, [selected]);

    useEffect(() => {
        if (selected) {
            const original = {
                brand: selected.brand || '',
                model: selected.model || '',
                asset_tag: selected.asset_tag || '',
                location: selected.location || '',
                serial_number: selected.serial_number || '',
                status: selected.status || '',
                datePurchased: selected.datePurchased || '',
            };

            const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
            setHasChanges(isChanged);
        }
    }, [data, selected]);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        post(route('tv.update', selected.TID), {
            onSuccess: () => {
                setLoading(false);
                onClose();
                reset();
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Modal show={show} onClose={onClose} className="" style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>
                <Modal.Header className="p-4">
                    Edit Television - {selected && selected.brand}
                </Modal.Header>
                <Modal.Body className=''>
                    <form action="" onSubmit={onSubmit}>
                        <div className="space-y-6">

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="brand" value="Brand" />
                                </div>
                                <TextInput
                                    id="brand"
                                    type='text'
                                    name='brand'
                                    value={data.brand}
                                    onChange={(e) => setData('brand', e.target.value)}
                                    required
                                />
                                <InputError message={errors.brand} className='mt-2' />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="model" value="Model" />
                                </div>
                                <TextInput
                                    id="model"
                                    type='text'
                                    name='model'
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    required
                                />
                                <InputError message={errors.model} className='mt-2' />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="asset_tag" value="Asset Tag" />
                                </div>
                                <TextInput
                                    id="asset_tag"
                                    type='text'
                                    name='asset_tag'
                                    value={data.asset_tag}
                                    onChange={(e) => setData('asset_tag', e.target.value)}
                                    required
                                />
                                <InputError message={errors.asset_tag} className='mt-2' />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="location" value="Location" />
                                </div>
                                <TextInput
                                    id="location"
                                    type='text'
                                    name='location'
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                />
                                <InputError message={errors.location} className='mt-2' />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="serial_number" value="Serial Number" />
                                </div>
                                <TextInput
                                    id="serial_number"
                                    type='text'
                                    name='serial_number'
                                    value={data.serial_number}
                                    onChange={(e) => setData('serial_number', e.target.value)}
                                    required
                                />
                                <InputError message={errors.serial_number} className='mt-2' />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="status" value="Status" />
                                </div>
                                <SelectInput
                                    name='status'
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Deployed">Deployed</option>
                                    <option value="Spare">Spare</option>
                                    <option value="For Disposal">For Disposal</option>
                                    <option value="Borrow">Borrow</option>
                                </SelectInput>
                                <InputError message={errors.status} className='mt-2' />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="datePurchased" value="Date Purchased" />
                                </div>
                                <TextInput
                                    id="datePurchased"
                                    type='date'
                                    name='datePurchased'
                                    value={data.datePurchased || ''}
                                    onChange={(e) => setData('datePurchased', e.target.value)}
                                />
                                <InputError message={errors.datePurchased} className='mt-2' />
                            </div>

                            <div className='flex justify-end'>
                                <Link href={route('tv.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className={`bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all ${!hasChanges || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
                                    disabled={!hasChanges || loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8A8 8 0 0 1 4 12z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Update'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} color="blue">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditModalComponent;
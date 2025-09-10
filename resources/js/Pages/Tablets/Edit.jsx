import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';




const EditModalComponent = ({ show, onClose, listDepartments, listTabletUsers, listTabletUsersFname, selectedEditTablet, generations }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        tablet_name: selectedEditTablet.tablet_name || '',
        // img_path: '',
        img_path: null,
        tablet_model: selectedEditTablet.tablet_model || '',
        // tablet_type: selectedEditTablet.tablet_type || '',
        tablet_user: selectedEditTablet.tablet_user || '',
        fullName: selectedEditTablet.fullName || '',
        department_tablet: selectedEditTablet.department_tablet || '',
        tablet_os: selectedEditTablet.tablet_os || '',
        tablet_storage: selectedEditTablet.tablet_storage || '',
        tablet_serial: selectedEditTablet.tablet_serial || '',
        tablet_asset: selectedEditTablet.tablet_asset || '',
        asset_class: selectedEditTablet.asset_class || '',
        tablet_cpu: selectedEditTablet.tablet_cpu || '',
        tablet_gen: selectedEditTablet.tablet_gen || '',
        tablet_address: selectedEditTablet.tablet_address || '',
        tablet_prdctkey: selectedEditTablet.tablet_prdctkey || '',
        tablet_status: selectedEditTablet.tablet_status || '',
        datePurchased: selectedEditTablet.datePurchased || '',
        remarks: selectedEditTablet.remarks || '',
        _method: 'PUT',
    });


    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (selectedEditTablet?.img_path) {
            setImagePreview(selectedEditTablet.img_path);
        } else {
            setImagePreview(null);
        }
    }, [selectedEditTablet]);

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Update form data when selectedEditTablet changes
    useEffect(() => {
        if (selectedEditTablet) {
            setData({
                tablet_name: selectedEditTablet.tablet_name || '',
                img_path: null,
                tablet_model: selectedEditTablet.tablet_model || '',
                tablet_user: selectedEditTablet.tablet_user || '',
                fullName: selectedEditTablet.fullName || '',
                department_tablet: selectedEditTablet.department_tablet || '',
                tablet_os: selectedEditTablet.tablet_os || '',
                tablet_storage: selectedEditTablet.tablet_storage || '',
                tablet_serial: selectedEditTablet.tablet_serial || '',
                tablet_asset: selectedEditTablet.tablet_asset || '',
                asset_class: selectedEditTablet.asset_class || '',
                tablet_cpu: selectedEditTablet.tablet_cpu || '',
                tablet_gen: selectedEditTablet.tablet_gen || '',
                tablet_address: selectedEditTablet.tablet_address || '',
                tablet_prdctkey: selectedEditTablet.tablet_prdctkey || '',
                tablet_status: selectedEditTablet.tablet_status || '',
                datePurchased: selectedEditTablet.datePurchased || '',
                remarks: selectedEditTablet.remarks || '',
                _method: 'PUT',
            });
            setHasChanges(false);
        }
    }, [selectedEditTablet]);

    // Check for changes
    useEffect(() => {
        if (selectedEditTablet) {
            const original = {
                tablet_name: selectedEditTablet.tablet_name || '',
                tablet_model: selectedEditTablet.tablet_model || '',
                tablet_user: selectedEditTablet.tablet_user || '',
                fullName: selectedEditTablet.fullName || '',
                department_tablet: selectedEditTablet.department_tablet || '',
                tablet_os: selectedEditTablet.tablet_os || '',
                tablet_storage: selectedEditTablet.tablet_storage || '',
                tablet_serial: selectedEditTablet.tablet_serial || '',
                tablet_asset: selectedEditTablet.tablet_asset || '',
                asset_class: selectedEditTablet.asset_class || '',
                tablet_cpu: selectedEditTablet.tablet_cpu || '',
                tablet_gen: selectedEditTablet.tablet_gen || '',
                tablet_address: selectedEditTablet.tablet_address || '',
                tablet_prdctkey: selectedEditTablet.tablet_prdctkey || '',
                tablet_status: selectedEditTablet.tablet_status || '',
                datePurchased: selectedEditTablet.datePurchased || '',
                remarks: selectedEditTablet.remarks || '',
            };
            const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
            setHasChanges(isChanged);
        }
    }, [data, selectedEditTablet]);

    const onSubmit =(e) =>{
        e.preventDefault();
        if (!selectedEditTablet?.tablet_id || loading || submitted) return;

        setLoading(true);
        setSubmitted(true);
        // console.log("Form Data:", data); // Add this line to log form data
        post(route("tablets.update", selectedEditTablet && selectedEditTablet.tablet_id), {
            onSuccess: () => {
                setLoading(false);
                setSubmitted(false);
                // console.log("Update Successful");
                onClose();
                reset();
            },
            onError: () => {
                setLoading(false);
                setSubmitted(false);
                // Handle errors if needed
                // console.error(errors);
            }
        });
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("img_path", file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        } else {
            setData("img_path", null);
            setImagePreview(selectedEditTablet.img_path || null);
        }
    };

    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Edit Tablet - {selectedEditTablet && selectedEditTablet.tablet_name}
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    {/* <pre className='bg-white'>{JSON.stringify(data, undefined, 2)}</pre> */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_name" value="Enter Tablet Name" />
                            </div>
                            <TextInput
                                id="tablet_name"
                                type='text'
                                name='tablet_name'
                                value={data.tablet_name}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("tablet_name", e.target.value)}
                                required
                            />
                            <InputError message={errors.tablet_name} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_model" value="Enter Tablet Model" />
                            </div>
                            <TextInput 
                                id="tablet_model" 
                                type="text"
                                name='tablet_model' 
                                value={data.tablet_model}
                                onChange={(e) => setData("tablet_model", e.target.value)}
                                required 
                            />
                            <InputError message={errors.tablet_model} className='mt-2' />
                        </div>

                        {/* <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_type" value="Tablet Type" />
                            </div>
                            <SelectInput 
                                name='tablet_type' 
                                id="tablet_type"
                                value={data.tablet_type}  // Add this line to set the value 
                                onChange={(e) => setData("tablet_type", e.target.value)}
                                required 
                            >
                                <option value="">Select Tablet Type: </option>
                                <option value="Desktop">Desktop</option>
                                <option value="Laptop">Laptop</option>
                            </SelectInput>
                            <InputError message={errors.tablet_type} className='mt-2' />
                        </div> */}

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_user" value="Select User" />
                            </div>
                            <SelectInput 
                                name='tablet_user'
                                id="tablet_user" 
                                value={data.tablet_user}
                                onChange={(e) => setData("tablet_user", e.target.value)}
                                required 
                            >
                                <option value="">Select User</option>
                                {listTabletUsers.map(tab => (
                                    <option key={tab.tablet_id} value={tab.initial}>
                                        {tab.initial}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.tablet_user} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="fullName" value="Full Name" />
                            </div>
                            <SelectInput 
                                name='fullName'
                                id="fullName" 
                                value={data.fullName}
                                onChange={(e) => setData("fullName", e.target.value)}
                                required 
                            >
                                <option value="">Select User</option>
                                {listTabletUsersFname.map(fname => (
                                    <option key={fname.tablet_id} value={fname.name}>
                                        {fname.name}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.fullName} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="department_tablet" value="Choose Department" />
                            </div>
                            <SelectInput 
                                name='department_tablet'
                                id="department_tablet" 
                                value={data.department_tablet}
                                onChange={(e) => setData("department_tablet", e.target.value)}
                                required 
                            >
                                <option value="">Select Department</option>
                                {listDepartments.map(dept => (
                                    <option key={dept.dept_id} value={dept.dept_list}>
                                        {dept.dept_list}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.department_tablet} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_os" value="Enter Tablet OS" />
                            </div>
                            <SelectInput 
                                name='tablet_os' 
                                id="tablet_os" 
                                value={data.tablet_os}
                                onChange={(e) => setData("tablet_os", e.target.value)}
                                required 
                            >
                                <option value="">Select Operating System: </option>
                                <option value="Windows 7 Professional SP1">Windows 7 Professional SP1</option>
                                <option value="Windows 8.1 Pro 64bit">Windows 8.1 Pro 64bit</option>
                                <option value="Windows 10 Pro 64bit">Windows 10 Pro 64bit</option>
                                <option value="Windows 11 Pro">Windows 11 Pro</option>
                                <option value="N/A">N/A</option>
                            </SelectInput>
                            <InputError message={errors.tablet_os} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_storage" value="Enter Ram Capacity" />
                            </div>
                            <SelectInput 
                                name='tablet_storage' 
                                id="tablet_storage" 
                                value={data.tablet_storage}
                                onChange={(e) => setData("tablet_storage", e.target.value)}
                                required 
                            >
                                <option value="">Select Ram Capacity: </option>
                                <option value="1.5GB">1.5GB</option>
                                <option value="2GB">2GB</option>
                                <option value="4GB">4GB</option>
                                <option value="6GB">6GB</option>
                                <option value="8GB">8GB</option>
                                <option value="12GB">12GB</option>
                                <option value="16GB">16GB</option>
                                <option value="32GB">32GB</option>
                                <option value="N/A">N/A</option>
                            </SelectInput>
                            <InputError message={errors.tablet_storage} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_serial" value="Enter Tablet Serial" />
                            </div>
                            <TextInput 
                                id="tablet_serial" 
                                type="text"
                                name='tablet_serial' 
                                value={data.tablet_serial}
                                onChange={(e) => setData("tablet_serial", e.target.value)}
                                required 
                            />
                            <InputError message={errors.tablet_serial} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_asset" value="Enter Tablet Asset" />
                            </div>
                            <TextInput 
                                id="tablet_asset" 
                                type="text"
                                name='tablet_asset' 
                                value={data.tablet_asset}
                                onChange={(e) => setData("tablet_asset", e.target.value)}
                                required 
                            />
                            <InputError message={errors.tablet_asset} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="asset_class" value="Asset Classification" />
                            </div>
                            <SelectInput 
                                name='asset_class' 
                                id="asset_class" 
                                value={data.asset_class}
                                onChange={(e) => setData("asset_class", e.target.value)}
                                required 
                            >
                                <option value="">Choose Asset Clasification: </option>
                                <option value="Office Supplies">Office Supplies</option>
                                <option value="Consumables">Consumables</option>
                                <option value="Repair and Maintenance">Repair and Maintenance</option>
                                <option value="Capital">Capital</option>
                                <option value="N/A">N/A</option>
                            </SelectInput>
                            <InputError message={errors.asset_class} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_cpu" value="Enter Processor" />
                            </div>
                            <TextInput 
                                id="tablet_cpu" 
                                type="text"
                                name='tablet_cpu' 
                                value={data.tablet_cpu}
                                onChange={(e) => setData("tablet_cpu", e.target.value)}
                                required 
                            />
                            <InputError message={errors.tablet_cpu} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_gen" value="Tablet Gen" />
                            </div>
                            <SelectInput 
                                name='tablet_gen' 
                                id="tablet_gen"
                                value={data.tablet_gen}  // Add this line to set the value 
                                onChange={(e) => setData("tablet_gen", e.target.value)}
                                required 
                            >
                                <option value="">Select Generation: </option>
                                {generations.map((gen, index) => (
                                    <option key={index} value={gen}>{gen}</option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.tablet_gen} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_address" value="Enter Mac Address" />
                            </div>
                            <TextInput 
                                id="tablet_address" 
                                type="text"
                                name='tablet_address' 
                                value={data.tablet_address}
                                onChange={(e) => setData("tablet_address", e.target.value)}
                                required 
                            />
                            <InputError message={errors.tablet_address} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_prdctkey" value="Enter Product Key" />
                            </div>
                            <TextInput 
                                id="tablet_prdctkey" 
                                type="text"
                                name='tablet_prdctkey' 
                                value={data.tablet_prdctkey}
                                onChange={(e) => setData("tablet_prdctkey", e.target.value)}
                                required 
                            />
                            <InputError message={errors.tablet_prdctkey} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tablet_status" value="Status" />
                            </div>
                            <SelectInput 
                                name='tablet_status' 
                                id="tablet_status"
                                value={data.tablet_status}  // Add this line to set the value 
                                onChange={(e) => setData("tablet_status", e.target.value)}
                                required 
                            >
                                <option value="">Select Status: </option>
                                <option value="Deployed">Deployed</option>
                                <option value="Spare">Spare</option>
                                <option value="For Disposal">For Disposal</option>
                                <option value="Already Disposed">Already Disposed</option>
                                <option value="Borrow">Borrow</option>
                            </SelectInput>
                            <InputError message={errors.tablet_status} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="datePurchased" value="Date Purchased: " />
                            </div>
                            <TextInput
                                id="datePurchased"
                                type='date'
                                name='datePurchased'
                                value={data.datePurchased}
                                onChange={(e) => setData("datePurchased", e.target.value)}
                            />
                            <InputError message={errors.datePurchased} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="remarks" value="Enter Remarks" />
                            </div>
                            <TextInput 
                                id="remarks" 
                                type="text"
                                name='remarks' 
                                value={data.remarks}
                                onChange={(e) => setData("remarks", e.target.value)}
                                required 
                            />
                            <InputError message={errors.remarks} className='mt-2' />
                        </div>
                        

                        <div className="flex-row w-full items-center justify-center">
                            <Label
                                htmlFor="tablets_img_path"
                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    {   
                                        imagePreview ? (
                                            <div className="mt-4">
                                                <img src={imagePreview} alt="Img Preview" className="h-52 w-52 object-cover rounded-full" />
                                            </div>
                                        ) : (
                                        <div className='flex flex-col items-center justify-center'>
                                            <svg
                                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        )                                        
                                    }
                                </div>
                                <FileInput 
                                    id="tablets_img_path" 
                                    name='img_path'
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </Label>
                            <InputError message={errors.img_path} className='mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={route('tablets.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className={`bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all ${!hasChanges || loading || submitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
                                disabled={!hasChanges || loading || submitted}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8A8 8 0 0 1 4 12z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : submitted ? 'Updated' : 'Update'}
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
    );
};

export default EditModalComponent;
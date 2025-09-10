import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';




const EditModalComponent = ({ show, onClose, listDepartments, listMntrUsers, listCompName, selectedEditMntr }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        compName: selectedEditMntr.compName || '',
        img_path: null,
        // comp_type: selectedEditMntr.comp_type || '',
        mntr_user: selectedEditMntr.mntr_user || '',
        mntr_department: selectedEditMntr.mntr_department || '',
        mntr_model: selectedEditMntr.mntr_model || '',
        mntr_asset: selectedEditMntr.mntr_asset || '',
        asset_class: selectedEditMntr.asset_class || '',
        // comp_os: selectedEditMntr.comp_os || '',
        // comp_storage: selectedEditMntr.comp_storage || '',
        mntr_serial: selectedEditMntr.mntr_serial || '',
        datePurchased: selectedEditMntr.datePurchased || '',
        remarks: selectedEditMntr.remarks || '',
        _method: 'PUT',
    });


    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (selectedEditMntr?.img_path) {
            setImagePreview(selectedEditMntr.img_path);
        } else {
            setImagePreview(null);
        }
    }, [selectedEditMntr]);

    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Update form data when selectedEditMntr changes
    useEffect(() => {
        if (selectedEditMntr) {
            setData({
                compName: selectedEditMntr.compName || '',
                img_path: null,
                mntr_user: selectedEditMntr.mntr_user || '',
                mntr_department: selectedEditMntr.mntr_department || '',
                mntr_model: selectedEditMntr.mntr_model || '',
                mntr_asset: selectedEditMntr.mntr_asset || '',
                asset_class: selectedEditMntr.asset_class || '',
                mntr_serial: selectedEditMntr.mntr_serial || '',
                datePurchased: selectedEditMntr.datePurchased || '',
                remarks: selectedEditMntr.remarks || '',
                _method: 'PUT',
            });
            setHasChanges(false);
        }
    }, [selectedEditMntr]);

    // Check for changes
    useEffect(() => {
        if (selectedEditMntr) {
            const original = {
                compName: selectedEditMntr.compName || '',
                mntr_user: selectedEditMntr.mntr_user || '',
                mntr_department: selectedEditMntr.mntr_department || '',
                mntr_model: selectedEditMntr.mntr_model || '',
                mntr_asset: selectedEditMntr.mntr_asset || '',
                asset_class: selectedEditMntr.asset_class || '',
                mntr_serial: selectedEditMntr.mntr_serial || '',
                datePurchased: selectedEditMntr.datePurchased || '',
                remarks: selectedEditMntr.remarks || '',
            };
            const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
            setHasChanges(isChanged);
        }
    }, [data, selectedEditMntr]);

    const onSubmit =(e) =>{
        e.preventDefault();
        setLoading(true);
        // console.log("Form Data:", data); // Add this line to log form data
        post(route("monitors.update", selectedEditMntr && selectedEditMntr.monitor_id), {
            onSuccess: () => {
                // console.log("Update Successful"); 
                setLoading(false);
                onClose();
                reset();
            },
            onError: (errors) => {
                // Handle errors if needed
                setLoading(false);
                console.error(errors);
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
            setImagePreview(selectedEditMntr.img_path || null);
        }
    };

    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Edit Monitor - {selectedEditMntr && selectedEditMntr.compName}
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    {/* <pre className='bg-white'>{JSON.stringify(data, undefined, 2)}</pre> */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="compName" value="Choose Computer Name" />
                            </div>
                            <SelectInput 
                                name='compName'
                                id="compName" 
                                value={data.compName}
                                onChange={(e) => setData("compName", e.target.value)}
                                required 
                            >
                                <option value="">Select Computer</option>
                                {listCompName.map(comp_mntr => (
                                    <option key={comp_mntr.monitor_id} value={comp_mntr.comp_name}>
                                        {comp_mntr.comp_name}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.compName} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mntr_user" value="Select User" />
                            </div>
                            <SelectInput 
                                name='mntr_user'
                                id="mntr_user" 
                                value={data.mntr_user}
                                onChange={(e) => setData("mntr_user", e.target.value)}
                                required 
                            >
                                <option value="">Select User</option>
                                {listMntrUsers.map(mntr => (
                                    <option key={mntr.monitor_id} value={mntr.name}>
                                        {mntr.name}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.mntr_user} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mntr_department" value="Choose Department" />
                            </div>
                            <SelectInput 
                                name='mntr_department'
                                id="mntr_department" 
                                value={data.mntr_department}
                                onChange={(e) => setData("mntr_department", e.target.value)}
                                required 
                            >
                                <option value="">Select Department</option>
                                {listDepartments.map(dept => (
                                    <option key={dept.dept_id} value={dept.dept_list}>
                                        {dept.dept_list}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.mntr_department} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mntr_model" value="Enter Monitor Model" />
                            </div>
                            <TextInput 
                                id="mntr_model" 
                                type="text"
                                name='mntr_model' 
                                value={data.mntr_model}
                                onChange={(e) => setData("mntr_model", e.target.value)}
                                required 
                            />
                            <InputError message={errors.mntr_model} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mntr_asset" value="Enter Monitor Asset" />
                            </div>
                            <TextInput
                                id="mntr_asset"
                                type='text'
                                name='mntr_asset'
                                value={data.mntr_asset}
                                onChange={(e) => setData("mntr_asset", e.target.value)}
                                required
                            />
                            <InputError message={errors.mntr_asset} className='mt-2' />
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
                                <Label htmlFor="mntr_serial" value="Enter Monitor Serial" />
                            </div>
                            <TextInput 
                                id="mntr_serial" 
                                type="text"
                                name='mntr_serial' 
                                value={data.mntr_serial}
                                onChange={(e) => setData("mntr_serial", e.target.value)}
                                required 
                            />
                            <InputError message={errors.mntr_serial} className='mt-2' />
                        </div>

                        {/* <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mntr_asset" value="Enter Monitor Asset" />
                            </div>
                            <TextInput 
                                id="mntr_asset" 
                                type="text"
                                name='mntr_asset' 
                                value={data.mntr_asset}
                                onChange={(e) => setData("mntr_asset", e.target.value)}
                                required 
                            />
                            <InputError message={errors.mntr_asset} className='mt-2' />
                        </div> */}

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
                                htmlFor="computers_img_path"
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
                                    id="computers_img_path" 
                                    name='img_path'
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </Label>
                            <InputError message={errors.img_path} className='mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={route('monitors.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
                                Cancel
                            </Link>
                            {/* <button className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                                Submit
                            </button> */}
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
    );
};

export default EditModalComponent;
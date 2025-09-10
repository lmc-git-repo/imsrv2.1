import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';




const EditModalComponent = ({ show, onClose, listDepartments, listPhoneUsersFname, selectedEditPhone }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        phone_name: selectedEditPhone.phone_name || '',
        phone_num: selectedEditPhone.phone_num || '',
        img_path: null,
        phone_model: selectedEditPhone.phone_model || '',
        fullName: selectedEditPhone.fullName || '',
        department_phone: selectedEditPhone.department_phone || '',
        phone_storage: selectedEditPhone.phone_storage || '',
        phone_ram: selectedEditPhone.phone_ram || '',
        phone_serial: selectedEditPhone.phone_serial || '',
        phone_asset: selectedEditPhone.phone_asset || '',
        asset_class: selectedEditPhone.asset_class || '',
        phone_cpu: selectedEditPhone.phone_cpu || '',
        phone_address: selectedEditPhone.phone_address || '',
        phone_imei: selectedEditPhone.phone_imei || '',
        phone_status: selectedEditPhone.phone_status || '',
        datePurchased: selectedEditPhone.datePurchased || '',
        remarks: selectedEditPhone.remarks || '',
        _method: 'PUT',
    });


    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (selectedEditPhone?.img_path) {
            setImagePreview(selectedEditPhone.img_path);
        } else {
            setImagePreview(null);
        }
    }, [selectedEditPhone]);

    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Update form data when selectedEditPhone changes
    useEffect(() => {
        if (selectedEditPhone) {
            setData({
                phone_name: selectedEditPhone.phone_name || '',
                phone_num: selectedEditPhone.phone_num || '',
                img_path: null,
                phone_model: selectedEditPhone.phone_model || '',
                fullName: selectedEditPhone.fullName || '',
                department_phone: selectedEditPhone.department_phone || '',
                phone_storage: selectedEditPhone.phone_storage || '',
                phone_ram: selectedEditPhone.phone_ram || '',
                phone_serial: selectedEditPhone.phone_serial || '',
                phone_asset: selectedEditPhone.phone_asset || '',
                asset_class: selectedEditPhone.asset_class || '',
                phone_cpu: selectedEditPhone.phone_cpu || '',
                phone_address: selectedEditPhone.phone_address || '',
                phone_imei: selectedEditPhone.phone_imei || '',
                phone_status: selectedEditPhone.phone_status || '',
                datePurchased: selectedEditPhone.datePurchased || '',
                remarks: selectedEditPhone.remarks || '',
                _method: 'PUT',
            });
            setHasChanges(false);
        }
    }, [selectedEditPhone]);

    // Check for changes
    useEffect(() => {
        if (selectedEditPhone) {
            const original = {
                phone_name: selectedEditPhone.phone_name || '',
                phone_num: selectedEditPhone.phone_num || '',
                phone_model: selectedEditPhone.phone_model || '',
                fullName: selectedEditPhone.fullName || '',
                department_phone: selectedEditPhone.department_phone || '',
                phone_storage: selectedEditPhone.phone_storage || '',
                phone_ram: selectedEditPhone.phone_ram || '',
                phone_serial: selectedEditPhone.phone_serial || '',
                phone_asset: selectedEditPhone.phone_asset || '',
                asset_class: selectedEditPhone.asset_class || '',
                phone_cpu: selectedEditPhone.phone_cpu || '',
                phone_address: selectedEditPhone.phone_address || '',
                phone_imei: selectedEditPhone.phone_imei || '',
                phone_status: selectedEditPhone.phone_status || '',
                datePurchased: selectedEditPhone.datePurchased || '',
                remarks: selectedEditPhone.remarks || '',
            };
            const isChanged = Object.keys(original).some(key => data[key] !== original[key]);
            setHasChanges(isChanged);
        }
    }, [data, selectedEditPhone]);

    const onSubmit =(e) =>{
        e.preventDefault();
        setLoading(true);

        // console.log("Form Data:", data); // Add this line to log form data
        post(route("phones.update", selectedEditPhone && selectedEditPhone.phone_id), {
            onSuccess: () => {
                setLoading(false);
                // console.log("Update Successful"); 
                onClose();
                reset();
            },
            onError: () => {
                setLoading(false);
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
            setImagePreview(selectedEditPhone.img_path || null);
        }
    };

    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Edit Phone - {selectedEditPhone && selectedEditPhone.phone_name}
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    {/* <pre className='bg-white'>{JSON.stringify(data, undefined, 2)}</pre> */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_name" value="Enter Phone Name" />
                            </div>
                            <TextInput
                                id="phone_name"
                                type='text'
                                name='phone_name'
                                value={data.phone_name}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("phone_name", e.target.value)}
                                required
                            />
                            <InputError message={errors.phone_name} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_num" value="Enter Phone NO:" />
                            </div>
                            <TextInput
                                id="phone_num"
                                type='number'
                                name='phone_num'
                                value={data.phone_num}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("phone_num", e.target.value)}
                                required
                            />
                            <InputError message={errors.phone_num} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_model" value="Enter Phone Model" />
                            </div>
                            <TextInput 
                                id="phone_model" 
                                type="text"
                                name='phone_model' 
                                value={data.phone_model}
                                onChange={(e) => setData("phone_model", e.target.value)}
                                required 
                            />
                            <InputError message={errors.phone_model} className='mt-2' />
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
                                {listPhoneUsersFname.map(fname => (
                                    <option key={fname.phone_id} value={fname.name}>
                                        {fname.name}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.fullName} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="department_phone" value="Choose Department" />
                            </div>
                            <SelectInput 
                                name='department_phone'
                                id="department_phone" 
                                value={data.department_phone}
                                onChange={(e) => setData("department_phone", e.target.value)}
                                required 
                            >
                                <option value="">Select Department</option>
                                {listDepartments.map(dept => (
                                    <option key={dept.dept_id} value={dept.dept_list}>
                                        {dept.dept_list}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.department_phone} className='mt-2' />
                        </div>

                    

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_storage" value="Enter Phone Storage" />
                            </div>
                            <SelectInput 
                                name='phone_storage' 
                                id="phone_storage" 
                                value={data.phone_storage}
                                onChange={(e) => setData("phone_storage", e.target.value)}
                                required 
                            >
                                <option value="">Select ROM Capacity: </option>
                                <option value="8GB">8GB</option>
                                <option value="16GB">16GB</option>
                                <option value="32GB">32GB</option>
                                <option value="64GB">64GB</option>
                                <option value="128GB">128GB</option>
                                <option value="256GB">256GB</option>
                                <option value="512GB">512GB</option>
                                <option value="1TB">1TB</option>
                                <option value="N/A">N/A</option>
                            </SelectInput>
                            <InputError message={errors.phone_storage} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_ram" value="Enter Ram Capacity" />
                            </div>
                            <SelectInput 
                                name='phone_ram' 
                                id="phone_ram"
                                value={data.phone_ram} 
                                onChange={(e) => setData("phone_ram", e.target.value)}
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
                            <InputError message={errors.phone_ram} className='mt-2' />
                        </div>



                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_serial" value="Enter Phone Serial" />
                            </div>
                            <TextInput 
                                id="phone_serial" 
                                type="text"
                                name='phone_serial' 
                                value={data.phone_serial}
                                onChange={(e) => setData("phone_serial", e.target.value)}
                                required 
                            />
                            <InputError message={errors.phone_serial} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_asset" value="Enter Phone Asset" />
                            </div>
                            <TextInput 
                                id="phone_asset" 
                                type="text"
                                name='phone_asset' 
                                value={data.phone_asset}
                                onChange={(e) => setData("phone_asset", e.target.value)}
                                required 
                            />
                            <InputError message={errors.phone_asset} className='mt-2' />
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
                                <Label htmlFor="phone_cpu" value="Enter Processor" />
                            </div>
                            <TextInput 
                                id="phone_cpu" 
                                type="text"
                                name='phone_cpu' 
                                value={data.phone_cpu}
                                onChange={(e) => setData("phone_cpu", e.target.value)}
                                required 
                            />
                            <InputError message={errors.phone_cpu} className='mt-2' />
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_address" value="Enter Mac Address" />
                            </div>
                            <TextInput 
                                id="phone_address" 
                                type="text"
                                name='phone_address' 
                                value={data.phone_address}
                                onChange={(e) => setData("phone_address", e.target.value)}
                                required 
                            />
                            <InputError message={errors.phone_address} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_imei" value="Enter IMEI" />
                            </div>
                            <TextInput 
                                id="phone_imei" 
                                type="text"
                                name='phone_imei' 
                                value={data.phone_imei}
                                onChange={(e) => setData("phone_imei", e.target.value)}
                                required 
                            />
                            <InputError message={errors.phone_imei} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone_status" value="Status" />
                            </div>
                            <SelectInput 
                                name='phone_status' 
                                id="phone_status"
                                value={data.phone_status}  // Add this line to set the value 
                                onChange={(e) => setData("phone_status", e.target.value)}
                                required 
                            >
                                <option value="">Select Status: </option>
                                <option value="Deployed">Deployed</option>
                                <option value="Spare">Spare</option>
                                <option value="For Disposal">For Disposal</option>
                                <option value="Already Disposed">Already Disposed</option>
                                <option value="Borrow">Borrow</option>
                            </SelectInput>
                            <InputError message={errors.phone_status} className='mt-2' />
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
                                htmlFor="phones_img_path"
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
                                    id="phones_img_path" 
                                    name='img_path'
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </Label>
                            <InputError message={errors.img_path} className='mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={route('phones.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
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
    );
};

export default EditModalComponent;
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';




const CreateModalComponent = ({ show, onClose, departmentsList, serverUpsUsersList }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        S_UName: '',
        img_path: '',
        S_UModel: '',
        S_UType: '',
        S_UUser: '',
        department_S_U: '',
        S_UOs: '',
        S_UStorage: '',
        S_USerial: '',
        S_UAsset: '',
        S_UCpu: '',
        S_UGen: '',
        S_UAddress: '',
        S_UPrdctkey: '',
        S_UStatus: '',
        S_URemarks: '',
    })
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit =(e) =>{
        e.preventDefault();

        post(route("serverUps.store"), {
            onSuccess: () => {
                onClose();
                reset();
            }
        });
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("img_path", file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Add New Server / UPS
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UName" value="Enter Server/Ups Name" />
                            </div>
                            <TextInput
                                id="S_UName"
                                type='text'
                                name='S_UName'
                                value={data.S_UName}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("S_UName", e.target.value)}
                                required
                            />
                            <InputError message={errors.S_UName} className='mt-2' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UModel" value="Enter Server / UPS Model" />
                            </div>
                            <TextInput
                                id="S_UModel"
                                type='text'
                                name='S_UModel'
                                value={data.S_UModel}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("S_UModel", e.target.value)}
                                required
                            />
                            <InputError message={errors.S_UModel} className='mt-2' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UType" value="Choose Type:" />
                            </div>
                            <SelectInput 
                                name='S_UType' 
                                id="S_UType" 
                                onChange={(e) => setData("S_UType", e.target.value)}
                                required 
                            >
                                <option value="">Select Type: </option>
                                <option value="SERVER">SERVER</option>
                                <option value="UPS">UPS</option>
                            </SelectInput>
                            <InputError message={errors.S_UType} className='mt-2' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UUser" value="Choose User" />
                            </div>
                            <SelectInput 
                                name='S_UUser'
                                id="S_UUser" 
                                value={data.S_UUser}
                                onChange={(e) => setData("S_UUser", e.target.value)}
                                required 
                            >
                                <option value="">Select User</option>
                                {serverUpsUsersList.map(serverups => (
                                    <option key={serverups.S_UID} value={serverups.initial}>
                                        {serverups.initial}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.S_UUser} className='mt-2' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="department_S_U" value="Choose Department" />
                            </div>
                            <SelectInput 
                                name='department_S_U'
                                id="department_S_U" 
                                value={data.department_S_U}
                                onChange={(e) => setData("department_S_U", e.target.value)}
                                required 
                            >
                                <option value="">Select Department</option>
                                {departmentsList.map(dept => (
                                    <option key={dept.dept_id} value={dept.dept_list}>
                                        {dept.dept_list}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.department_S_U} className='mt-2' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UOs" value="Enter Server / UPS OS" />
                            </div>
                            <SelectInput 
                                name='S_UOs' 
                                id="S_UOs" 
                                onChange={(e) => setData("S_UOs", e.target.value)}
                                required 
                            >
                                <option value="">Select Operating System: </option>
                                <option value="Windows Server 2012 R2 Standard">Windows Server 2012 R2 Standard</option>
                                <option value="Windows 7 Professional SP1">Windows 7 Professional SP1</option>
                                <option value="Windows 8.1 Pro 64bit">Windows 8.1 Pro 64bit</option>
                                <option value="Windows 10 Pro 64bit">Windows 10 Pro 64bit</option>
                                <option value="Windows 11 Pro">Windows 11 Pro</option>
                                <option value="N/A">N/A</option>
                            </SelectInput>
                            <InputError message={errors.S_UOs} className='mt-2' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UStorage" value="Enter Ram Capacity" />
                            </div>
                            <SelectInput 
                                name='S_UStorage' 
                                id="S_UStorage" 
                                onChange={(e) => setData("S_UStorage", e.target.value)}
                                required 
                            >
                                <option value="">Select Operating System: </option>
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
                            <InputError message={errors.S_UStorage} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_USerial" value="Enter Serial No" />
                            </div>
                            <TextInput 
                                id="S_USerial" 
                                type="text"
                                name='S_USerial' 
                                value={data.S_USerial}
                                onChange={(e) => setData("S_USerial", e.target.value)}
                                required 
                            />
                            <InputError message={errors.S_USerial} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UAsset" value="Enter Asset Tag" />
                            </div>
                            <TextInput 
                                id="S_UAsset" 
                                type="text"
                                name='S_UAsset' 
                                value={data.S_UAsset}
                                onChange={(e) => setData("S_UAsset", e.target.value)}
                                required 
                            />
                            <InputError message={errors.S_UAsset} className='mt-2' />
                        </div>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UCpu" value="Enter Processor" />
                            </div>
                            <TextInput 
                                id="S_UCpu" 
                                type="text"
                                name='S_UCpu' 
                                value={data.S_UCpu}
                                onChange={(e) => setData("S_UCpu", e.target.value)}
                                required 
                            />
                            <InputError message={errors.S_UCpu} className='mt-2' />
                        </div>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UGen" value="Select Gen:" />
                            </div>
                            <SelectInput 
                                name='S_UGen' 
                                id="S_UGen" 
                                onChange={(e) => setData("S_UGen", e.target.value)}
                                required 
                            >
                                <option value="">Select Generation: </option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                                <option value="13th">13th</option>
                                <option value="14th">14th</option>
                                <option value="15th">15th</option>
                                <option value="16th">16th</option>
                                <option value="17th">17th</option>
                                <option value="Pentium">Pentium</option>
                                <option value="N/A">N/A</option>
                            </SelectInput>
                            <InputError message={errors.S_UGen} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UAddress" value="Enter Server / UPS Address" />
                            </div>
                            <TextInput 
                                id="S_UAddress" 
                                type="text"
                                name='S_UAddress' 
                                value={data.S_UAddress}
                                onChange={(e) => setData("S_UAddress", e.target.value)}
                                required 
                            />
                            <InputError message={errors.S_UAddress} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UPrdctkey" value="Enter Product Key" />
                            </div>
                            <TextInput 
                                id="S_UPrdctkey" 
                                type="text"
                                name='S_UPrdctkey' 
                                value={data.S_UPrdctkey}
                                onChange={(e) => setData("S_UPrdctkey", e.target.value)}
                                required 
                            />
                            <InputError message={errors.S_UPrdctkey} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_UStatus" value="Server / UPS Status" />
                            </div>
                            <SelectInput 
                                name='S_UStatus' 
                                id="S_UStatus" 
                                onChange={(e) => setData("S_UStatus", e.target.value)}
                                required 
                            >
                                <option value="">Select Computer Status: </option>
                                <option value="Deployed">Deployed</option>
                                <option value="Spare">Spare</option>
                                <option value="For Disposal">For Disposal</option>
                                <option value="Already Disposed">Already Disposed</option>
                                <option value="Barrow">Barrow</option>
                            </SelectInput>
                            <InputError message={errors.S_UStatus} className='mt-2' />
                        </div>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="S_URemarks" value="Remarks" />
                            </div>
                            <TextInput 
                                id="S_URemarks" 
                                type="text"
                                name='S_URemarks' 
                                value={data.S_URemarks}
                                onChange={(e) => setData("S_URemarks", e.target.value)}
                                required 
                            />
                            <InputError message={errors.S_URemarks} className='mt-2' />
                        </div>
                        

                        <div className="flex-row w-full items-center justify-center">
                            <Label
                                htmlFor="su_img_path"
                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    {
                                        imagePreview ? (
                                            <div className="mt-4">
                                                <img src={imagePreview} alt="Image Preview" className="h-52 w-52 object-cover rounded-full" />
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
                                    {/* {imagePreview && (
                                        <div className="mt-4">
                                            <img src={imagePreview} alt="Profile Preview" className="h-32 w-32 object-cover rounded-full" />
                                        </div>
                                    )} */}
                                </div>
                                <FileInput 
                                    id="su_img_path" 
                                    name='img_path' 
                                    // onChange={(e) => setData("img_path", e.target.files[0])} 
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </Label>
                            <InputError message={errors.img_path} className='mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={route('serverUps.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
                                Cancel
                            </Link>
                            <button className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                                Submit
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

export default CreateModalComponent;
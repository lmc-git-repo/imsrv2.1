import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';




const CreateModalComponent = ({ show, onClose, departmentsList, prntrUsersList }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        // compName: '',
        printer_user: '',
        img_path: '',
        printer_department: '',
        printer_model: '',
        printer_serial: '',
        printer_asset: '',
        remarks: '',
    })
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit =(e) =>{
        e.preventDefault();
        // console.log("Form Data:", data);
        post(route("printers.store"), {
            onSuccess: () => {
                // console.log("Success:", response);
                onClose();
                reset();
            },
            // onError: (errors) => {
            //     console.log("Errors:", errors);
            // }
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
                Add New Printer
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    <div className="space-y-6">
                        {/* //!Must be Select Input for compName */}
                        {/* <div>
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
                                {compNameList.map(comp_mntr => (
                                    <option key={comp_mntr.monitor_id} value={comp_mntr.comp_name}>
                                        {comp_mntr.comp_name}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.compName} className='mt-2' />
                        </div> */}
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="printer_user" value="Choose User" />
                            </div>
                            <SelectInput 
                                name='printer_user'
                                id="printer_user" 
                                value={data.printer_user}
                                onChange={(e) => setData("printer_user", e.target.value)}
                                required 
                            >
                                <option value="">Select User</option>
                                {prntrUsersList.map(prntr => (
                                    <option key={prntr.printer_id} value={prntr.name}>
                                        {prntr.name}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.printer_user} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="printer_department" value="Choose Department" />
                            </div>
                            <SelectInput 
                                name='printer_department'
                                id="printer_department" 
                                value={data.printer_department}
                                onChange={(e) => setData("printer_department", e.target.value)}
                                required 
                            >
                                <option value="">Select Department</option>
                                {departmentsList.map(dept => (
                                    <option key={dept.dept_id} value={dept.dept_list}>
                                        {dept.dept_list}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.printer_department} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="printer_model" value="Enter Printer Model" />
                            </div>
                            <TextInput
                                id="printer_model"
                                type='text'
                                name='printer_model'
                                value={data.printer_model}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("printer_model", e.target.value)}
                                required
                            />
                            <InputError message={errors.printer_model} className='mt-2' />
                        </div>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="printer_serial" value="Enter Printer Serial" />
                            </div>
                            <TextInput 
                                id="printer_serial" 
                                type="text"
                                name='printer_serial' 
                                value={data.printer_serial}
                                onChange={(e) => setData("printer_serial", e.target.value)}
                                required 
                            />
                            <InputError message={errors.printer_serial} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="printer_asset" value="Enter Printer Asset" />
                            </div>
                            <TextInput 
                                id="printer_asset" 
                                type="text"
                                name='printer_asset' 
                                value={data.printer_asset}
                                onChange={(e) => setData("printer_asset", e.target.value)}
                                required 
                            />
                            <InputError message={errors.printer_asset} className='mt-2' />
                        </div>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="remarks" value="Remarks" />
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
                                htmlFor="prntr_img_path"
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
                                    id="prntr_img_path" 
                                    name='img_path' 
                                    // onChange={(e) => setData("img_path", e.target.files[0])} 
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </Label>
                            <InputError message={errors.img_path} className='mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={route('printers.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
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
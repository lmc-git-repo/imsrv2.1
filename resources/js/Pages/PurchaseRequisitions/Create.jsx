import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';




const CreateModalComponent = ({ show, onClose, departmentsList }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        control_num: '',
        po_num: '',
        img_path: '',
        description: '',
        qty: '',
        unit_price: '',
        total: '',
        date_required: '',
        department_pr: '',
        purpose: '',
        item_category: '',
        remarks: '',
    })

    const handleDecimalChange = (name, value) => {
        const decimalValue = parseFloat(value).toFixed(2);
        setData((prevData) => ({
            ...prevData,
            [name]: decimalValue,
        }));
    };

    useEffect(() => {
        const qty = parseFloat(data.qty) || 0;
        const unit_price = parseFloat(data.unit_price) || 0;
        const total = (qty * unit_price).toFixed(2); // Format total to two decimal places
        // setData('total', qty * unit_price);
        setData((prevData) => ({
            ...prevData,
            total: total,
        }));
    }, [data.qty, data.unit_price]);

    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit =(e) =>{
        e.preventDefault();
        
        post(route("purchase_requisitions.store"), {
            onSuccess: () => {
                onClose();
                reset();
            },
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
        <Modal show={show} onClose={onClose}>
            <Modal.Header className="p-4">
                Add New Purchase Requisitions
            </Modal.Header>
            <Modal.Body>
                <form action="" onSubmit={onSubmit}>
                    <div className="space-y-6">
                        {/* <div className='border flex justify-around'> */}
                            <div className='borderSeparation'>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="control_num" value="Enter Control Number" />
                                    </div>
                                    <TextInput
                                        id="control_num"
                                        type='text'
                                        name='control_num'
                                        value={data.control_num}
                                        // placeholder=""
                                        // isFocused={true}
                                        onChange={(e) => setData("control_num", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.control_num} className='mt-2' />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="po_num" value="Enter PO Number" />
                                    </div>
                                    <TextInput
                                        id="po_num"
                                        type='text'
                                        name='po_num'
                                        value={data.po_num}
                                        onChange={(e) => setData("po_num", e.target.value)}
                                    />
                                    <InputError message={errors.po_num} className='mt-2' />
                                </div>
                                

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Description: " />
                                    </div>
                                    <TextInput
                                        id="description"
                                        type='text'
                                        name='description'
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                    />
                                    <InputError message={errors.description} className='mt-2' />
                                </div>
                            </div>

                            <div className='borderSeparation'>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="qty" value="Enter QTY: " />
                                    </div>
                                    <TextInput
                                        id="qty"
                                        type='number'
                                        name='qty'
                                        value={data.qty}
                                        onChange={(e) => setData("qty", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.qty} className='mt-2' />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="unit_price" value="Enter Unit Price: " />
                                    </div>
                                    <TextInput
                                        id="unit_price"
                                        type='number'
                                        name='unit_price'
                                        value={data.unit_price}
                                        // onChange={(e) => setData("unit_price", e.target.value)}
                                        onChange={(e) => handleDecimalChange("unit_price", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.unit_price} className='mt-2' />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="total" value="TOTAL: " />
                                    </div>
                                    <TextInput
                                        id="total"
                                        type='number'
                                        name='total'
                                        disabled
                                        value={data.total}
                                        onChange={(e) => setData("total", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.total} className='mt-2' />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="date_required" value="Date Required: " />
                                    </div>
                                    <TextInput
                                        id="date_required"
                                        type='date'
                                        name='date_required'
                                        value={data.date_required}
                                        onChange={(e) => setData("date_required", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.date_required} className='mt-2' />
                                </div>


                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="department_pr" value="Choose Department" />
                                    </div>
                                    <SelectInput 
                                        name='department_pr'
                                        id="department_pr" 
                                        value={data.department_pr}
                                        onChange={(e) => setData("department_pr", e.target.value)}
                                        required 
                                    >
                                        <option value="">Select Department</option>
                                        {departmentsList.map(dept => (
                                            <option key={dept.dept_id} value={dept.dept_list}>
                                                {dept.dept_list}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.department_pr} className='mt-2' />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="purpose" value="Purpose: " />
                                    </div>
                                    <TextInput
                                        id="purpose"
                                        type='text'
                                        name='purpose'
                                        value={data.purpose}
                                        onChange={(e) => setData("purpose", e.target.value)}
                                    />
                                    <InputError message={errors.purpose} className='mt-2' />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="item_category" value="Item Category:" />
                                    </div>
                                    <SelectInput 
                                        name='item_category' 
                                        id="item_category" 
                                        onChange={(e) => setData("item_category", e.target.value)}
                                        required 
                                    >
                                        <option value="">Category: </option>
                                        <option value="Consumables">Consumables</option>
                                        <option value="Repair and Maintenance">Repair and Maintenance</option>
                                    </SelectInput>
                                    <InputError message={errors.item_category} className='mt-2' />
                                </div>
                                
                            </div>
                        {/* </div> */}
                        
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
                                htmlFor="consumables_img_path"
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
                                    id="consumables_img_path" 
                                    name='img_path' 
                                    // onChange={(e) => setData("img_path", e.target.files[0])} 
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </Label>
                            <InputError message={errors.img_path} className='mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={route('purchase_requisitions.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
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
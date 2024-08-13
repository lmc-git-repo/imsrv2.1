import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';




const EditModalComponent = ({ show, onClose, selectedEdit }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        name: selectedEdit.name || '',
        email: selectedEdit.email || '',
        password: selectedEdit.password || '',
        password_confirmation: selectedEdit.password_confirmation || '',
        role: selectedEdit.role || '',
        _method: 'PUT',
    });

    const onSubmit =(e) =>{
        e.preventDefault();
        // console.log("Form Data:", data); // Add this line to log form data
        post(route("user.update", selectedEdit && selectedEdit.id), {
            onSuccess: () => {
                // console.log("Update Successful"); 
                onClose();
                reset();
            },
            onError: (errors) => {
                // Handle errors if needed
                console.error(errors);
            }
        });
    }
    
    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Edit User - {selectedEdit && selectedEdit.name}
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    {/* <pre className='bg-white'>{JSON.stringify(data, undefined, 2)}</pre> */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Enter User Name" />
                            </div>
                            <TextInput
                                id="name"
                                type='text'
                                name='name'
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Enter Email" />
                            </div>
                            <TextInput
                                id="email"
                                type='text'
                                name='email'
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Enter Password" />
                            </div>
                            <TextInput
                                id="password"
                                type='password'
                                name='password'
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <InputError message={errors.password} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password_confirmation" value="Enter Password" />
                            </div>
                            <TextInput
                                id="password_confirmation"
                                type='password'
                                name='password_confirmation'
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                            />
                            <InputError message={errors.password_confirmation} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="role" value="Select Role:" />
                            </div>
                            <SelectInput 
                                name='role' 
                                id="role"
                                value={data.role} 
                                onChange={(e) => setData("role", e.target.value)}
                            >
                                <option value="">Select Role: </option>
                                <option value="super admin">Super Admin</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="user">User</option>
                            </SelectInput>
                            <InputError message={errors.role} className='mt-2' />
                        </div>
                        
                        <div className='flex justify-end'>
                            <Link href={route('user.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
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

export default EditModalComponent;
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';


const CreateModalComponent = ({ show, onClose }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
    })

    const [loading, setLoading] = useState(false);

    const onSubmit =(e) =>{
        e.preventDefault();
        setLoading(true);

        post(route("user.store"), {
            onSuccess: () => {
                setLoading(false);
                onClose();
                reset();
            },
            onError: () =>{
                setLoading(false);
            }
        });
    }

    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Add New User
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
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
                                type='email'
                                name='email'
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="user_password" value="Enter Password" />
                            </div>
                            <TextInput
                                id="user_password"
                                type='password'
                                name='password'
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <InputError message={errors.password} className='mt-2' />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="user_password_confirmation" value="Re-type your Password" />
                            </div>
                            <TextInput
                                id="user_password_confirmation"
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
                                onChange={(e) => setData("role", e.target.value)}
                                required 
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
                            <button 
                                type="submit" 
                                className={`bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`} 
                                disabled={loading}
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
                                    'Submit'
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

export default CreateModalComponent;
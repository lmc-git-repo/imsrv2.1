import InputError from '@/Components/InputError';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';


const CreateModalComponent = ({ show, onClose }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        dept_list: '',
    })

    const [loading, setLoading] = useState(false);

    const onSubmit =(e) =>{
        e.preventDefault();
        setLoading(true);


        post(route("departments.store"), {
            onSuccess: () => {
                setLoading(false);
                onClose();
                reset();
            },
            onError: () => {
                setLoading(false);
            }
        });
    }

    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Add New Department
            </Modal.Header>
            <Modal.Body className=''>
                <form action="" onSubmit={onSubmit}>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="dept_list" value="Enter Department Name" />
                            </div>
                            <TextInput
                                id="dept_list"
                                type='text'
                                name='dept_list'
                                value={data.dept_list}
                                // placeholder=""
                                // isFocused={true}
                                onChange={(e) => setData("dept_list", e.target.value)}
                                required
                            />
                            <InputError message={errors.dept_list} className='mt-2' />
                        </div>
                        
                        <div className='flex justify-end'>
                            <Link href={route('departments.index')} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>
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
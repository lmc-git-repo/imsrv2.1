import InputError from '@/Components/InputError';
import { Link, useForm } from '@inertiajs/react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';


const CreateModalComponent = ({ show, onClose }) => {
    if (!show) return null;

    const {data, setData, post, errors, reset} = useForm({
        dept_list: '',
    })

    const onSubmit =(e) =>{
        e.preventDefault();

        post(route("departments.store"), {
            onSuccess: () => {
                onClose();
                reset();
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
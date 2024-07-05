import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Modal, Button, FileInput, Label, TextInput } from 'flowbite-react';





const CreateModalComponent = ({ show, onClose, auth }) => {
    if (!show) return null;
    
    return (
        <Modal show={show} onClose={onClose }>
            <Modal.Header className="p-4">
                Add New Employee
            </Modal.Header>
            <Modal.Body className=''>
                <div className="space-y-6">
                    {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3> */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Enter Full Name" />
                        </div>
                        <TextInput
                            // id="name"
                            // placeholder="name@company.com"
                            // onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="department_users" value="Choose Department" />
                        </div>
                        <TextInput id="department_users" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="initial" value="Enter Initial" />
                        </div>
                        <TextInput id="initial" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="status" value="Status" />
                        </div>
                        <TextInput id="status" type="text" required />
                    </div>

                    <div className="flex w-full items-center justify-center">
                        <Label
                            htmlFor="profile_path"
                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                            <FileInput id="profile_path" className="hidden" />
                        </Label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose } color="blue">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModalComponent;

// export default function Create() {
//     return (
//         <AuthenticatedLayout>
//             <CreateModalComponent show={showCreateModal} onClose={closeCreateModal} />
//         </AuthenticatedLayout>
//     )
// }
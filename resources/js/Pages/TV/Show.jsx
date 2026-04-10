import { Modal, Button } from 'flowbite-react';
import { useEffect } from 'react';

const getStatusClass = (status) => {
    switch (status) {
        case 'Deployed':
            return 'bg-green-600';
        case 'Spare':
            return 'bg-yellow-500';
        case 'For Disposal':
            return 'bg-red-500';
        case 'Borrow':
            return 'bg-blue-500';
        default:
            return 'bg-gray-500';
    }
};

const ModalComponent = ({ show, onClose, user }) => {
    useEffect(() => {
        if (!show) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
                if (typeof onClose === 'function') onClose();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [show, onClose]);

    if (!user) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header className="p-4">
                {user.brand}
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div className='text-center'>
                        <p className="text-base leading-relaxed text-white">
                            <strong>{user.brand?.toUpperCase()}</strong>
                        </p>
                    </div>

                    <div className="flex justify-around p-1">
                        <div className="rounded p-3 w-full">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>TV ID:</strong> {user.TID}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Brand:</strong> {user.brand}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Model:</strong> {user.model}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Tag:</strong> {user.asset_tag}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Location:</strong> {user.location}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Serial Number:</strong> {user.serial_number}</p>
                        </div>

                        <div className="rounded p-3 w-full">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                <strong className='pe-4'>Status:</strong>
                                <span className={'px-2 rounded-e-full text-white ' + getStatusClass(user.status)}>
                                    {user.status}
                                </span>
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Date Purchased:</strong> {user.datePurchased || 'N/A'}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {user.created_by_name}</p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {user.created_at_formatted}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} color="blue">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;
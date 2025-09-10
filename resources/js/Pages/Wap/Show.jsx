// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { forwardRef } from 'react';

const ModalComponent = forwardRef(function ModalComponent({ show, onClose, wap }, ref) {
  if (!wap) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {wap.device_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{wap.device_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {wap.id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Model:</strong> {wap.model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>IP Address:</strong> {wap.ip_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Serial Number:</strong> {wap.serial_number}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {wap.username}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {wap.password}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {wap.createdBy?.name || 'N/A'}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {wap.created_at}</p>
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
});

ModalComponent.displayName = 'WAPShowModal';

export default ModalComponent;
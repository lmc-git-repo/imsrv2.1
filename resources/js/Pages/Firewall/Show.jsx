// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { forwardRef } from 'react';

const ModalComponent = forwardRef(function ModalComponent({ show, onClose, firewall }, ref) {
  if (!firewall) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {firewall.device_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{firewall.device_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {firewall.id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Model:</strong> {firewall.model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>IP Address:</strong> {firewall.ip_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {firewall.username}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {firewall.password}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {firewall.createdBy?.name}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {firewall.created_at}</p>
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

ModalComponent.displayName = 'FirewallShowModal';

export default ModalComponent;
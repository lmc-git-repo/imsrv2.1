// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { forwardRef } from 'react';

const ShowServer = forwardRef(function ShowServer({ show, onClose, server }, ref) {
  if (!server) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {server.device_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{server.device_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {server.id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Model:</strong> {server.model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>IP Address:</strong> {server.ip_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {server.username}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {server.password}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {server.createdBy?.name}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {server.created_at}</p>
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

ShowServer.displayName = 'ShowServer';

export default ShowServer;
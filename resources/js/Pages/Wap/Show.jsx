import { Modal, Button } from 'flowbite-react';
import { forwardRef, useEffect } from 'react';

const ModalComponent = forwardRef(function ModalComponent({ show, onClose, wap }, ref) {
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

  if (!wap) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {wap.device_name?.trim() || 'Unnamed Device'}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className='text-center'>
            <p className="text-base leading-relaxed text-white">
              <strong>{wap.device_name?.toUpperCase().trim() || 'UNKNOWN DEVICE'}</strong>
            </p>
          </div>
          <div className="flex justify-around p-1">
            <div className="rounded p-3 w-full">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {wap.id ?? 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Model:</strong> {wap.model?.trim() || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>IP Address:</strong> {wap.ip_address?.trim() || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Serial Number:</strong> {wap.serial_number?.trim() || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {wap.username?.trim() || 'N/A'}</p>
            </div>
            <div className="rounded p-3 w-full">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Switch Connected:</strong> {wap.switch_connected?.trim() || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Port Number:</strong> {wap.port_number || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {wap.password?.trim() || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {wap.created_by || 'N/A'}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {wap.created_at || 'N/A'}</p>
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

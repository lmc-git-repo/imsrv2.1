// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { forwardRef } from 'react';

const ModalComponent = forwardRef(function ModalComponent({ show, onClose, cctv }, ref) {
  if (!cctv) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {cctv.cctv_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{cctv.cctv_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {cctv.id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Hikvision Model:</strong> {cctv.hikvision_model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>CCTV Name:</strong> {cctv.cctv_name}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>IP Address:</strong> {cctv.ip_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {cctv.username}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {cctv.password}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Installer/Supplier:</strong> {cctv.installer_supplier}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {cctv.createdBy?.name}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created Date:</strong> {cctv.created_at}</p>
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

ModalComponent.displayName = 'CCTVShowModal';

export default ModalComponent;
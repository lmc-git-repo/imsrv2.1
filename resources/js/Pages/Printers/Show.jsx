// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
// import { COMPUTERS_STATUS_CLASS_MAP, COMPUTERS_STATUS_TEXT_MAP } from '@/constants'

const ModalComponent = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {user.printer_model}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.printer_user}'s printer`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{user.printer_model.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="border rounded p-3 w-full">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.printer_id}</p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Printer User:</strong> {user.printer_user}</p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.printer_department}</p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Printer Model:</strong> {user.printer_model}</p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Printer Serial:</strong> {user.printer_serial}</p>
                </div>
                <div className="border rounded p-3 w-full">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Printer Asset:</strong> {user.printer_asset}</p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {user.createdBy.name}</p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {user.created_at}</p>
                </div>
            </div>
            <div className='border rounded'>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 p-1"><strong>Remarks :</strong> {user.remarks}</p>
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
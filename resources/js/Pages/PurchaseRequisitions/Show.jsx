// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { PHONES_STATUS_CLASS_MAP, PHONES_STATUS_TEXT_MAP } from '@/constants'

const ModalComponent = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {user.control_num}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.control_num}'s profile`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{user.control_num.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="border rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>PR ID:</strong> {user.pr_id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>PO NO:</strong> {user.po_num}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Description:</strong> {user.description}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>QTY:</strong> {user.qty}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Unit Price:</strong> {'₱ ' + user.unit_price}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Total:</strong> {'₱ ' + user.total}</p>
                </div>
                <div className="border rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Date Required:</strong> {user.date_required}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_pr}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Purpose:</strong> {user.purpose}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Category:</strong> {user.item_category}</p>
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
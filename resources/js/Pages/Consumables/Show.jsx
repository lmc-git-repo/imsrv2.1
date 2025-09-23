import { Modal, Button } from 'flowbite-react';
import { useEffect } from 'react'

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
        {user.po_num}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.po_num}'s profile`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>PO: {user.po_num.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.consumables_id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Serial NO:</strong> {user.serial_no}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>SI CODE:</strong> {user.si_code}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Brand:</strong> {user.brand}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Model:</strong> {user.model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Storage Capacity:</strong> {user.storage_capacity}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>QTY:</strong> {user.qty}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Price:</strong> {'₱ ' + user.price}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Total:</strong> {'₱ ' + user.total}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Date Issued:</strong> {user.dateIssued}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Full Name:</strong> {user.installedTo}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Delivery Date:</strong> {user.deliveryRecieptDate}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_consumables}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {user.createdBy.name}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {user.created_at}</p>
                </div>
            </div>
            <div className='rounded'>
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
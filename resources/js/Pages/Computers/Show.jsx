import { Modal, Button } from 'flowbite-react';
import { COMPUTERS_STATUS_CLASS_MAP, COMPUTERS_STATUS_TEXT_MAP } from '@/constants'
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
        {user.comp_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.comp_name}'s profile`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{user.comp_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.CID}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Model:</strong> {user.comp_model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Type:</strong> {user.comp_type}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer User:</strong> {user.comp_user}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Full Name:</strong> {user.fullName}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_comp}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Operating System:</strong> {user.comp_os}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Ram Capacity:</strong> {user.comp_storage}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Serial:</strong> {user.comp_serial}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Tag:</strong> {user.comp_asset}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Classification:</strong> {user.asset_class}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Processor:</strong> {user.comp_cpu}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Gen:</strong> {user.comp_gen}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Mac Address:</strong> {user.comp_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Product Key:</strong> {user.comp_prdctkey}</p>  
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong className='pe-4'>Status:</strong> 
                        <span className={'px-2 rounded-e-full text-white ' + COMPUTERS_STATUS_CLASS_MAP[user.comp_status]}>{COMPUTERS_STATUS_TEXT_MAP[user.comp_status]}</span>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Date Purchased:</strong> {user.datePurchased}</p>  
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
import { Modal, Button } from 'flowbite-react';
import { TABLETS_STATUS_CLASS_MAP, TABLETS_STATUS_TEXT_MAP } from '@/constants'
import { useEffect } from 'react';

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
        {user.tablet_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.tablet_name}'s profile`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{user.tablet_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.tablet_id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Tablet Model:</strong> {user.tablet_model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Tablet User:</strong> {user.tablet_user}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Full Name:</strong> {user.fullName}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_tablet}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Operating System:</strong> {user.tablet_os}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Ram Capacity:</strong> {user.tablet_storage}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Tablet Serial:</strong> {user.tablet_serial}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Tag:</strong> {user.tablet_asset}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Classification:</strong> {user.asset_class}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Processor:</strong> {user.tablet_cpu}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Tablet Gen:</strong> {user.tablet_gen}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Mac Address:</strong> {user.tablet_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Product Key:</strong> {user.tablet_prdctkey}</p>  
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong className='pe-4'>Status:</strong> 
                        <span className={'px-2 rounded-e-full text-white ' + TABLETS_STATUS_CLASS_MAP[user.tablet_status]}>{TABLETS_STATUS_TEXT_MAP[user.tablet_status]}</span>
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
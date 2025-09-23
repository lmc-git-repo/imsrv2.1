import { Modal, Button } from 'flowbite-react';
import { ACCOUNTUSERS_STATUS_CLASS_MAP, ACCOUNTUSERS_STATUS_TEXT_MAP } from '@/constants'
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
        {user.name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img src={user.profile_path} alt={`${user.name}'s profile`} className="mt-3 size-2/4" />
          </div>
          <div className="flex justify-around">
            <div className="rounded p-3 w-full">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.account_id}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_users}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Initials:</strong> {user.initial}</p>
            </div>
            <div className="rounded p-3 w-full">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Email:</strong> {user.outlookEmail}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {user.password}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <strong className='pe-4'>Status:</strong>
                <span className={'px-2 rounded-e-full text-white ' + ACCOUNTUSERS_STATUS_CLASS_MAP[user.status]}>{ACCOUNTUSERS_STATUS_TEXT_MAP[user.status]}</span>
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {user.createdBy.name}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {user.created_at}</p>
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
};

export default ModalComponent;
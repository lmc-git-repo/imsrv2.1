import { Modal, Button } from 'flowbite-react';
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
        {user.equipmentName}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* <div className="flex justify-center">
            <img src={user.profile_path} alt={`${user.equipmentName}'s profile`} className="mt-3 size-2/4" />
          </div> */}
          <div className="flex justify-around">
            <div className="rounded p-3 w-full">
              {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {user.id}</p> */}
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Management Ip:</strong> {user.managementIp}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {user.username}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {user.password}</p>
            </div>
            <div className="rounded p-3 w-full">
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
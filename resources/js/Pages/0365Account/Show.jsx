
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
        {user.email}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex justify-around">
            <div className="rounded p-3 w-full">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {user.email}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {user.password}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <strong>Status:</strong>{' '}
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </p>
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
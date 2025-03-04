import { Modal, Button } from 'flowbite-react';

const ModalComponent = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {user.email}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* <div className="flex justify-center">
            <img src={user.profile_path} alt={`${user.email}'s profile`} className="mt-3 size-2/4" />
          </div> */}
          <div className="flex justify-around">
            <div className="rounded p-3 w-full">
              {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ID:</strong> {user.id}</p> */}
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Username:</strong> {user.email}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Password:</strong> {user.password}</p>
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
// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { SERVERUPS_STATUS_CLASS_MAP, SERVERUPS_STATUS_TEXT_MAP } from '@/constants'

const ModalComponent = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {user.S_UName}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.S_UName}'s profile`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{user.S_UName.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.S_UID}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Model:</strong> {user.S_UModel}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Type:</strong> {user.S_UType}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer User:</strong> {user.S_UUser}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_S_U}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Operating System:</strong> {user.S_UOs}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Ram Capacity:</strong> {user.S_UStorage}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Serial:</strong> {user.S_USerial}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Tag:</strong> {user.S_UAsset}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Classification:</strong> {user.asset_class}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Processor:</strong> {user.S_UCpu}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Computer Gen:</strong> {user.S_UGen}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Mac Address:</strong> {user.S_UAddress}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Product Key:</strong> {user.S_UPrdctkey}</p>  
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong className='pe-4'>Status:</strong> 
                        {/* {user.status} */}
                        <span className={'px-2 rounded-e-full text-white ' + SERVERUPS_STATUS_CLASS_MAP[user.S_UStatus]}>{SERVERUPS_STATUS_TEXT_MAP[user.S_UStatus]}</span>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created By:</strong> {user.createdBy.name}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Created At:</strong> {user.created_at}</p>
                </div>
            </div>
            <div className='rounded'>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 p-1"><strong>Remarks :</strong> {user.S_URemarks}</p>
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
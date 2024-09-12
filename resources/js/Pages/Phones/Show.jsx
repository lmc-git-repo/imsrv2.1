// Components-ModalComponent.jsx
import { Modal, Button } from 'flowbite-react';
import { PHONES_STATUS_CLASS_MAP, PHONES_STATUS_TEXT_MAP } from '@/constants'

const ModalComponent = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="p-4">
        {user.phone_name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            <div className="flex justify-center">
                <img src={user.img_path} alt={`${user.phone_name}'s profile`} className="mt-3 size-2/4" />
            </div>
            <div className='text-center'>
                <p className="text-base leading-relaxed text-white"><strong>{user.phone_name.toUpperCase()}</strong></p>
            </div>
            <div className="flex justify-around p-1">
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Account ID:</strong> {user.phone_id}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Phone NO:</strong> {user.phone_num}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Phone Model:</strong> {user.phone_model}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Full Name:</strong> {user.fullName}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Department:</strong> {user.department_phone}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>ROM Capacity:</strong> {user.phone_storage}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>RAM Capacity:</strong> {user.phone_ram}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Phone Serial:</strong> {user.phone_serial}</p>
                </div>
                <div className="rounded p-3 w-full">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Tag:</strong> {user.phone_asset}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Asset Classification:</strong> {user.asset_class}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Processor:</strong> {user.phone_cpu}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>Mac Address:</strong> {user.phone_address}</p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"><strong>IMEI:</strong> {user.phone_imei}</p>  
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong className='pe-4'>Status:</strong> 
                        {/* {user.status} */}
                        <span className={'px-2 rounded-e-full text-white ' + PHONES_STATUS_CLASS_MAP[user.phone_status]}>{PHONES_STATUS_TEXT_MAP[user.phone_status]}</span>
                    </p>
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
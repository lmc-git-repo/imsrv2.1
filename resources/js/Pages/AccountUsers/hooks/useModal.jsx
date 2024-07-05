import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return {
    showModal,
    selectedUser,
    openModal,
    closeModal,
  };
};

export default useModal;

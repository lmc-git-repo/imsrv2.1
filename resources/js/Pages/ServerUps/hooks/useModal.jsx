import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedServerUps, setSelectedServerUps] = useState(null);

  const openModal = (serverups, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedServerUps(serverups);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedServerUps(null);
  };

  return {
    showModal,
    selectedServerUps,
    openModal,
    closeModal,
  };
};

export default useModal;

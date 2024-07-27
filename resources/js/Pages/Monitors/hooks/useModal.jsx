import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMntr, setSelectedMntr] = useState(null);

  const openModal = (mntr, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedMntr(mntr);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMntr(null);
  };

  return {
    showModal,
    selectedMntr,
    openModal,
    closeModal,
  };
};

export default useModal;

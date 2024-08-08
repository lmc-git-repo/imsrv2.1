import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPR, setSelectedPR] = useState(null);

  const openModal = (pr, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedPR(pr);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPR(null);
  };

  return {
    showModal,
    selectedPR,
    openModal,
    closeModal,
  };
};

export default useModal;

import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const openModal = (prntr, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedPrinter(prntr);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrinter(null);
  };

  return {
    showModal,
    selectedPrinter,
    openModal,
    closeModal,
  };
};

export default useModal;

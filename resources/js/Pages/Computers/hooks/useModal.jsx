import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedComp, setSelectedComp] = useState(null);

  const openModal = (comp, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedComp(comp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComp(null);
  };

  return {
    showModal,
    selectedComp,
    openModal,
    closeModal,
  };
};

export default useModal;

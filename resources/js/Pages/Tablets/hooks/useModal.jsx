import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTablet, setSelectedTablet] = useState(null);

  const openModal = (comp, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedTablet(comp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTablet(null);
  };

  return {
    showModal,
    selectedTablet,
    openModal,
    closeModal,
  };
};

export default useModal;

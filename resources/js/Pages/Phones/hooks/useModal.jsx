import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);

  const openModal = (cp, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedPhone(cp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPhone(null);
  };

  return {
    showModal,
    selectedPhone,
    openModal,
    closeModal,
  };
};

export default useModal;

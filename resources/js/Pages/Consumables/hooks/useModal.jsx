import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConsumables, setSelectedConsumables] = useState(null);

  const openModal = (con, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelectedConsumables(con);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConsumables(null);
  };

  return {
    showModal,
    selectedConsumables,
    openModal,
    closeModal,
  };
};

export default useModal;

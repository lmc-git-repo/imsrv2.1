import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = (i, e) => {
    e.preventDefault(); // Prevent default link behavior
    setSelected(i);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  return {
    showModal,
    selected,
    openModal,
    closeModal,
  };
};

export default useModal;

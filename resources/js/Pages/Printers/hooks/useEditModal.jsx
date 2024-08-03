// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditPrinter, setSelectedEditPrinter] = useState(null);

  const openEditModal = (prntr) => {
    setSelectedEditPrinter(prntr);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditPrinter(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditPrinter,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

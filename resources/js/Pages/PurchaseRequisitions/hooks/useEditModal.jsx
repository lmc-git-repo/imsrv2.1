// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditPR, setSelectedEditPR] = useState(null);

  const openEditModal = (pr) => {
    setSelectedEditPR(pr);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditPR(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditPR,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

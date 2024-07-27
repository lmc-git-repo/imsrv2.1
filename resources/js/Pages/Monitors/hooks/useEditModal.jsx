// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditMntr, setSelectedEditMntr] = useState(null);

  const openEditModal = (mntr) => {
    setSelectedEditMntr(mntr);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditMntr(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditMntr,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

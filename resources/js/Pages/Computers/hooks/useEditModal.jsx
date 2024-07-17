// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditComp, setSelectedEditComp] = useState(null);

  const openEditModal = (comp) => {
    setSelectedEditComp(comp);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditComp(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditComp,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditTablet, setSelectedEditTablet] = useState(null);

  const openEditModal = (tab) => {
    setSelectedEditTablet(tab);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditTablet(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditTablet,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

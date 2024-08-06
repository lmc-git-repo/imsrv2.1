// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditPhone, setSelectedEditPhone] = useState(null);

  const openEditModal = (cp) => {
    setSelectedEditPhone(cp);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditPhone(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditPhone,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

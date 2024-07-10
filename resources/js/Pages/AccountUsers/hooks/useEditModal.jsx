// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState(null);

  const openEditModal = (user) => {
    setSelectedEditUser(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditUser(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditUser,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

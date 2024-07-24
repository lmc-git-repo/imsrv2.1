// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditServerUps, setSelectedEditServerUps] = useState(null);

  const openEditModal = (serverups) => {
    setSelectedEditServerUps(serverups);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditServerUps(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditServerUps,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

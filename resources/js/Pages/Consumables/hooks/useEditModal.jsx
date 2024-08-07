// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditConsumables, setSelectedEditConsumables] = useState(null);

  const openEditModal = (con) => {
    setSelectedEditConsumables(con);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEditConsumables(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEditConsumables,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

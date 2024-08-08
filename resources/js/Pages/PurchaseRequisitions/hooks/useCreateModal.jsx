// ./hooks/useCreateModal.jsx
import { useState } from 'react';

const useCreateModal = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  return {
    showCreateModal,
    openCreateModal,
    closeCreateModal,
  };
};

export default useCreateModal;

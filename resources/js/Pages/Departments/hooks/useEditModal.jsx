// ./hooks/useEditModal.jsx
import { useState } from 'react';

const useEditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(null);

  const openEditModal = (i) => {
    setSelectedEdit(i);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedEdit(null);
    setShowEditModal(false);
  };

  return {
    showEditModal,
    selectedEdit,
    openEditModal,
    closeEditModal,
  };
};

export default useEditModal;

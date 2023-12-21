import {useState } from 'react';
import { User } from '../../auth';

const useDeleteConfirmation = (
  deleteFunction: (item: any) => void, // Correct the function type
  currentUser: User | null, 
  createdByUserId: string
) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const canDelete = () => {
    return currentUser?.id === createdByUserId || currentUser?.roles.includes("Admin");
  };


  const openModal = (item: any) => {
    if (canDelete()) {
      setItemToDelete(item);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteFunction(itemToDelete); 
    }
    closeModal();
  };

  return { isModalOpen, openModal, closeModal, confirmDelete, canDelete };
};

export default useDeleteConfirmation;

import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { RiDeleteBinLine } from 'react-icons/ri';
import useDeleteConfirmation from '../../common/hooks/useDeleteConfirmation';
import { User } from '../../auth';

type DeleteModalProps = {
  deleteFn: (item: any) => void;
  isLoading: boolean;
  name: string;
  currentUser: User | null;
  createdByUserId: string;
  itemToDelete: any; // Define the type based on your application's need
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ deleteFn, name, isLoading, currentUser, createdByUserId, itemToDelete }) => {
  const { isModalOpen, openModal, closeModal, confirmDelete, canDelete }  = useDeleteConfirmation(
    deleteFn,
    currentUser,
    createdByUserId
  );

  return (
    <>
      {canDelete() && (
        <button
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            openModal(itemToDelete);
          }}
          disabled={isLoading}
          className="p-1 ml-2 bg-red-500 text-white rounded"
        >
          <RiDeleteBinLine />
        </button>
      )}
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title={`Delete ${name}`}
        centered
      >
        <p>Are you sure you want to delete this {name}?</p>
        <Button onClick={confirmDelete} className="bg-red-500">Confirm Delete</Button>
        <Button onClick={closeModal} className="bg-black ">Cancel</Button>
      </Modal>
    </>
  );
};

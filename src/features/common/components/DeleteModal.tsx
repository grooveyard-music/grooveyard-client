import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { RiDeleteBinLine } from 'react-icons/ri';

type DeleteModalProps = {
  deleteFn: () => void;
  isLoading: boolean;
  name: string;
};
export const DeleteModal: React.FC<DeleteModalProps> = ({ deleteFn, name, isLoading }) => {
  const [opened, setOpened] = useState(false);

  const handleConfirm = () => {
    deleteFn();
    setOpened(false);
  };
  return (
    <>
      <button 
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpened(true);
      }} 
      disabled={isLoading}
      className="p-1 ml-2 bg-red-500 text-white rounded"
    >
      <RiDeleteBinLine />
    </button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Delete ${name}`}
        centered
      >
        
        <p>Are you sure you want to delete this {name}?</p>
        <Button onClick={handleConfirm} className="bg-red-500">Confirm Delete</Button>
        <Button onClick={() => setOpened(false)} className="bg-black ">Cancel</Button>
      </Modal>
    </>
  );
};

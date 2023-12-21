import { useState } from 'react';
import { Modal} from '@mantine/core';
import { FaUserEdit } from 'react-icons/fa';
import { EditProfileForm } from '..';


export const EditProfileModal: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => {
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
  className="px-4 py-2 bg-red-800 text-white rounded inline-flex items-center justify-center gap-3 cursor-pointer "
>
<FaUserEdit /> Edit
</button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Profile"
        centered
      >
        <EditProfileForm setOpened={handleOpenModal}  />

      </Modal>
    </>
  );
};

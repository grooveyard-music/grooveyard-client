
import { Container } from '@mantine/core';
import {  useNavigate } from 'react-router-dom';
import { UploadSongForm } from '../components/UploadSongForm';
import { FaArrowLeft } from 'react-icons/fa';



export const UploadSongPage = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Container size="xl">
        <div onClick={handleGoBack} style={{ cursor: 'pointer', marginBottom: '20px' }}>
        <FaArrowLeft /> Go Back
      </div>
   <UploadSongForm />
    </Container>
  );
};

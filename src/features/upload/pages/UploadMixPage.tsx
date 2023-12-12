
import { Container } from '@mantine/core';
import {  useNavigate } from 'react-router-dom';
import { UploadMixForm } from '..';
import { FaArrowLeft } from 'react-icons/fa';



export const UploadMixPage = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Container size="xl">
        <div onClick={handleGoBack} style={{ cursor: 'pointer', marginBottom: '20px' }}>
        <FaArrowLeft /> Go Back
      </div>
   <UploadMixForm />
    </Container>
  );
};

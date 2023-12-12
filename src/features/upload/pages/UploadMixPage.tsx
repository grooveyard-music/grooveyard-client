
import { Container } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { UploadMixForm } from '..';



export const UploadMixPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);


  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Container size="xl">
   <UploadMixForm />
    </Container>
  );
};

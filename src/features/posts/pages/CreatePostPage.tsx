
import {useNavigate, useParams } from 'react-router-dom';
import { CreatePostForm } from '../components/CreatePostForm';
import { Container} from "@mantine/core";
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export const CreatePostPage = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const postTypeFromURL = params.get('type')


  const navigate = useNavigate();
  let { discussionId } = useParams<{discussionId: string}>();
  if (!discussionId) {
    // Handle this case accordingly, e.g., navigate back or display an error message
    return null;
  }
  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Container size="xl" className="min-h-[55rem]">
       <div className="mb-4 flex items-center">

      <IoArrowBackCircleOutline size={20} onClick={handleGoBack} />
    <span className="ml-2 font-medium">Go back</span>
  </div>
  <div className="w-2/3">
    <CreatePostForm discussionId={discussionId}/>

    </div>
  </Container>
  );
};

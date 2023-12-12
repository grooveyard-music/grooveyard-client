
import {  useNavigate, useParams } from 'react-router-dom';
import { Container, Loader } from '@mantine/core';

import useAuthStore from '../../../state/useAuthStore';
import { useGetComments } from '../hooks/useGetComments';
import { Comment } from '../types/post';


export const PostDetailPage = () => {
  const store = useAuthStore();
  const navigate = useNavigate(); 
  
  if (!store.user) {
    navigate('/');
    return null;  
  } 
 
    let { postId } = useParams<{postId: string}>();
    if (postId === undefined) {
      return null;  // Or handle this case however you see fit
    }
    const { data: comments, isLoading, isError } = useGetComments(postId);

    if (isLoading) return (
      <div className="h-96 flex align-middle">
      <Loader size="lg" className="mx-auto" />
      </div>
      );

    if (isError) return <div>An error has occurred</div>;
    
  return (
    <Container size="xl"> 
  
    {comments && comments.map((comment: Comment) => (
        <div key={comment.id} className="p-2 mt-2 border-t border-gray-200">
          <strong>{comment.createdByUsername}</strong>
          <p>{comment.content}</p>
        </div>
      ))}

    </Container>
  )
}

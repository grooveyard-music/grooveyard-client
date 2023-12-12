
import {  useNavigate, useParams } from 'react-router-dom';
import { useGetPosts } from '../hooks/useGetPosts';
import { Container, Loader, Avatar, Input} from '@mantine/core';
import { Post } from '../types/post';
import useAuthStore  from '../../../state/useAuthStore';
import { PostCard } from '..';



export const PostListPage = () => {
  const store = useAuthStore();
  const navigate = useNavigate(); 

    let { discussionId } = useParams<{discussionId: string}>();
    if (discussionId === undefined) {
      return null;  // Or handle this case however you see fit
    }
    const { data: posts, isLoading, isError } = useGetPosts(discussionId);

    if (isLoading) return (
      <div className="h-96 flex align-middle">
      <Loader size="lg" className="mx-auto" />
      </div>
      );
    if (isError) return <div>An error has occurred</div>;

    const handleInputClick = () => {
      navigate(`/createpost/${discussionId}?type=text`);
    }
    
  return (
    <Container size="xl"> 
    <div className="w-2/3 mx-auto space-y-8 mt-14">
      <div className="flex pb-4"> 
          <div className="mr-4"> 
          <Avatar size="md" radius="xl"src={store.userProfile?.avatarUrl} alt="it's me" />
          </div>
          <div className="flex-grow">
          <Input onClick={handleInputClick} placeholder="Create post" readOnly />
          </div>
      </div>
    </div>
    <div className="w-2/3 mx-auto space-y-8 mt-14">
    {posts.map((post: Post) => (
        <PostCard post={post} key={post.id} />
        ))}
    </div>
    </Container>
  )
}


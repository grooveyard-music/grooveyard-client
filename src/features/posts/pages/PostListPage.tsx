
import {  Link, useNavigate, useParams } from 'react-router-dom';
import {  useGetPostsAndDiscussion } from '../hooks/useGetPostsAndDiscussion';
import { Container, Loader, Avatar, Input, Title, Text, Badge} from '@mantine/core';
import { Post } from '../types/post';
import useAuthStore  from '../../../state/useAuthStore';
import { PostCard } from '..';



export const PostListPage = () => {
  const store = useAuthStore();
  const navigate = useNavigate(); 

    let { discussionId } = useParams<{discussionId: string}>();
    if (discussionId === undefined) {
      return null;  
    }
    const { data, isLoading, isError } = useGetPostsAndDiscussion(discussionId);
      const posts = data?.posts;
      const discussion = data?.discussion;
    
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
    <Container size="xl" className="min-h-screen">
    <div className="w-2/3 mx-auto space-y-8 mt-14">
    <div className="mb-4 flex flex-wrap">
          {/* Genres Badges */}
          {discussion?.genres && discussion.genres.map((genre: string) => (
            <Link to={`/genre/${genre}`} key={genre} className="mr-2" onClick={(e) => e.stopPropagation()}>
              <Badge className="cursor-pointer">{genre}</Badge>
            </Link>
          ))}
        </div>
      {/* Discussion Header */}
      <div className="mb-8">
        {discussion && (
          <>
            <Title order={1}>{discussion.title}</Title>
            <Text size="sm" color="dimmed">{discussion.description}</Text>
          </>
        )}
      </div>

      {/* Create Post Input */}
      <div className="flex pb-4">
        <div className="mr-4">
          <Avatar size="md" radius="xl" src={store.user?.avatar} alt="it's me" />
        </div>
        <div className="flex-grow">
          <Input onClick={handleInputClick} placeholder="Create post" readOnly />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-8">
        {posts && posts.length > 0 ? (
          posts.map((post: Post) => <PostCard post={post} key={post.id} />)
        ) : (
          <Text  align="center">No posts found</Text>
        )}
      </div>
    </div>
  </Container>
  )
}


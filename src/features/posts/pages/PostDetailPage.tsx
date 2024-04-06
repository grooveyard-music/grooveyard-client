
import {  useNavigate, useParams } from 'react-router-dom';
import {  Container, Group, Loader, Text } from '@mantine/core';
import useAuthStore from '../../../state/useAuthStore';
import { useGetPostAndComments } from '../hooks/useGetPostAndComments';
import { CommentCard, CreateCommentForm, deletePostFn } from '..';
import { DeleteModal } from '../../common/components/DeleteModal';
import { useMutation, useQueryClient } from 'react-query';
import { notifications } from '@mantine/notifications';


export const PostDetailPage = () => {

  let { postId } = useParams<{postId: string}>();
  const queryClient = useQueryClient();
  var store = useAuthStore();
  const navigate = useNavigate();
  const { mutate: deletePost, } = useMutation(
    deletePostFn,
    {
      onSuccess: () => {
        notifications.show({
          title: 'Success!',
          message: 'Post has been successfully deleted',
        });
        queryClient.invalidateQueries(["getAllPostsAndDiscussion"]);
        navigate(-1);
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error!',
          message: error.message
        });
      },
    }
  );
    if (postId === undefined) {
      return null;
    }
    const handleDelete = () => {
      deletePost(postId);
    };
  
    const { data: post, isError, isLoading } = useGetPostAndComments(postId);
    if (isLoading) return (
      <div className="h-96 flex align-middle">
      <Loader size="lg" className="mx-auto" />
      </div>
      );

    if (isError) return <div>An error has occurred</div>;

  return (
    <Container size="xl"> 
      <div className=" mx-auto p-5">

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
        <div className="absolute top-5 right-5">
      <DeleteModal 
        deleteFn={handleDelete}
        isLoading={isLoading}
        name="Post"
        currentUser={store.user}
        createdByUserId={post.createdById}
        itemToDelete={post}
      />
      </div>
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p>{post.content}</p>
          <Group gap="apart" className="mt-4">
            <Text size="sm" color="dimmed">{post.totalComments} Comments</Text>
            <Text size="sm" color="dimmed">{post.totalLikes} Likes</Text>
          </Group>
          <div className="mt-6">
            <h3 className="font-semibold">Comments</h3>
            <div className="mt-4">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment : any) => (
                 <CommentCard comment={comment} />
                ))
              ) : (
                <Text color="dimmed">No comments</Text>
              )}
            </div>
          </div>
          <CreateCommentForm postId={postId}/>
        </div>
      </div>
    </Container>
  )
}

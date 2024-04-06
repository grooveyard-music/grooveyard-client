
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Group, Button, Textarea} from "@mantine/core"
import { useMutation,  useQueryClient } from "react-query";
import { notifications } from '@mantine/notifications';
import { IoMdPaperPlane } from 'react-icons/io'; 
import  useAuthStore from '../../../state/useAuthStore';
import { CommentInput, commentSchema, createCommentFn } from '..';



type CreateCommentProps = {
    postId:  string;
    };
    
export const CreateCommentForm: React.FC<CreateCommentProps> = ({postId}) => {
  const store = useAuthStore();
  
  const queryClient = useQueryClient();
  const form = useForm({
    validate: zodResolver(commentSchema),
    initialValues: {
        content: '',
      },
  });

  const { mutate: createComment, isLoading } = useMutation(
    (commentData: CommentInput) => {
      if(store.user) {     
        return createCommentFn(commentData, postId);
      } else {
        throw new Error('User is not authenticated.');
      }
    },
    {
      onSuccess: () => {
        notifications.show({
          title: 'Success!',
          message: 'Comment has been successfully created',
        });
        queryClient.invalidateQueries(["getAllPostsAndDiscussion"]);
        queryClient.invalidateQueries(["getPostAndComments"]);
        queryClient.invalidateQueries(["fetchProfileOverview"]);
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error!',
          message: error.message
        });
      },
    }
  );

  return (
    <form onSubmit={form.onSubmit((values: CommentInput) => { 
      createComment(values);
    })}>

        <div className="mt-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Leave a comment</label>
            <Textarea 
            {...form.getInputProps('content')}
            id="comment" placeholder="Type your comment here" className="mt-1" />
            <Button type="submit" className="mt-2">Comment</Button>
          </div>

    </form>
  );
};


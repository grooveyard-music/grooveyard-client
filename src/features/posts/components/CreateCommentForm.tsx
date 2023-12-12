
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Group, Button} from "@mantine/core"
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
        queryClient.invalidateQueries(["getAllPosts"]);
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
      <Group spacing="xs">
        <TextInput
          label="Comment"
          {...form.getInputProps('content')}
          rightSection={
            <Button
              component="button" 
              type="submit"
              leftIcon={<IoMdPaperPlane />}
              variant="outline"
              size="xs" // Adjust the size to align well with the input
              disabled={isLoading}
            />
          }
          rightSectionWidth={40} // You might need to adjust this for better alignment
        />
      </Group>
    </form>
  );
};


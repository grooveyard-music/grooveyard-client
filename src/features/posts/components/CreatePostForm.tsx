
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "react-query";
import { createPostFn } from "../api/postApi";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../../state/useAuthStore";
import { PostEnum, PostInput, postSchema } from "../types/post";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Text, TextInput} from "@mantine/core";
import { IoMusicalNotes } from "react-icons/io5";
import { useEffect, useState } from "react";
import { LoadingButton } from "../../common";


export const CreatePostForm = ({ discussionId }: { discussionId: string }) => {
  const [attachedType, setAttachedType] = useState<'track' | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
    const store = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const form = useForm({
      initialValues: {
          title: '',
          content: '',
          type: PostEnum.Text, 
          discussionId: discussionId, 
          userId: store.user?.id || '',
          trackId: null, 
      },
  });
      const handleSearch = async () => {
        // Make API call here based on searchQuery
        // For example:
        // const results = await searchSongsAPI(searchQuery);
        // setSearchResults(results);
      };
      useEffect(() => {
        if (searchQuery) {
          handleSearch();
        }
      }, [searchQuery]);

    
      const handleAttachTrack = (trackId: string) => {
        setAttachedType('track');
        setSelectedTrackId(trackId); // Save the selected track ID
    };

    const handleOpenTrackSelector = () => {
      setAttachedType('track');

    };
  
    const createPostMutation = useMutation(
        createPostFn,
      {
          onSuccess: () => {
              notifications.show({
                  title: 'Success!',
                  message: 'Post has been successfully created',
              });
              queryClient.invalidateQueries(["getAllPosts"]);
              queryClient.invalidateQueries(["getAllDiscussions"]);
              queryClient.invalidateQueries(["fetchProfileOverview"]);
              navigate(-1);
          },
          onError: (error: any) => {
              notifications.show({
                  title: 'Error!',
                  message: error.message,
              });
          },
      }
  );

  const handleSubmit = (values: any) => {
    console.log(values);
    if (!store.user) {
        notifications.show({ title: 'Error!', message: 'User is not authenticated.' });
        return;
    }


    const postData = {
        title: values.title,
        content: values.content,
        type: selectedTrackId ? PostEnum.Track : PostEnum.Text ,
        discussionId: discussionId,
        userId: store.user.id,
        trackId: selectedTrackId || undefined,
    };
    console.log(postData);
    // Call mutation
    createPostMutation.mutate(postData);
  };


    return (
      <Container size="xl">
        <form onSubmit={form.onSubmit((values) => {
          console.log(values);
            handleSubmit(values)
        })}>
          <TextInput
        label="Title"
        placeholder="Enter post title"
        required
        {...form.getInputProps('title')}
      />
      <TextInput
        label="Content"
        placeholder="Enter post content"
        required
        {...form.getInputProps('content')}
      />
    <div className="mt-4 flex space-x-4 mb-5">
    <Paper className="flex items-center cursor-pointer" onClick={handleOpenTrackSelector}>
            <IoMusicalNotes size={20} />
            <Text>Add track</Text>
          </Paper>
      </div>
      <LoadingButton
        loading={createPostMutation.isLoading}
        textColor="text-ct-blue-600"
      >
        Create Post
      </LoadingButton>
      </form>
      </Container>
    );
  };
  
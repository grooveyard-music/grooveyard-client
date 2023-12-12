
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "react-query";
import { createPostFn } from "../api/postApi";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../../state/useAuthStore";
import { PostEnum, TextPostInput, textPostSchema } from "../types/post";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Text, TextInput} from "@mantine/core";
import { IoDiscOutline, IoMusicalNotes } from "react-icons/io5";
import { useEffect, useState } from "react";
import { LoadingButton } from "../../common";


export const CreatePostForm = ({ discussionId }: { discussionId: string }) => {
    const [attachedType, setAttachedType] = useState<'mix' | 'track' | null>(null);
    const store = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const form = useForm({
        validate: zodResolver(textPostSchema), 
        initialValues: {
          title: '',
          content: '',
          type: PostEnum.Text,
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

      const handleAttachMix = () => {
        setAttachedType('mix');
        // Here you can also open a modal or another component that lets the user search for their uploaded mixes or create a new one
      };
    
      const handleAttachTrack = () => {
        setAttachedType('track');
        // Here you can also open a modal or another component that lets the user search for their uploaded tracks or create a new one
      };
      const { mutate: createTextPost, isLoading } = useMutation(
        (textPostData: TextPostInput) => {
          if (store.user) {
            return createPostFn(textPostData, store.user, discussionId).then(response => {
              if (response.status !== 200) {
                throw new Error('API request failed');
              }
              return response.data;
            });
          } else {
            throw new Error('User is not authenticated.');
          }
        },
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
            createTextPost(values);
        }

    return (
      <Container size="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Paper className="flex items-center cursor-pointer" onClick={handleAttachMix}>
            <IoDiscOutline size={20} />
            <Text>Add mix</Text>
          </Paper>
          <Paper className="flex items-center cursor-pointer" onClick={handleAttachTrack}>
            <IoMusicalNotes size={20} />
            <Text>Add track</Text>
          </Paper>
        </div>

        {attachedType === 'track' && (
          <>
            <TextInput
              label="Search for a track"
              placeholder="Start typing to search..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
            />
            {/* Display searchResults here, allowing the user to select a track */}
          </>
        )}
      <LoadingButton
        loading={isLoading}
        textColor="text-ct-blue-600"
      >
        Create Post
      </LoadingButton>
      </form>
      </Container>
    );
  };
  
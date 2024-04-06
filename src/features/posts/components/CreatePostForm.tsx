
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "react-query";
import { createPostFn } from "../api/postApi";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../../state/useAuthStore";
import { PostEnum, PostInput, TrackOption, postSchema } from "../types/post";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Container, Paper, Text, TextInput, Textarea} from "@mantine/core";
import { IoMusicalNotes } from "react-icons/io5";
import { SetStateAction, useEffect, useState } from "react";
import { LoadingButton } from "../../common";
import { searchUserMusicbox } from "../../profile/api/profileApi";


export const CreatePostForm = ({ discussionId }: { discussionId: string }) => {
  const [attachedType, setAttachedType] = useState<'track' | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
    const store = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<TrackOption[] | undefined>(undefined);


    const handleSearch = async (value: string) => {
      if (value) {
        const tracks = await searchUserMusicbox(store.user?.id || '', value);
       console.log(tracks);
        const formattedTracks: SetStateAction<undefined> | { value: string; label: string; }[] = [];
    
        // Iterate through each track and format it based on its type
        tracks.forEach((track) => {
          if (track.songs) {
            // Assuming each track contains multiple songs
            track.songs.forEach((song) => {
              formattedTracks.push({
                value: track.id, // Use the song's ID as the unique identifier
                label: `${song.artist} - ${song.title}`, // Format the label as "Artist - Title"
              });
            });
          } else if (track.mixes) {
            // Assuming each track contains multiple mixes
            track.mixes.forEach((mix) => {
              formattedTracks.push({
                value: track.id, // Use the mix's ID as the unique identifier
                label: `${mix.artist} - ${mix.title}`, // Format the label as "Artist - Title"
              });
            });
          }
        });
        console.log(formattedTracks);
        setSearchResults(formattedTracks);
      }
    };

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
              queryClient.invalidateQueries(["getAllPostsAndDiscussion"]);
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

    // Call mutation
    createPostMutation.mutate(postData);
  };


    return (
      <Container size="xl">
        <form onSubmit={form.onSubmit((values) => {
        
            handleSubmit(values)
        })}>
          <TextInput
        label="Title"
        placeholder="Enter post title"
        required
        {...form.getInputProps('title')}
      />
      <Textarea
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
      {attachedType === 'track' && (
      <Autocomplete
      label="Search and select a track"
      placeholder="Type to search..."
      data={searchResults ?? []} // Ensure data is never undefined
      onChange={(value) => handleSearch(value)} // Assume onChange is the correct prop for capturing input
      onOptionSubmit={(item) => handleAttachTrack(item)}
      required={attachedType === 'track'}
    />
        )}
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
  

import { useForm, zodResolver } from "@mantine/form";
import { DiscussionInput, discussionSchema } from "../types/discussion";
import { useMutation, useQueryClient } from "react-query";
import { createDiscussionFn } from "../api/discussionApi";
import  useAuthStore from "../../../state/useAuthStore";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useMusicFeedStore } from "../../../state/useMusicStore";
import { useGetGenres } from "../hooks/useGetGenres";
import { useState } from "react";
import { Autocomplete, Chip, Group, TextInput } from "@mantine/core";
import { LoadingButton } from "../../common";


export const CreateDiscussionForm = () => {
    const store = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { genres } = useMusicFeedStore();
    const { refetch: refetchGenres } = useGetGenres();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    
    const form = useForm({
        validate: zodResolver(discussionSchema),
        initialValues: {
          Title: '',
          Description: '',
          Genres: [] // Add this line
        },
      });
    

    const { mutate: createDiscussion, isLoading } = useMutation(
        (musicData: DiscussionInput) => {
          if(store.user) {
            return createDiscussionFn(musicData, store.user);
          } else {
            throw new Error('User is not authenticated.');
          }
        },
        {
          onSuccess: (data: string) => {
            notifications.show({
              title: 'Success!',
              message: 'Discussion has been successfully created',
            });
            queryClient.invalidateQueries(["getAllDiscussions"]);
            queryClient.invalidateQueries(["fetchProfileOverview"]);
            
            navigate('/discussion/' + data);
          },
          onError: (error: any) => {
            notifications.show({
              title: 'Error!',
              message: error.message
            });
          },
        }
      );
  
    const handleGenreSelect = (genre: string) => {
        setSelectedGenres((prev) => [...prev, genre]);
        setInputValue('');  // Clear input field after selecting a genre
      }
      const handleGenreRemove = (genre: string) => {
        setSelectedGenres((prev) => prev.filter((g) => g !== genre));
      }
    return (
        <form onSubmit={form.onSubmit((values: DiscussionInput) => {
            values.Genres = selectedGenres; 
            createDiscussion(values)
        })}>
            <TextInput
                withAsterisk
                label="Title"
                {...form.getInputProps('Title')}
            />
            <TextInput
                withAsterisk
                label="Description"
                mt="sm"
                {...form.getInputProps('Description')}
            />
            <Autocomplete
                label="What genre?"
                placeholder="Type or pick one"
                data={genres || []} 
                value={inputValue}
                onFocus={() => refetchGenres()}
                onChange={(value: string) => setInputValue(value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); 
                        handleGenreSelect(inputValue)
                    }
                }}
            />
            <div className="flex mt-3">
                {selectedGenres.map((genre) => (
                    <div key={genre} className="flex mr-2">
                        <Chip onClick={() => handleGenreRemove(genre)} checked={true}>{genre}</Chip>
                    </div>
                ))}
            </div>
            <Group position="right" mt="xl">
                <LoadingButton
                    loading={isLoading}
                    textColor="text-ct-blue-600"
                >
                    Create Discussion
                </LoadingButton>
            </Group>
        </form>
    );
  };
  
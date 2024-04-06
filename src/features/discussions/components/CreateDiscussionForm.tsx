
import { useForm, zodResolver } from "@mantine/form";
import { DiscussionInput, discussionSchema } from "../types/discussion";
import { useMutation, useQueryClient } from "react-query";
import { createDiscussionFn } from "../api/discussionApi";
import  useAuthStore from "../../../state/useAuthStore";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Autocomplete, Button, Chip, Group, Pill, Radio, Switch, TextInput, Textarea } from "@mantine/core";
import { LoadingButton } from "../../common";
import { GENRE_LIST } from "../../../config";


export const CreateDiscussionForm = () => {
    const store = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [communityType, setCommunityType] = useState('public');
    const [nsfw, setNsfw] = useState(false);
    
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
            musicData.Genres = selectedGenres;
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
  
      const handleGenreSelect = (value: string) => {
        setSelectedGenres((currentGenres) => [...currentGenres, value]);
    };

    const removeGenre = (genreToRemove: string) => {
        setSelectedGenres((currentGenres) => 
            currentGenres.filter((genre) => genre !== genreToRemove)
        );
    };

    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
      <form onSubmit={form.onSubmit((values) => {
        createDiscussion(values);
      })}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter your community name"
          {...form.getInputProps('Title')}
        />
        
        <Textarea
          withAsterisk
          label="Description"
          mt="sm"
          placeholder="Community description"
          {...form.getInputProps('Description')}
        />

        {/* Community Type Radio Group */}
        <div className="mt-5">
          <Radio.Group
            value={communityType}
            onChange={setCommunityType}
            label="Community type"
          >
            <Radio value="public" label="Public" />
            <Radio value="restricted" label="Restricted" />
            <Radio value="private" label="Private" />
          </Radio.Group>
        </div>


      <div className="mt-5 ">
        {/* Selected Genres */}
        <Autocomplete
                    placeholder="Genre"
                    data={GENRE_LIST}
                    onOptionSubmit={( value ) => handleGenreSelect(value)}
       
                />
                <div className="mt-5">
                    {selectedGenres.map((genre) => (
                        <Pill
                            key={genre}
                            onRemove={() => removeGenre(genre)}
                            withRemoveButton
                        >
                            {genre}
                        </Pill>
                    ))}
                </div>
          </div>
        {/* Action Buttons */}
        <Group mt="xl">
          <LoadingButton
            loading={isLoading}
            textColor="text-ct-blue-600" 
          >
            Create Topic
          </LoadingButton> 
          <Button
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </div>
    );
  };
  
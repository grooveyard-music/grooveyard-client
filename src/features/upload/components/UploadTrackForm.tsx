import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Chip, TextInput, Select } from "@mantine/core";
import { useState } from "react";
import { FiLink } from 'react-icons/fi';
import { notifications } from "@mantine/notifications";
import { UploadTrackInput, uploadTrackFn, uploadTrackSchema } from "..";
import { useMusicFeedStore } from "../../../state/useMusicStore";
import { LoadingButton } from "../../common";
import { useGetGenres } from "../../discussions/hooks/useGetGenres";
import useAuthStore from "../../../state/useAuthStore";

export const UploadTrackForm = () => {
    const store = useAuthStore();
    const navigate = useNavigate();
    const { genres } = useMusicFeedStore();
    const { refetch: refetchGenres } = useGetGenres();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [trackType, setTrackType] = useState<'song' | 'mix'>('song');
    const queryClient = useQueryClient();
    const [urlError, setUrlError] = useState('');
    const form = useForm({
        validate: zodResolver(uploadTrackSchema),
        initialValues: {
            title: '',
            artist: '',
            urlPath: '',
            genres: selectedGenres,
        },
    });
    const { mutate: createTrack, isLoading } = useMutation(
      async (uploadTrackData: UploadTrackInput) => {
          if (!store.user) {
              throw new Error('User is not authenticated.');
          }

          return uploadTrackFn(uploadTrackData);
      },
      {
          onSuccess: () => {

              notifications.show({
                  title: 'Success!',
                  message: 'Track has been successfully uploaded',
              });
              queryClient.invalidateQueries(["fetchUserProfileFeed"]);
              navigate(-1); 
          },
          onError: (error: any) => {
              notifications.show({
                  title: 'Error!',
                  message: error.message || 'Failed to upload track',
              });
          },
      }
  );

    const handleSubmit = (values: any) => {
      if (!validateUrl(values.urlPath)) {
        setUrlError("URL must be from YouTube or SoundCloud");
        return; // Stop submission if URL is invalid
    }

    // Reset URL error if no issue
    setUrlError('');

    // Continue with form submission logic
    const trackData: UploadTrackInput = {
        ...values,
        genres: selectedGenres,
        type: trackType,
        Host: values.urlPath.includes('youtube.com') ? 1 : 2,
        
    };

        createTrack(trackData);
    }

    const handleGenreSelect = (genre: string) => {
        setSelectedGenres((prev) => [...prev, genre]);
        setInputValue('');
    }
    const handleGenreRemove = (genre: string) => {
        setSelectedGenres((prev) => prev.filter((g) => g !== genre));
    }

  const validateUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('soundcloud.com');
    };

    return (
        <div className="flex">
            <form onSubmit={form.onSubmit(handleSubmit)} className="flex-1">
                <TextInput
                    label="Title"
                    placeholder="Enter song title"
                    required
                    {...form.getInputProps('title')}
                />
                <TextInput
                    label="Artist"
                    placeholder="Enter artist name"
                    required
                    {...form.getInputProps('artist')}
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
                        <Chip key={genre} onClick={() => handleGenreRemove(genre)} checked={true}>{genre}</Chip>
                    ))}
                </div>
                <Select
                    label="Track Type"
                    placeholder="Select track type"
                    data={[
                        { value: 'song', label: 'Song' },
                        { value: 'mix', label: 'Mix' },
                    ]}
                    {...form.getInputProps('type')}     
                    onChange={(value) => setTrackType(value as 'song' | 'mix')} 
                />
             <TextInput
                label="URL"
                placeholder="Enter the URL"
                icon={<FiLink />}
                required={trackType === 'song'}
                {...form.getInputProps('urlPath')}
                error={urlError}
            />
                <LoadingButton
                    loading={isLoading}
                    textColor="text-ct-blue-600"
                >
                    Create Track
                </LoadingButton>
            </form>
            <div className="ml-4 flex-1">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h3>Instructions</h3>
                    <p>Add a link to your soundcloud</p>
                </div>
            </div>
        </div>
    );
};


import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Chip, TextInput} from "@mantine/core";
import { useState } from "react";
import { FileInput } from '@mantine/core';
import { FiLink, FiFile } from 'react-icons/fi';
import { notifications } from "@mantine/notifications";
import { uploadSongSchema, UploadSongInput, uploadSongFn } from "..";
import { useMusicFeedStore } from "../../../state/useMusicStore";
import { LoadingButton } from "../../common";
import { useGetGenres } from "../../discussions/hooks/useGetGenres";
import useAuthStore from "../../../state/useAuthStore";


export const UploadSongForm = () => {

    const store = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { genres } = useMusicFeedStore();
    const { refetch: refetchGenres } = useGetGenres();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [fileUpload, setFileUpload] = useState<File>();
    const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('url');

    const form = useForm({
        validate: zodResolver(uploadSongSchema), 
        initialValues: {
          title: '',
          artist: '',
          urlPath: '',
          genres: selectedGenres,
          mixFile: undefined,
          tracklist: undefined,
        },
      });


      const { mutate: createMix, isLoading } = useMutation(
        (uploadSongData: UploadSongInput) => {
      
          if (store.user) {
            uploadSongData.genres = selectedGenres;
            uploadSongData.mixFile = fileUpload;
      
            // Determine the host
            if (uploadSongData.urlPath) {
              try {
                const url = new URL(uploadSongData.urlPath);
                const hostname = url.hostname;
      
                // Check if it's YouTube
                if (hostname.includes('youtube.com')) {
                  uploadSongData.Host = 1;
                } else {
                  // Set other host types here
                }
              } catch (e) {
                // Handle URL parsing errors
                throw new Error('Invalid URL');
              }
            } else if (uploadSongData.mixFile) {
              uploadSongData.Host = 0;
            }
      
            return uploadSongFn(uploadSongData).then(response => {
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
            //invalidate query here
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
            createMix(values);
        }

        const handleGenreSelect = (genre: string) => {
          setSelectedGenres((prev) => [...prev, genre]);
          setInputValue('');  
        }
        const handleGenreRemove = (genre: string) => {
          setSelectedGenres((prev) => prev.filter((g) => g !== genre));
        }

    return (

        <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        <div key={genre} className="flex mr-2">
                            <Chip onClick={() => handleGenreRemove(genre)} checked={true}>{genre}</Chip>
                        </div>
                    ))}
          </div>
          <div className="flex items-center mb-4">
        <button 
          type="button" 
          className={`p-2 ${uploadMethod === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setUploadMethod('url')}
        >
          <FiLink size={24} />
        </button>
        <button 
          type="button" 
          className={`p-2 ${uploadMethod === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setUploadMethod('file')}
        >
          <FiFile size={24} />
        </button>
      </div>
          {uploadMethod === 'file' ? (
        <FileInput
          placeholder="Pick file"
          label="Your mix"
          onChange={(value: File) => setFileUpload(value)}
        />
      ) : (
        <TextInput
          label="Song URL"
          placeholder="Enter the song URL"
          required
          {...form.getInputProps('urlPath')}
        />
      )}

      <LoadingButton
        loading={isLoading}
        textColor="text-ct-blue-600"
      >
        Create Song
      </LoadingButton>
      </form>

    );
  };
  
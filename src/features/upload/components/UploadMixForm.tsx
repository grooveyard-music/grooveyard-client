
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Chip, TextInput} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { FileInput } from '@mantine/core';
import { FiLink, FiFile } from 'react-icons/fi';
import useAuthStore from "../../../state/useAuthStore";
import { useMusicFeedStore } from "../../../state/useMusicStore";
import { useGetGenres } from "../../discussions/hooks/useGetGenres";
import { UploadMixInput, uploadMixFn, uploadMixSchema } from "..";
import { LoadingButton } from "../../common";

export const UploadMixForm = () => {

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
        validate: zodResolver(uploadMixSchema), 
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
        (uploadMixData: UploadMixInput) => {
      
          if (store.user) {
            uploadMixData.genres = selectedGenres;
            uploadMixData.mixFile = fileUpload;
      
            // Determine the host
            if (uploadMixData.urlPath) {
              try {
                const url = new URL(uploadMixData.urlPath);
                const hostname = url.hostname;
      
                // Check if it's YouTube
                if (hostname.includes('youtube.com')) {
                  uploadMixData.Host = 1;
                } else {
                  // Set other host types here
                }
              } catch (e) {
                // Handle URL parsing errors
                throw new Error('Invalid URL');
              }
            } else if (uploadMixData.mixFile) {
              uploadMixData.Host = 0;
            }
      
            return uploadMixFn(uploadMixData).then(response => {
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
        placeholder="Enter post title"
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
          label="Mix URL"
          placeholder="Enter the mix URL"
          required
          {...form.getInputProps('urlPath')}
        />
      )}

      <LoadingButton
        loading={isLoading}
        textColor="text-ct-blue-600"
      >
        Create Mix
      </LoadingButton>
      </form>

    );
  };
  
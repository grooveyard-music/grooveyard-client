import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { TextInput,  Group, Button, Modal, Box, Stack, Text, Autocomplete, Pill, Select, Textarea } from "@mantine/core";
import { SetStateAction, useState } from "react";
import { notifications } from "@mantine/notifications";
import { SoundCloudTrack, SpotifyTrack, UploadTrackInput, uploadTrackFn } from "..";
import useAuthStore from "../../../state/useAuthStore";
import { FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa";
import { GENRE_LIST } from "../../../config";
import { IoReturnUpBackSharp } from "react-icons/io5";
import SpotifyAutocomplete from "./SpotifyAutocomplete";
import useModalStore from "../../../state/useModalStore";
import YoutubeAutocomplete from "./YoutubeAutocomplete";
import SoundcloudAutocomplete from "./SoundcloudAutocomplete";



export const CreatePlaylistModal = () => {

    const store = useAuthStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('0');
    const queryClient = useQueryClient();
    const { modals, closeModal } = useModalStore(); 
    const isOpen = modals['tracklist'] || false;
    console.log(isOpen)
 
    const { mutate: createTracklist } = useMutation(
      async (createTracklistData: UploadTrackInput) => {
          if (!store.user) {
              throw new Error('User is not authenticated.');
          }
          return createTracklistFn(createTracklistData);
      },
      {
          onSuccess: () => {
              notifications.show({
                  title: 'Success!',
                  message: 'Track has been successfully uploaded',
              });
              queryClient.invalidateQueries(["fetchUserProfileFeed"]);
              closeModal("tracklist");
          },
          onError: (error: any) => {
              notifications.show({
                  title: 'Error!',
                  message: error.message || 'Failed to upload track',
              });
          },
      }
  );

  const handleSubmit = () => {
 
};


    if (!isOpen) return null;

    return (
        <Modal
        opened={isOpen}
        onClose={() => closeModal('tracklist')}
        title="Create a new playlist"
        centered
      >
        <form onSubmit={handleSubmit} className="bg-white p-4">
          <TextInput
            label="Title (required)"
            placeholder="Add title"
            required
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            className="mb-4"
          />
  
          <Textarea
            label="Description"
            placeholder="Add description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            className="mb-4"
          />
  
          <Select
            label="Visibility"
            placeholder="Select"
            value={visibility}
            onChange={setVisibility}
            data={[
              { value: '0', label: 'Draft' },
              { value: '1', label: 'Live' },
            ]}
            className="mb-4"
          />
  
          <Group  mt="md">
            <Button variant="default" onClick={() => closeModal('tracklist')}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Modal>
    );
};

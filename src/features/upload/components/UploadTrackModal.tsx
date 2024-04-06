import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { TextInput,  Group, Button, Modal, Box, Stack, Text, Autocomplete, Pill, Select } from "@mantine/core";
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



export const UploadTrackModal = () => {

    const store = useAuthStore();
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const [host, setHost] = useState(null);
    const [selectedSpotifyTrack, setSelectedSpotifyTrack] = useState<SpotifyTrack | null>(null);
    const [selectedSoundCloudTrack, setSelectedSoundCloudTrack] = useState<SoundCloudTrack | null>(null);
    const { modals, closeModal } = useModalStore(); 
    const isOpen = modals['musicbox'] || false;

 
    const { mutate: createTrack } = useMutation(
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
              closeModal("musicbox");
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
    if (selectedSpotifyTrack) {
        const uploadTrackData = {
            artist: selectedSpotifyTrack.artist,
            title: selectedSpotifyTrack.name,
            DurationInMilliseconds: selectedSpotifyTrack.DurationInMilliseconds,
            type: selectedSpotifyTrack.type,
            uri: selectedSpotifyTrack.uri,
            genres: selectedGenres,
            host: selectedSpotifyTrack.host
        };
        createTrack(uploadTrackData);
    }
};


    const HostIcon = ({ icon, label } : {icon: any, label: any}) => (
        <Button onClick={() => setHost(label)} variant="subtle">
            {icon}
        </Button>
    );

    const handleSpotifySelectTrack = (track: SetStateAction<SpotifyTrack | null>) => {
        setSelectedSpotifyTrack(track);
    };

    const handleSoundCloudSelectTrack = (track: SetStateAction<SoundCloudTrack | null>) => {
        setSelectedSoundCloudTrack(track);
    };

    const handleGenreSelect = (value: string) => {
        setSelectedGenres((currentGenres) => [...currentGenres, value]);
    };

    const removeGenre = (genreToRemove: string) => {
        setSelectedGenres((currentGenres) => 
            currentGenres.filter((genre) => genre !== genreToRemove)
        );
    };

    const platformOptions = [
        { value: 'spotify', label: 'Spotify' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'soundcloud', label: 'SoundCloud' },
      ];
    


    const HostDropdown= () => {
        switch (host) {
          case 'spotify':
            return  <SpotifyAutocomplete onTrackSelect={handleSpotifySelectTrack} />;
          case 'youtube':
              return  <YoutubeAutocomplete onTrackSelect={handleSoundCloudSelectTrack} />;
          case 'soundcloud':
            return  <SoundcloudAutocomplete onTrackSelect={handleSoundCloudSelectTrack} />;       
          default:
            return ""; // or some default content
        }
      };

console.log(selectedSoundCloudTrack);
    if (!isOpen) return null;

    return (
        <>
       <Modal
      opened={isOpen}
      onClose={() => closeModal('musicbox')}
      size="lg"
      centered
      classNames={{

        header: 'border-none',
        close: 'text-white',
        body: 'p-5'
      }}
      title={<Text className="text-white font-bold text-lg">Add to musicbox</Text>}
    >
     <Select
          label="Music Platform"
          placeholder="Select platform"
          data={platformOptions}
          value={host}
          onChange={(value) => setHost(value)}
          required
          classNames={{ label: 'text-white', input: 'bg-dark-600 text-white' }}
        />

      <div className="mt-4 mb-4"> 
      {host && <HostDropdown/>}
      </div>
      <Autocomplete
                    placeholder="Genre"
                    data={GENRE_LIST}
                    onOptionSubmit={( value ) => handleGenreSelect(value)}
                    required
                />
                <div>
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
      <Group mt="md">
        <Button onClick={() => closeModal('musicbox')} variant="default">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="filled">
          Submit
        </Button>
      </Group>
        </Modal>
        </>
    );
};

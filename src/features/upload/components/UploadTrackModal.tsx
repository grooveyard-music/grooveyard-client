import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { TextInput, Select, Group, Button, Modal, Box, Stack, Text, Autocomplete } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { UploadTrackInput, uploadTrackFn } from "..";
import useAuthStore from "../../../state/useAuthStore";
import { FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa";
import { GENRE_LIST } from "../../../config";

export const UploadTrackModal = () => {
    const store = useAuthStore();
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [trackType, setTrackType] = useState<'song' | 'mix'>('song');
    const queryClient = useQueryClient();
    const [isModalOpen, setModalOpen] = useState(false);
    const [host, setHost] = useState(null);

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

  
  const handleSubmit = (values) => {
    // Submission logic here
};

      const HostIcon = ({ icon, label }) => (
        <Button onClick={() => setHost(label)} variant="subtle">
            {icon}
        </Button>
    );

    const FormFields = () => (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '200px' }}> 
                    <Stack align="center" spacing="md"> 
          <TextInput placeholder="Artist" required />
          <TextInput placeholder="Title" required />
          <Autocomplete
              placeholder="Genre"
              data={GENRE_LIST} 
              required
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="subtle" onClick={() => setHost(null)}>Back to Host Selection</Button>
          </Stack>
          </Box>
      </>
  );


    return (
        <>
          <Button className="mr-10 rounded-md border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none text-black" onClick={() => setModalOpen(true)}>
            Music box
        </Button>
        <Modal
            opened={isModalOpen}
            onClose={() => setModalOpen(false)}
    
            size="lg"
            centered
        >
            {!host && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '150px' }}> 
                    <Stack align="center" spacing="md"> 
                        <Text pb={10}>Choose Host</Text>
                        <Group position="center">                
                            <HostIcon icon={<FaYoutube size={30} />} label="YouTube" />
                            <HostIcon icon={<FaSpotify size={30} />} label="Spotify" />
                            <HostIcon icon={<FaSoundcloud size={30} />} label="SoundCloud" />
                        </Group>
                    </Stack>
                </Box>
            )}

            {host && <FormFields />}
        </Modal>
        </>
    );
};

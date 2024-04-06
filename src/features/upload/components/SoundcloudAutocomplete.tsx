import React, { useState, useEffect } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import { searchSoundcloud } from '../api/uploadApi';
import { SoundCloudTrack } from '..';



interface SoundcloudAutocompleteProps {
  onTrackSelect: (track: SoundCloudTrack) => void;
}

const SoundcloudAutocomplete: React.FC<SoundcloudAutocompleteProps> = ({ onTrackSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [tracks, setTracks] = useState<SoundCloudTrack[]>([]);
  const combobox = useCombobox();

  // Fetch tracks from your API
  useEffect(() => {
    if (inputValue.trim() === '') {
      setTracks([]);
      return;
    }

    const fetchTracks = async () => {
      try {
        const response = await searchSoundcloud(inputValue);
        console.log(response); 
        if (!Array.isArray(response.collection)) {
          console.error('Expected an array response, received:', typeof response);
          setTracks([]);
          return;
        }
        setTracks(response.collection);
        console.log(tracks);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    

    fetchTracks();
  }, [inputValue]);

  const handleOptionSubmit = (optionValue: string) => {
    const selectedTrack = tracks.find(track => track.id === optionValue);
    if (selectedTrack) {
      onTrackSelect(selectedTrack);
    }
    combobox.closeDropdown();
  };

  const options = tracks.map((track) => (
    <Combobox.Option value={track.id} key={track.id}>
      {`${track.title} by ${track.user.username}`}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        onOptionSubmit={(optionValue) => {
          handleOptionSubmit(optionValue);
        }}
        store={combobox}
   
      >
        <Combobox.Target>
          <TextInput
            placeholder="Search SoundCloud"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={inputValue.trim().length === 0 || inputValue.includes('@')}>
          <Combobox.Options>
            {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default SoundcloudAutocomplete;

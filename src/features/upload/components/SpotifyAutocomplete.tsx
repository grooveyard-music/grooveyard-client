import React, { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import useSpotifySearch from "../hooks/useSpotifySearch";
import { SpotifyTrack } from '..';



interface SpotifyAutocompleteProps {
    onTrackSelect: (track: SpotifyTrack) => void;
}

const SpotifyAutocomplete: React.FC<SpotifyAutocompleteProps> = ({ onTrackSelect }) => {
    const [inputValue, setInputValue] = useState(''); 
    const { tracks, error } = useSpotifySearch(inputValue);

    const combobox = useCombobox();

    const handleOptionSubmit = (optionValue: string) => {
      const selectedTrack = tracks.find(track => track.id === optionValue);
      if (selectedTrack) {
          onTrackSelect(selectedTrack);
      }
      combobox.closeDropdown();
  };

    const options = tracks.map((track) => (
        <Combobox.Option value={track.id} key={track.id}>
          {`${track.name} by ${track.artist}`}
        </Combobox.Option>
      ));

    return (
        <>
         <Combobox
        onOptionSubmit={(optionValue) => {
          handleOptionSubmit(optionValue);
      }}
      store={combobox}
      withinPortal={true}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Search spotify"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
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

        {error && <div>Error: {error}</div>}
        </>
    );
};

export default SpotifyAutocomplete;

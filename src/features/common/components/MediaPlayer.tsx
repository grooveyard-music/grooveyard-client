import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMusicFeedStore } from '../../../state/useMusicStore';

import { FaPlay, FaPause, FaCircle, FaSpotify, FaVolumeUp } from 'react-icons/fa'; 
import { Container, Slider } from '@mantine/core';
import { formatTime } from '../../../util/FormatTime';
import { SpotifyPlayerComponent } from './SpotifyPlayer';

export const MediaPlayer: React.FC = () => {
  const { playbackUri, isPlaying, togglePlay, songTitle, songHost, songArtist, position, duration, setSongPosition, setSongDuration } = useMusicFeedStore();

  const [volume, setVolume] = useState<number>(0.5);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  const handlePositionChange = (percentage: number) => {
    if (duration) {
      const newPosition = (percentage / 100) * duration; 
      setSongPosition(newPosition);
    }
  };


  if (!playbackUri) {
    return null;
  }
  const sliderValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  console.log(duration)
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
    <Container size="xl" className="flex justify-between items-center">
      <div className="flex-1 flex items-center min-w-0">
        <div className="flex flex-col items-start mr-4">
          <div className="text-lg truncate">{songTitle}</div>
          <div className="text-sm truncate">{songArtist}</div>
        </div>
      </div>

      <div className="flex-1 flex justify-center ">
        <button onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
        <div className="relative flex-1 mx-4">
        <Slider
            value={sliderValue} 
            onChange={handlePositionChange} 
            min={0}
            max={100} 
            step={0.1}
            styles={{ track: { backgroundColor: 'gray' }, bar: { backgroundColor: 'blue' }, thumb: { borderColor: 'blue' } }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center min-w-0">
        <FaVolumeUp className="mr-2" />
        <Slider
          label="Volume"
          min={0} max={1} step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          styles={{ track: { backgroundColor: 'gray' }, thumb: { borderColor: 'blue' } }}
          className="w-24"
        />
      </div>
    </Container>

    {songHost === 0 && 
         <SpotifyPlayerComponent
         spotifyUserAccessToken={localStorage.getItem('spotifyUserAccessToken')?.toString() || ''}
         playbackUri={playbackUri}
         isPlaying={isPlaying}
         volume={volume}
         position={position}
         setDuration={setSongDuration}
       />
      }
  </div>
  );
};

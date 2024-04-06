import React, { useState, useEffect } from 'react';
import { Select, Badge } from '@mantine/core';
import { FaPlay, FaPause } from 'react-icons/fa'; 
import { useMusicFeedStore } from '../../../state/useMusicStore';
import { Mix } from '..';



type MixCardProps = {
  mixes: Mix[],
};

export const MixCard: React.FC<MixCardProps> = ({ mixes }) => {
  const [selectedMix, setSelectedMix] = useState<Mix | null>(null);
  const { videoId, isPlaying, setVideoId, togglePlay, setSongTitle, setSongArtist, setSongHost } = useMusicFeedStore();

  useEffect(() => {
    // Set the initial song (the first one in the list or null if the list is empty)
    setSelectedMix(mixes.length > 0 ? mixes[0] : null);
  }, [mixes]);

  const handlePlay = () => {
    if (selectedMix) {
      if (videoId !== selectedMix.uri) {
        setVideoId(selectedMix.uri);
        setSongArtist(selectedMix.artist);
        setSongTitle(selectedMix.title);
        setSongHost(selectedMix.host);
      }
      togglePlay();
    }
  };

  const handleHostChange = (host: number) => {
    const song = mixes.find(s => s.host === host);
    if (song) {
      setSelectedMix(song);
    }
  };

  return (
    <div className="flex items-center rounded-lg bg-white shadow-md p-4 mt-7">
      <button onClick={handlePlay} className="mr-4">
        {isPlaying && videoId === selectedMix?.uri ? <FaPause size={24} /> : <FaPlay size={24} />}
      </button>

      <div className="flex-grow">
        <figcaption className="text-sm text-gray-500">
          {selectedMix?.artist}
        </figcaption>
        <h3 className="text-xl font-semibold">
          {selectedMix?.title}
        </h3>
      </div>

      <div className="ml-auto">
        {selectedMix?.genres.map((genre: string) => (
          <Badge key={genre} className="ml-3">
            {genre}
          </Badge> 
        ))}
      </div>

      {mixes.length > 1 && (
        <Select
          data={mixes.map(s => ({ value: s.host, label: s.host }))}
          onChange={handleHostChange}
          value={selectedMix?.host}
          placeholder="Select host"
          className="ml-4"
        />
      )}
    </div>
  );
};

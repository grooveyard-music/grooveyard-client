// MixCard.tsx
import React from 'react';
import { useMusicFeedStore } from '../../../state/useMusicStore';
import { FaPlay, FaPause } from 'react-icons/fa'; 
import { Badge } from '@mantine/core';
type MixCardProps = {
  title: string,
  artist: string,
  urlPath: string,
  genres: string[],
  host: string
};

export const MixCard: React.FC<MixCardProps> = ({ title, artist, urlPath, genres, host }) => {
    const { videoId, isPlaying, setVideoId, togglePlay, setSongTitle, setSongArtist } = useMusicFeedStore(); 

    const handlePlay = () => {
        if (videoId !== urlPath) {
          setVideoId(urlPath);
          setSongArtist(artist);
          setSongTitle(title);
        }
        togglePlay();
      };

  return (

<div className="flex items-center rounded-lg bg-white shadow-md p-4 mt-7">

<button onClick={handlePlay} className="mr-4">
  {isPlaying && videoId === urlPath ? <FaPause size={24} /> : <FaPlay size={24} />}
</button>


  <div className="flex-grow">
    <figcaption className="text-sm text-gray-500">
      {artist}
    </figcaption>
    <h3 className="text-xl font-semibold">
      {title}
    </h3>
  </div>

  <div className="ml-auto">
  {genres.map((genre: string) => (
  <Badge key={genre} className="ml-3">
    {genre}
  </Badge> 
     ))}
  </div>
</div>

   
  );
};

// MixCard.tsx
import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'; 
import { Badge } from '@mantine/core';
import { useMusicFeedStore } from '../../../state/useMusicStore';
type SongCardProps = {
  title: string,
  artist: string,
  urlPath: string,
  genres: string[],
  host: string
};

export const SongCard: React.FC<SongCardProps> = ({ title, artist, urlPath, genres, host }) => {
    const { videoId, isPlaying, setVideoId, togglePlay, setSongTitle, setSongArtist,  setSongHost } = useMusicFeedStore(); 

    const handlePlay = () => {
   
        if (videoId !== urlPath) {
          setVideoId(urlPath);
          setSongArtist(artist);
          setSongTitle(title);
          setSongHost(host);
        }
        togglePlay();
      };

      console.log(title);
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

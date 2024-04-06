import React, { useState, useEffect } from 'react';
import { FaHeart, FaRetweet, FaPlus, FaPlayCircle, FaPauseCircle } from 'react-icons/fa'; 
import { useMusicFeedStore } from '../../../state/useMusicStore';
import { Song } from '..';

type SongCardProps = {
  songs: Song[],
};

export const SongCard: React.FC<SongCardProps> = ({ songs }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const { isPlaying, playbackUri, togglePlay, setPlaybackUri, setSongArtist, setSongTitle, setSongHost } = useMusicFeedStore();

  useEffect(() => {
    setSelectedSong(songs.length > 0 ? songs[0] : null);
  }, [songs]);

  const handlePlay = () => {
    if (selectedSong) {
      if (playbackUri !== selectedSong.uri) {
        setSongHost(selectedSong.host);
        setSongArtist(selectedSong.artist);
        setSongTitle(selectedSong.title);
        setPlaybackUri(selectedSong.uri);
      }
      togglePlay();
    }
  };

  return (
    <div className="flex items-center rounded-lg bg-white shadow-md p-4 mt-7">
      {/* Album Art */}
      <div className="flex items-center mr-4">
        <img src={selectedSong?.albumImageUrl} alt={selectedSong?.title} className="w-16 h-16 rounded" />
        <button onClick={handlePlay} className="ml-4">

          {isPlaying && playbackUri == selectedSong?.uri  ? <FaPauseCircle size={32} className="text-gray-700 hover:text-gray-900" /> : <FaPlayCircle size={32} className="text-gray-700 hover:text-gray-900"  />}
        </button>
      </div>

      {/* Song Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{selectedSong?.title}</h3>
        <figcaption className="text-sm text-gray-500">{selectedSong?.artist}</figcaption>
      </div>

      {/* Meta Data */}
      <div className="flex items-center ml-auto">
        <FaHeart className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-500 mr-4">5</span>
        <FaRetweet className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-500">5</span>
        <FaPlus className="text-gray-500 ml-4" />
      </div>

      
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { useMusicFeedStore } from '../../../state/useMusicStore';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaCircle } from 'react-icons/fa'; 
import { Container } from '@mantine/core';
import { formatTime } from '../../../util/FormatTime';

export const MediaPlayer: React.FC = () => {
  const { videoId, isPlaying, togglePlay, songTitle } = useMusicFeedStore();
  const youtubePlayerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleReady = (event: any) => {
    youtubePlayerRef.current = event.target;
    setDuration(youtubePlayerRef.current.getDuration());
  };

  const handleStateChange = (_event: any) => {
    setCurrentTime(youtubePlayerRef.current.getCurrentTime());
  };
  

  useEffect(() => {
    try {
      if (youtubePlayerRef.current) {
        if (isPlaying) {
          youtubePlayerRef.current.playVideo();
        } else {
          youtubePlayerRef.current.pauseVideo();
        }
      }
    } catch (e) {
      console.error("Error interacting with YouTube player:", e);
    }
  }, [isPlaying, videoId]);

  useEffect(() => {
    let interval: number | undefined;
      if (youtubePlayerRef.current && isPlaying) {
        interval = setInterval(() => {
          setCurrentTime(youtubePlayerRef.current.getCurrentTime());
        }, 1000) as unknown as number; // Typecast to number
      }
    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts or when the video is paused
    };
  }, [isPlaying, youtubePlayerRef.current]);

  const handleProgressBarClick = (e: React.MouseEvent) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - rect.left) / rect.width) * duration;
      youtubePlayerRef.current.seekTo(newPosition);
      setCurrentTime(newPosition);
    }
  };

  if (!videoId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <Container size="xl">
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        {videoId && (
          <div>
            Now Playing: {songTitle}
          </div>
        )}
        <div className="flex items-center justify-between">
        <span>{formatTime(currentTime)}</span>
          <div 
            ref={progressBarRef}
            className="relative w-full h-2 bg-gray-600 mt-2 cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div 
              className="absolute left-0 h-2 bg-blue-500" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div 
                className="absolute right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer"
              >
                <FaCircle />
              </div>
            </div>
          </div>
          <span>{formatTime(Math.floor(duration))}</span>
        </div>
        <YouTube 
          videoId={videoId || ""} 
          opts={opts} 
          onReady={handleReady} 
          onStateChange={handleStateChange}
        />
      </Container>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';

interface SpotifyPlayerComponentProps {
  spotifyUserAccessToken: string;
  playbackUri: string;
  isPlaying: boolean;
  volume: number;
  position?: number; 
  setDuration: (duration: number) => void;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any; // Adjust this type according to your needs or existing type definitions
  }
}

export const SpotifyPlayerComponent: React.FC<SpotifyPlayerComponentProps> = ({
  spotifyUserAccessToken,
  playbackUri,
  isPlaying,
  volume,
  position,
  setDuration
}) => {


  const [deviceId, setDeviceId] = useState('');
  const [isPlayerReady, setIsPlayerReady] = useState(false); 
  const playerRef = useRef<Spotify.SpotifyPlayer | null>(null); 
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Your Spotify Player",
          getOAuthToken: cb => { cb(spotifyUserAccessToken); },
          volume: volume,
        });

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceId(device_id);
          setIsPlayerReady(true); // Set the player as ready
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
          setIsPlayerReady(false); 
        });

        player.connect();

        playerRef.current = player;
      };
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [spotifyUserAccessToken]); // Removed volume from dependency array

  useEffect(() => {
    // Adjust volume only if the player is ready
    if (playerRef.current && isPlayerReady) {
      playerRef.current.setVolume(volume).then(() => {
        console.log(`Volume set to ${volume}`);
      }).catch((err: any) => console.error('Failed to set volume:', err));
    }
  }, [volume, isPlayerReady]); // Depend on volume and player readiness

  useEffect(() => {
    if (playerRef.current && isPlayerReady && typeof position === 'number') {
      // Convert position from milliseconds to the required unit if necessary
      playerRef.current.seek(position).then(() => {
        console.log(`Seeked to ${position}`);
      }).catch(err => console.error('Failed to seek:', err));
    }
  }, [position, isPlayerReady]); // Depend on position and player readiness
  

  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      const handlePlayerStateChanged = (state) => {
        if (!state) {
          console.log('Player state is null, user might not be playing music.');
          return;
        }      
        const currentTrack = state.track_window.current_track;
        const trackDurationMs = currentTrack.duration_ms;
        setDuration(trackDurationMs);
        console.log(`Current track duration (ms): ${trackDurationMs}`);
      };
      // Add the event listener for player state changes
      playerRef.current.addListener('player_state_changed', handlePlayerStateChanged);
      return () => {
        // Remove the event listener when the component unmounts or if playerRef/isPlayerReady changes
        if (playerRef.current) {
          playerRef.current.removeListener('player_state_changed', handlePlayerStateChanged);
        }
      };
    }
  }, [isPlayerReady, setDuration]); 

  useEffect(() => {
    if (isPlaying && playbackUri && deviceId && spotifyUserAccessToken) {
      console.log('Attempting to start playback on device:', deviceId);
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [playbackUri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${spotifyUserAccessToken}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => Promise.reject(data));
        }
        console.log('Playback started');
        return response.status === 204 ? {} : response.json(); 
      })
      .then(data => {
      })
      .catch(error => {
        if (error.error) {
          console.error('Failed to start playback:', error.error);
        } else {
          console.error('Error starting playback:', error);
        }
      });
    }
  }, [isPlaying, playbackUri, deviceId, spotifyUserAccessToken]);
  

  return null; 
};

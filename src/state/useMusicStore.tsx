import { create } from 'zustand';

type MusicFeedState = {

  playbackUri: string | null;
  songTitle: string | null;
  songArtist: string | null;
  songHost: number | null;  
  isPlaying: boolean;
  isOpen:boolean;
  position: number;
  duration: number;
  setPlaybackUri: (id: string | null) => void;
  setSongTitle: (title: string | null) => void;
  setSongArtist: (id: string | null) => void;
  setSongHost: (host: number | null) => void;
  setSongPosition: (position: number) => void;
  setSongDuration: (duration: number) => void;
  togglePlay: () => void;
  toggleModal: () => void;
};

export const useMusicFeedStore = create<MusicFeedState>((set) => ({
  playbackUri: null, 
  songTitle: null,
  songArtist: null,
  songHost: null,
  isPlaying: false,
  isOpen: false,
  position: 0,
  duration: 0,
  setPlaybackUri: (id) => set({ playbackUri: id }),
  setSongTitle: (title) => set({ songTitle: title }),
  setSongArtist: (artist) => set({ songArtist: artist }),
  setSongHost: (host) => set({ songHost: host }),
  setSongDuration: (duration) => set({ duration: duration}),
  setSongPosition: (position) => set({ position: position}),
  togglePlay: () => {
    set((state) => {
      console.log("Toggling play from", state.isPlaying, "to", !state.isPlaying);
      return { isPlaying: !state.isPlaying };
    });
  },
  toggleModal: () => {
    set((state) => {
      return { isOpen: !state.isOpen };
    });
  },
}));

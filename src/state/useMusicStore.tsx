import { create } from 'zustand';

type MusicFeedState = {
  genres: string[];
  setGenres: (genres: string[]) => void;
  videoId: string | null;
  songTitle: string | null;
  songArtist: string | null;
  songHost: string | null;  
  isPlaying: boolean;
  setVideoId: (id: string | null) => void;
  setSongTitle: (title: string | null) => void;
  setSongArtist: (id: string | null) => void;
  setSongHost: (host: string | null) => void;
  togglePlay: () => void;

};

export const useMusicFeedStore = create<MusicFeedState>((set) => ({
  genres: [],
  setGenres: (genres) => set((state) => ({ ...state, genres })),
  videoId: null, 
  songTitle: null,
  songArtist: null,
  songHost: null,
  isPlaying: false,
  setVideoId: (id) => set({ videoId: id }),
  setSongTitle: (title) => set({ songTitle: title }),
  setSongArtist: (artist) => set({ songArtist: artist }),
  setSongHost: (host) => set({ songHost: host }),
  togglePlay: () => {
    set((state) => {
      console.log("Toggling play from", state.isPlaying, "to", !state.isPlaying);
      return { isPlaying: !state.isPlaying };
    });
  },

}));

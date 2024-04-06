import { TypeOf, z } from "zod";

export type  UploadTrackInput = TypeOf<typeof uploadTrackSchema>;

export interface Song {
    id: string,
    title: string,
    artist: string,
    uri: string,
    genres: string[],
    host: number,
}

export interface Mix {
    id: string,
    title: string,
    artist: string,
    uri: string,
    duration: number,
    genres: string[],
    host: number,
    tracklist: Tracklist
}

export interface Track {
    id: string,
    type: string,
    songs?: Song[],
    mixes?: Mix[]
}

export interface Tracklist {
    id: string,
    name: string,
    status: string,
    songs: Song[],
}

/* SCHEMAS */
export const uploadTrackSchema = z.object({
    title: z.string(),
    artist: z.string(),
    genres: z.array(z.string()),
    uri: z.string().optional(),
    type: z.string().optional(),
    host: z.number().optional(),
  });


  export interface SpotifyTrack {
    id: string;
    name: string;
    uri: string; 
    artist: string; 
    host: number;
    genres: string[];
    DurationInMilliseconds: number;
    type: string;
    }
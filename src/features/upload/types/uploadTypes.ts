import { TypeOf, z } from "zod";

export type  UploadTrackInput = TypeOf<typeof uploadTrackSchema>;

export interface Song {
    id: string,
    title: string,
    artist: string,
    urlPath: string,
    genres: string[],
    host: string,
}

export interface Mix {
    id: string,
    title: string,
    artist: string,
    urlPath: string,
    duration: number,
    genres: string[],
    host: string,
    tracklist: Tracklist
}

export interface Track {
    id: string,
    type: string,
    song?: Song,
    mix?: Mix
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
    urlPath: z.string().optional(),
    type: z.string().optional(),
    host: z.number().optional(),
  });



import { TypeOf, z } from "zod";

export type  UploadMixInput = TypeOf<typeof uploadMixSchema>;
export type  UploadSongInput = TypeOf<typeof uploadSongSchema>;

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
}

export interface Tracklist {
    id: string,
    name: string,
    status: string,
    songs: Song[],
}




/* SCHEMAS */
export const uploadMixSchema = z.object({
    title: z.string(),
    artist: z.string(),
    urlPath: z.string().optional(),
    genres: z.array(z.string()),
    tracklist: z.custom<Tracklist>().optional(),
    mixFile: z.custom<File>((val) => val instanceof File, { message: 'Must be a File' }).optional(),
    Host: z.number().optional(), // Add this line
  });

  export const uploadSongSchema = z.object({
    title: z.string(),
    artist: z.string(),
    urlPath: z.string().optional(),
    genres: z.array(z.string()),
    mixFile: z.custom<File>((val) => val instanceof File, { message: 'Must be a File' }).optional(),
    Host: z.number().optional(), // Add this line
  });

  export const songSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    artist: z.string().min(1, 'Artist is required'),
    genre:  z.string().min(1, 'Genre is required'),
    urlPath: z.string().optional(),
    musicFile: z.custom<File>((val) => val instanceof File, { message: 'Must be a File' }).optional(),
  });
  

  export const tracklistSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    tracklist: z.array(songSchema)
  });
  
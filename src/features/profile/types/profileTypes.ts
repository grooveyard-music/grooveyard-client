import { TypeOf, z } from "zod";
import { Mix, Song, Tracklist } from "../../upload";

export type EditProfileInput = TypeOf<typeof editProfileSchema>;
export const editProfileSchema = z.object({
    displayName: z.string(),
    firstName: z.string(),
    lastName: z.string().optional(),
    birthdate: z.date(),
    location: z.string().optional(),
    biography: z.string().optional(),
    userId: z.string(),
    avatarFile: z.custom<File>((val) => val instanceof File, { message: 'Must be a File' }).optional(),
  });
  

export interface UserProfile {
    userId: string;
    userName: string;
    fullName?: string;
    birthdate?: Date;
    location?: string;
    biography?:string;
    avatarUrl?: string;
    communityActivity: CommunityActivity
}

export interface CommunityActivity {
    postCount: number,
    discussionCount: number,
    commentCount: number,
}

export interface UserFeed {
    tracklists: Tracklist[],
    songs: Song[],
    mixes: Mix[],
}


import { TypeOf, z } from "zod";
import { Mix, Song, Track, Tracklist } from "../../upload";

export type EditProfileInput = TypeOf<typeof editProfileSchema>;
export const editProfileSchema = z.object({
    fullname: z.string().optional(),
    birthdate: z.date().optional(),
    location: z.string().optional(),
    biography: z.string().optional(),
    userId: z.string().optional(),
  });
  

export interface UserProfile {
    userId: string;
    displayName: string;
    fullName?: string;
    birthdate?: Date;
    location?: string;
    biography?:string;
    avatarUrl?: string;
    userActivity: UserActivity
}

export interface UserActivity {
    postCount: number,
    discussionCount: number,
    commentCount: number,
}

export interface UserFeed {
    tracks: Track[],
    tracklists: Tracklist[],
}


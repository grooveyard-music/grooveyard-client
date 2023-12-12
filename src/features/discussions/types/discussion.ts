import { TypeOf, z } from "zod";

export const discussionSchema = z.object({
  Title: z.string().min(1, 'Name is required'),
  Description: z.string().min(1, 'Description is required'),
  Genres: z.array(z.string())
});

export interface Discussion  {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  genres?: string[];
  createdByUsername: string;
  createdById: string;
  createdByAvatar: string;
  };

export interface Genre {
  id: string;
  name: string;
}


  export type DiscussionInput = TypeOf<typeof discussionSchema>;
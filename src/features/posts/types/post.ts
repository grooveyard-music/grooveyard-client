import { z } from 'zod';
import { Track } from '../../upload';

export type CommentInput = z.infer<typeof commentSchema>;
export type PostInput = z.infer<typeof postSchema>;

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments?: Comment[]; 
  totalComments: number;
  totalLikes: number;
  createdByUsername: string;
  createdById: string;
  createdByAvatar: string;
  track?: Track;
};

  export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    createdByUsername: string;
    createdByAvatar: string;
    createdById: string;
    totalLikes: number;
  };

  export interface TrackOption {
    value: string;
    label: string;
  }
  
  export enum PostEnum {
    Text = 1,
    Track = 0,
  }

  export const commentSchema = z.object({
    content: z.string().min(1, 'Comment is required'),
  });
  
  export const postSchema = z.object({
    type: z.number(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    discussionId: z.string(),
    userId: z.string(),
    trackId: z.string().optional(),
  });
import { z } from 'zod';

export type TextPostInput = z.infer<typeof textPostSchema>;
export type TrackPostInput = z.infer<typeof trackPostSchema>;
export type MixPostInput = z.infer<typeof mixPostSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type PostInput = TextPostInput | TrackPostInput | MixPostInput;

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments?: Comment[]; 
  totalComments: number;
  totalLikes: number;
  createdBy: string;
  createdById: string;
  createdByAvatar: string;
};

  export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    createdByUsername: string;
    createdById: string;
  };
  
  export interface MixPost extends Post {
    
  }

  export enum PostEnum {
    Text = "Text",
    Track = "Track",
    Mix = "Mix", 
  }
  
  /*SCHEMAS */
  export const textPostSchema = z.object({
    type: z.enum([PostEnum.Text]),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  });
  
  export const trackPostSchema = z.object({
    type: z.enum([PostEnum.Track]),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  });
  
  export const mixPostSchema = z.object({
    type: z.enum([PostEnum.Mix]),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),

  });
  
  export const commentSchema = z.object({
    content: z.string().min(1, 'Comment is required'),
  });
  
  export const postSchemas = {
    [PostEnum.Text]: textPostSchema,
    [PostEnum.Track]: trackPostSchema,
    [PostEnum.Mix]: mixPostSchema,
  };
  
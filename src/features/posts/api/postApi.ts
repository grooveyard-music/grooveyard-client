import axios from 'axios';
import { CommentInput, PostInput } from '../types/post';
import { User } from '../../auth/types/authTypes';
import { BASE_URL } from '../../../config';

const musicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getPostsFn = async (discussionId: string) => {
  const response = await musicApi.get(`/Post/GetPosts/${discussionId}`);
console.log(response);
  return response.data;
};

export const createPostFn = async (postData: PostInput, userData: User, discussionId: string) => {
    try {
        const response = await musicApi.post('/Post/CreatePost', {
            Title: postData.title,
            Content: postData.content,
            DiscussionId: discussionId,
            UserId: userData.id
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Could not create post.");
        } else {
            throw error;
        }
    }
};


  export const deletePostFn = async (postId: string) => {
    try {
      const response = await musicApi.delete(`/Post/DeletePost/${postId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Could not delete post.");
      } else {
        throw error;
      }
    }
  };

  export const getCommentsFn = async (postId: string) => {
    const response = await musicApi.get(`/Post/GetComments/${postId}`);
  
    return response.data;
  };

  export const createCommentFn = async (commentData: CommentInput, postId: string ) => {
    try {
        const response = await musicApi.post('/Post/CreateComment', {
            content: commentData.content,
            postId: postId
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Could not create comment.");
        } else {
            throw error;
        }
    }
};


export const togglePostLikeFn = async (postId: string ) => {
  try {
      const response = await musicApi.post('/Post/post/like', {
        EntityId: postId
      });
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message || "Could not create comment.");
      } else {
          throw error;
      }
  }
};

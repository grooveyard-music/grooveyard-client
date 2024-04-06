import axios from 'axios';
import { CommentInput, PostInput } from '../types/post';
import { BASE_URL } from '../../../config';

const musicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getPostsFn = async (discussionId: string) => {
  const response = await musicApi.get(`/Post/GetPosts/${discussionId}`);

  return response.data;
};

export const createPostFn = async (postData: PostInput) => {
    try {
   
        const response = await musicApi.post('/Post/CreatePost', {
            Title: postData.title,
            Content: postData.content,
            DiscussionId: postData.discussionId,
            UserId: postData.userId,
            Type: postData.type,
            TrackId: postData.trackId
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


  export const deleteCommentFn = async (commentId: string) => {
    try {
      const response = await musicApi.delete(`/Post/DeleteComment/${commentId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Could not delete post.");
      } else {
        throw error;
      }
    }
  };

  export const getPostAndCommentsFn = async (postId: string) => {
    const response = await musicApi.get(`/Post/GetPost/${postId}`);
  
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


export const toggleCommentLikeFn = async (commentId: string ) => {
  try {

      const response = await musicApi.post('/Post/comment/like', {
        EntityId: commentId
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
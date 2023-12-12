import axios from 'axios';
import { User } from '../../auth/types/authTypes';
import { Discussion, DiscussionInput, Genre } from '../types/discussion';
import { BASE_URL } from '../../../config';


const musicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

  export const createDiscussionFn = async (discussionData: DiscussionInput, userData: User) => {

    const response = await musicApi.post('/Discussion/CreateDiscussion', {
        Title: discussionData.Title,
        Description: discussionData.Description,
        Genres: discussionData.Genres,
        UserId: userData.id
    });
    return response.data;
};

export const getDiscussionsFn = async () => {
const response = await musicApi.get<Discussion[]>('/Discussion/GetLatestDiscussions')
  return response.data;
};

export const getAllGenres = async () => {
  const response = await musicApi.get<Genre[]>('/Discussion/GetAllGenres');
  return response.data;
};

export const deleteDiscussionFn = async (discussionId: string) => {
  try {
    const response = await musicApi.delete(`/Discussion/DeleteDiscussion/${discussionId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Could not delete discussion.");
    } else {
      throw error;
    }
  }
};
import axios from 'axios';
import { EditProfileInput, UserFeed, UserProfile } from '..';
import { BASE_URL } from '../../../config';


const userApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const musicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const editUserProfileFn = async (formData: FormData) => {
  const response = await userApi.put('profile/createprofile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

  export const getUserProfileFn = async (userId: string) => {
    const response = await userApi.get<UserProfile>(`profile/getprofile/${userId}`);
    return response.data;
  };

  export const getUserActivityCountsFn = async (userId: string) => {
    const response = await musicApi.get<UserProfile>(`community/GetUserCommunity/${userId}`);
    return response.data;
};

export async function fetchProfileOverview(userId: string) {
  if (!userId) {
      throw new Error("User ID not provided.");
  }
  
  const userProfile = await getUserProfileFn(userId);
  return userProfile;
}

  export async function fetchUserProfileFeed(userId: string) {
    const response = await musicApi.get<UserFeed>(`media/GetUserProfileFeed/${userId}`);
    return response.data;
  };

  export async function checkDisplayName(displayName: string) {
    const response = await musicApi.post(`profile/check-name?displayName=${displayName}`);
    
    return response.data;
  };


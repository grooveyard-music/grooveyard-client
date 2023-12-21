import axios from 'axios';
import {EditProfileInput, UserFeed, UserProfile } from '..';
import { BASE_URL } from '../../../config';


const userApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const musicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const editUserProfileFn = async (editProfileInput: EditProfileInput) => {
  const response = await userApi.put('profile/updateprofile', editProfileInput, {
    headers: {
      'Content-Type': 'application/json' // Updated content type
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



  export async function fetchUserProfileFeed(userId: string) {
    const response = await musicApi.get<UserFeed>(`media/musicbox/${userId}`);
    return response.data;
  };

  
  export async function updateUserAvatar(avatarFile: File) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
  
    const response = await musicApi.post(`profile/updateavatar/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
    return response.data;
  }

  export async function checkDisplayName(displayName: string) {
    const response = await musicApi.post(`profile/check-name?displayName=${displayName}`);
    
    return response.data;
  };


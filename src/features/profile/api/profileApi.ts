import axios from 'axios';
import {EditProfileInput, UserFeed, UserProfile } from '..';
import { BASE_URL } from '../../../config';
import { Track } from '../../upload';


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
    const response = await musicApi.get<UserProfile>(`profile/GetUserCommunity/${userId}`);
    return response.data;
};



  export async function fetchUserProfileFeed(userId: string) {
    const response = await musicApi.get<Track[]>(`profile/musicbox/${userId}`);
    return response.data;
  };

  export async function searchUserMusicbox(userId: string, searchTerm: string) {
    // Construct the URL with searchTerm as a query parameter
    const url = `profile/musicbox/search/${userId}?searchTerm=${encodeURIComponent(searchTerm)}`;
    const response = await musicApi.get<Track[]>(url);
    return response.data;
}
  
  export async function updateUserAvatar(avatarFile: File, userId: string) {
    const formData = new FormData();
    formData.append('imageFile', avatarFile);
  
    const response = await musicApi.put(`profile/updateavatar/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
    return response.data;
  }

  export async function updateUserCover(coverFile: File, userId: string) {
    const formData = new FormData();
    formData.append('imageFile', coverFile);
  
    const response = await musicApi.put(`profile/updatecover/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
    return response.data;
  }

  export async function checkDisplayName(displayName: string) {
    const response = await musicApi.post(`profile/check-name?displayName=${displayName}`);
    
    return response.data;
  };


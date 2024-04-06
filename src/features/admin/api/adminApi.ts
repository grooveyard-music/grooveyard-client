import axios from 'axios';
import { User } from '../../auth/types/authTypes';
import { Discussion, DiscussionInput, Genre } from '../types/adminTypes';
import { BASE_URL } from '../../../config';


const adminApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const getDiscussionsFn = async () => {
const response = await adminApi.get<Discussion[]>('/Discussion/GetLatestDiscussions')
  return response.data;
};


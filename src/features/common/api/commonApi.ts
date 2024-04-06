import axios from 'axios';
import { BASE_URL } from '../../../config';
import { UserNotification } from '../types/commonTypes';


const commonApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});




export const getAllNotification = async () => {
  const response = await commonApi.get<UserNotification[]>('/Notification/notifications');
  return response.data;
};


export const markNotificationsRead = async (notificationIds: string[]) => {
  const response = await commonApi.post('/Notification/notifications/read', notificationIds );
  return response.data;
};


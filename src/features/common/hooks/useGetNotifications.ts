import { useQuery } from "react-query";
import { getAllNotification } from "../api/commonApi";


export const useGetNotifications = () => {
  return useQuery(["getAllNotifications"], getAllNotification, {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, 
    // data stays in the cache for 30 minutes
  });
};

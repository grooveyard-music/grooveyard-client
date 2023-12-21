import { useQuery } from "react-query";
import {  getUserProfileFn } from "../api/profileApi";
import useAuthStore from "../../../state/useAuthStore";



export const useGetUserProfile = (userId?: string | null) => {
    const { setUserProfile } = useAuthStore();
    return useQuery(["getUserProfile", userId], () => getUserProfileFn(userId!), {
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        select: (data) => data,
        onSuccess: (data) => {
            data.avatarUrl = data.avatarUrl + "?v=" + new Date().getTime();
            setUserProfile(data);
        },
    });
}


  
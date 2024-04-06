import { useQuery } from "react-query";
import {  getUserProfileFn } from "../api/profileApi";
import useAuthStore from "../../../state/useAuthStore";

export const useGetUserProfile = (userId?: string | null) => {
    const { setUserProfile, userProfile } = useAuthStore();
    return useQuery(["getUserProfile", userId], () => getUserProfileFn(userId!), {
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        onSuccess: (data) => {

            if (userProfile == null) { 
                setUserProfile(data);
                return 
            }
            data.avatarUrl = data.avatarUrl + "?v=" + new Date().getTime();
            data.coverUrl = data.coverUrl + "?v=" + new Date().getTime();
            if (data.avatarUrl !== userProfile.avatarUrl ||  data.coverUrl !== userProfile.coverUrl) {
                setUserProfile({
                  ...data,
                });
            }
        },
    });
}


  
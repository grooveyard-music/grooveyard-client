import { useQuery } from "react-query";
import { fetchProfileOverview } from "../api/profileApi";



export const useGetUserProfile = (userId?: string | null) => {
    return useQuery(["fetchProfileOverview", userId], () => fetchProfileOverview(userId!), {
        enabled: !!userId, // Only execute the query if userId exists
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        select: (data) => data,
        onSuccess: (data) => {
            data.avatarUrl = data.avatarUrl + "?v=" + new Date().getTime();
        },
    });
}


  
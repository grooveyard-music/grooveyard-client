import { useQuery } from "react-query";
import { useEffect } from "react";
import useAuthStore from "../../../state/useAuthStore";
import { QUERY_KEY } from "../../../config";
import { IUseUser, User, getUser } from "..";
import { getCookie } from "../../../util/GetCookie";


export function useUser(): IUseUser {
  const { setUser, clearUser } = useAuthStore();

  const isLoggedIn = getCookie("IsLoggedIn") === "true";
  const { data: user, refetch, isError, isLoading } = useQuery<User | null>(
    [QUERY_KEY.user],
    getUser,
    {
      enabled: isLoggedIn, // Only run this query if the user is logged in
      refetchOnMount: isLoggedIn,
      refetchOnWindowFocus: isLoggedIn,
      refetchOnReconnect: isLoggedIn,
      onSuccess: (data) => {
        
        setUser(data);
      },
      onError: (error) => {
        clearUser();
      }
    }
  );

  useEffect(() => {
    if (isError) {
      // Handle error state here
    }
  }, [isError]);

  return {
    user: isLoading ? null : user,
    isLoading,
    refetchUser: refetch,
  };
}

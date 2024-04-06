import { useQuery } from "react-query";
import { useMusicFeedStore } from "../../../state/useMusicStore";
import { getAllGenres } from "../api/discussionApi";
import { notifications } from "@mantine/notifications";

export const useGetGenres = () => {
  const musicFeedStore = useMusicFeedStore();

  const queryResult = useQuery(["getAllGenres"], getAllGenres, {
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 30, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (data) => data,
    onSuccess: (data) => {

      musicFeedStore.setGenres(data.map((genreObj: { name: string; }) => genreObj.name));
    },
    onError: (error) => {
  
      if (Array.isArray((error as any).message)) {
        (error as any).response.data.error.forEach((el: any) =>
          notifications.show({
            title: 'Error',
            message: el.message,
          })
        );
      } 
    },
  });


  return {
      ...queryResult,
      isLoading: queryResult.isLoading
  };
};

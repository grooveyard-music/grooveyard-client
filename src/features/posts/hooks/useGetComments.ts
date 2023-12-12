import { useQuery } from "react-query";
import { getCommentsFn} from "../api/postApi";

export const useGetComments = (postId: string) => {
  return useQuery(["getAllComments", postId], () => getCommentsFn(postId), {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data stays in the cache for 30 minutes
  });
};



import { useQuery } from "react-query";
import { getPostAndCommentsFn} from "../api/postApi";

export const useGetPostAndComments = (postId: string) => {
  return useQuery(["getPostAndComments", postId], () => getPostAndCommentsFn(postId), {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data stays in the cache for 30 minutes
  });
};



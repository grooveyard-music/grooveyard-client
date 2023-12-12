import { useQuery } from "react-query";
import { getPostsFn } from "../api/postApi";

export const useGetPosts = (discussionId: string) => {
  return useQuery(["getAllPosts", discussionId], () => getPostsFn(discussionId), {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data stays in the cache for 30 minutes
  });
};



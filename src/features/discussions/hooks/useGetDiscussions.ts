import { useQuery } from "react-query";
import { getDiscussionsFn } from "../api/discussionApi";

export const useGetDiscussions = () => {
  return useQuery(["getAllDiscussions"], getDiscussionsFn, {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, 
    // data stays in the cache for 30 minutes
  });
};

import { useQuery } from "react-query";
import { getPostsFn } from "../api/postApi";
import { getDiscussionFn } from "../../discussions/api/discussionApi";


export const useGetPostsAndDiscussion = (discussionId: string) => {
  return useQuery(["getAllPostsAndDiscussion", discussionId], async () => {
    // Using Promise.all to fetch both posts and discussion concurrently
    const [posts, discussion] = await Promise.all([
      getPostsFn(discussionId),
      getDiscussionFn(discussionId)
    ]);
    return { posts, discussion };
  }, {
    // Adjust the staleTime and cacheTime as necessary for your use case
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

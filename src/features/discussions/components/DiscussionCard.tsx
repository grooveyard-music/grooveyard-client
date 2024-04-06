import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Tooltip } from '@mantine/core';
import { Discussion } from '../types/discussion';
import { checkUserSubscription, deleteDiscussionFn, subscribeToDiscussion } from '..';
import  useAuthStore  from '../../../state/useAuthStore';
import { DeleteModal } from '../../common';
import { timeAgo } from '../../../util/TimeAgo';
import { FaRegBookmark, FaBookmark, FaRegCommentDots  } from "react-icons/fa";

export const DiscussionCard: React.FC<{discussion: Discussion}> = ({ discussion }) => {

  const queryClient = useQueryClient();
  var store = useAuthStore();

  const { data: isSubscribed, isLoading: isLoadingSubscription } = useQuery(
    ['isSubscribed', discussion.id],
    () => checkUserSubscription(discussion.id),
    { enabled: !!store.user }
  );
  
  const { mutate: deleteDiscussion, isLoading} = useMutation(
    deleteDiscussionFn,
    {
      onSuccess: () => {
        notifications.show({
          title: 'Success!',
          message: 'Discussion has been successfully deleted',
        });
        queryClient.invalidateQueries(["getAllDiscussions"]);
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error!',
          message: error.message
        });
      },
    }
  );

  const { mutate: subscribe, isLoading: subscribing } = useMutation(
    () => subscribeToDiscussion(discussion.id), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['isSubscribed', discussion.id]);
        queryClient.invalidateQueries(["getAllDiscussions"]);
      },
      onError: (error) => {
        // Handle subscription error
      },
    }
  );
  const handleDelete = () => {
    deleteDiscussion(discussion.id);
  };

  const handleSubscriptionClick = () => {
    subscribe();
  };
  return (
    <div className="relative border shadow-lg rounded-lg overflow-hidden bg-white"> 
    {/* Card Clickable Content */}
    <Link to={`/discussion/${discussion.id}`} className="block">
      <div className="p-4">
        <div className="mb-4 flex flex-wrap">
          {/* Genres Badges */}
          {discussion.genres && discussion.genres.map((genre: string) => (
            <Link to={`/genre/${genre}`} key={genre} className="mr-2" onClick={(e) => e.stopPropagation()}>
              <Badge className="cursor-pointer">{genre}</Badge>
            </Link>
          ))}
        </div>
        
        <div className="text-gray-900 font-bold text-xl mb-2">{discussion.title}</div>
        <p className="text-gray-700 text-base">{discussion.description}</p>

      </div>
    </Link>

    {/* Actions */}
    <div className="absolute top-5 right-5" onClick={(e) => e.stopPropagation()}>
      <DeleteModal 
        deleteFn={handleDelete}
        isLoading={isLoading}
        name="Discussion"
        currentUser={store.user}
        createdByUserId={discussion.createdById}
        itemToDelete={discussion}
      />
    </div>
    <div className="absolute bottom-5 right-5 flex items-center" onClick={(e) => e.stopPropagation()}>
        <Badge color="gray" className="mr-2">{discussion.subscriptionCount}</Badge>
        <Tooltip label={`${isSubscribed ? "Unsubscribe from" : "Subscribe to"} topic`}>
          <span className="cursor-pointer" onClick={handleSubscriptionClick}>
            {isSubscribed ? <FaBookmark /> : <FaRegBookmark />}
          </span>
        </Tooltip>
     
      </div>
      <div className="absolute bottom-5 right-20 flex items-center mr-2" onClick={(e) => e.stopPropagation()}>
        <Badge color="gray" className="mr-2">{discussion.postCount}</Badge>
        <Tooltip label="Posts on topic">
          <span>
          <FaRegCommentDots />
          </span>
        </Tooltip>
     
      </div>

    {/* User Info */}
    <div className="flex items-center p-4 border-t border-gray-200">
      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
        <Link to={`/profile/${discussion.createdById}`}>
          <Avatar size="sm" radius="xl" src={discussion.createdByAvatar} alt="user avatar" />
        </Link>
        <div className="ml-2">
          <span className="text-gray-900 leading-none">{discussion.createdByUsername}</span>
          <span className="text-gray-500 text-sm ml-1">&#8226; {timeAgo(discussion.createdAt)}</span>
        </div>
      </div>
    </div>
  </div>
  );
};

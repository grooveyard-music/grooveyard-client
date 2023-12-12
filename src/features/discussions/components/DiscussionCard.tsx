import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from 'react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from '@mantine/core';
import { Discussion } from '../types/discussion';
import { deleteDiscussionFn } from '..';
import  useAuthStore  from '../../../state/useAuthStore';
import { DeleteModal } from '../../common';
import { timeAgo } from '../../../util/TimeAgo';



export const DiscussionCard: React.FC<{discussion: Discussion}> = ({ discussion }) => {

  const queryClient = useQueryClient();
 var store = useAuthStore();
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
  const handleDelete = () => {
    deleteDiscussion(discussion.id);
  };

  return (
<div className=" lg:max-w-full lg:flex relative">
{discussion.createdById === store.user?.id && (
          <div className="absolute top-5 right-5">
            <DeleteModal deleteFn={handleDelete} isLoading={isLoading} name="Discussion"/>
          </div>
        )}
  <div className="border min-w-full shadow-lg border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-4">
     
    {
  discussion.genres && discussion.genres.map((genre: string) => (
    <Badge key={genre} className="ml-3">
      {genre}
    </Badge>
  ))
}
    </div>
    <Link to={`/discussion/${discussion.id}`}>
      <div className="text-gray-900 font-bold text-xl mb-2">{discussion.title}</div>
      </Link>
      <p className="text-gray-700 text-base">{discussion.description}</p>
    <div className="flex items-center">
    <div className="text-gray-900 leading-none flex items-center mt-4"> 
    <Link to={`/profile/${discussion.createdById}`}>
    <Avatar size="sm" radius="xl" src={discussion.createdByAvatar} alt="user avatar" />
    </Link>
    <div className="ml-2 flex items-center">
        <span className="mr-2">{discussion.createdByUsername}</span>
        <span className="">&#8226;</span>      
        <span className="text-gray-500 text-sm ml-1">{timeAgo(discussion.createdAt)}</span>
    </div>
    </div>
    </div>
  </div>
</div>
    

  );
};

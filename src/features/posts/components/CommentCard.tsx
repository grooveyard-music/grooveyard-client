import React from 'react'
import { timeAgo } from '../../../util/TimeAgo'
import {Comment, deleteCommentFn, toggleCommentLikeFn } from '../'
import { Avatar } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { notifications } from '@mantine/notifications'
import { FaThumbsUp } from 'react-icons/fa'
import { DeleteModal } from '../../common'
import useAuthStore from '../../../state/useAuthStore'

type Props = {
  comment: Comment
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  const queryClient = useQueryClient();
  var store = useAuthStore();

  const { mutate: toggleCommentLike} = useMutation(
    toggleCommentLikeFn,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllPostsAndDiscussion"]);
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error!',
          message: error.message
        });
      },
    }
  );

  const { mutate: deleteComment, isLoading} = useMutation(
    deleteCommentFn,
    {
      onSuccess: () => {
        notifications.show({
          title: 'Success!',
          message: 'Comment has been successfully deleted',
        });
        queryClient.invalidateQueries(["getPostAndComments"]);
        queryClient.invalidateQueries(["getAllPostsAndDiscussion"]);
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
    deleteComment(comment.id);
  };

 const handleCommentLike = () => {
  toggleCommentLike(comment.id);
  }


  return (
    <div className="p-2 mt-2 border-t border-gray-200 relative">
          <div className="absolute top-2 right-2">
              <DeleteModal 
                        deleteFn={handleDelete}
                        isLoading={isLoading}
                        name="Comment"
                        currentUser={store.user}
                        createdByUserId={comment.createdById}
                        itemToDelete={comment}
                  />
      </div>
  
      <p>{comment.content}</p>

      <div className="text-gray-900 leading-none flex items-center"> 
      <Link to={`/profile/${comment.createdById}`}> 
    <Avatar size="sm" radius="xl" src={comment.createdByAvatar} alt="user avatar" />
    </Link>
    <div className="ml-2 flex items-center mt-4">
        <span className="mr-2">{comment.createdByUsername}</span>
        <span className="">&#8226;</span>      
        <span className="text-gray-500 text-sm ml-1">{timeAgo(comment.createdAt)}</span>
    </div>
    </div>
      <div className="flex flex-col items-end ">
                    <div className="flex items-center cursor-pointer">
                        <div className="ml-4 flex">
                          <button className="mr-2" onClick={handleCommentLike}> 
                          <FaThumbsUp/> 
                          </button>
                          {comment.totalLikes}
                        </div>
                    </div>
      </div>
    </div>
  )
}


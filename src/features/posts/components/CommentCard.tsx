import React from 'react'
import { timeAgo } from '../../../util/TimeAgo'
import {Comment, toggleCommentLikeFn } from '../'
import { Avatar } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { notifications } from '@mantine/notifications'
import { FaThumbsUp } from 'react-icons/fa'

type Props = {
  comment: Comment
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  const queryClient = useQueryClient();


  const { mutate: toggleCommentLike} = useMutation(
    toggleCommentLikeFn,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllPosts"]);
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error!',
          message: error.message
        });
      },
    }
  );


 const handleCommentLike = () => {
  console.log(comment);
  toggleCommentLike(comment.id);
  }


  return (
    <div className="p-2 mt-2 border-t border-gray-200">
       {comment.createdById ? 
     <Link to={`/profile/${comment.createdById}`}>
     <Avatar size="sm" radius="xl" src={comment.createdByAvatar} alt="user avatar" />
     </Link> :
    <Avatar size="sm" radius="xl" src={comment.createdByAvatar} alt="user avatar" />
  }
      <strong>{comment.createdByUsername}</strong> 
      <span className="text-gray-500">{timeAgo(comment.createdAt)}</span>
      <p>{comment.content}</p>

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


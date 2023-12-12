import React from 'react'
import { timeAgo } from '../../../util/TimeAgo'
import {Comment } from '../'

type Props = {
  comment: Comment
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  return (
    <div className="p-2 mt-2 border-t border-gray-200">
      <strong>{comment.createdByUsername}</strong> 
      <span className="text-gray-500">{timeAgo(comment.createdAt)}</span>
      <p>{comment.content}</p>
      {/* Add other properties or functionalities specific to comment if needed */}
    </div>
  )
}


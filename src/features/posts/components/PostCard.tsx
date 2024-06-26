import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from 'react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaComment, FaThumbsUp } from 'react-icons/fa'; 
import { Avatar } from '@mantine/core';
import { CommentCard, CreateCommentForm, Post, deletePostFn, togglePostLikeFn } from '..';
import { DeleteModal } from '../../common';
import { Comment } from '..';
import { timeAgo } from '../../../util/TimeAgo';
import useAuthStore from '../../../state/useAuthStore';
import { SongCard } from '../../upload/components/SongCard';

export const PostCard: React.FC<{post: Post}> = ({ post }) => {
  const queryClient = useQueryClient();
  const [showCommentForm, setShowCommentForm] = useState(false);
  console.log(post);
  var store = useAuthStore();

  const { mutate: deletePost, isLoading} = useMutation(
    deletePostFn,
    {
      onSuccess: () => {
        notifications.show({
          title: 'Success!',
          message: 'Post has been successfully deleted',
        });
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

  const { mutate: togglePostLike} = useMutation(
    togglePostLikeFn,
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
  const handleDelete = () => {
    deletePost(post.id);
  };

  const handlePostLike = () => {
    togglePostLike(post.id);
  }

  const handlePlayTrack = (uri: string) => {
    console.log(`Playing track URI: ${uri}`);
    // Implement the play functionality or navigate to the track page
  };
  return (
    <> 
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4 flex flex-col justify-between relative mt-5">
      <div className="absolute top-2 right-2">
      <DeleteModal 
        deleteFn={handleDelete}
        isLoading={isLoading}
        name="Post"
        currentUser={store.user}
        createdByUserId={post.createdById}
        itemToDelete={post}
      />
      </div>
      <Link to={`/post/${post.id}`}>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{post.title}</h3>
      </Link>
      <p className="mt-1 text-sm text-gray-500 mb-2">{post.content}</p>
      {post.track && post.track.songs && post.track.songs.length > 0 && (
         <>
            {post.track.songs.map((song) => (
               <SongCard 
               key={song.id}
               songs={post.track?.songs  || []} 
             />
            ))}
         </>
        )}
      <div className="mt-2 text-sm text-gray-500 ">
      <div className="text-sm mt-4">
     
      <div className="text-gray-900 leading-none flex items-center"> 
      <Link to={`/profile/${post.createdById}`}> 
    <Avatar size="sm" radius="xl" src={post.createdByAvatar} alt="user avatar" />
    </Link>
    <div className="ml-2 flex items-center">
        <span className="mr-2">{post.createdByUsername}</span>
        <span className="">&#8226;</span>      
        <span className="text-gray-500 text-sm ml-1">{timeAgo(post.createdAt)}</span>
    </div>
    </div>
        <p className="text-gray-600"></p>
     
      </div>
        <div className="flex flex-col items-end ">
                    <div className="flex items-center cursor-pointer">
                      <div className="flex"  onClick={() => setShowCommentForm(!showCommentForm)}>
                        <FaComment className="mr-2" /> {post.totalComments}
                        </div>
                        <div className="ml-4 flex">
                          <button className="mr-2" onClick={handlePostLike}> 
                          <FaThumbsUp/> 
                          </button>
                          {post.totalLikes}
                        </div>
                    </div>
      </div>
      {showCommentForm && (
        <>
          <CreateCommentForm postId={post.id} />
          {post.comments && post.comments.slice(0, 5).map((comment: Comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}

          {post.totalComments > 5 && (
            <div>
              <Link to={`/post/${post.id}`}>View All Comments</Link>
            </div>
          )}
        </>
      )}
    </div>
      
   
    </div>
   
    </>
  );
  
};
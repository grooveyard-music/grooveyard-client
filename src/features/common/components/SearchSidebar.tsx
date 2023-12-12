
import { Link } from 'react-router-dom';
import useAuthStore from '../../../state/useAuthStore';
import {GoCommentDiscussion} from 'react-icons/go'
import { Avatar } from '@mantine/core';

type Props = {};

export function SearchSidebar({}: Props) {
  const store = useAuthStore();
  console.log(store.user);
  return (
      <div className="fixed  bg-white">   
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8 border-b pb-4">
              <span className="inline-flex justify-center items-center">
              <p>   {store.user?.id} </p>
              <div className="ml-3"></div>
              <Avatar size="md" radius="xl"src={store.userProfile?.avatarUrl} alt="it's me" />
                </span>
              </div>
            </li>
            <li>
              <Link to="/" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <GoCommentDiscussion/>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Discussions</span>
              </Link>
            </li>
    
          </ul>
        </div>
      </div>
  );
}

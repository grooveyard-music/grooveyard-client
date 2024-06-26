
import { Link } from 'react-router-dom';

import {GoCommentDiscussion} from 'react-icons/go'
import { Avatar, Indicator } from '@mantine/core';
import useAuthStore from '../../../state/useAuthStore';


export function FeedSidebar() {
  const store = useAuthStore();
  return (
      <div className="fixed  bg-white rounded-lg">   
        <div className="overflow-y-auto overflow-x-hidden flex-grow p-4 shadow-lg ">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8  ">
              <span className="inline-flex justify-center items-center pb-3">
              {store.user?.userName} 
              <div className="ml-3"></div>
              <Indicator inline size={16} offset={7} position="bottom-end" color="green" withBorder>
              <Avatar size="md" radius="xl"src={store.user?.avatar} alt="it's me" />
              </Indicator>
                </span>
              </div>
            </li>
            <div className="text-sm uppercase text-gray-500 mb-2 pt-3 border-b-2">Topics</div>
            <li>
              <Link to="/dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <GoCommentDiscussion/>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">All</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <GoCommentDiscussion/>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Subscriptions</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
  );
}

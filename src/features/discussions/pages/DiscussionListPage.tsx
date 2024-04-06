
import { useGetDiscussions } from '../hooks/useGetDiscussions';
import { Avatar, Container, Input, Loader, Tooltip } from '@mantine/core';
import  useAuthStore  from '../../../state/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { FeedSidebar } from '../../common';
import { Discussion, DiscussionCard } from '..';
import { SetStateAction, useState } from 'react';
import { FaFireAlt, FaRegClock, FaStar } from "react-icons/fa";
export const DiscussionListPage = () => {
const { data: discussions, isLoading, isError } = useGetDiscussions();
const [active, setActive] = useState('new');

const buttons = [
  { name: 'New', value: 'new', icon: <FaRegClock /> },
  { name: 'Hot', value: 'hot', icon: <FaFireAlt /> }, 
  { name: 'Top', value: 'top', icon: <FaStar /> }, 
];


const store = useAuthStore();
const navigate = useNavigate();
if (isLoading) return (
<div className="h-96 flex align-middle">
<Loader size="lg" className="mx-auto" />
</div>
);
if (isError) return <div>An error has occurred</div>;

const handleInputClick = () => {
  navigate('/creatediscussion');
}

const handleButtonClick = (value: SetStateAction<string>) => {
  setActive(value);
};

return (
  <Container size="xl"> 
  <div className="w-full space-y-8 mt-14 h-screen">
    <div className="flex"> 
      <div className="w-1/4"> 
        <FeedSidebar />
      </div>
      <div className="w-3/4 space-y-4"> 
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Topics
        </h2>
        <div className="flex flex-col space-y-4"> 
          <div className="flex items-center pb-4 bg-white p-5 rounded-full">
            <div className="mr-4"> 
              <Avatar size="md" radius="xl" src={store.user?.avatar} alt="it's me" />
            </div>
            <div className="flex-grow">
            <Tooltip label="Create a discussion">
              <Input onClick={handleInputClick} placeholder="Start a discussion..." readOnly />
              </Tooltip>
            </div>
          </div>
          <div className="flex p-2 rounded bg-white ">
            {buttons.map((button) => (
            <div className="flex-none px-4" key={button.value}>
            <button
              className={`flex items-center px-4 py-3 rounded-full ${
                active === button.value
                  ? 'bg-gray-300'
                  : 'hover:bg-gray-700 hover:text-gray-300'
              }`}
              onClick={() => handleButtonClick(button.value)}
            >
              {button.icon} 
              <span className="ml-2">{button.name}</span>
            </button>
          </div>
            ))}
          </div>
        </div>
        {discussions && discussions.map((discussion: Discussion) => (
      
          <DiscussionCard discussion={discussion} key={discussion.id} />
        ))}
      </div>
    </div>
  </div>
</Container>
);

};



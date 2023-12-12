
import { useGetDiscussions } from '../hooks/useGetDiscussions';
import { Avatar, Container, Input, Loader } from '@mantine/core';
import  useAuthStore  from '../../../state/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { FeedSidebar } from '../../common';
import { Discussion, DiscussionCard } from '..';

export const DiscussionListPage = () => {
const { data: discussions, isLoading, isError } = useGetDiscussions();

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

return (
  <Container size="xl"> 
    <div className="w-full space-y-8 mt-14">
      <div className="flex"> {/* Flex container */}
        <div className="w-1/4"> {/* Sidebar width */}
          <FeedSidebar />
        </div>
        <div className="w-3/4 space-y-4"> {/* Content width + padding-left */}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Discussions
          </h2>
          <div className="flex pb-4"> 
          <div className="mr-4"> 
          <Avatar size="md" radius="xl"src={store.userProfile?.avatarUrl} alt="it's me" />
          </div>
          <div className="flex-grow">
          <Input onClick={handleInputClick} placeholder="Start a discussion..." readOnly />
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



import React from 'react'
import { EditProfileModal } from './EditProfileModal'
import  useAuthStore  from '../../../state/useAuthStore';
import { useGetUserProfile } from '../hooks/useGetUserProfile';


type ProfileViewProps = {
  userId: string;
}

export const ProfileInfo: React.FC<ProfileViewProps> = (userId) => {

  if (!userId) {
    return <p>Error: User not found.</p>;
  }
const store = useAuthStore();

var {data} = useGetUserProfile(userId.userId);

if (!data) {
  return <p>Loading...</p>;
}

  return (
    <div className="w-full  px-4 ">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div className="px-6">
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-4 flex justify-center">
        <div className="relative">
        <img alt="..." src={data?.avatarUrl} 
          className="shadow-xl rounded-full h- align-middle border-none w-full"/>
      </div>
        </div>
        <div className="w-full px-4 text-center ">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {data?.communityActivity?.postCount}
              </span>
              <span className="text-sm text-blueGray-400">Posts</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              {data?.communityActivity?.discussionCount}
              </span>
              <span className="text-sm text-blueGray-400">Discussions</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              {data?.communityActivity?.commentCount}
              </span>
              <span className="text-sm text-blueGray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      {userId?.userId === store.user?.id && <EditProfileModal/>} 
      </div>
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
          {data?.fullName}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {data?.location}
        </div>
        <div className="mb-2 text-blueGray-600">
          <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
          <p><strong>Date of Birth:</strong> {data?.birthdate ? new Date(data?.birthdate).toLocaleDateString() : 'Not set'}</p>

        </div>
      </div>
      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
            {data?.biography}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}


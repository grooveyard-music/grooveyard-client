import React, { useState } from 'react'
import { EditProfileModal } from './EditProfileModal'
import  useAuthStore  from '../../../state/useAuthStore';
import { UserProfile, updateUserAvatar } from '..';
import { useQueryClient } from 'react-query';


type ProfileViewProps = {
  userProfile: UserProfile | undefined;
}

export const ProfileInfo: React.FC<ProfileViewProps> = (props) => {
const store = useAuthStore();
const [isHovered, setIsHovered] = useState(false);
const queryClient = useQueryClient();

const handleAvatarChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {  
    if(!store.user?.id)
    {
      return
    }
    updateUserAvatar(file, store.user?.id).then(() => {
     queryClient.invalidateQueries(["getUserProfile"])
    }).catch(error => {
      // Handle error
    });
  }
};


const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.25s ease',
  borderRadius: '50%',
};

const imageContainerStyle: React.CSSProperties = {
  position: 'relative',
  cursor: 'pointer',
};

const imageStyle: React.CSSProperties = {
  borderRadius: '50%',
};


if (!props.userProfile) {
  return <p>Loading...</p>;
}

  return (
    <div className="w-full  px-4 ">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div className="px-6">
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-4 flex justify-center">
        <div 
                style={imageContainerStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => document.getElementById('avatarInput')?.click()}
              >
                <img
                  alt="Avatar"
                  src={props.userProfile?.avatarUrl}
                  style={imageStyle}
                />
                <div style={{ ...overlayStyle, opacity: isHovered ? 1 : 0 }}>
                  <span>Click to change</span>
                </div>
                <input
                  type="file"
                  id="avatarInput"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </div>
        </div>
        <div className="w-full px-4 text-center ">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {props.userProfile?.userActivity?.postCount}
              </span>
              <span className="text-sm text-blueGray-400">Posts</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              {props.userProfile?.userActivity?.discussionCount}
              </span>
              <span className="text-sm text-blueGray-400">Discussions</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              {props.userProfile?.userActivity?.commentCount}
              </span>
              <span className="text-sm text-blueGray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      {props.userProfile?.userId === store.user?.id && <EditProfileModal/>} 
      </div>
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
          {props.userProfile?.fullName}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {props.userProfile?.location}
        </div>
        <div className="mb-2 text-blueGray-600">
          <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
          <p><strong>Date of Birth:</strong> {props.userProfile?.birthdate ? new Date(props.userProfile?.birthdate).toLocaleDateString() : 'Not set'}</p>

        </div>
      </div>
      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
            {props.userProfile?.biography}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}


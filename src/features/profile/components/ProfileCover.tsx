import { AspectRatio, BackgroundImage } from '@mantine/core'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import useAuthStore from '../../../state/useAuthStore';
import { updateUserCover } from '..';
import { notifications } from '@mantine/notifications';
type ProfileCoverProps = {
  coverUrl: string | undefined;
}

export const ProfileCover = React.memo(({ coverUrl }: ProfileCoverProps) => {
console.log(coverUrl);
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();
  const store = useAuthStore();
  const coverOverlayStyle: React.CSSProperties = {
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
  };
  
  const coverContainerStyle: React.CSSProperties = {
    position: 'relative',
    cursor: 'pointer',
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if(!store.user?.id)
    {
      return null;
    }
      updateUserCover(file, store.user?.id).then(() => {
        queryClient.invalidateQueries(["getUserProfile"])
       }).catch(error => {
        notifications.show({
          title: 'Error',
          message: 'Failed to upload cover photo: ' + error.message,
        });
       });
    }
  };
  return (
<>
<AspectRatio ratio={10 / 2} style={coverContainerStyle}>
    
        <BackgroundImage
          src={coverUrl ? coverUrl : ""}
          radius="sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => document.getElementById('coverInput')?.click()}
        >
    
          <div style={{ ...coverOverlayStyle, opacity: isHovered ? 1 : 0 }}>
            <span>Click to change</span>
          </div>
        </BackgroundImage>
      </AspectRatio>
      <input
        type="file"
        id="coverInput"
        style={{ display: 'none' }}
        onChange={handleCoverChange}
        accept="image/*"
      />
    </>
  )
}
);
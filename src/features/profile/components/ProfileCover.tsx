import { AspectRatio, BackgroundImage } from '@mantine/core'
import React, { useState } from 'react'

export const ProfileCover: React.FC = () => {

  const [isHovered, setIsHovered] = useState(false);

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
      // Function to handle file upload
    }
  };
  return (
<>
<AspectRatio ratio={10 / 2} style={coverContainerStyle}>
        <BackgroundImage
          src="https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?cs=srgb&dl=pexels-el%C4%ABna-ar%C4%81ja-3377405.jpg&fm=jpg"
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


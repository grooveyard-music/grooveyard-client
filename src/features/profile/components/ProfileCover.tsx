import { AspectRatio, BackgroundImage } from '@mantine/core'
import React from 'react'

export const ProfileCover: React.FC = () => {
  return (
<>
<AspectRatio ratio={10 / 2} >
      <BackgroundImage 
        src="https://images.inc.com/uploaded_files/image/1920x1080/getty_626660256_2000108620009280158_388846.jpg"
        radius="sm"
        
      >
      </BackgroundImage>
  </AspectRatio>

</>
  )
}


import React, { useRef } from 'react'
import { HeroSection } from '../components/HeroSection'
import { FeatureSection } from '../components/FeatureSection'
import { IntegrationSection } from '../components/IntegrationSection'
import { MeetGrooveyardSection } from '../components/MeetGrooveyardSection'



const HomePage: React.FC = () => {
  
  return (
      <>
     
      <HeroSection />
      <IntegrationSection/> 
      <MeetGrooveyardSection />
      <FeatureSection/>

      </>
    );
}

export default HomePage

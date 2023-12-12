
import './App.css';
import Routing from './Routes';
import {MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { MediaPlayer } from './features/common';


function App() {


  return (
<div className="min-h-screen "> 
      <MantineProvider withNormalizeCSS withGlobalStyles theme={{     components: {
        Container: {
          defaultProps: {
            sizes: {
              xs: 540,
              sm: 720,
              md: 960,
              lg: 1140,
              xl: 1536,
            },
          },
        },
      },loader: 'bars', fontFamily: 'Helvetica' }} >
      <Notifications />
      <Routing />
      <MediaPlayer /> 

      </MantineProvider>
</div>
  );
}

export default App;

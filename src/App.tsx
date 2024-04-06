
import './App.css';
import Routing from './Routes';
import {MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { MediaPlayer } from './features/common';

function App() {
  const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });

  return (
<div className="min-h-screen bg-slate-200 "> 
<MantineProvider theme={theme}>
      <Notifications />
      <Routing />
      <MediaPlayer /> 
  </MantineProvider>
</div>
  );
}

export default App;

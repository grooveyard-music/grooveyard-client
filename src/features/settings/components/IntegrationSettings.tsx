import { Button } from "@mantine/core";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const IntegrationSettings = ({  }) => {
  const location = useLocation();


  const handleSpotifyIntegration = () => {
    const client_id = 'ebc00964bf984155b7801bc86d8302ac'; // Replace with your Spotify Client ID
    const redirect_uri = 'https://localhost:3000/settings/integration'; // Make sure this matches the redirect URI registered in Spotify Dashboard
    const scope = 'streaming user-read-email user-read-private'; // Add other scopes as needed
    const state = (Math.random() + 1).toString(16).substring(7);
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&response_type=token&state=${state}`;
  };
  
  useEffect(() => {
   console.log("test");
    const extractToken = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        console.log("Access Token:", accessToken);
        localStorage.setItem('spotifyUserAccessToken', accessToken);
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    };

    if (location.hash.includes('access_token')) {
      extractToken();
    }
  }, [location]); 
  

    return (
      <div className="bg-white p-8 min-w-[50rem]">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Spotify</h2>
          <button  onClick={handleSpotifyIntegration} className="bg-green-500 hover:bg-red-700 text-white py-2 px-4 rounded text-sm">
           Connect
          </button>
        </div>
        <p className="text-gray-700 text-sm mb-2">
         Integrate your spotify premium account
        </p>
        <div className="h-px bg-gray-300"></div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Youtube</h2>
          <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded text-sm">
            Connect 
          </button>
        </div>
        <p className="text-gray-700 text-sm">
          Integrate your youtube premium account
        </p>
        <div className="h-px bg-gray-300"></div>
      </div>
      

    </div>
    );
  };
  
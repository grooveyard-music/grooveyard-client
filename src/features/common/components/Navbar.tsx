
import { Link } from 'react-router-dom';
import useAuthStore from '../../../state/useAuthStore';
import { Button, Text } from '@mantine/core';

import { ProfileDropdownMenu } from './ProfileDropdownMenu';
import { UploadTrackModal } from '../../upload';


export function Navbar() {


  const { openAuthModal } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.user != null);
 
  return (
    <nav className="bg-transparent top-0">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <Link to="/" className=" font-bold">
            <Text align="center" fw={500} fz="xl" className="text-2xl">
             GrooveYard
            </Text>
            </Link>
            </div>
          </div>
          <div className="flex items-center pr-4">
       
             {!isAuthenticated ? (
              <div className="ml-28">
                 <Button  onClick={openAuthModal} className="rounded-md border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none text-black">
            Login
                </Button>
              </div>
            ) : (
              
             <> 
            <div>
           <UploadTrackModal/>
            </div>
                 <ProfileDropdownMenu/>
            </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

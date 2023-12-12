
import { Link } from 'react-router-dom';
import useAuthStore from '../../../state/useAuthStore';
import { Button, Text } from '@mantine/core';

import { ProfileDropdownMenu } from './ProfileDropdownMenu';


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
            <Link to="/upload" >
              <div  className=" cursor-pointer rounded px-5 py-1.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 mr-10">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Upload</span>
              </div>
              </Link>
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

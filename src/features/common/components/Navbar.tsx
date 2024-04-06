
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../../state/useAuthStore';
import { Button, Group, Text } from '@mantine/core';

import { ProfileDropdownMenu } from './ProfileDropdownMenu';
import { NotificationDropdown } from './NotificationDropdown';
import { CreateDropdownMenu } from './CreateDropdownMenu';
import useModalStore from '../../../state/useModalStore';

export function Navbar() {

  const { openModal } = useModalStore();
  const isAuthenticated = useAuthStore((state) => state.user != null);
  const location = useLocation(); // Use useLocation to get the current path
  const isHomePage = location.pathname === '/';
  const linkTarget = isAuthenticated ? "/dashboard" : "/";


  return (
    <nav className="bg-white top-0">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <Link to={linkTarget} className=" font-bold">
            <Text fw={500} fz="xl" className="text-2xl">
             GrooveYard
            </Text>
            </Link>
            </div>
          </div>
          <div className="flex items-center pr-4">
       
             {!isAuthenticated ? (
              <div className="ml-28">
                 <button  onClick={() => openModal('auth')} className="bg-pink-500 hover:bg-pink-600  font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
              Login
                </button>
              </div>
            ) : (
              
             <> 
           <Group gap="md" className="items-center">
           {isHomePage ? (
                  <Link to="/dashboard">
                    <Button className="rounded-md">Dashboard</Button>
                  </Link>
                )
                : 
                (
                  <>
                  <CreateDropdownMenu/>
                  <NotificationDropdown />
                  <ProfileDropdownMenu />
                  </>
                )
                
                }
         
            </Group>
            </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

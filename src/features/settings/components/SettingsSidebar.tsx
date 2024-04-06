

import { FaHome, FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RiSettings3Line } from 'react-icons/ri';


export const SettingsSidebar = () => {
  return (
    <div className="w-64 p-5 flex flex-col gap-4">
      <Link to="/settings/account" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-gray-700">
        <FaUser size={20} />
        <span>Account</span>
      </Link>
      <Link to="/settings/integration" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-gray-700">
        <RiSettings3Line size={20} />
        <span>Integration</span>
      </Link>
      <Link to="/settings/notifications" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-gray-700">
        <IoIosNotifications size={20} />
        <span>Notifications</span>
      </Link>
    </div>
  );
};
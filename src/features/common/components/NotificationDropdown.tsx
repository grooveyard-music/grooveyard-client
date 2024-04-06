import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { IoIosNotifications } from "react-icons/io";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { markNotificationsRead } from "../api/commonApi";
import { BsFillCircleFill } from "react-icons/bs";
import { UserNotification } from "../types/commonTypes";
type DropdownMenuProps = {};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const NotificationDropdown: React.FC<DropdownMenuProps> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: notifications, isLoading, refetch } = useGetNotifications();

  console.log(notifications)

  const handleNotificationClick = async (notification: UserNotification) => {
    if (!notification.isRead) {
      await markNotificationsRead([notification.id]);
      refetch();
    }
  };



  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getNotificationLink = (notification: { targetType: string; targetId: string; parentId: string; }) => {
    switch (notification.targetType) {
      case 'discussion':
        return `/discussion/${notification.parentId}`;
      case 'post':
        return `/post/${notification.targetId}`;
      case 'comment':
        return `/post/${notification.parentId}`;
      default:
        return '/'; // default link if none matches
    }
  };
  

  return (
    <div className="relative -mt-6 mr-12 z-40">
      <motion.div initial={false} animate={isOpen ? "open" : "closed"} className="absolute w-[400px] ">
        <IoIosNotifications className="cursor-pointer z-10" size={24} whiletap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)} />
        <motion.ul
          className="p-2 bg-gray-50"
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transform: "translateX(-100%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transform: "translateX(-100%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
        {notifications?.slice(0, 5).map((notification) => (
          <motion.li
            className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 pb-4 rounded border-b-2"
            variants={itemVariants}
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
          >
            <NavLink to={getNotificationLink(notification)} className="flex items-center gap-2">
              {!notification.isRead && <BsFillCircleFill color="red" size="8px" />}
              {notification.message}
            </NavLink>
          </motion.li>
        ))}
             <motion.li className="px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white pb-4 rounded">
            <NavLink to="/notifications" className="text-blue-500  hover:text-blue-600">
              View All
            </NavLink>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};


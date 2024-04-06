import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import { logoutUserFn } from "../../auth"
import { useMutation } from "react-query";
import useAuthStore  from "../../../state/useAuthStore";

type DropdownMenuProps = {};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const ProfileDropdownMenu: React.FC<DropdownMenuProps> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reset = useAuthStore(state => state.reset);
  const userId = useAuthStore(state => state.user?.id);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const logoutMutation = useMutation((userId: string) => logoutUserFn(userId));

  const handleLogout = () => {
    if (userId) { 
      logoutMutation.mutate(userId); 
    }
    reset();  
    navigate('/');
  };

  return (
    <div className="relative -mt-6 z-40">
      <motion.div initial={false} animate={isOpen ? "open" : "closed"} className="absolute w-[100px] ">
        <FaUserAlt className="cursor-pointer z-10" size={24} whiletap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)} />
        <motion.ul
          className="p-2 bg-gray-50"
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transform: "translateX(-110%)",
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
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
          <motion.li className="transition-colors  duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 rounded" variants={itemVariants}>
            <NavLink 
              className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white rounded block text-center text-black"
              to={`/profile/${userId}`}>Profile
              </NavLink> 
            </motion.li>
            <motion.li className="transition-colors  duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 pt-2 rounded" variants={itemVariants}>
            <NavLink 
              className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white rounded block text-center text-black"
              to={`/settings`}>
                Settings
              </NavLink> 
            </motion.li>
          <motion.li className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-black rounded text-center pt-3" variants={itemVariants}>
          <button onClick={handleLogout} className="focus:outline-none">
            Logout
        </button>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};


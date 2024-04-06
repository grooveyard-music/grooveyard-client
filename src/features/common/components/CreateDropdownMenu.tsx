import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import useModalStore from '../../../state/useModalStore';
import { useNavigate } from "react-router-dom";

type CreateDropdownMenu = {};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const CreateDropdownMenu: React.FC<CreateDropdownMenu> = () => {

  const navigate = useNavigate();
  const handleCreateTracklistClick = () => {
    // Navigate to /tracklist
    navigate('/tracklist');
  };

  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModalStore();
  return (
    <div className="relative mr-10 -mt-6 z-40">
      <motion.div initial={false} animate={isOpen ? "open" : "closed"} className="absolute w-[300px] ">
        <MdOutlineAddCircleOutline className="cursor-pointer z-10" size={24} whiletap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)} />
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
          <motion.li className="transition-colors  duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 rounded py-2" variants={itemVariants}>
          <button onClick={() => openModal('musicbox')}>Add to music box</button>
            </motion.li>
            <motion.li className="transition-colors  duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 rounded py-2" variants={itemVariants}>
            <button onClick={handleCreateTracklistClick}>Create tracklist</button>
      </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};


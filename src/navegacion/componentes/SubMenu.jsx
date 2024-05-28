import { useState } from 'react';
// import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ChevronDown,
  UserRoundPlus,
  UserRoundCog,
  NotebookText,
  NotebookPen,
  PackageOpen,
} from 'lucide-react';

const icons = {
  UserRoundPlus,
  UserRoundCog,
  NotebookText,
  NotebookPen,
  PackageOpen,
};

export const SubMenu = ({ data }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const getIconComponent = (iconName) => {
    const IconComponent = icons[iconName];
    return IconComponent ? (
      <IconComponent size={23} className="min-w-max" />
    ) : null;
  };
  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && 'text-blue-600'}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <ChevronDown
          className={` ${subMenuOpen && 'rotate-180'} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: 'fit-content',
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.datosTituRutIcono?.map((menu) => (
          <li key={menu}>
            <span className="link" onClick={() => navigate(`${menu.ruta}`)}>
              {/* <PackageOpen size={23} className="min-w-max" /> */}
              {getIconComponent(menu.icono)}
              {/* {menu.icono} */}
              {menu.titulo}
              {/* {menu.ruta} */}
            </span>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

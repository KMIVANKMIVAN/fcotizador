import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { SubMenu } from './SubMenu';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  LogOut,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
  UsersRound,
  NotebookText,
  PackageOpen,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

import {
  eliminarDatosUsuario,
  obtenerDatosUsuario,
} from '../../auth/utilidades/datosUsuarioLocalStor';

export function Menu() {
  const navigate = useNavigate();
  let isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: '16rem',
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: '16rem',
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: '4rem',
          transition: {
            damping: 40,
          },
        },
      };

  const unidad = {
    name: 'Administracion',
    icon: ChevronDown,
    datosTituRutIcono: [
      {
        titulo: 'Crear Usuario',
        ruta: '/navegacion/crearusuarios',
        icono: 'UserRoundPlus',
      },
      {
        titulo: 'Actualizar Usuario',
        ruta: '/navegacion/actualizarUsuarios',
        icono: 'UserRoundCog',
      },
      {
        titulo: 'Domoticus',
        ruta: '/navegacion/domoticus',
        icono: 'PackageOpen',
      },
    ],
  };

  let subMenusList = [
    {
      name: 'Cotizaciones',
      icon: ChevronDown,
      datosTituRutIcono: [
        {
          titulo: 'Cotizar',
          ruta: '/navegacion/crearcotizaciones',
          icono: 'NotebookPen',
        },
        {
          titulo: 'Cotizaciones',
          ruta: '/navegacion/cotizaciones',
          icono: 'NotebookText',
        },
      ],
    },
  ];
  const rolesUsuario = obtenerDatosUsuario().roles;
  let mostrarMenu = false;
  if (
    JSON.stringify([1, 2, 3]) === JSON.stringify(rolesUsuario) ||
    rolesUsuario.includes(2)
  ) {
    mostrarMenu = true;
  }
  /* const rolesUsuario = obtenerDatosUsuario().roles;
  if (
    JSON.stringify([1, 2, 3]) === JSON.stringify(rolesUsuario) ||
    rolesUsuario.includes(2)
  ) {
    subMenusList = [administracion, ...subMenusList];
  } */

  return (
    <div className="">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? 'block' : 'hidden'
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? 'open' : 'closed'}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
        overflow-hidden md:relative fixed 
     h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-cpalet-300  mx-3 ">
          <img
            src="../../../public/logomenu.webp"
            // width={45}
            alt=""
            // className='w-auto'
          />
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            {mostrarMenu && (
              <li>
                <span
                  className="link text-cpalet-500"
                  onClick={() => navigate('/navegacion/usuarios')}
                >
                  <UsersRound size={23} className="min-w-max" />
                  Usuarios
                </span>
              </li>
            )}
            {mostrarMenu && (
              <li>
                <span
                  className="link text-cpalet-500"
                  onClick={() => navigate('/navegacion/domoticus')}
                >
                  <PackageOpen size={23} className="min-w-max" />
                  Domoticus
                </span>
              </li>
            )}
            <li>
              <span
                className="link text-cpalet-500"
                onClick={() => navigate('/navegacion/cotizaciones')}
              >
                <NotebookText size={23} className="min-w-max" />
                Cotizaciones
              </span>
            </li>
            <li>
              <span
                className="link text-cpalet-500"
                onClick={() => navigate('/navegacion/cambiarcontras')}
              >
                <LockKeyhole size={23} className="min-w-max" />
                Cambiar Contraseña
              </span>
            </li>

            {/* {(open || isTabletMid) && (
              <div className="border-y py-5 border-cpalet-300 ">
                <small className="pl-3 text-cpalet-400 inline-block mb-2">
                  Opciones
                </small>
                {subMenusList?.map((menu) => (
                  <div
                    key={menu.name}
                    className="flex flex-col gap-1 text-cpalet-500"
                  >
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )} */}
            <li>
              <span
                className="link text-red-500 "
                onClick={() => {
                  eliminarDatosUsuario(), (window.location.href = '/');
                }}
              >
                <LogOut size={23} className="min-w-max" />
                Salir
              </span>
            </li>
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  md:mt-5">
              <div className="flex border-y border-cpalet-300 p-4 items-center justify-between ">
                <div className="text-cpalet-500">
                  <p>. CALEFACCION</p>
                  <p>. VENTILACION</p>
                  <p>. AIRE ACONDICIONADO</p>
                </div>
                {/* <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p> */}
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer md:mb-5 text-cpalet-800"
        >
          <ChevronLeft size={35} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <ChevronRight size={25} />
      </div>
    </div>
  );
}

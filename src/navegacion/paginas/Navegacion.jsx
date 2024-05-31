import { Outlet } from 'react-router-dom';
// import { Menu } from '../componentes/Menu';

import { Menu } from 'lucide-react';

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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useNavigate } from 'react-router-dom';
import {
  eliminarDatosUsuario,
  obtenerDatosUsuario,
} from '../../auth/utilidades/datosUsuarioLocalStor';
import { ModeToggle } from '../../components/mode-toggle';

export function Navegacion() {
  const navigate = useNavigate();
  //  <main className="max-w-5xl flex-1 mx-auto  bg-cpalet-900"> *
  return (
    <>
      {/* <div className="flex">
        <Menu />
        <div className="w-5xl flex-1 m-5 md:w-auto bg-cpalet-900">
          <div className="reset-styles">
            <Outlet />
          </div>
        </div>
      </div> */}
      <Sheet>
        <div className="bg-cpalet-500 w-full h-10 flex  items-center mb-5">
          <SheetTrigger>
            <Menu className="ml-5 text-white" />
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>
            <span
              className="link text-cpalet-500"
              onClick={() => navigate('/navegacion/usuarios')}
            >
              <UsersRound size={23} className="min-w-max" />
              Usuarios
            </span>
            <span
              className="link text-cpalet-500"
              onClick={() => navigate('/navegacion/domoticus')}
            >
              <PackageOpen size={23} className="min-w-max" />
              Domoticus
            </span>
            <span
              className="link text-cpalet-500"
              onClick={() => navigate('/navegacion/cotizaciones')}
            >
              <NotebookText size={23} className="min-w-max" />
              Cotizaciones
            </span>
            <span
              className="link text-cpalet-500"
              onClick={() => navigate('/cambiarcontras')}
            >
              <LockKeyhole size={23} className="min-w-max" />
              Cambiar Contraseña
            </span>
            <span
              className="link text-red-500"
              onClick={() => {
                eliminarDatosUsuario(), (window.location.href = '/');
              }}
            >
              <LogOut size={23} className="min-w-max" />
              Salir
            </span>
            <span className="link text-cpalet-500">
              <ModeToggle />
              Elige el modo
            </span>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="m-5">
        <Outlet />
      </div>
    </>
  );
}

import { Outlet } from 'react-router-dom';

import { Menu } from 'lucide-react';

import {
  LogOut,
  LockKeyhole,
  UsersRound,
  NotebookText,
  PackageOpen,
  FileCog,
  ReceiptEuro,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

import { useNavigate } from 'react-router-dom';
import {
  eliminarDatosUsuario,
  obtenerDatosUsuario,
} from '../../auth/utilidades/datosUsuarioLocalStor';
import { ModeToggle } from '../../components/mode-toggle';

export function Navegacion() {
  const navigate = useNavigate();
  const rolesUsuario = obtenerDatosUsuario().roles;
  let mostrarMenu = false;
  if (
    JSON.stringify([1, 2, 3]) === JSON.stringify(rolesUsuario) ||
    rolesUsuario.includes(2)
  ) {
    mostrarMenu = true;
  }
  return (
    <>
      <Sheet>
        <div className="bg-cpalet-500 w-full h-10 flex items-center mb-5 sticky top-0 z-50">
          <SheetTrigger>
            <Menu className="ml-5 text-white" />
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>
            {mostrarMenu && (
              <SheetClose asChild>
                <span
                  className="link text-cpalet-500"
                  onClick={() => navigate('/navegacion/usuarios')}
                >
                  <UsersRound size={23} className="min-w-max" />
                  Usuarios
                </span>
              </SheetClose>
            )}
            {mostrarMenu && (
              <SheetClose asChild>
                <span
                  className="link text-cpalet-500"
                  onClick={() => navigate('/navegacion/adminproductos')}
                >
                  <ReceiptEuro size={23} className="min-w-max" />
                  Productos
                </span>
              </SheetClose>
            )}
            {mostrarMenu && (
              <SheetClose asChild>
                <span
                  className="link text-cpalet-500"
                  onClick={() => navigate('/navegacion/admincotizaciones')}
                >
                  <FileCog size={23} className="min-w-max" />
                  Administracion de Valores
                </span>
              </SheetClose>
            )}
            {mostrarMenu && (
              <SheetClose asChild>
                <span
                  className="link text-cpalet-500"
                  onClick={() => navigate('/navegacion/domoticus')}
                >
                  <PackageOpen size={23} className="min-w-max" />
                  Domoticus
                </span>
              </SheetClose>
            )}
            <SheetClose asChild>
              <span
                className="link text-cpalet-500"
                onClick={() => navigate('/navegacion/cotizaciones')}
              >
                <NotebookText size={23} className="min-w-max" />
                Cotizaciones
              </span>
            </SheetClose>
            <SheetClose asChild>
              <span
                className="link text-cpalet-500"
                onClick={() => navigate('/cambiarcontras')}
              >
                <LockKeyhole size={23} className="min-w-max" />
                Cambiar Contraseña
              </span>
            </SheetClose>
            <SheetClose asChild>
              <span
                className="link text-red-500"
                onClick={() => {
                  eliminarDatosUsuario(), (window.location.href = '/');
                }}
              >
                <LogOut size={23} className="min-w-max" />
                Salir
              </span>
            </SheetClose>
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

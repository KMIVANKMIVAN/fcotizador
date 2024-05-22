import { useState } from 'react'; // Importa useState

import { Button } from '@/components/ui/button';
import {
  EllipsisVertical,
  ChevronDown,
  LogOut,
  UserRoundPlus,
  UserRoundCog,
  Notebook,
  NotebookText,
  NotebookPen,
  PackagePlus,
  PackageOpen,
  X,
} from 'lucide-react';

export function Cabecera() {
  const [isUsuariosVisible, setIsUsuariosVisible] = useState(false);
  const [isCotizacionesVisible, setIsCotizacionesVisible] = useState(false);
  const [isAdministracionVisible, setIsAdministracionVisible] = useState(false);

  const [cerrarAbrirMenu, setCerrarAbrirMenu] = useState(false);

  const toggleUsuarios = () => setIsUsuariosVisible(!isUsuariosVisible);
  const toggleCotizaciones = () =>
    setIsCotizacionesVisible(!isCotizacionesVisible);
  const toggleAdministracion = () =>
    setIsAdministracionVisible(!isAdministracionVisible);

  const toggleMenu = () => setCerrarAbrirMenu(!cerrarAbrirMenu);

  return (
    <>
      <div class="flex justify-between items-center h-15 md:h-16">
        <div class="my-1 mx-2  md:h-14 md:w-40 ">
          <img
            src="../../../public/logo1.webp"
            className="h-9 md:w-full md:h-full  "
            alt="Logo"
          />
        </div>
        <div class="my-1 mx-2 md:flex-grow ">
          <Button
            variant="outline"
            className="text-black  hover:bg-transparent border-0 text-lg md:hidden"
            onClick={toggleMenu}
          >
            {cerrarAbrirMenu ? <X /> : <EllipsisVertical />}
          </Button>
          <div className="hidden h-14 md:flex  ">
            <div className="flex-1 ">
              <div className="flex">
                <div className="flex flex-col w-52   overflow-hidden">
                  <span className="spanMenu" onClick={toggleUsuarios}>
                    Usuarios <ChevronDown />
                  </span>
                  {isUsuariosVisible && (
                    <ul className="bg-white rounded-b-lg">
                      <li className="liMenuDesplegado">
                        <UserRoundPlus className="text-sky-500" />
                        <span className="ml-2">Crear Usuarios</span>
                      </li>
                      <li className="liMenuDesplegado">
                        <UserRoundCog className="text-sky-500" />
                        <span className="ml-2">Editar Usuarios</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="flex flex-col w-64  overflow-hidden">
                  <span className="spanMenu" onClick={toggleCotizaciones}>
                    Cotizaciones <ChevronDown />
                  </span>
                  {isCotizacionesVisible && (
                    <ul className="bg-white rounded-b-lg">
                      <li className="liMenuDesplegado">
                        <Notebook className="text-sky-500" />
                        <span className="ml-2">Crear Cotizaciones</span>
                      </li>
                      <li className="liMenuDesplegado">
                        <NotebookText className="text-sky-500" />
                        <span className="ml-2">Editar Cotizaciones</span>
                      </li>
                      <li className="liMenuDesplegado">
                        <NotebookPen className="text-sky-500" />
                        <span className="ml-2">Listar Cotizaciones</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="flex flex-col w-52   overflow-hidden">
                  <span className="spanMenu" onClick={toggleAdministracion}>
                    Administracion <ChevronDown />
                  </span>
                  {isAdministracionVisible && (
                    <ul className="bg-white rounded-b-lg">
                      <li className="liMenuDesplegado">
                        <PackagePlus className="text-sky-500" />
                        <span className="ml-2">Crear Funciones</span>
                      </li>
                      <li className="liMenuDesplegado">
                        <PackageOpen className="text-sky-500" />
                        <span className="ml-2 ">Editar Funciones</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="w-24  flex items-center">
              <Button className="w-full bg-sky-500">
                Salir <LogOut />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {cerrarAbrirMenu && (
        <div className="absolute left-0 top-15 bg-slate-500 bg-opacity-50 w-full h-full flex">
          <div
            className="w-1/4"
            onClick={() => {
              toggleMenu();
            }}
          ></div>
          <div className="w-3/4 bg-slate-100">
            <ul>
              <li>
                <span className="spanMenu" onClick={toggleUsuarios}>
                  Usuarios <ChevronDown />
                </span>
                {isUsuariosVisible && (
                  <ul className="adelanteUlInterno">
                    <li className="liMenu">
                      <UserRoundPlus className="text-sky-500" />
                      <span className="ml-2">Crear Usuarios</span>
                    </li>
                    <li className="liMenu">
                      <UserRoundCog className="text-sky-500" />
                      <span className="ml-2">Editar Usuarios</span>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <span className="spanMenu" onClick={toggleCotizaciones}>
                  Cotizaciones <ChevronDown />
                </span>
                {isCotizacionesVisible && (
                  <ul className="adelanteUlInterno">
                    <li className="liMenu">
                      <Notebook className="text-sky-500" />
                      <span className="ml-2">Crear Cotizaciones</span>
                    </li>
                    <li className="liMenu">
                      <NotebookText className="text-sky-500" />
                      <span className="ml-2">Editar Cotizaciones</span>
                    </li>
                    <li className="liMenu">
                      <NotebookPen className="text-sky-500" />
                      <span className="ml-2">Listar Cotizaciones</span>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <span className="spanMenu" onClick={toggleAdministracion}>
                  Administracion <ChevronDown />
                </span>
                {isAdministracionVisible && (
                  <ul className="adelanteUlInterno">
                    <li className="liMenu">
                      <PackagePlus className="text-sky-500" />
                      <span className="ml-2">Crear Funciones</span>
                    </li>
                    <li className="liMenu">
                      <PackageOpen className="text-sky-500" />
                      <span className="ml-2 ">Editar Funciones</span>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            <div className="py-2"></div>
            <div className="centrarHorizontal m-4">
              <Button variant="outline" className="w-full bg-sky-500">
                Salir <LogOut />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

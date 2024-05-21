import { useState } from 'react'; // Importa useState
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <div className="cabecera">
        <img src="../../../public/logo.png" className="ml-4" />
        <Button
          variant="outline"
          className="text-black bg-transparent hover:bg-transparent border-0 text-lg"
          onClick={toggleMenu}
        >
          <EllipsisVertical />
        </Button>
        {cerrarAbrirMenu && ( // Condicional para mostrar u ocultar el nav
          <nav className="navCabecera ">
            <div className="atras bg-slate-700 bg-opacity-50 w-full h-full absolute left-0 top-0">
              <div className="adelante bg-slate-200 w-60 h-full absolute right-0">
                <div className="flex items-center justify-end cursor-pointer p-2">
                  <Button
                    variant="outline"
                    className="text-black bg-transparent hover:bg-transparent border-0 text-lg"
                    onClick={toggleMenu}
                  >
                    <X />
                  </Button>
                </div>
                <ul>
                  <li>
                    <Button
                      variant="outline"
                      className="text-black bg-transparent hover:bg-transparent border-0 text-lg"
                      onClick={toggleUsuarios}
                    >
                      Usuarios <ChevronDown />
                    </Button>
                    {isUsuariosVisible && (
                      <ul className="adelanteUlInterno">
                        <li className="flex items-center">
                          <UserRoundPlus />
                          <span className="ml-2">Crear</span>
                        </li>
                        <li className="flex items-center">
                          <UserRoundCog />
                          <span className="ml-2">Editar</span>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Button
                      variant="outline"
                      className="text-black bg-transparent hover:bg-transparent border-0 text-lg"
                      onClick={toggleCotizaciones}
                    >
                      Cotizaciones <ChevronDown />
                    </Button>
                    {isCotizacionesVisible && (
                      <ul className="adelanteUlInterno">
                        <li className="flex items-center">
                          <Notebook />
                          <span className="ml-2">Crear Cotizaciones</span>
                        </li>
                        <li className="flex items-center">
                          <NotebookText />
                          <span className="ml-2">Editar Cotizaciones</span>
                        </li>
                        <li className="flex items-center">
                          <NotebookPen />
                          <span className="ml-2">Listar Cotizaciones</span>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Button
                      variant="outline"
                      className="text-black bg-transparent hover:bg-transparent border-0 text-lg"
                      onClick={toggleAdministracion}
                    >
                      Administracion <ChevronDown />
                    </Button>
                    {isAdministracionVisible && (
                      <ul className="adelanteUlInterno">
                        <li className="flex items-center">
                          <PackagePlus />
                          <span className="ml-2">Crear Funciones</span>
                        </li>
                        <li className="flex items-center">
                          <PackageOpen />
                          <span className="ml-2">Editar Funciones</span>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
                <div className="py-2"></div>
                <div className="centrarHorizontal m-2">
                  <Button variant="outline" className="w-full bg-blue-500">
                    Salir <LogOut />
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}

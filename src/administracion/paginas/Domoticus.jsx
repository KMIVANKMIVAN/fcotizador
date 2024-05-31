import { useState } from 'react'; // Importa useState
import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { CrearEmpresa } from '../componentes/CrearEmpresa';
import { CrearSucursal } from '../componentes/CrearSucursal';
import { CrearRol } from '../componentes/CrearRol';
import { CrearDepartamento } from '../componentes/CrearDepartamento';
import { CrearDirecciones } from '../componentes/CrearDirecciones';
import { CrearUnidades } from '../componentes/CrearUnidades';
import { CrearCargo } from '../componentes/CrearCargo';

import { Buscador } from '../componentes/Buscador';

export function Domoticus() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [buscarUrl, setBuscarUrl] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleSelection = (component, url, title) => {
    setSelectedComponent(component);
    setBuscarUrl(url);
    setTitulo(title);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'CrearEmpresa':
        return <CrearEmpresa buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearSucursal':
        return <CrearSucursal buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearRol':
        return <CrearRol buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearDepartamento':
        return <CrearDepartamento buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearDirecciones':
        return <CrearDirecciones buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearUnidades':
        return <CrearUnidades buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearCargo':
        return <CrearCargo buscarUrl={buscarUrl} titulo={titulo} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-5 flex justify-center">
        <Breadcrumb>
          <BreadcrumbList className="text-cpalet-500">
            <BreadcrumbItem
              onClick={() =>
                handleSelection('CrearEmpresa', 'empresas', 'Empresa')
              }
            >
              <h1 className="menuDomoticus">
                Crear Empresa
              </h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearDirecciones',
                  'direcciones',
                  'Direcciones'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Direcciones</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection('CrearUnidades', 'unidades', 'Unidades')
              }
            >
              <h1 className="menuDomoticus">Crear Unidades</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() => handleSelection('CrearCargo', 'cargos', 'Cargo')}
            >
              <h1 className="menuDomoticus">Crear Cargo</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() => handleSelection('CrearRol', 'roles', 'Rol')}
            >
              <h1 className="menuDomoticus">Crear Rol</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearDepartamento',
                  'departamentos',
                  'Departamento'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Departamento</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection('CrearSucursal', 'sucursales', 'Sucursal')
              }
            >
              <h1 className="menuDomoticus">Crear Sucursal</h1>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {buscarUrl && (
        <>
          <div className="w-full ">{renderComponent()}</div>
          <div className="w-full ">
            <Buscador buscarUrl={buscarUrl} titulo={titulo} />
          </div>
        </>
      )}
    </>
  );
}

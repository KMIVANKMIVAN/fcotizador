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
import { CrearCiudad } from '../componentes/CrearCiudad';
import { CrearDirecciones } from '../componentes/CrearDirecciones';
import { CrearUnidades } from '../componentes/CrearUnidades';
import { CrearCargo } from '../componentes/CrearCargo';

import { Buscador } from '../componentes/Buscador';

export function Domoticus() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [buscarUrl, setBuscarUrl] = useState('');
  const [buscarUrlPorNom, setBuscarUrlPorNom] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleSelection = (component, url, title, urlpornom) => {
    setSelectedComponent(component);
    setBuscarUrl(url);
    setTitulo(title);
    setBuscarUrlPorNom(urlpornom);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'CrearEmpresa':
        return <CrearEmpresa buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearSucursal':
        return <CrearSucursal buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearRol':
        return <CrearRol buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearCiudad':
        return <CrearCiudad buscarUrl={buscarUrl} titulo={titulo} />;
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
                handleSelection(
                  'CrearEmpresa',
                  'empresas',
                  'Empresa',
                  'porempresa'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Empresa</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearDirecciones',
                  'direcciones',
                  'Direcciones',
                  'pordireccion'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Direcciones</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearUnidades',
                  'unidades',
                  'Unidades',
                  'porunidad'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Unidades</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection('CrearCargo', 'cargos', 'Cargo', 'porcargo')
              }
            >
              <h1 className="menuDomoticus">Crear Cargo</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection('CrearRol', 'roles', 'Rol', 'porrol')
              }
            >
              <h1 className="menuDomoticus">Crear Rol</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearCiudad',
                  'ciudades',
                  'Ciudad',
                  'porciudad'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Ciudad</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearSucursal',
                  'sucursales',
                  'Sucursal',
                  'porsucursal'
                )
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
            <Buscador
              buscarUrl={buscarUrl}
              buscarUrlPorNom={buscarUrlPorNom}
              titulo={titulo}
            />
          </div>
        </>
      )}
    </>
  );
}

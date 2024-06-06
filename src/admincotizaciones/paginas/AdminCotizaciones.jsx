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

import { CrearCiudadZona } from '../componentes/CrearCiudadZona';
import { CrearNivelpiso } from '../componentes/CrearNivelpiso';
import { CrearOrientacion } from '../componentes/CrearOrientacion';
import { CrearTipopared } from '../componentes/CrearTipopared';
import { CrearTipotecho } from '../componentes/CrearTipotecho';
import { CrearTiposuelo } from '../componentes/CrearTiposuelo';
import { CrearTipovidrio } from '../componentes/CrearTipovidrio';
import { CrearTipocotizacion } from '../componentes/CrearTipocotizacion';

import { Buscador } from '../componentes/Buscador';

export function AdminCotizaciones() {
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
      case 'CrearCiudadZona':
        return <CrearCiudadZona buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearNivelpiso':
        return <CrearNivelpiso buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearOrientacion':
        return <CrearOrientacion buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearTipopared':
        return <CrearTipopared buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearDirecciones':
        return <CrearDirecciones buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearTipotecho':
        return <CrearTipotecho buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearTiposuelo':
        return <CrearTiposuelo buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearTipovidrio':
        return <CrearTipovidrio buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearTipocotizacion':
        return <CrearTipocotizacion buscarUrl={buscarUrl} titulo={titulo} />;
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
                  'CrearCiudadZona',
                  'ciudadeszonas',
                  'Ciudad_Zona'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Ciudad Zona</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearTipotecho',
                  'tipostechos',
                  'Tipo_de_Techo'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Tipo de Techo</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearTiposuelo',
                  'tipossuelos',
                  'Tipo_de_Suelo'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Tipo de Suelo</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearTipovidrio',
                  'tiposvidrios',
                  'Tipo_de_Vidrio'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Tipo de Vidrio</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearOrientacion',
                  'orientaciones',
                  'Orientacion'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Orientacion</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearTipopared',
                  'tiposparedes',
                  'Tipo_de_Pared'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Tipo de Pared</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearNivelpiso',
                  'nivelespisos',
                  'Nivel_de_Piso'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Nivel de Piso</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearTipocotizacion',
                  'tiposcotizaciones',
                  'Tipo_de_Cotizacion'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Tipo de Cotizacion</h1>
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

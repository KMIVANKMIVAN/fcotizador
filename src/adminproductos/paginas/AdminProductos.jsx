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

import { CrearRadiadoreje50cm } from '../componentes/CrearRadiadoreje50cm';
import { CrearToalleroeje50cm } from '../componentes/CrearToalleroeje50cm';

import { Buscador } from '../componentes/Buscador';

export function AdminProductos() {
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
      case 'CrearRadiadoreje50cm':
        return <CrearRadiadoreje50cm buscarUrl={buscarUrl} titulo={titulo} />;
      case 'CrearToalleroeje50cm':
        return <CrearToalleroeje50cm buscarUrl={buscarUrl} titulo={titulo} />;
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
                  'CrearRadiadoreje50cm',
                  'radiadoresejes50cm',
                  'Radiador_Eje_50cm',
                  'pormodelo'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Radiador Eje 50cm</h1>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem
              onClick={() =>
                handleSelection(
                  'CrearToalleroeje50cm',
                  'toallerosejes50cm',
                  'Toallero_Eje_50cm',
                  'pormodelo'
                )
              }
            >
              <h1 className="menuDomoticus">Crear Toallero eje 50cm</h1>
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

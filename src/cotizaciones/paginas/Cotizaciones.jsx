import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { FormCotizPag1 } from '../componentes/FormCotizPag1';
import { FormCotizPag2 } from '../componentes/FormCotizPag2';
import { FormCotizPag3 } from '../componentes/FormCotizPag3';
import { FormCotizPag4 } from '../componentes/FormCotizPag4';

export function Cotizaciones() {
  const [establecerPagina, setEstablecerPagina] = useState(1);

  const FormularioPaginas = [
    <FormCotizPag1 />,
    <FormCotizPag2 />,
    <FormCotizPag3 />,
    <FormCotizPag4 />,
  ];

  const paginaSiguiente = () => {
    setEstablecerPagina((prev) => (prev % FormularioPaginas.length) + 1);
  };

  const paginaAnterior = () => {
    setEstablecerPagina((prev) => (prev === 1 ? FormularioPaginas.length : prev - 1));
  };

  return (
    <>
      <div className="flex flex-col p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <div className="text-center mb-4">
          <h1 className="text-white text-2xl">Paso Nro {establecerPagina}</h1>
        </div>
        <div className='my-4'>{FormularioPaginas[establecerPagina - 1]}</div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={paginaAnterior}>
            <ChevronLeft />
            Anterior
          </Button>
          <Button variant="outline" onClick={paginaSiguiente}>
            Siguiente
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}

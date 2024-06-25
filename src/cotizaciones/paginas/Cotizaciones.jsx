import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FormuCotizacion } from '../componentes/FormuCotizacion';
import { Buscador } from '../componentes/Buscador';
import { FormuCotizAmbiente } from '../componentes/FormuCotizAmbiente';

export function Cotizaciones() {
  return (
    <>
      <FormuCotizacion />
      
      <div className="py-4"></div>
      <Buscador />
    </>
  );
}

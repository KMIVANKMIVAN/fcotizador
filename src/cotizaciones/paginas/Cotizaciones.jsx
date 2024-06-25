import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FormuCotizacion } from '../componentes/FormuCotizacion';
import { Buscador } from '../componentes/Buscador';
import { FormuCotizGeneral } from '../componentes/FormuCotizGeneral';

export function Cotizaciones() {
  return (
    <>
      <FormuCotizGeneral />
      <div className="py-2"></div>
      <FormuCotizacion />
      <Buscador />
    </>
  );
}

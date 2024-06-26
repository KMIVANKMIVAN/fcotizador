import { useState } from 'react'; // Importa useState
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { CrearUsuarios } from '../componentes/CrearUsuarios';
import { Buscador } from '../componentes/Buscador';
export function Usuarios() {
  const buscarUrl = 'usuarios';
  const titulo = 'Usuarios';
  return (
    <>
      <CrearUsuarios />
      <Buscador
        buscarUrl={buscarUrl}
        buscarUrlPorNom="pornomci"
        titulo={titulo}
      />
    </>
  );
}

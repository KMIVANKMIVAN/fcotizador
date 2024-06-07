import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { Tablas } from './Tablas';

import { columnasCotizacion } from '../utilidades/estructuraDatos';
import { manejoError } from '../utilidades/mostrarErrores';

export function Buscador() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;

  const [respuestaBuscar, setRespuestaBuscar] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState('');

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const buscarDatos = async () => {
    const url = textoBuscar
      ? `${urlBackendBase}cotizaciones/pornombcotiz/${textoBuscar}`
      : `${urlBackendBase}cotizaciones/`;

    try {
      const respuesta = await axios.get(url, { headers });
      setRespuestaBuscar(respuesta.data);
    } catch (error) {
      setRespuestaBuscar([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <p className="text-2xl text-cpalet-500 capitalize">Cotizaciones</p>
        <div className="flex w-full md:w-[500px] items-center space-x-2 my-5">
          <Input
            className="flex-grow"
            type="text"
            placeholder="Buscar..."
            value={textoBuscar}
            onChange={(e) => setTextoBuscar(e.target.value)}
          />
          <Button type="submit" variant="mibotonprimario" onClick={buscarDatos}>
            Buscar
          </Button>
        </div>
      </div>
      {respuestaBuscar.length > 0 && (
        <Tablas columnas={columnasCotizacion} respuesta={respuestaBuscar} />
      )}
    </>
  );
}

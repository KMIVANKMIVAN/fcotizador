import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { manejoError } from '../utilidades/mostrarErrores';

import { Tablas } from './Tablas';

import {
  columnasRadiadoreje50cm,
  columnasToalleroeje50cm,
} from '../utilidades/estructuraDatos';

export function Buscador({ buscarUrl, buscarUrlPorNom, titulo }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;

  const [respuestaBuscar, setRespuestaBuscar] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState('');

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const buscarDatos = async () => {
    const url = textoBuscar
      ? `${urlBackendBase}${buscarUrl}/${buscarUrlPorNom}/${textoBuscar}`
      : `${urlBackendBase}${buscarUrl}`;

    try {
      const respuesta = await axios.get(url, { headers });
      setRespuestaBuscar(respuesta.data);
    } catch (error) {
      setRespuestaBuscar([]);
      manejoError(error);
    }
  };

  const columnasMap = {
    Radiador_Eje_50cm: columnasRadiadoreje50cm,
    Toallero_Eje_50cm: columnasToalleroeje50cm,
  };

  const columnas = columnasMap[titulo] || [];
  const tituloSinSubrayados = titulo.replace(/_/g, ' ');

  useEffect(() => {
    setRespuestaBuscar([]);
    setTextoBuscar(''); // Restablece textoBuscar cuando cambia el título
  }, [titulo]);
  return (
    <>
      <div className="flex flex-col items-center my-4">
        <p className="text-2xl text-cpalet-500">{tituloSinSubrayados}</p>
        <div className="flex w-full md:w-[500px] items-center space-x-2 my-5">
          <Input
            className="flex-grow"
            type="text"
            placeholder="Buscar..."
            value={textoBuscar}
            onChange={(e) => setTextoBuscar(e.target.value)}
          />
          <Button
            // className="bg-cpalet-500"
            variant="mibotonprimario"
            type="submit"
            onClick={() => buscarDatos()}
          >
            Buscar
          </Button>
        </div>
      </div>
      {titulo && (
        <div>
          {respuestaBuscar && (
            <>
              <Tablas
                columnas={columnas}
                respuesta={respuestaBuscar}
                titulo={titulo}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

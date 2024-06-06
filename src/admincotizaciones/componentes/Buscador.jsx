import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { manejoError } from '../utilidades/mostrarErrores';

import { Tablas } from './Tablas';

import {
  columnasCiudadzona,
  columnasCotizacion,
  columnasNivelpiso,
  columnasOrientacion,
  columnasTipopared,
  columnasTiposuelo,
  columnasTipotecho,
  columnasTipovidrio,
} from '../utilidades/estructuraDatos';

export function Buscador({ buscarUrl, titulo }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const url = `${urlBackendBase}${buscarUrl}`;

  const [respuestaBuscar, setRespuestaBuscar] = useState([]);

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const buscarDatos = async () => {
    const respuesta = await axios.get(url, { headers });
    try {
      setRespuestaBuscar(respuesta.data);
    } catch (error) {
      setRespuestaBuscar([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    setRespuestaBuscar([]);
  }, [titulo]);

  const columnasMap = {
    Ciudad_Zona: columnasCiudadzona,
    Cotizacion: columnasCotizacion,
    Nivel_de_Piso: columnasNivelpiso,
    Orientacion: columnasOrientacion,
    Tipo_de_Pared: columnasTipopared,
    Tipo_de_Suelo: columnasTiposuelo,
    Tipo_de_Techo: columnasTipotecho,
    Tipo_de_Vidrio: columnasTipovidrio,
  };

  const columnas = columnasMap[titulo] || [];
  const tituloSinSubrayados = titulo.replace(/_/g, ' ');

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <p className="text-2xl text-cpalet-500">{tituloSinSubrayados}</p>
        <div className="flex w-full md:w-[500px] items-center space-x-2 my-5">
          <Input className="flex-grow" type="text" placeholder="Buscar..." />
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
            <Tablas
              columnas={columnas}
              respuesta={respuestaBuscar}
              titulo={titulo}
            />
          )}
        </div>
      )}
    </>
  );
}

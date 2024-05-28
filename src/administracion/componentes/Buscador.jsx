import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';

import { Tablas } from './Tablas';
import { TablaUsuario } from './TablaUsuario';

import {
  columnasCargos,
  columnasDepartamento,
  columnasDirecciones,
  columnasEmpresas,
  columnasRoles,
  columnasSucursales,
  columnasUnidades,
  columnasUsuario,
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
      if (error.response) {
        const { data } = error.response;
        if (data.error) {
          errorToast(`RS: ${data.error}`, false);
        }
        if (data.message) {
          errorToast(`RS: ${data.message}`, false);
        }
      } else if (error.request) {
        'RF: No se pudo obtener respuesta del servidor', false;
      } else {
        errorToast('RF: Error al enviar la solicitud', false);
      }
    }
  };

  useEffect(() => {
    setRespuestaBuscar([]);
  }, [titulo]);

  const columnasMap = {
    Empresa: columnasEmpresas,
    Direcciones: columnasDirecciones,
    Unidades: columnasUnidades,
    Cargo: columnasCargos,
    Rol: columnasRoles,
    Departamento: columnasDepartamento,
    Sucursal: columnasSucursales,
    Usuarios: columnasUsuario,
  };

  const tamanoTablaMap = {
    Rol: 'w-[280px] md:w-[450px]',
    Departamento: 'w-[280px] md:w-[450px]',
    Sucursal: 'w-[280px] md:w-[1000px]',
    Cargo: 'w-[280px] md:w-[1000px]',
    Unidades: 'w-[280px] md:w-[1000px]',
    Direcciones: 'w-[280px] md:w-[600px]',
    Empresa: 'w-[280px] md:w-[1000px]',
    Usuarios: 'w-[280px] md:w-[1000px]',
  };

  const tamanoTabla = tamanoTablaMap[titulo] || '500px';
  const columnas = columnasMap[titulo] || [];
  return (
    <div className="flex flex-col items-center space-y-4 my-5">
      <h1 className="text-xl text-cpalet-500">{titulo}</h1>
      <div className="flex w-full md:w-[500px] items-center space-x-2">
        <Input className="flex-grow" type="text" placeholder="Buscar..." />
        <Button type="submit" onClick={() => buscarDatos()}>
          Buscar
        </Button>
      </div>
      {titulo !== 'Usuarios' && (
        <div className={` ${tamanoTabla}  space-x-2`}>
          {respuestaBuscar && (
            <Tablas
              columnas={columnas}
              respuesta={respuestaBuscar}
              titulo={titulo}
            />
          )}
        </div>
      )}
      {titulo === 'Usuarios' && (
        <div className={` ${tamanoTabla}  space-x-2`}>
          {respuestaBuscar && (
            <TablaUsuario
              columnasUsuario={columnas}
              respuestaUsuarios={respuestaBuscar}
            />
          )}
        </div>
      )}
    </div>
  );
}

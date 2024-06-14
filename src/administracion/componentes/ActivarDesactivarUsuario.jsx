import { useState } from 'react';
import axios from 'axios';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { exitoToast, errorToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';

export function ActivarDesactivarUsuario({ idActualizar, esActivo }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUsuarios = `${urlBackendBase}usuarios/actestado/${idActualizar}`;
  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUsuarios, setRespuestaUsuarios] = useState(null);
  const [activo, setActivo] = useState(esActivo);

  const actualizarEstado = async (nuevoEstado) => {
    try {
      const respuesta = await axios.patch(
        urlUsuarios,
        { es_activo: nuevoEstado },
        { headers }
      );
      exitoToast(
        `Usuario ${respuesta.data.nombres} se actualizó el estado a: ${respuesta.data.es_activo ? 'Activo' : 'Inactivo'}`,
        false
      );
      setRespuestaUsuarios(respuesta.data);
      setActivo(nuevoEstado);
    } catch (error) {
      setRespuestaUsuarios(null);
      manejoError(error);
    }
  };

  const activarUsuario = () => {
    actualizarEstado(true);
  };

  const desactivarUsuario = () => {
    actualizarEstado(false);
  };

  return (
    <div>
      {activo ? (
        <LockKeyholeOpen
          onClick={desactivarUsuario}
          className="cursor-pointer text-green-500"
        />
      ) : (
        <LockKeyhole
          onClick={activarUsuario}
          className="cursor-pointer text-red-500"
        />
      )}
    </div>
  );
}

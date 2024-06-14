import { useState } from 'react';
import axios from 'axios';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { exitoToast, errorToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

import { KeyRound } from 'lucide-react';

export function ResetContraseUsuario({ idActualizar }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUsuarios = `${urlBackendBase}usuarios/resetcontra/${idActualizar}`;
  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUsuarios, setRespuestaUsuarios] = useState(null);

  const resetearContrasenia = async () => {
    try {
      const respuesta = await axios.patch(urlUsuarios, {}, { headers });
      exitoToast(
        `Usuario ${respuesta.data.nombres} se reseteó la contraseña a su CI`,
        false
      );
      setRespuestaUsuarios(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios(null);
      manejoError(error);
    }
  };

  return (
    <KeyRound
      onClick={resetearContrasenia}
      className="cursor-pointer text-red-500"
    />
  );
}

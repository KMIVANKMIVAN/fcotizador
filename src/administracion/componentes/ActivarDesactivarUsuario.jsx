import { useState } from 'react';
import axios from 'axios';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { Switch } from '@/components/ui/switch';
import { exitoToast, errorToast } from '../../lib/notificaciones';

export function ActivarDesactivarUsuario({ idActualizar, esActivo }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUsuarios = `${urlBackendBase}usuarios/${idActualizar}`;
  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUsuarios, setRespuestaUsuarios] = useState([]);

  const actualizarEstado = async (nuevoEstado) => {
    console.log('Actualizando estado a:', nuevoEstado);
    console.log('URL:', urlUsuarios);
    console.log('Headers:', headers);
    try {
      const respuesta = await axios.patch(
        urlUsuarios,
        { es_activo: nuevoEstado },
        { headers }
      );
      exitoToast(
        `Estado actualizado a: ${respuesta.data.activo ? 'Activo' : 'Inactivo'}`,
        false
      );
      setRespuestaUsuarios(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
      manejoError(error);
    }
  };

  const manejoError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.error) {
        errorToast(`RS: ${data.error}`, false);
      }
      if (data.message) {
        errorToast(`RS: ${data.message}`, false);
      }
    } else if (error.request) {
      errorToast('RF: No se pudo obtener respuesta del servidor', false);
    } else {
      errorToast('RF: Error al enviar la solicitud', false);
    }
  };

  const handleSwitchToggle = () => {
    const nuevoEstado = !esActivo; // Invertimos el estado actual
    actualizarEstado(nuevoEstado);
  };

  return (
    <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
      <Switch checked={esActivo} onChange={handleSwitchToggle} />
    </div>
  );
}
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ActualizarRadiadoreje50cm({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlRadiadoreje50cm = `${urlBackendBase}radiadoresejes50cm/${filaSeleccionada.id}`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaRadiadoreje50cm, setRespuestaRadiadoreje50cm] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      modelo: filaSeleccionada.modelo,
      potenciawats: filaSeleccionada.potenciawats,
    },
  });

  const actualizarRadiadoreje50cm = async (data) => {
    try {
      const respuesta = await axios.patch(urlRadiadoreje50cm, data, {
        headers,
      });
      exitoToast(
        `Se Actualizo el Radiador Eje 50cm: ${respuesta.data.modelo}`,
        false
      );
      setRespuestaRadiadoreje50cm(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaRadiadoreje50cm([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-2 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarRadiadoreje50cm)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">modelo:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('modelo', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                potenciawats:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                step="0.1"
                min="0"
                {...register('potenciawats', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Actualizar Radiador Eje 50cm
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

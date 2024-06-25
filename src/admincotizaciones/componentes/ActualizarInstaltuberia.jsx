import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ActualizarInstaltuberia({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlInstalradiatoallero = `${urlBackendBase}instaltuberias/${filaSeleccionada.id}`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaInstalradiatoallero, setRespuestaInstalradiatoallero] =
    useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inicio: filaSeleccionada.inicio,
      fin: filaSeleccionada.fin,
      horas: filaSeleccionada.horas,
    },
  });

  const actualizarInstalradiatoallero = async (data) => {
    try {
      const respuesta = await axios.patch(urlInstalradiatoallero, data, {
        headers,
      });
      exitoToast(
        `Se Actualizo el Tiempo de Instalar la Tuberia: ${respuesta.data.nropersona}`,
        false
      );
      setRespuestaInstalradiatoallero(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaInstalradiatoallero([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarInstalradiatoallero)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                longitud inicial:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                step="0.1"
                min="0"
                {...register('inicio', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">horas:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('horas', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                logitud final:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                step="0.1"
                min="0"
                {...register('fin', { required: true })}
              />
            </div>
            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Actualizar Tiempo de Instalar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

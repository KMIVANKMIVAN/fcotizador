import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearInstalradiatoallero() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlInstalradiatoallero = `${urlBackendBase}instalradiatoalleros`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaInstalradiatoallero, setRespuestaInstalradiatoallero] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearInstalradiatoallero = async (data) => {
    try {
      const respuesta = await axios.post(urlInstalradiatoallero, data, { headers });
      exitoToast(
        `Se Creo el Tiempo de Instalar el nro R. T.: ${respuesta.data.nroradiador}`,
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
          onSubmit={handleSubmit(crearInstalradiatoallero)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">nro radiador:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('nroradiador', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">horas:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('horas', { required: true })}
              />
            </div>
            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Crear Tiempo de Instalar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

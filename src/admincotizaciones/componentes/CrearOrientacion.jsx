import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearOrientacion() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlOrientacion = `${urlBackendBase}orientaciones`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaOrientacion, setRespuestaOrientacion] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearOrientacion = async (data) => {
    try {
      const respuesta = await axios.post(urlOrientacion, data, { headers });
      exitoToast(
        `Se Creo la Orientacion : ${respuesta.data.orientacion}`,
        false
      );
      setRespuestaOrientacion(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaOrientacion([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(crearOrientacion)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">orientacion:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('orientacion', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">valor:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="number"
                {...register('valor', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="mibotoncrear"
                  className="w-full"
                >
                  Crear Orientacion
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

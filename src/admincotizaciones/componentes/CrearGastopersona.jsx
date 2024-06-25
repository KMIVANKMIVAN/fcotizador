import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearGastopersona() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlGastopersona = `${urlBackendBase}gastospersonas`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaGastopersona, setRespuestaGastopersona] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearGastopersona = async (data) => {
    try {
      const respuesta = await axios.post(urlGastopersona, data, { headers });
      exitoToast(
        `Se Creo el Gasto nro de Persona: ${respuesta.data.nropersona}`,
        false
      );
      setRespuestaGastopersona(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaGastopersona([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(crearGastopersona)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">nro persona:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('nropersona', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">alojamiento:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('alojamiento', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">alimento:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('alimento', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">extras:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                step="0.01"
                min="0"
                {...register('extras', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Crear Gasto Persona
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

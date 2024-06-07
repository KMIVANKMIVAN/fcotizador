import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

export function CrearCiudad() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCiudades = `${urlBackendBase}ciudades`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCiudades, setRespuestaCiudades] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearCiudades = async (data) => {
    try {
      const respuesta = await axios.post(urlCiudades, data, { headers });
      exitoToast(`Se Creo la Ciudad: ${respuesta.data.ciudad}`, false);
      setRespuestaCiudades(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaCiudades([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(crearCiudades)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">ciudad:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('ciudad', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">valor:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('valor', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="mibotoncrear"
                  className="w-full"
                >
                  Crear Ciudad
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

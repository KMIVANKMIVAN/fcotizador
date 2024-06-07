import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearTiposuelo() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTiposuelo = `${urlBackendBase}tipossuelos`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaTiposuelo, setRespuestaTiposuelo] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearTiposuelo = async (data) => {
    try {
      const respuesta = await axios.post(urlTiposuelo, data, { headers });
      exitoToast(
        `Se Creo el Tipo de Suelo: ${respuesta.data.tiposuelo}`,
        false
      );
      setRespuestaTiposuelo(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaTiposuelo([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(crearTiposuelo)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                tipo de suelo:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('tiposuelo', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">valor:</Label>
              <Input
                className="text-cpalet-500 capitalize"
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
                  Crear Tipo de Suelo
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

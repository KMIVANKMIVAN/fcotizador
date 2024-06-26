import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearTipotecho() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTipotecho = `${urlBackendBase}tipostechos`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaTipotecho, setRespuestaTipotecho] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearTipotecho = async (data) => {
    try {
      const respuesta = await axios.post(urlTipotecho, data, { headers });
      exitoToast(
        `Se Creo el Tipo de Techo: ${respuesta.data.tipotecho}`,
        false
      );
      setRespuestaTipotecho(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaTipotecho([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="tarjetasEstilos">
        <form
          onSubmit={handleSubmit(crearTipotecho)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                tipo de techo:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('tipotecho', { required: true })}
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
                  Crear Tipo de Techo
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

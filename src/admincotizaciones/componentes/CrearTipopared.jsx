import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearTipopared() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTipopared = `${urlBackendBase}tiposparedes`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaTipopared, setRespuestaTipopared] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearTipopared = async (data) => {
    try {
      const respuesta = await axios.post(urlTipopared, data, { headers });
      exitoToast(
        `Se Creo el Tipo de Pared: ${respuesta.data.tipopared}`,
        false
      );
      setRespuestaTipopared(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaTipopared([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="tarjetasEstilos">
        <form
          onSubmit={handleSubmit(crearTipopared)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                tipo de pared:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('tipopared', { required: true })}
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
                  Crear Tipo de Pared
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ActualizarTipopared({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTipopared = `${urlBackendBase}tiposparedes/${filaSeleccionada.id}`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaTipopared, setRespuestaTipopared] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipopared: filaSeleccionada.tipopared,
      valor: filaSeleccionada.valor,
    },
  });

  const actualizarTipopared = async (data) => {
    try {
      const respuesta = await axios.patch(urlTipopared, data, { headers });
      exitoToast(
        `Se Actualizo el Tipo de Pared: ${respuesta.data.tipopared}`,
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
      <div className="flex flex-col md:flex-row p-5 border-2 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarTipopared)}
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
                step="0.0001"
                min="0"
                max="1"
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
                  Actualizar Tipo de Pared
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ActualizarTipovidrio({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTipovidrio = `${urlBackendBase}tiposvidrios/${filaSeleccionada.id}`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaTipovidrio, setRespuestaTipovidrio] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipovidrio: filaSeleccionada.tipovidrio,
      valor: filaSeleccionada.valor,
    },
  });

  const actualizarTipovidrio = async (data) => {
    try {
      const respuesta = await axios.patch(urlTipovidrio, data, { headers });
      exitoToast(
        `Se Actualizo el Tipo de Vidrio: ${respuesta.data.tipovidrio}`,
        false
      );
      setRespuestaTipovidrio(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaTipovidrio([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarTipovidrio)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">
                tipo de vidrio:
              </Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('tipovidrio', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">valor:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="number"
                step="0.0001"
                min="0"
                max="1"
                {...register('valor', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Actualizar Tipo de Vidrio
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

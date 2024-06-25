import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ActualizarTipocotizacion({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTipocotizacion = `${urlBackendBase}tiposcotizaciones/${filaSeleccionada.id}`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaTipocotizacion, setRespuestaTipocotizacion] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipocotizacion: filaSeleccionada.tipocotizacion,
      // valor: filaSeleccionada.valor,
    },
  });

  const actualizarTipocotizacion = async (data) => {
    try {
      const respuesta = await axios.patch(urlTipocotizacion, data, { headers });
      exitoToast(
        `Se Actualizo el Tipo de Cotizacion: ${respuesta.data.tipocotizacion}`,
        false
      );
      setRespuestaTipocotizacion(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaTipocotizacion([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-2 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarTipocotizacion)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                tipo de cotizacion:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('tipocotizacion', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Actualizar Tipo de Cotizacion
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

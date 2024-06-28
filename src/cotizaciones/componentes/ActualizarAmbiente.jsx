import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

import useStoreRecargador from '../estados/recargarPeticiones';

// import { FormuCotizAmbiente } from './FormuCotizAmbiente';

export function ActualizarAmbiente({ filaSeleccionada }) {
  console.log('filaSeleccionada', filaSeleccionada);
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCotizacionambiente = `${urlBackendBase}cotizacionesambientes/${filaSeleccionada.id}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const increcargador = useStoreRecargador((state) => state.increcargador);

  const [respuestaCotizacionambiente, setRespuestaCotizacionambiente] =
    useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombreambiente: filaSeleccionada.nombreambiente,
      volumen: filaSeleccionada.volumen,
      area: filaSeleccionada.area,
      altura: filaSeleccionada.altura,
      nrocelda: filaSeleccionada.nrocelda,
      nroradiador: filaSeleccionada.nroradiador,
      nroventana: filaSeleccionada.nroventana.toString(),
    },
  });

  const actualizarCotizacionambiente = async (data) => {
    try {
      const respuesta = await axios.patch(urlCotizacionambiente, data, {
        headers,
      });
      exitoToast(
        `Ambientes actualizado: ${respuesta.data.nombreambiente}`,
        false
      );
      setRespuestaCotizacionambiente(respuesta.data);
      increcargador();
    } catch (error) {
      manejoError(error);
    }
  };

  const eliminarCotizacionambiente = async () => {
    try {
      const respuesta = await axios.delete(urlCotizacionambiente, { headers });
      exitoToast(`Ambiente eliminado: ${respuesta.data.message}`, false);
      increcargador();
    } catch (error) {
      manejoError(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(actualizarCotizacionambiente)}
        className="w-full"
      >
        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 text-sm">
                Nombre Abitacion:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('nombreambiente', {
                  required: 'El nombre ambiente es requerida',
                })}
              />
              {errors.nombreambiente && (
                <p className="text-red-500">{errors.nombreambiente.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 text-sm">
                Área m<sup>2</sup>:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                step="0.01"
                min="0"
                {...register('area', { required: 'El área es requerida' })}
              />
              {errors.area && (
                <p className="text-red-500">{errors.area.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 text-sm">Altura m:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                step="0.01"
                min="0"
                {...register('altura', {
                  required: 'La altura es requerida',
                })}
              />
              {errors.altura && (
                <p className="text-red-500">{errors.altura.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 text-sm">
                Volumen m<sup>3</sup>:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('volumen', {
                  required: 'El volumen es requerido',
                })}
                disabled
              />
              {errors.volumen && (
                <p className="text-red-500">{errors.volumen.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">nro celdas</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('nrocelda', {
                  required: 'El nro celdas es requerida',
                })}
                readOnly
              />
              {errors.nrocelda && (
                <p className="text-red-500">{errors.nrocelda.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                nro radiadores
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                min="1"
                {...register('nroradiador', {
                  required: 'El nro radiadores es requerida',
                })}
              />
              {errors.nroradiador && (
                <p className="text-red-500">{errors.nroradiador.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/7 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                nro ventanas:
              </Label>
              <Controller
                name="nroventana"
                control={control}
                rules={{ required: 'La cantidad de ventanas es requerida' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 capitalize">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>CANTIDAD DE VENTANAS:</SelectLabel>
                        <SelectItem value="1">1 Ventana</SelectItem>
                        <SelectItem value="2">2 Ventanas</SelectItem>
                        <SelectItem value="3">3 Ventanas</SelectItem>
                        <SelectItem value="4">4 Ventanas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.nroventana && (
                <p className="text-red-500">{errors.nroventana.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <Button type="submit" variant="mibotoncrear" className="">
            Actualizar Ambiente
          </Button>
          <Button
            type="button"
            onClick={eliminarCotizacionambiente}
            variant="mibotoneliminarambie"
            className=""
          >
            Eliminar Ambiente
          </Button>
        </div>
      </form>
      {/* <FormuCotizAmbiente /> */}
    </>
  );
}

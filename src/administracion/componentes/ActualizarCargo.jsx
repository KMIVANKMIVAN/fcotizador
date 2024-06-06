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

export function ActualizarCargo({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCargos = `${urlBackendBase}cargos/${filaSeleccionada.id}`;
  const urlUnidades = `${urlBackendBase}unidades`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCargos, setRespuestaCargos] = useState([]);
  const [respuestaUnidades, setRespuestaUnidades] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm({
    defaultValues: {
      cargo: filaSeleccionada.cargo,
      descripcion: filaSeleccionada.descripcion,
      unidad_id: filaSeleccionada.unidad.id.toString(),
    },
  });

  const actualizarCargo = async (data) => {
    try {
      const respuesta = await axios.patch(urlCargos, data, { headers });
      exitoToast(`Se Actualizo el Cargo: ${respuesta.data.cargo}`, false);
      setRespuestaCargos(respuesta.data);
    } catch (error) {
      setRespuestaCargos([]);
      manejoError(error);
    }
  };

  const pedirUnidades = async () => {
    const respuesta = await axios.get(urlUnidades, { headers });
    try {
      setRespuestaUnidades(respuesta.data);
    } catch (error) {
      setRespuestaUnidades([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirUnidades();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarCargo)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">cargo:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('cargo', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">unidad:</Label>
              <Controller
                name="unidad_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 uppercase">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>DEPARTAMENTOS:</SelectLabel>
                        {respuestaUnidades.map((unidad) => (
                          <SelectItem
                            key={unidad.id}
                            value={unidad.id.toString()}
                          >
                            {unidad.unidad}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">descripcion:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('descripcion', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant=""
                  className="bg-green-500 w-full"
                >
                  Actualizar Cargo
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

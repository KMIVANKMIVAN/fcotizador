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

export function ActualizarUnidades({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUnidades = `${urlBackendBase}unidades/${filaSeleccionada.id}`;
  const urlDirecciones = `${urlBackendBase}direcciones`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUnidades, setRespuestaUnidades] = useState([]);
  const [respuestaDirecciones, setRespuestaDirecciones] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm({
    defaultValues: {
      unidad: filaSeleccionada.unidad,
      descripcion: filaSeleccionada.descripcion,
      direccion_id: filaSeleccionada.direccion.id.toString(),
    },
  });

  const actualizarUnidad = async (data) => {
    try {
      const respuesta = await axios.patch(urlUnidades, data, { headers });
      exitoToast(`Se Creo la Unidad: ${respuesta.data.unidad}`, false);
      setRespuestaUnidades(respuesta.data);
    } catch (error) {
      setRespuestaDirecciones([]);
      manejoError(error);
    }
  };

  const pedirDirecciones = async () => {
    const respuesta = await axios.get(urlDirecciones, { headers });
    try {
      setRespuestaDirecciones(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirDirecciones();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarUnidad)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">unidad:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('unidad', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">direccion:</Label>
              <Controller
                name="direccion_id"
                control={control}
                defaultValue=""
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
                        <SelectLabel>DIRECCIONES:</SelectLabel>
                        {respuestaDirecciones.map((direccion) => (
                          <SelectItem
                            key={direccion.id}
                            value={direccion.id.toString()}
                          >
                            {direccion.direccion}
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
                  variant="mibotoncrear"
                  className="w-full"
                >
                  Actualizar Unidad
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

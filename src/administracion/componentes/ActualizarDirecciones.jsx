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

export function ActualizarDirecciones({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlDirecciones = `${urlBackendBase}direcciones/${filaSeleccionada.id}`;
  const urlEmpresas = `${urlBackendBase}empresas`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaDirecciones, setRespuestaDirecciones] = useState([]);
  const [respuestaEmpresas, setRespuestaEmpresas] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm({
    defaultValues: {
      direccion: filaSeleccionada.direccion,
      empresa_id: filaSeleccionada.empresa.id.toString(),
      descripcion: filaSeleccionada.descripcion,
    },
  });

  const actualizarDireccion = async (data) => {
    try {
      const respuesta = await axios.patch(urlDirecciones, data, { headers });
      exitoToast(
        `Se Actualizo la Direccion: ${respuesta.data.direccion}`,
        false
      );
      setRespuestaDirecciones(respuesta.data);
    } catch (error) {
      setRespuestaDirecciones([]);
      manejoError(error);
    }
  };

  const pedirEmpresas = async () => {
    const respuesta = await axios.get(urlEmpresas, { headers });
    try {
      setRespuestaEmpresas(respuesta.data);
      console.log(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirEmpresas();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-2 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarDireccion)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">direccion:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('direccion', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">empresa:</Label>
              <Controller
                name="empresa_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 capitalize">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>EMPRESAS:</SelectLabel>
                        {respuestaEmpresas.map((empresa) => (
                          <SelectItem
                            key={empresa.id}
                            value={empresa.id.toString()}
                          >
                            {empresa.razon_social}
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
              <Label className="text-cpalet-500 capitalize">descripcion:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('descripcion', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Actualizar Direccion
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

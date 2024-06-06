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

export function ActualizarSucursal({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlSucursales = `${urlBackendBase}sucursales/${filaSeleccionada.id}`;
  const urlCiudades = `${urlBackendBase}ciudades`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaSucursales, setRespuestaSucursales] = useState([]);
  const [respuestaCiudades, setRespuestaCiudades] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm({
    defaultValues: {
      sucursal: filaSeleccionada.sucursal,
      ubicacion: filaSeleccionada.ubicacion,
      ciudad_id: filaSeleccionada.ciudad.id.toString(),
    },
  });

  const actualizarSucursal = async (data) => {
    try {
      const respuesta = await axios.patch(urlSucursales, data, { headers });
      exitoToast(`Se Actualizo la Sucursal: ${respuesta.data.sucursal}`, false);
      setRespuestaSucursales(respuesta.data);
    } catch (error) {
      setRespuestaSucursales([]);
      manejoError(error);
    }
  };

  const pedirCiudades = async () => {
    const respuesta = await axios.get(urlCiudades, { headers });
    try {
      setRespuestaCiudades(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirCiudades();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarSucursal)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">sucursal:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('sucursal', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">ciudad:</Label>
              <Controller
                name="ciudad_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 uppercase">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>CIUDADES:</SelectLabel>
                        {respuestaCiudades.map((ciudad) => (
                          <SelectItem
                            key={ciudad.id}
                            value={ciudad.id.toString()}
                          >
                            {ciudad.ciudad}
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
              <Label className="text-cpalet-500 uppercase">ubicacion:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('ubicacion', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button type="submit" variant="mibotoncrear" className="w-full">
                  Actualizar Sucursal
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

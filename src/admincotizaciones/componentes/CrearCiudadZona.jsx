import axios from 'axios';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { useForm, Controller } from 'react-hook-form';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

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

export function CrearCiudadZona() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCiudadZona = `${urlBackendBase}ciudadeszonas`;
  const urlCiudades = `${urlBackendBase}ciudades`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaCiudadZona, setRespuestaCiudadZona] = useState([]);
  const [respuestaCiudades, setRespuestaCiudades] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearCiudadZona = async (data) => {
    try {
      const respuesta = await axios.post(urlCiudadZona, data, { headers });
      exitoToast(`Se Creo la Ciudad Zona: ${respuesta.data.ciudadzona}`, false);
      setRespuestaCiudadZona(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaCiudadZona([]);
      manejoError(error);
    }
  };

  const pedirCiudades = async () => {
    const respuesta = await axios.get(urlCiudades, { headers });
    try {
      setRespuestaCiudades(respuesta.data);
      console.log(respuesta.data);
    } catch (error) {
      setRespuestaCiudades([]);
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
          onSubmit={handleSubmit(crearCiudadZona)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">ciudad zona:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('ciudadzona', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">ciudad:</Label>
              <Controller
                name="ciudad"
                control={control}
                defaultValue=""
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
                  Crear Ciudad Zona
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

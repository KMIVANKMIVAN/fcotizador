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

export function ActualizarUnidades({ idActualizar }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUnidades = `${urlBackendBase}unidades/${idActualizar}`;
  const urlDirecciones = `${urlBackendBase}direcciones`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUnidades, setRespuestaUnidades] = useState([]);
  const [resPedirUnidad, setResPedirUnidad] = useState([]);
  const [respuestaDirecciones, setRespuestaDirecciones] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm();

  const actualizarUnidad = async (data) => {
    data.complemento = data.complemento === '' ? null : data.complemento;
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

  const pedirUnidad = async () => {
    try {
      const respuesta = await axios.get(urlUnidades, { headers });
      setResPedirUnidad(respuesta.data);
      // Utiliza setValue para establecer los valores de los campos del formulario
      Object.keys(respuesta.data).forEach((key) => {
        setValue(key, respuesta.data[key]);
      });
    } catch (error) {
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirDirecciones();
  }, []);

  useEffect(() => {
    if (idActualizar) {
      pedirUnidad();
    }
  }, [idActualizar]);

  const manejoError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.error) {
        errorToast(`RS: ${data.error}`, false);
      }
      if (data.message) {
        errorToast(`RS: ${data.message}`, false);
      }
    } else if (error.request) {
      errorToast('RF: No se pudo obtener respuesta del servidor', false);
    } else {
      errorToast('RF: Error al enviar la solicitud', false);
    }
  };

  return (
    <>

          <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
            <form
              onSubmit={handleSubmit(actualizarUnidad)}
              className="flex flex-col md:flex-row w-full"
            >
              <div className="basis-full md:basis-1/2 p-2 ">
                <div className="py-2">
                  <Label className="text-white uppercase">unidad:</Label>
                  <Input
                    className="text-white uppercase"
                    type="text"
                    {...register('unidad', { required: true })}
                  />
                </div>
                <div className="py-2">
                  <Label className="text-white uppercase">direccion:</Label>
                  <Controller
                    name="direccion"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full text-white uppercase">
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
                  <Label className="text-white uppercase">descripcion:</Label>
                  <Input
                    className="text-white uppercase"
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
                      Crear Unidad
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

    </>
  );
}

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


export function ActualizarCargo({ idActualizar }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCargos = `${urlBackendBase}cargos/${idActualizar}`;
  const urlUnidades = `${urlBackendBase}unidades`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCargos, setRespuestaCargos] = useState([]);
  const [resPedirCargo, setResPedirCargo] = useState([]);
  const [respuestaUnidades, setRespuestaUnidades] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm();

  const actualizarCargo = async (data) => {
    data.complemento = data.complemento === '' ? null : data.complemento;
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

  const pedirCargo = async () => {
    try {
      const respuesta = await axios.get(urlCargos, { headers });
      setResPedirCargo(respuesta.data);
      Object.keys(respuesta.data).forEach((key) => {
        setValue(key, respuesta.data[key]);
      });
    } catch (error) {
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirUnidades();
  }, []);

  useEffect(() => {
    if (idActualizar) {
      pedirCargo();
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
          onSubmit={handleSubmit(actualizarCargo)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">cargo:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('cargo', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">unidad:</Label>
              <Controller
                name="unidad"
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

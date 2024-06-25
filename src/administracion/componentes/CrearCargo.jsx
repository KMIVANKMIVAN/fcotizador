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

export function CrearCargo() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCargos = `${urlBackendBase}cargos`;
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
    reset,
    formState: { errors },
  } = useForm();

  const crearCargo = async (data) => {
    try {
      const respuesta = await axios.post(urlCargos, data, { headers });
      exitoToast(`Se Creo el Cargo: ${respuesta.data.cargo}`, false);
      setRespuestaCargos(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaCargos([]);
      manejoError(error);
    }
  };

  const pedirUnidades = async () => {
    try {
      const respuesta = await axios.get(urlUnidades, { headers });
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
      <div className="tarjetasEstilos">
        <form
          onSubmit={handleSubmit(crearCargo)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">cargo:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('cargo', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">unidad:</Label>
              <Controller
                name="unidad"
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
              <Label className="text-cpalet-500 capitalize">descripcion:</Label>
              <Input
                className="text-cpalet-500 capitalize"
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
                  Crear Empresa
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

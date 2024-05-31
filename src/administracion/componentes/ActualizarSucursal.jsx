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
  const urlDepartamentos = `${urlBackendBase}departamentos`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaSucursales, setRespuestaSucursales] = useState([]);
  const [respuestaDepartamentos, setRespuestaDepartamentos] = useState([]);

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
      departamento_id: filaSeleccionada.departamento.id.toString(),
    },
  });

  const crearSucursal = async (data) => {
    try {
      const respuesta = await axios.patch(urlSucursales, data, { headers });
      exitoToast(`Se Actualizo la Sucursal: ${respuesta.data.sucursal}`, false);
      setRespuestaSucursales(respuesta.data);
    } catch (error) {
      setRespuestaSucursales([]);
      manejoError(error);
    }
  };

  const pedirDepartamentos = async () => {
    const respuesta = await axios.get(urlDepartamentos, { headers });
    try {
      setRespuestaDepartamentos(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirDepartamentos();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <form
          onSubmit={handleSubmit(crearSucursal)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">sucursal:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('sucursal', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">departamento:</Label>
              <Controller
                name="departamento_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-white uppercase">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>DEPARTAMENTOS:</SelectLabel>
                        {respuestaDepartamentos.map((departamento) => (
                          <SelectItem
                            key={departamento.id}
                            value={departamento.id.toString()}
                          >
                            {departamento.departamento}
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
              <Label className="text-white uppercase">ubicacion:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('ubicacion', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant=""
                  className="bg-green-500 w-full"
                >
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

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
import { manejoError } from "../utilidades/mostrarErrores";

export function CrearSucursal() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlSucursales = `${urlBackendBase}sucursales`;
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
    reset,
    formState: { errors },
  } = useForm();

  const crearSucursal = async (data) => {
    try {
      const respuesta = await axios.post(urlSucursales, data, { headers });
      exitoToast(`Se Creo la Sucursal: ${respuesta.data.sucursal}`, false);
      setRespuestaSucursales(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaSucursales([]);
      manejoError(error);
    }
  };

  const pedirDepartamentos = async () => {
    const respuesta = await axios.get(urlDepartamentos, { headers });
    try {
      setRespuestaDepartamentos(respuesta.data);
      console.log(respuesta.data);
    } catch (error) {
      setRespuestaDepartamentos([]);
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
                name="departamento"
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

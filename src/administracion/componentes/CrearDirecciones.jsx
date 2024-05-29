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

export function CrearDirecciones() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlDirecciones = `${urlBackendBase}direcciones`;
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
    reset,
    formState: { errors },
  } = useForm();

  const crearDireccion = async (data) => {
    try {
      const respuesta = await axios.post(urlDirecciones, data, { headers });
      exitoToast(`Se Creo la Direccion: ${respuesta.data.direccion}`, false);
      setRespuestaDirecciones(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaDirecciones([]);
      manejoError(error);
    }
  };

  const pedirEmpresas = async () => {
    const respuesta = await axios.get(urlEmpresas, { headers });
    console.log("hola");
    try {
      setRespuestaEmpresas(respuesta.data);
      console.log(respuesta.data);
    } catch (error) {
      setRespuestaEmpresas([]);
      manejoError(error);
    }
  };
  useEffect(() => {
    pedirEmpresas();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <form
          onSubmit={handleSubmit(crearDireccion)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">direccion:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('direccion', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">empresa:</Label>
              <Controller
                name="empresa"
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
                  Crear Direccion
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

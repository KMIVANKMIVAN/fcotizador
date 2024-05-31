import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
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
import { manejoError } from '../../administracion/utilidades/mostrarErrores';
import {
  zonas,
  tipoCotizacion,
  orientacion,
  tipoPared,
} from '../utilidades/datos';

export function FormuBasico() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlDepartamentos = `${urlBackendBase}departamentos`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaDepartamentos, setRespuestaDepartamentos] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const pedirDepartamentos = async () => {
    const respuesta = await axios.get(urlDepartamentos, { headers });
    try {
      setRespuestaDepartamentos(respuesta.data);
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
      <div className="flex flex-col p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <div className="text-center mb-4">
          <h1 className="text-white text-2xl">Paso Nro 1</h1>
        </div>
        <form
          // onSubmit={handleSubmit(crearSucursal)}
          className="flex flex-wrap w-full"
        >
          <div className="w-full md:w-1/2 p-2">
            <div className="py-2">
              <Label className="text-white uppercase">Departamentos:</Label>
              <Controller
                name="departamentos"
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

            <div className="py-2">
              <Label className="text-white uppercase">Zonas:</Label>
              <Controller
                name="zonas"
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
                        <SelectLabel>ZONAS:</SelectLabel>
                        {zonas.map((zona) => (
                          <SelectItem key={zona.zona} value={zona.zona}>
                            {zona.zona}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="py-2">
              <Label className="text-white uppercase">
                Tipo de Cotización:
              </Label>
              <Controller
                name="tipoCotizacion"
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
                        <SelectLabel>TIPO DE COTIZACIÓN:</SelectLabel>
                        {tipoCotizacion.map((tipo) => (
                          <SelectItem
                            key={tipo.tipoCotizacion}
                            value={tipo.tipoCotizacion}
                          >
                            {tipo.tipoCotizacion}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-2">
            <div className="py-2">
              <Label className="text-white uppercase">Orientación:</Label>
              <Controller
                name="orientacion"
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
                        <SelectLabel>ORIENTACIÓN:</SelectLabel>
                        {orientacion.map((ori) => (
                          <SelectItem
                            key={ori.orientacion}
                            value={ori.orientacion}
                          >
                            {ori.orientacion}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="py-2">
              <Label className="text-white uppercase">Tipo de Pared:</Label>
              <Controller
                name="tipoPared"
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
                        <SelectLabel>TIPO DE PARED:</SelectLabel>
                        {tipoPared.map((pared) => (
                          <SelectItem
                            key={pared.tipoPared}
                            value={pared.tipoPared}
                          >
                            {pared.tipoPared}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

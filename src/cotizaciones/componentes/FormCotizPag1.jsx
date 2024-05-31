import axios from 'axios';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

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

export function FormCotizPag1() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlDepartamentos = `${urlBackendBase}departamentos`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaDepartamentos, setRespuestaDepartamentos] = useState([]);
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
      <div
        // onSubmit={handleSubmit(crearSucursal)}
        className="flex flex-wrap w-full"
      >
        <div className="w-full md:w-1/2 p-2">
          <div className="py-2">
            <Label className="text-white uppercase">Departamentos:</Label>
            <Select
            // onValueChange={setSelectedDepartamento}
            // value={selectedDepartamento}
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
          </div>

          <div className="py-2">
            <Label className="text-white uppercase">Zonas:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
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
          </div>

          <div className="py-2">
            <Label className="text-white uppercase">Tipo de Cotización:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
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
          </div>
        </div>

        <div className="w-full md:w-1/2 p-2">
          <div className="py-2">
            <Label className="text-white uppercase">Orientación:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
            >
              <SelectTrigger className="w-full text-white uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ORIENTACIÓN:</SelectLabel>
                  {orientacion.map((ori) => (
                    <SelectItem key={ori.orientacion} value={ori.orientacion}>
                      {ori.orientacion}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="py-2">
            <Label className="text-white uppercase">Tipo de Pared:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
            >
              <SelectTrigger className="w-full text-white uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE PARED:</SelectLabel>
                  {tipoPared.map((pared) => (
                    <SelectItem key={pared.tipoPared} value={pared.tipoPared}>
                      {pared.tipoPared}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

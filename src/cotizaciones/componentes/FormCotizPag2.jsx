import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export function FormCotizPag2() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlTipocotizacion = `${urlBackendBase}tiposcotizaciones`;
  // const url = `${urlBackendBase}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [area, setArea] = useState(0);
  const [altura, setAltura] = useState(0);
  const [volumen, setVolumen] = useState(0);

  const [respuestaTipocotizacion, setRespuestaTipocotizacion] = useState([]);
  // const [respuesta, setRespuesta] = useState([]);

  const pedirTipocotizacion = async () => {
    const respuesta = await axios.get(urlTipocotizacion, { headers });
    try {
      setRespuestaTipocotizacion(respuesta.data);
    } catch (error) {
      setRespuestaTipocotizacion([]);
      manejoError(error);
    }
  };
  /* const pedir = async () => {
    const respuesta = await axios.get(url, { headers });
    try {
      setRespuesta(respuesta.data);
    } catch (error) {
      setRespuesta([]);
      manejoError(error);
    }
  }; */

  const handleChangeArea = (e) => {
    const newArea = parseFloat(e.target.value);
    setArea(newArea);
    setVolumen(newArea * altura);
  };

  const handleChangeAltura = (e) => {
    const newAltura = parseFloat(e.target.value);
    setAltura(newAltura);
    setVolumen(newAltura * area);
  };

  useEffect(() => {
    pedirTipocotizacion();
    // pedir();
  }, []);
  return (
    <>
      <div
        // onSubmit={handleSubmit(crearSucursal)}
        className="flex flex-wrap w-full"
      >
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="basis-full md:basis-1/4 p-2">
            <div className="py-2 flex flex-wrap items-center">
              <div className="w-1/3">
                <Label className="text-cpalet-500 uppercase">Área:</Label>
                <Input
                  className="text-cpalet-500 uppercase"
                  type="number"
                  value={area}
                  onChange={handleChangeArea}
                />
              </div>
              <div className="w-1/3">
                <Label className="text-cpalet-500 uppercase">Altura:</Label>
                <Input
                  className="text-cpalet-500 uppercase"
                  type="number"
                  value={altura}
                  onChange={handleChangeAltura}
                />
              </div>
              <div className="w-1/3">
                <Label className="text-cpalet-500 uppercase">Volumen:</Label>
                <Input
                  className="text-cpalet-500 uppercase"
                  type="number"
                  value={volumen}
                  // readOnly
                />
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">
                tipo de cotizacion:
              </Label>
              <Select>
                <SelectTrigger className="w-full text-cpalet-500 uppercase">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>TIPO DE COTIZACION:</SelectLabel>
                    {respuestaTipocotizacion.map((tipocotizacion) => (
                      <SelectItem
                        key={tipocotizacion.id}
                        value={tipocotizacion.id.toString()}
                      >
                        {tipocotizacion.tipocotizacion}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">
                cantidad de ventanas:
              </Label>
              <Select>
                <SelectTrigger className="w-full text-cpalet-500 uppercase">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>CANTIDAD DE VENTANAS:</SelectLabel>
                    <SelectItem value={1}>1 Ventana</SelectItem>
                    <SelectItem value={2}>2 Ventanas</SelectItem>
                    <SelectItem value={3}>3 Ventanas</SelectItem>
                    <SelectItem value={4}>4 Ventanas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 p-2">
            <div className="py-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

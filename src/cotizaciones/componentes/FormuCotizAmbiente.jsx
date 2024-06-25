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
import { manejoError } from '../utilidades/mostrarErrores';
import { exitoToast } from '../../lib/notificaciones';

export function FormuCotizAmbiente() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlFactorviaje = `${urlBackendBase}factoresviajes/svc`;
  const urlGastopersona = `${urlBackendBase}gastospersonas/svc`;
  const urlInstalradiatoallero = `${urlBackendBase}instalradiatoalleros/svc`;
  const urlInstaltuberia = `${urlBackendBase}instaltuberias/svc`;
  const urlRadiadoreje50cm = `${urlBackendBase}radiadoresejes50cm/svc`;
  const urlToalleroeje50cm = `${urlBackendBase}toallerosejes50cm/svc`;
  const urlTipocotizacion = `${urlBackendBase}tiposcotizaciones`;
  // const url = `${urlBackendBase}/svc`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaFactorviaje, setRespuestaFactorviaje] = useState([]);
  const [respuestaGastopersona, setRespuestaGastopersona] = useState([]);
  const [respuestaInstalradiatoallero, setRespuestaInstalradiatoallero] =
    useState([]);
  const [respuestaInstaltuberia, setRespuestaInstaltuberia] = useState([]);
  const [respuestaRadiadoreje50cm, setRespuestaRadiadoreje50cm] = useState([]);
  const [respuestaToalleroeje50cm, setRespuestaToalleroeje50cm] = useState([]);
  const [respuestaTipocotizacion, setRespuestaTipocotizacion] = useState([]);
  // const [respuesta, setRespuesta] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const area = watch('area');

  const pedirFactorviaje = async () => {
    try {
      const respuesta = await axios.get(urlFactorviaje, { headers });
      setRespuestaFactorviaje(respuesta.data);
    } catch (error) {
      manejoError(error);
    }
  };
  const pedirGastopersona = async () => {
    const respuesta = await axios.get(urlGastopersona, { headers });
    try {
      setRespuestaGastopersona(respuesta.data);
    } catch (error) {
      setRespuestaGastopersona([]);
      manejoError(error);
    }
  };
  const pedirInstalradiatoallero = async () => {
    const respuesta = await axios.get(urlInstalradiatoallero, { headers });
    try {
      setRespuestaInstalradiatoallero(respuesta.data);
    } catch (error) {
      setRespuestaInstalradiatoallero([]);
      manejoError(error);
    }
  };
  const pedirInstaltuberia = async () => {
    const respuesta = await axios.get(urlInstaltuberia, { headers });
    try {
      setRespuestaInstaltuberia(respuesta.data);
    } catch (error) {
      setRespuestaInstaltuberia([]);
      manejoError(error);
    }
  };
  const pedirRadiadoreje50cm = async () => {
    const respuesta = await axios.get(urlRadiadoreje50cm, { headers });
    try {
      setRespuestaRadiadoreje50cm(respuesta.data);
    } catch (error) {
      setRespuestaRadiadoreje50cm([]);
      manejoError(error);
    }
  };
  const pedirToalleroeje50cm = async () => {
    const respuesta = await axios.get(urlToalleroeje50cm, { headers });
    try {
      setRespuestaToalleroeje50cm(respuesta.data);
    } catch (error) {
      setRespuestaToalleroeje50cm([]);
      manejoError(error);
    }
  };
  const pedirTipocotizacion = async () => {
    try {
      const respuesta = await axios.get(urlTipocotizacion, { headers });
      setRespuestaTipocotizacion(respuesta.data);
    } catch (error) {
      setRespuestaTipocotizacion([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirFactorviaje();
    pedirGastopersona();
    pedirInstalradiatoallero();
    pedirInstaltuberia();
    pedirRadiadoreje50cm();
    pedirToalleroeje50cm();
    pedirTipocotizacion();
    // ();
  }, []);

  console.log();
  useEffect(() => {
    if (area) {
      const nroceldas = area / 1.5;
      setValue('nroceldas', nroceldas.toFixed(2));

      // Determinar el valor de nroradiadores
      let nroradiadores;
      if (nroceldas < 18.5) {
        nroradiadores = 1;
      } else {
        nroradiadores = Math.ceil(nroceldas / 15);
      }
      setValue('nroradiadores', nroradiadores);
    }
  }, [area, setValue]);

  return (
    <>
      {/* <div className="flex flex-col md:flex-row p-5 border-2 border-cpalet-500 rounded-lg shadow-xl"> */}
        <form className="flex flex-wrap w-full">
          <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">area</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('area', {
                  required: 'area es requerida',
                })}
              />
              {errors.area && (
                <p className="text-red-500">{errors.area.message}</p>
              )}
            </div>
            {/* <div className="py-2">
              <Label className="text-cpalet-500 capitalize">radiadores:</Label>
              <Controller
                name="toallerosejes50cm"
                control={control}
                rules={{ required: 'La Nro Personas es requerida' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 capitalize">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>MODELO:</SelectLabel>
                        {respuestaToalleroeje50cm.map((toallerosejes50cm) => (
                          <SelectItem
                            key={toallerosejes50cm.id}
                            value={toallerosejes50cm.id.toString()}
                          >
                            {toallerosejes50cm.modelo}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.ciudad_id && (
                <p className="text-red-500">{errors.ciudad_id.message}</p>
              )}
            </div> */}
          </div>
          <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">nro celdas</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('nroceldas', {
                  required: 'El nro celdas es requerida',
                })}
                readOnly
              />
              {errors.nroceldas && (
                <p className="text-red-500">{errors.nroceldas.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                nro radiadores
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('nroradiadores', {
                  required: 'El nro radiadores es requerida',
                })}
                readOnly
              />
              {errors.nroradiadores && (
                <p className="text-red-500">{errors.nroradiadores.message}</p>
              )}
            </div>
            {/* <div className="py-2">
              <Label className="text-cpalet-500 uppercase">
                tipo de cotizacion:
              </Label>
              <Controller
                name="tipocotizacion_id"
                control={control}
                rules={{ required: 'El tipo de cotizacion es requerida' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 capitalize">
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
                )}
              />
              {errors.tipocotizacion_id && (
                <p className="text-red-500">
                  {errors.tipocotizacion_id.message}
                </p>
              )}
            </div> */}
          </div>
          <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                cantidad de ventanas:
              </Label>
              <Controller
                name="cantidadventana"
                control={control}
                rules={{ required: 'La cantidad de ventanas es requerida' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 capitalize">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>CANTIDAD DE VENTANAS:</SelectLabel>
                        <SelectItem value="1">1 Ventana</SelectItem>
                        <SelectItem value="2">2 Ventanas</SelectItem>
                        <SelectItem value="3">3 Ventanas</SelectItem>
                        <SelectItem value="4">4 Ventanas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.cantidadventana && (
                <p className="text-red-500">{errors.cantidadventana.message}</p>
              )}
            </div>
            {/* <div className="py-2">
              <Label className="text-cpalet-500 capitalize">toalleros:</Label>
              <Controller
                name="radiadoresejes50cm"
                control={control}
                rules={{ required: 'La longitud de la tuberia es requerida' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-cpalet-500 capitalize">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>MODELO:</SelectLabel>
                        {respuestaRadiadoreje50cm.map((radiadoresejes50cm) => (
                          <SelectItem
                            key={radiadoresejes50cm.id}
                            value={radiadoresejes50cm.id.toString()}
                          >
                            {radiadoresejes50cm.modelo}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.ciudad_id && (
                <p className="text-red-500">
                  {errors.radiadoresejes50cm.message}
                </p>
              )}
            </div> */}
          </div>
          {/* <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Button type="submit" variant="mibotoncrear" className="">
                Crear cotizacion
              </Button>
            </div>
          </div> */}
        </form>
      {/* </div> */}
    </>
  );
}

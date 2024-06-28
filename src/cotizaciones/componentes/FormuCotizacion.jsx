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

import { FormuCotizAmbiente } from '../componentes/FormuCotizAmbiente';
import useStore from '../estados/idCotizador';

export function FormuCotizacion() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCiudades = `${urlBackendBase}ciudades/svc`;
  const urlTipovidrio = `${urlBackendBase}tiposvidrios/svc`;
  const urlOrientacion = `${urlBackendBase}orientaciones/svc`;
  const urlNivelpiso = `${urlBackendBase}nivelespisos/svc`;
  const urlTipopared = `${urlBackendBase}tiposparedes/svc`;
  const urlTipotecho = `${urlBackendBase}tipostechos/svc`;
  const urlTiposuelo = `${urlBackendBase}tipossuelos/svc`;
  const urlTipocotizacion = `${urlBackendBase}tiposcotizaciones`;
  const urlCotizacion = `${urlBackendBase}cotizaciones`;
  const urlCiudadZona = `${urlBackendBase}ciudadeszonas/porciudad/`;

  const urlRadiadoreje50cm = `${urlBackendBase}radiadoresejes50cm/svc`;
  const urlToalleroeje50cm = `${urlBackendBase}toallerosejes50cm/svc`;
  // const url = `${urlBackendBase}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCiudades, setRespuestaCiudades] = useState([]);
  const [respuestaTipovidrio, setRespuestaTipovidrio] = useState([]);
  const [respuestaCiudadZona, setRespuestaCiudadZona] = useState([]);
  const [respuestaOrientacion, setRespuestaOrientacion] = useState([]);
  const [respuestaNivelpiso, setRespuestaNivelpiso] = useState([]);
  const [respuestaTipopared, setRespuestaTipopared] = useState([]);
  const [respuestaTipotecho, setRespuestaTipotecho] = useState([]);
  const [respuestaTiposuelo, setRespuestaTiposuelo] = useState([]);
  const [respuestaTipocotizacion, setRespuestaTipocotizacion] = useState([]);

  const [respuestaCotizacion, setRespuestaCotizacion] = useState(null);
  const [botonCrear, setBotonCrear] = useState(false);

  const [respuestaRadiadoreje50cm, setRespuestaRadiadoreje50cm] = useState([]);
  const [respuestaToalleroeje50cm, setRespuestaToalleroeje50cm] = useState([]);
  // const [respuesta, setRespuesta] = useState([]);

  const [ambientes, setAmbientes] = useState([]);

  // const idCotizador = useStore((state) => state.idCotizador);
  const guardarIdCotizador = useStore((state) => state.guardarIdCotizador);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (watch().ciudad_id) {
      const obtenerZonasDeCiudad = async () => {
        try {
          const respuesta = await axios.get(
            `${urlCiudadZona}${watch().ciudad_id}`,
            { headers }
          );
          setRespuestaCiudadZona(respuesta.data);
        } catch (error) {
          manejoError(error);
          setRespuestaCiudadZona([]);
        }
      };
      obtenerZonasDeCiudad();
    }
  }, [watch().ciudad_id]);
  const pedirCiudades = async () => {
    try {
      const respuesta = await axios.get(urlCiudades, { headers });
      setRespuestaCiudadZona([]);
      setRespuestaCiudades(respuesta.data);
    } catch (error) {
      setRespuestaCiudades([]);
      manejoError(error);
    }
  };
  const pedirTipovidrio = async () => {
    try {
      const respuesta = await axios.get(urlTipovidrio, { headers });
      setRespuestaTipovidrio(respuesta.data);
    } catch (error) {
      setRespuestaTipovidrio([]);
      manejoError(error);
    }
  };
  const pedirOrientacion = async () => {
    try {
      const respuesta = await axios.get(urlOrientacion, { headers });
      setRespuestaOrientacion(respuesta.data);
    } catch (error) {
      setRespuestaOrientacion([]);
      manejoError(error);
    }
  };
  const pedirNivelpiso = async () => {
    try {
      const respuesta = await axios.get(urlNivelpiso, { headers });
      setRespuestaNivelpiso(respuesta.data);
    } catch (error) {
      setRespuestaNivelpiso([]);
      manejoError(error);
    }
  };
  const pedirTipopared = async () => {
    try {
      const respuesta = await axios.get(urlTipopared, { headers });
      setRespuestaTipopared(respuesta.data);
    } catch (error) {
      setRespuestaTipopared([]);
      manejoError(error);
    }
  };
  const pedirTipotecho = async () => {
    try {
      const respuesta = await axios.get(urlTipotecho, { headers });
      setRespuestaTipotecho(respuesta.data);
    } catch (error) {
      setRespuestaTipotecho([]);
      manejoError(error);
    }
  };
  const pedirTiposuelo = async () => {
    try {
      const respuesta = await axios.get(urlTiposuelo, { headers });
      setRespuestaTiposuelo(respuesta.data);
    } catch (error) {
      setRespuestaTiposuelo([]);
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

  /* const pedir = async () => {
    const respuesta = await axios.get(url, { headers });
    try {
      setRespuesta(respuesta.data);
    } catch (error) {
      setRespuesta([]);
      manejoError(error);
    }
  }; */

  useEffect(() => {
    pedirCiudades();
    pedirTipovidrio();
    pedirOrientacion();
    pedirNivelpiso();
    pedirTipopared();
    pedirTipotecho();
    pedirTiposuelo();
    pedirTipocotizacion();

    pedirRadiadoreje50cm();
    pedirToalleroeje50cm();
    // pedir();
  }, []);

  const crearCotizacion = async (data) => {
    try {
      const respuesta = await axios.post(urlCotizacion, data, { headers });
      exitoToast(
        `Se Creo la Cotizacion: ${respuesta.data.nombrecotizacion}`,
        false
      );
      setRespuestaCotizacion(respuesta.data);
      guardarIdCotizador(respuesta.data.id);
      setBotonCrear(true);
    } catch (error) {
      setRespuestaCotizacion(null);
      manejoError(error);
    }
  };

  const agregarAmbiente = () => {
    setAmbientes([...ambientes, <FormuCotizAmbiente key={ambientes.length} />]);
  };

  const quitarAmbiente = () => {
    setAmbientes(ambientes.slice(0, -1));
  };

  const handleReset = () => {
    reset({
      nombrecotizacion: '',
      ciudad_id: '',
      tipovidrio_id: '',
      // Añade aquí otros campos que necesites resetear
      radiadoreje50cm_id: '',
      tipocaldero: '',
      ciudadzona_id: '',
      tipopared_id: '',
      toalleroeje50cm_id: '',
      orientacion_id: '',
      tipotecho_id: '',
      tipocotizacion_id: '',
      nivelpiso_id: '',
      tiposuelo_id: '',
      ducha: '',
    });
    setRespuestaCotizacion(null);
    setBotonCrear(false);
    guardarIdCotizador(0);
  };

  // console.log('respuestaCotizacion', respuestaCotizacion);
  return (
    <>
      {/* <Label>ID de Cotización: {idCotizador}</Label> */}
      <div className="flex flex-col md:flex-row p-5 border-2 border-cpalet-500 rounded-lg shadow-2xl">
        <form
          onSubmit={handleSubmit(crearCotizacion)}
          // className="flex flex-wrap w-full"
          className="w-full"
        >
          <div className="flex flex-wrap w-full">
            <div className="w-full  md:p-2">
              <Label className="text-cpalet-500  capitalize">
                nombre de la cotizacion
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('nombrecotizacion', {
                  required: 'El nombre de la cotizacion es requerida',
                })}
              />
              {errors.nombrecotizacion && (
                <p className="text-red-500">
                  {errors.nombrecotizacion.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/4 md:p-2">
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">ciudades:</Label>
                <Controller
                  name="ciudad_id"
                  control={control}
                  rules={{ required: 'La Ciudad es requerida' }}
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
                          <SelectLabel>CIUDADES:</SelectLabel>
                          {respuestaCiudades.map((ciudad) => (
                            <SelectItem
                              key={ciudad.id}
                              value={ciudad.id.toString()}
                            >
                              {ciudad.ciudad}
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
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  tipo de vidrio:
                </Label>
                <Controller
                  name="tipovidrio_id"
                  control={control}
                  rules={{ required: 'El tipo de vidrio es requerida' }}
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
                          <SelectLabel>TIPO DE VIDRIO:</SelectLabel>
                          {respuestaTipovidrio.map((tipovidrio) => (
                            <SelectItem
                              key={tipovidrio.id}
                              value={tipovidrio.id.toString()}
                            >
                              {tipovidrio.tipovidrio}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipovidrio_id && (
                  <p className="text-red-500">{errors.tipovidrio_id.message}</p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  radiadores:
                </Label>
                <Controller
                  name="radiadoreje50cm_id"
                  control={control}
                  // rules={{ required: 'radiadores es requerida' }}
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
                          {respuestaRadiadoreje50cm.map(
                            (radiadoresejes50cm) => (
                              <SelectItem
                                key={radiadoresejes50cm.id}
                                value={radiadoresejes50cm.id.toString()}
                              >
                                {radiadoresejes50cm.modelo}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {/* {errors.radiadoresejes50cm && (
                  <p className="text-red-500">
                    {errors.radiadoresejes50cm.message}
                  </p>
                )} */}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  tipo caldero:
                </Label>
                <Controller
                  name="tipocaldero"
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
                          <SelectLabel>TIPO DE CALDERO:</SelectLabel>
                          <SelectItem value="Estandar">Estandar</SelectItem>
                          <SelectItem value="Condenzacion">
                            Condenzacion
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipocaldero && (
                  <p className="text-red-500">{errors.tipocaldero.message}</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/4 md:p-2">
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  ciudad zona:
                </Label>
                <Controller
                  name="ciudadzona_id"
                  control={control}
                  rules={{ required: 'La ciudad zona es requerida' }}
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
                          <SelectLabel>CIUDAD ZONA:</SelectLabel>
                          {watch().ciudad_id && (
                            <>
                              {respuestaCiudadZona.map((ciudadzona) => (
                                <SelectItem
                                  key={ciudadzona.ciudadzona}
                                  value={ciudadzona.id.toString()}
                                >
                                  {ciudadzona.ciudadzona}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.ciudadzona_id && (
                  <p className="text-red-500">{errors.ciudadzona_id.message}</p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  tipo de pared:
                </Label>
                <Controller
                  name="tipopared_id"
                  control={control}
                  rules={{ required: 'El tipo de pared es requerida' }}
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
                          <SelectLabel>TIPO DE PARED:</SelectLabel>
                          {respuestaTipopared.map((tipopared) => (
                            <SelectItem
                              key={tipopared.tipopared}
                              value={tipopared.id.toString()}
                            >
                              {tipopared.tipopared}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipopared_id && (
                  <p className="text-red-500">{errors.tipopared_id.message}</p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">toalleros:</Label>
                <Controller
                  name="toalleroeje50cm_id"
                  control={control}
                  // rules={{ required: 'toalleros es requerida' }}
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
                {/* {errors.toallerosejes50cm && (
                  <p className="text-red-500">{errors.toallerosejes50cm.message}</p>
                )} */}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  subir plano:
                </Label>
                <Input
                  className="text-cpalet-500 capitalize text-xs"
                  type="file"
                />
              </div>
            </div>
            <div className="w-full md:w-1/4 md:p-2">
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  orientacion:
                </Label>
                <Controller
                  name="orientacion_id"
                  control={control}
                  rules={{ required: 'La orientacion es requerida' }}
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
                          <SelectLabel>ORIENTACION:</SelectLabel>
                          {respuestaOrientacion.map((orientacion) => (
                            <SelectItem
                              key={orientacion.orientacion}
                              value={orientacion.id.toString()}
                            >
                              {orientacion.orientacion}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.orientacion_id && (
                  <p className="text-red-500">
                    {errors.orientacion_id.message}
                  </p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  tipo de techo:
                </Label>
                <Controller
                  name="tipotecho_id"
                  control={control}
                  rules={{ required: 'El tipo de techo es requerida' }}
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
                          <SelectLabel>TIPO DE TECHO:</SelectLabel>
                          {respuestaTipotecho.map((tipotecho) => (
                            <SelectItem
                              key={tipotecho.tipotecho}
                              value={tipotecho.id.toString()}
                            >
                              {tipotecho.tipotecho}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipotecho_id && (
                  <p className="text-red-500">{errors.tipotecho_id.message}</p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
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
              </div>
            </div>
            <div className="w-full md:w-1/4 md:p-2">
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  nivel de piso:
                </Label>
                <Controller
                  name="nivelpiso_id"
                  control={control}
                  rules={{ required: 'El nivel de piso es requerida' }}
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
                          <SelectLabel>NIVEL DE PISO:</SelectLabel>
                          {respuestaNivelpiso.map((nivelpiso) => (
                            <SelectItem
                              key={nivelpiso.nivelpiso}
                              value={nivelpiso.id.toString()}
                            >
                              {nivelpiso.nivelpiso}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.nivelpiso_id && (
                  <p className="text-red-500">{errors.nivelpiso_id.message}</p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  tipo de suelo:
                </Label>
                <Controller
                  name="tiposuelo_id"
                  control={control}
                  rules={{ required: 'El tipo de suelo es requerida' }}
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
                          <SelectLabel>TIPO DE SUELO:</SelectLabel>
                          {respuestaTiposuelo.map((tiposuelo) => (
                            <SelectItem
                              key={tiposuelo.tiposuelo}
                              value={tiposuelo.id.toString()}
                            >
                              {tiposuelo.tiposuelo}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tiposuelo_id && (
                  <p className="text-red-500">{errors.tiposuelo_id.message}</p>
                )}
              </div>
              <div className="py-2">
                <Label className="text-cpalet-500 capitalize">
                  nro duchas:
                </Label>
                <Controller
                  name="ducha"
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
                          <SelectLabel>CANTIDAD DE DUCHAS:</SelectLabel>
                          <SelectItem value="24">1 DUCHA</SelectItem>
                          <SelectItem value="28">2 DUCHA</SelectItem>
                          <SelectItem value="32">3 DUCHA</SelectItem>
                          <SelectItem value="40">4 DUCHA</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.ducha && (
                  <p className="text-red-500">{errors.ducha.message}</p>
                )}
              </div>
            </div>
            <div className="py-3"></div>
          </div>
          <div className="mx-2 flex justify-between">
            <Button
              type="submit"
              disabled={botonCrear}
              variant="mibotoncrear"
              className=""
            >
              Crear cotizacion
            </Button>
            {respuestaCotizacion && (
              <Button
                variant="mibotonprimario"
                className=""
                onClick={handleReset}
              >
                Nueva cotizacion
              </Button>
            )}
          </div>
        </form>
      </div>
      {/* <span>{JSON.stringify(watch())}</span> */}
      <div className="py-4"></div>
      {respuestaCotizacion && (
        <div className="flex flex-col p-5 border-2 border-cpalet-500 rounded-lg shadow-2xl">
          <div className="flex justify-between">
            <Button
              type=""
              onClick={agregarAmbiente}
              variant="mibotoncrearambie"
              className=""
            >
              Anadir Ambiente
            </Button>
            <Button
              type=""
              onClick={quitarAmbiente}
              variant="mibotoneliminarambie"
              className=""
            >
              Quitar Ambiente
            </Button>
          </div>
          <hr className="border-t-2 mt-4 border-cpalet-500" />

          {ambientes.map((ambiente, index) => (
            <div key={index} className="mb-2">
              {ambiente}
              <hr className="border-t-2 border-cpalet-500" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

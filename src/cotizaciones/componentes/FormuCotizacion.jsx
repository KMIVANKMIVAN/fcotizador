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
  const [respuestaCotizacion, setRespuestaCotizacion] = useState([]);
  // const [respuesta, setRespuesta] = useState([]);

  const [area, setArea] = useState(0);
  const [altura, setAltura] = useState(0);
  const [volumen, setVolumen] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
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
    // pedir();
  }, []);

  const handleChangeArea = (e) => {
    const newArea = parseFloat(e.target.value);
    const altura = watch('altura');
    const newVolumen = newArea * altura;
    setValue('area', newArea);
    setValue('volumen', newVolumen.toFixed(4)); // Redondear a 4 decimales
  };

  const handleChangeAltura = (e) => {
    const newAltura = parseFloat(e.target.value);
    const area = watch('area');
    const newVolumen = newAltura * area;
    setValue('altura', newAltura);
    setValue('volumen', newVolumen.toFixed(4)); // Redondear a 4 decimales
  };

  const crearCotizacion = async (data) => {
    try {
      const respuesta = await axios.post(urlCotizacion, data, { headers });
      exitoToast(
        `Se Creo la Cotizacion: ${respuesta.data.nombrecotizacion}`,
        false
      );
      setRespuestaCotizacion(respuesta.data);
    } catch (error) {
      setRespuestaCotizacion([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(crearCotizacion)}
          className="flex flex-wrap w-full"
        >
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
              <p className="text-red-500">{errors.nombrecotizacion.message}</p>
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
            <div className="py-2 flex flex-wrap items-center">
              <div className="w-full md:w-1/3">
                <Label className="text-cpalet-500 text-sm">
                  Área m<sup>2</sup>:
                </Label>
                <Input
                  className="text-cpalet-500 capitalize"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('area', { required: 'El área es requerida' })}
                  onChange={handleChangeArea}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Label className="text-cpalet-500 text-sm">Altura m:</Label>
                <Input
                  className="text-cpalet-500 capitalize"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('altura', {
                    required: 'La altura es requerida',
                  })}
                  onChange={handleChangeAltura}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Label className="text-cpalet-500 text-sm">
                  Volumen m<sup>3</sup>:
                </Label>
                <Input
                  className="text-cpalet-500 capitalize"
                  type="text"
                  {...register('volumen', {
                    required: 'El volumen es requerido',
                  })}
                  disabled
                />
              </div>
              {errors.altura && (
                <p className="text-red-500">{errors.altura.message}</p>
              )}
              {errors.volumen && (
                <p className="text-red-500">{errors.volumen.message}</p>
              )}
              {errors.area && (
                <p className="text-red-500">{errors.area.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">ciudad zona:</Label>
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
          </div>
          <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">orientacion:</Label>
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
                <p className="text-red-500">{errors.orientacion_id.message}</p>
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
          </div>
          <div className="py-3"></div>
          <div className="centrarHorizontal">
            <Button type="submit" variant="mibotoncrear" className="">
              Crear cotizacion
            </Button>
          </div>
        </form>
      </div>
      {/* <span>{JSON.stringify(watch())}</span> */}
    </>
  );
}

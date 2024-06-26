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

export function FormuCotizAmbiente({ idCotizacion }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCotizacionambiente = `${urlBackendBase}cotizacionesambientes`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCotizacionambiente, setRespuestaCotizacionambiente] =
    useState([]);

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
  } = useForm({
    defaultValues: {
      cotizacion_id: idCotizacion,
    },
  });

  useEffect(() => {
    if (area) {
      const nrocelda = area / 1.5;
      setValue('nrocelda', Math.round(nrocelda));

      // Determinar el valor de nroradiadores
      let nroradiadores;
      if (nrocelda < 18.5) {
        nroradiadores = 1;
      } else {
        nroradiadores = Math.ceil(nrocelda / 15);
      }
      setValue('nroradiadores', nroradiadores);
    }
  }, [area, setValue]);

  const handleChangeArea = (e) => {
    const newArea = parseFloat(e.target.value);
    setArea(newArea); // Aquí se actualiza el estado del área
    const altura = watch('altura');
    const newVolumen = newArea * altura;
    setValue('area', newArea);
    setValue('volumen', newVolumen.toFixed(4)); // Redondear a 4 decimales
  };

  const handleChangeAltura = (e) => {
    const newAltura = parseFloat(e.target.value);
    setAltura(newAltura); // Aquí se actualiza el estado de la altura
    const area = watch('area');
    const newVolumen = newAltura * area;
    setValue('altura', newAltura);
    setValue('volumen', newVolumen.toFixed(4)); // Redondear a 4 decimales
  };

  const crearCotizacionambiente = async (data) => {
    try {
      const respuesta = await axios.post(urlCotizacionambiente, data, {
        headers,
      });
      exitoToast(
        `Se Creo la Abitacion: ${respuesta.data.nombreambiente}`,
        false
      );
      setRespuestaCotizacionambiente(respuesta.data);
    } catch (error) {
      setRespuestaCotizacionambiente([]);
      manejoError(error);
    }
  };

  const handleChangeRadiadores = (e) => {
    const newRadiadores = parseInt(e.target.value, 10);
    setValue('nroradiador', newRadiadores);
  };

  console.log('idCotizacion', idCotizacion);
  return (
    <>
      <form
        onSubmit={handleSubmit(crearCotizacionambiente)}
        className="flex flex-wrap w-full"
      >
        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 text-sm">
                Nombre Abitacion:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('nombreambiente', {
                  required: 'El nombre ambiente es requerida',
                })}
                onChange={handleChangeArea}
              />
              {errors.nombreambiente && (
                <p className="text-red-500">{errors.nombreambiente.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
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
              {errors.area && (
                <p className="text-red-500">{errors.area.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
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
              {errors.altura && (
                <p className="text-red-500">{errors.altura.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
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
              {errors.volumen && (
                <p className="text-red-500">{errors.volumen.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">nro celdas</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('nrocelda', {
                  required: 'El nro celdas es requerida',
                })}
                readOnly
              />
              {errors.nrocelda && (
                <p className="text-red-500">{errors.nrocelda.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                nro radiadores
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                min="1"
                {...register('nroradiador', {
                  required: 'El nro radiadores es requerida',
                })}
                onChange={handleChangeRadiadores}
              />
              {errors.nroradiador && (
                <p className="text-red-500">{errors.nroradiador.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/8 md:p-2">
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
          <div className="w-full md:w-1/8 md:p-2">
            <div className="py-2">
              <Button type="submit" variant="mibotoncrear" className="">
                Crear Ambiente
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

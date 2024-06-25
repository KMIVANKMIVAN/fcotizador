import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { manejoError } from '../utilidades/mostrarErrores';
import { exitoToast } from '../../lib/notificaciones';

export function FormuCotizGeneral() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const area = watch('area');

  useEffect(() => {
    if (area) {
      const nroceldas = area / 1.5;
      setValue('nroceldas', nroceldas.toFixed(2));

      // Determinar el valor de nroradiadores
      let nroradiadores;
      if (nroceldas < 15) {
        nroradiadores = 1;
      } else {
        nroradiadores = Math.ceil(nroceldas / 15);
      }
      setValue('nroradiadores', nroradiadores);
    }
  }, [area, setValue]);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
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
          </div>
          {/* <div className="w-full md:w-1/4 md:p-2">
            <div className="py-2">
              <Button type="submit" variant="mibotoncrear" className="">
                Crear cotizacion
              </Button>
            </div>
          </div> */}
        </form>
      </div>
    </>
  );
}

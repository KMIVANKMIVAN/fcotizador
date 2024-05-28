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

export function CrearEmpresa() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlEmpresas = `${urlBackendBase}empresas`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaEmpresas, setRespuestaEmpresa] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const crearEmpresas = async (data) => {
    /* 
    data.cargo = parseInt(data.cargo);
    data.es_activo = data.es_activo === 'true' ? true : false; */
    data.complemento = data.complemento === '' ? null : data.complemento;
    try {
      const respuesta = await axios.post(urlEmpresas, data, { headers });
      exitoToast(`Se Creo a la Empresa: ${respuesta.data.razon_social}`, false);
      setRespuestaEmpresa(respuesta.data);
    } catch (error) {
      setRespuestaEmpresa([]);
      if (error.response) {
        const { data } = error.response;
        if (data.error) {
          errorToast(`RS: ${data.error}`, false);
        }
        if (data.message) {
          errorToast(`RS: ${data.message}`, false);
        }
      } else if (error.request) {
        'RF: No se pudo obtener respuesta del servidor', false;
      } else {
        errorToast('RF: Error al enviar la solicitud', false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <form
          onSubmit={handleSubmit(crearEmpresas)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">razon social:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('razon_social', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">ubicacion:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('ubicacion', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">telefono:</Label>
              <Input
                className="text-white lowercase"
                type="text"
                {...register('telefono', { required: false })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">celular:</Label>
              <Input
                className="text-white lowercase"
                type="text"
                {...register('celular', { required: false })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">correo:</Label>
              <Input
                className="text-white lowercase"
                type="text"
                {...register('correo', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">nit:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('nit', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">pagina web:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('pagina_web', { required: false })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">linea gratuita:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('linea_gratuita', { required: false })}
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

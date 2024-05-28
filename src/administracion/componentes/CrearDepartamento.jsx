import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';

export function CrearDepartamento() {
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
  } = useForm();

  const crearDepartamentos = async (data) => {
    data.complemento = data.complemento === '' ? null : data.complemento;
    try {
      const respuesta = await axios.post(urlDepartamentos, data, { headers });
      exitoToast(`Se Creo el Departamento: ${respuesta.data.departamento}`, false);
      setRespuestaDepartamentos(respuesta.data);
    } catch (error) {
      setRespuestaDepartamentos([]);
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
          onSubmit={handleSubmit(crearDepartamentos)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">departamento:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('departamento', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant=""
                  className="bg-green-500 w-full"
                >
                  Crear Departamento
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

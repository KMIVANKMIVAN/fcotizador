import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

export function CrearRol() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlRoles = `${urlBackendBase}roles`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaRoles, setRespuestaRoles] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearRoles = async (data) => {
    try {
      const respuesta = await axios.post(urlRoles, data, { headers });
      exitoToast(`Se Creo el Rol: ${respuesta.data.rol}`, false);
      setRespuestaRoles(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaRoles([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="tarjetasEstilos">
        <form
          onSubmit={handleSubmit(crearRoles)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">rol:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('rol', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="mibotoncrear"
                  className="w-full"
                >
                  Crear Roles
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

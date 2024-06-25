import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CrearNivelpiso() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlNivelpiso = `${urlBackendBase}nivelespisos`;

  const headers = { Authorization: `Bearer ${obtenerDatosUsuario().tk}` };

  const [respuestaNivelpiso, setRespuestaNivelpiso] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const crearNivelpiso = async (data) => {
    try {
      const respuesta = await axios.post(urlNivelpiso, data, { headers });
      exitoToast(
        `Se Creo el Nivel de Piso: ${respuesta.data.nivelpiso}`,
        false
      );
      setRespuestaNivelpiso(respuesta.data);
      reset();
    } catch (error) {
      setRespuestaNivelpiso([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="tarjetasEstilos">
        <form
          onSubmit={handleSubmit(crearNivelpiso)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">
                nivel de piso:
              </Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="text"
                {...register('nivelpiso', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 capitalize">valor:</Label>
              <Input
                className="text-cpalet-500 capitalize"
                type="number"
                {...register('valor', { required: true })}
              />
            </div>

            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="mibotoncrear"
                  className="w-full"
                >
                  Crear Nivel de Piso
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

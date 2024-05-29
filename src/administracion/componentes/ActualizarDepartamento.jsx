import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

export function ActualizarDepartamento({ idActualizar }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlDepartamentos = `${urlBackendBase}departamentos/${idActualizar}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaDepartamentos, setRespuestaDepartamentos] = useState([]);
  const [resPedirDepartamento, setResPedirDepartamento] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm();

  const actualizarDepartamentos = async (data) => {
    try {
      const respuesta = await axios.patch(urlDepartamentos, data, { headers });
      exitoToast(
        `Se Actualizo el Departamento: ${respuesta.data.departamento}`,
        false
      );
      setRespuestaDepartamentos(respuesta.data);
    } catch (error) {
      setRespuestaDepartamentos([]);
      manejoError(error);
    }
  };
  const pedirDepartamento = async () => {
    try {
      const respuesta = await axios.get(urlDepartamentos, { headers });
      setResPedirDepartamento(respuesta.data);
      // Utiliza setValue para establecer los valores de los campos del formulario
      Object.keys(respuesta.data).forEach((key) => {
        setValue(key, respuesta.data[key]);
      });
    } catch (error) {
      manejoError(error);
    }
  };

  useEffect(() => {
    if (idActualizar) {
      pedirDepartamento();
    }
  }, [idActualizar]);

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <form
          onSubmit={handleSubmit(actualizarDepartamentos)}
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
                  Actualizar Departamento
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

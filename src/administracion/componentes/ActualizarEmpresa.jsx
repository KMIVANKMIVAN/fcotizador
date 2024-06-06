import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

export function ActualizarEmpresa({ filaSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlEmpresas = `${urlBackendBase}empresas/${filaSeleccionada.id}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaEmpresas, setRespuestaEmpresa] = useState([]);
  const [resPedirEmpresa, setResPedirEmpresa] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue, // Asegúrate de tener esta línea
  } = useForm({
    defaultValues: {
      razon_social: filaSeleccionada.razon_social,
      nit: filaSeleccionada.nit,
      ubicacion: filaSeleccionada.ubicacion,
      pagina_web: filaSeleccionada.pagina_web,
      telefono: filaSeleccionada.telefono,
      linea_gratuita: filaSeleccionada.linea_gratuita,
      celular: filaSeleccionada.celular,
      correo: filaSeleccionada.correo,
    },
  });

  const actualizarEmpresa = async (data) => {
    try {
      const respuesta = await axios.patch(urlEmpresas, data, { headers });
      exitoToast(
        `Se Actualizo la Empresa: ${respuesta.data.razon_social}`,
        false
      );
      setRespuestaEmpresa(respuesta.data);
    } catch (error) {
      setRespuestaEmpresa([]);
      manejoError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg ">
        <form
          onSubmit={handleSubmit(actualizarEmpresa)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">razon social:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('razon_social', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">ubicacion:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('ubicacion', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">telefono:</Label>
              <Input
                className="text-cpalet-500 lowercase"
                type="text"
                {...register('telefono', { required: false })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">celular:</Label>
              <Input
                className="text-cpalet-500 lowercase"
                type="text"
                {...register('celular', { required: false })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">correo:</Label>
              <Input
                className="text-cpalet-500 lowercase"
                type="text"
                {...register('correo', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">nit:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('nit', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">pagina web:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                {...register('pagina_web', { required: false })}
              />
            </div>
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">
                linea gratuita:
              </Label>
              <Input
                className="text-cpalet-500 uppercase"
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
                  Actualizar Empresa
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

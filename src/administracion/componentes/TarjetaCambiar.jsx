import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

import {
  obtenerDatosUsuario,
  eliminarDatosUsuario,
} from '../../auth/utilidades/datosUsuarioLocalStor';

export function TarjetaCambiar() {
  const apiKey = import.meta.env.VITE_URL_BACKEND;
  const actualizarPWUrl = `${apiKey}usuarios/updatepw/${obtenerDatosUsuario().id}`;

  const [respuestaActualizarPW, setRespuestaActualizarPW] = useState([]);
  const [actualizarPWError, setActualizarPWError] = useState(null);
  const [actualizarPWErrorMensaje, setActualizarPWErrorMensaje] =
    useState(null);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const respuesta = await axios.patch(actualizarPWUrl, data, { headers });
      setActualizarPWError(null);
      setActualizarPWErrorMensaje(null);
      setRespuestaActualizarPW(respuesta.data);
      (window.location.href = '/');
      // eliminarDatosUsuario();
    } catch (error) {
      setRespuestaActualizarPW([]);
      console.log('error', error);
      if (error.response) {
        const { data } = error.response;
        setActualizarPWError(data.error ? `RS: ${data.error}` : null);
        setActualizarPWErrorMensaje(
          data.message ? `RS: ${data.message}` : null
        );
      } else if (error.request) {
        setActualizarPWErrorMensaje(null);
        setActualizarPWError('RF: No se pudo obtener respuesta del servidor');
      } else {
        setActualizarPWErrorMensaje(null);
        setActualizarPWError('RF: Error al enviar la solicitud');
      }
    }
  };

  return (
    <>
      <div className="tarjetaContras">
        <img src="../../../public/logo1.webp" className="w-full" />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className="text-cpalet-800 text-lg">
              Contraseña anterior:
            </Label>
            <Input
              className="text-cpalet-800"
              type="text"
              {...register('contraseniaAntigua', {
                required: {
                  value: true,
                  message: 'La Contraseña Anterior es requerida',
                },
              })}
            />
            {errors.contraseniaAntigua && (
              <p className="text-red-500">
                {errors.contraseniaAntigua.message}
              </p>
            )}
            <div className="py-2"></div>
            <Label className="text-cpalet-800 text-lg">Nueva Contraseña:</Label>
            <div className="relative">
              <Input
                className="text-cpalet-800"
                type={mostrarContrasenia ? 'text' : 'password'}
                {...register('contrasenia', {
                  required: {
                    value: true,
                    message: 'La Contraseña es requerida',
                  },
                  minLength: {
                    value: 8,
                    message: 'La Contraseña debe tener almenos 8 caracteres',
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      'La Contraseña debe tener al menos una letra mayúscula',
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      'La Contraseña debe tener al menos una letra minúscula',
                    hasNumber: (value) =>
                      /[0-9]/.test(value) ||
                      'La Contraseña debe tener al menos un número',
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>/`]/.test(value) ||
                      'La Contraseña debe tener al menos un carácter especial',
                  },
                })}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
              >
                {mostrarContrasenia ? (
                  <EyeOff className="text-cpalet-500" />
                ) : (
                  <Eye className="text-cpalet-500" />
                )}
              </div>
            </div>
            {errors.contrasenia && (
              <p className="text-red-500">{errors.contrasenia.message}</p>
            )}
            <Label className="text-cpalet-800 text-lg">
              Confirmar Contraseña:
            </Label>
            <div className="relative">
              <Input
                className="text-cpalet-800"
                type={mostrarContrasenia ? 'text' : 'password'}
                {...register('confirContrasenia', {
                  required: {
                    value: true,
                    message: 'Confirmar la Contraseña es requerida',
                  },
                  validate: (value) =>
                    value === watch('contrasenia') ||
                    'Las Contraseñas no coinciden',
                })}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
              >
                {mostrarContrasenia ? (
                  <EyeOff className="text-cpalet-500" />
                ) : (
                  <Eye className="text-cpalet-500" />
                )}
              </div>
            </div>

            {errors.confirContrasenia && (
              <p className="text-red-500">{errors.confirContrasenia.message}</p>
            )}
            <div className="py-3"></div>
            <div className="centrarHorizontal">
              <Button type="submit" variant="outline" className="w-full">
                Actualizar Contraseña
              </Button>
            </div>
          </form>
        </div>
        {(actualizarPWError || actualizarPWErrorMensaje) && (
          <div className="py-2">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Mensaje</AlertTitle>
              {actualizarPWError && (
                <AlertDescription>{actualizarPWError}</AlertDescription>
              )}
              {actualizarPWErrorMensaje && (
                <AlertDescription>{actualizarPWErrorMensaje}</AlertDescription>
              )}
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}

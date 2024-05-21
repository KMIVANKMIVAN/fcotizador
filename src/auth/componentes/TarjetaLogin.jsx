import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export function TarjetaLogin() {
  const apiKey = import.meta.env.VITE_URL_BACKEND;
  const loginUrl = `${apiKey}auth/login`;

  const [respuestaLogin, setRespuestaLogin] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [loginErrorMensaje, setLoginErrorMensaje] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const respuesta = await axios.post(loginUrl, data);
      const { data: responseData } = respuesta;
      setLoginError(null);
      setLoginErrorMensaje(null);
      setRespuestaLogin(responseData);
    } catch (error) {
      setRespuestaLogin([]);
      if (error.response) {
        const { data } = error.response;
        setLoginError(data.error ? `RS: ${data.error}` : null);
        setLoginErrorMensaje(data.message ? `RS: ${data.message}` : null);
      } else if (error.request) {
        setLoginErrorMensaje(null);
        setLoginError('RF: No se pudo obtener respuesta del servidor');
      } else {
        setLoginErrorMensaje(null);
        setLoginError('RF: Error al enviar la solicitud');
      }
    }
  };

  return (
    <>
      <div className="tarjetaLogin">
        <img src="../../../public/logo.png" className="w-full" />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className="text-white">CI:</Label>
            <Input
              className="text-white"
              required
              type="text"
              {...register('ci', { required: true })}
            />
            <div className="py-2"></div>
            <Label className="text-white">Contraseña:</Label>
            <Input
              className="text-white"
              type="password"
              required
              {...register('contrasenia', { required: true })}
            />
            <div className="py-3"></div>
            <div className="centrarHorizontal">
              <Button type="submit" variant="outline" className="w-full">
                Iniciar
              </Button>
            </div>
          </form>
        </div>
        {(loginError || loginErrorMensaje) && (
          <div className="py-2">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Mensaje</AlertTitle>
              {loginError && <AlertDescription>{loginError}</AlertDescription>}
              {loginErrorMensaje && (
                <AlertDescription>{loginErrorMensaje}</AlertDescription>
              )}
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}

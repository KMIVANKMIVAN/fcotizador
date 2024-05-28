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

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

import { toast } from 'sonner';

import { errorToast, exitoToast } from '../../lib/notificaciones';

export function CrearUsuarios() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUsuarios = `${urlBackendBase}usuarios`;
  const urlSucursales = `${urlBackendBase}sucursales`;
  const urlRoles = `${urlBackendBase}roles`;
  const urlDirecciones = `${urlBackendBase}direcciones`;
  const urlUnidades = `${urlBackendBase}unidades`;
  const urlCargos = `${urlBackendBase}cargos`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUsuarios, setRespuestaUsuarios] = useState([]);

  const [respuestaSucursales, setRespuestaSucursales] = useState([]);

  const [respuestaRoles, setRespuestaRoles] = useState([]);

  const [respuestaDirecciones, setRespuestaDirecciones] = useState([]);

  const [respuestaUnidades, setRespuestaUnidades] = useState([]);

  const [respuestaCargos, setRespuestaCargos] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const crearUsuario = async (data) => {
    /* 
    data.cargo = parseInt(data.cargo);
    data.es_activo = data.es_activo === 'true' ? true : false; */
    data.complemento = data.complemento === '' ? null : data.complemento;
    try {
      const respuesta = await axios.post(urlUsuarios, data, { headers });
      exitoToast(`Se Creo al Usuario: ${respuesta.data.nombres}`, false);
      setRespuestaUsuarios(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
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
  const pedirSucursales = async () => {
    const respuesta = await axios.get(urlSucursales, { headers });
    try {
      setRespuestaSucursales(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
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
  const pedirRoles = async () => {
    const respuesta = await axios.get(urlRoles, { headers });
    try {
      setRespuestaRoles(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
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
  const pedirDirecciones = async () => {
    const respuesta = await axios.get(urlDirecciones, { headers });
    try {
      setRespuestaDirecciones(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
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
  const pedirUnidades = async () => {
    const respuesta = await axios.get(urlUnidades, { headers });
    try {
      setRespuestaUnidades(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
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
  const pedirCargos = async () => {
    const respuesta = await axios.get(urlCargos, { headers });
    try {
      setRespuestaCargos(respuesta.data);
    } catch (error) {
      setRespuestaUsuarios([]);
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

  useEffect(() => {
    pedirSucursales();
    pedirRoles();
    pedirDirecciones();
    pedirUnidades();
    pedirCargos();
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <form
          onSubmit={handleSubmit(crearUsuario)}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">nombres:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('nombres', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">ci:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('ci', { required: true })}
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
            <div className="py-2">
              <Label className="text-white uppercase">roles:</Label>
              <Controller
                name="roles"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-white uppercase">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>EXTENCIONES:</SelectLabel>
                        {respuestaRoles.map((rol) => (
                          <SelectItem key={rol.id} value={rol.id.toString()}>
                            {rol.rol}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">cargo:</Label>
              <Controller
                name="cargo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-white uppercase">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>EXTENCIONES:</SelectLabel>
                        {respuestaCargos.map((cargo) => (
                          <SelectItem
                            key={cargo.id}
                            value={cargo.id.toString()}
                          >
                            {cargo.cargo}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 p-2 ">
            <div className="py-2">
              <Label className="text-white uppercase">apellidos:</Label>
              <Input
                className="text-white uppercase"
                type="text"
                {...register('apellidos', { required: true })}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">complemento:</Label>
              <Controller
                name="complemento"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-white uppercase">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>EXTENCIONES:</SelectLabel>
                        <SelectItem value={null}>SIN EXTENCION</SelectItem>
                        <SelectItem value="LP">LP</SelectItem>
                        <SelectItem value="CB">CB</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="BE">BE</SelectItem>
                        <SelectItem value="CH">CH</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                        <SelectItem value="PD">PD</SelectItem>
                        <SelectItem value="PT">PT</SelectItem>
                        <SelectItem value="TJ">TJ</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="py-2">
              <Label className="text-white uppercase">activar:</Label>
              <Controller
                name="es_activo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-white uppercase">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>ACCESOS:</SelectLabel>
                        <SelectItem value="true">ACTIVAR</SelectItem>
                        <SelectItem value="false">DESCTIVAR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="py-2">
              <Label className="text-white uppercase">sucursal:</Label>
              <Controller
                name="sucursal"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full text-white uppercase">
                      <SelectValue placeholder="seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>EXTENCIONES:</SelectLabel>
                        {respuestaSucursales.map((sucursal) => (
                          <SelectItem
                            key={sucursal.id}
                            value={sucursal.id.toString()}
                          >
                            {sucursal.sucursal}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="py-2">
              <div className="mt-6">
                <Button
                  type="submit"
                  variant=""
                  className="bg-green-500 w-full"
                >
                  Crear Usuario
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

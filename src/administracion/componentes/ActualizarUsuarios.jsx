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
import { Checkbox } from '@/components/ui/checkbox';

import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import { errorToast, exitoToast } from '../../lib/notificaciones';
import { manejoError } from '../utilidades/mostrarErrores';

export function ActualizarUsuarios({ filaSeleccionada }) {
  console.log('filaSeleccionada', filaSeleccionada);
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlUsuarios = `${urlBackendBase}usuarios/${filaSeleccionada.id}`;
  const urlSucursales = `${urlBackendBase}sucursales`;
  const urlRoles = `${urlBackendBase}roles`;
  const urlCargos = `${urlBackendBase}cargos`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaUsuarios, setRespuestaUsuarios] = useState([]);
  const [respuestaSucursales, setRespuestaSucursales] = useState([]);
  const [respuestaRoles, setRespuestaRoles] = useState([]);
  const [respuestaCargos, setRespuestaCargos] = useState([]);

  const [rolesArray, setRolesArray] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombres: filaSeleccionada.nombres,
      apellidos: filaSeleccionada.apellidos,
      ci: filaSeleccionada.ci,
      complemento: filaSeleccionada.complemento,
      correo: filaSeleccionada.correo,
      es_activo: filaSeleccionada.es_activo ? 'true' : 'false',
      sucursal_id: filaSeleccionada.sucursal.id.toString(),
      cargo_id: filaSeleccionada.cargo.id.toString(),
    },
  });

  const actualizarUsuario = async (data) => {
    try {
      console.log('data', data);
      const roles = rolesArray; // Los roles seleccionados
      const respuesta = await axios.patch(urlUsuarios, { ...data, roles }, { headers });
      exitoToast(`Usuario actualizado: ${respuesta.data.nombres}`, false);
      setRespuestaUsuarios(respuesta.data);
    } catch (error) {
      manejoError(error);
    }
  };

  const pedirSucursales = async () => {
    const respuesta = await axios.get(urlSucursales, { headers });
    try {
      setRespuestaSucursales(respuesta.data);
    } catch (error) {
      manejoError(error);
    }
  };

  const pedirRoles = async () => {
    const respuesta = await axios.get(urlRoles, { headers });
    try {
      setRespuestaRoles(respuesta.data);
    } catch (error) {
      manejoError(error);
    }
  };

  const pedirCargos = async () => {
    const respuesta = await axios.get(urlCargos, { headers });
    try {
      setRespuestaCargos(respuesta.data);
    } catch (error) {
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirSucursales();
    pedirRoles();
    pedirCargos();
  }, []);

  useEffect(() => {
    const selectedRolesIds = filaSeleccionada.roles.map((role) => role.id);
    setSelectedRoles(selectedRolesIds);
    setRolesArray(selectedRolesIds);
  }, [filaSeleccionada]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const roleId = parseInt(name); // Convertir el nombre del checkbox a número
    if (checked) {
      setRolesArray((prevRoles) => [...prevRoles, roleId]);
    } else {
      setRolesArray((prevRoles) => prevRoles.filter((role) => role !== roleId));
    }
  };

  console.log('rolesArray', rolesArray);
  return (
    <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
      <form
        onSubmit={handleSubmit(actualizarUsuario)}
        className="flex flex-col md:flex-row w-full"
      >
        <div className="basis-full md:basis-1/2 p-2">
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
            {respuestaRoles.map((role) => (
              <div key={role.id} className="basis-full md:basis-1/2 p-2">
                <input
                  type="checkbox"
                  name={role.id.toString()}
                  onChange={handleCheckboxChange}
                  checked={rolesArray.includes(role.id)}
                />
                <label>{role.rol}</label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <Label className="text-white uppercase">cargo:</Label>
            <Controller
              name="cargo_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value.toString()}
                >
                  <SelectTrigger className="w-full text-white uppercase">
                    <SelectValue placeholder="seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>CARGOS:</SelectLabel>
                      {respuestaCargos.map((cargo) => (
                        <SelectItem key={cargo.id} value={cargo.id.toString()}>
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
        <div className="basis-full md:basis-1/2 p-2">
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
                      <SelectLabel>EXTENSIONES:</SelectLabel>
                      <SelectItem value={null}>SIN EXTENSION</SelectItem>
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
                      <SelectItem value="false">DESACTIVAR</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="py-2">
            <Label className="text-white uppercase">sucursal:</Label>
            <Controller
              name="sucursal_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value.toString()}
                >
                  <SelectTrigger className="w-full text-white uppercase">
                    <SelectValue placeholder="seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>SUCURSALES:</SelectLabel>
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
              <Button type="submit" variant="" className="bg-green-500 w-full">
                Actualizar Usuario
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

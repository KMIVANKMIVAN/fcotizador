import axios from 'axios';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

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
import { manejoError } from '../../administracion/utilidades/mostrarErrores';

export function FormCotizPag1() {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCiudades = `${urlBackendBase}ciudades/svc`;
  const urlTipovidrio = `${urlBackendBase}tiposvidrios/svc`;
  const urlCiudadZona = `${urlBackendBase}ciudadeszonas/svc`;
  const urlOrientacion = `${urlBackendBase}orientaciones/svc`;
  const urlNivelpiso = `${urlBackendBase}nivelespisos/svc`;
  const urlTipopared = `${urlBackendBase}tiposparedes/svc`;
  const urlTipotecho = `${urlBackendBase}tipostechos/svc`;
  const urlTiposuelo = `${urlBackendBase}tipossuelos/svc`;
  // const url = `${urlBackendBase}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCiudades, setRespuestaCiudades] = useState([]);
  const [respuestaTipovidrio, setRespuestaTipovidrio] = useState([]);
  const [respuestaCiudadZona, setRespuestaCiudadZona] = useState([]);
  const [respuestaOrientacion, setRespuestaOrientacion] = useState([]);
  const [respuestaNivelpiso, setRespuestaNivelpiso] = useState([]);
  const [respuestaTipopared, setRespuestaTipopared] = useState([]);
  const [respuestaTipotecho, setRespuestaTipotecho] = useState([]);
  const [respuestaTiposuelo, setRespuestaTiposuelo] = useState([]);
  // const [respuesta, setRespuesta] = useState([]);

  const pedirCiudades = async () => {
    const respuesta = await axios.get(urlCiudades, { headers });
    try {
      setRespuestaCiudades(respuesta.data);
    } catch (error) {
      setRespuestaCiudades([]);
      manejoError(error);
    }
  };
  const pedirTipovidrio = async () => {
    const respuesta = await axios.get(urlTipovidrio, { headers });
    try {
      setRespuestaTipovidrio(respuesta.data);
    } catch (error) {
      setRespuestaTipovidrio([]);
      manejoError(error);
    }
  };
  const pedirCiudadZona = async () => {
    const respuesta = await axios.get(urlCiudadZona, { headers });
    try {
      setRespuestaCiudadZona(respuesta.data);
    } catch (error) {
      setRespuestaCiudadZona([]);
      manejoError(error);
    }
  };
  const pedirOrientacion = async () => {
    const respuesta = await axios.get(urlOrientacion, { headers });
    try {
      setRespuestaOrientacion(respuesta.data);
    } catch (error) {
      setRespuestaOrientacion([]);
      manejoError(error);
    }
  };
  const pedirNivelpiso = async () => {
    const respuesta = await axios.get(urlNivelpiso, { headers });
    try {
      setRespuestaNivelpiso(respuesta.data);
    } catch (error) {
      setRespuestaNivelpiso([]);
      manejoError(error);
    }
  };
  const pedirTipopared = async () => {
    const respuesta = await axios.get(urlTipopared, { headers });
    try {
      setRespuestaTipopared(respuesta.data);
    } catch (error) {
      setRespuestaTipopared([]);
      manejoError(error);
    }
  };
  const pedirTipotecho = async () => {
    const respuesta = await axios.get(urlTipotecho, { headers });
    try {
      setRespuestaTipotecho(respuesta.data);
    } catch (error) {
      setRespuestaTipotecho([]);
      manejoError(error);
    }
  };
  const pedirTiposuelo = async () => {
    const respuesta = await axios.get(urlTiposuelo, { headers });
    try {
      setRespuestaTiposuelo(respuesta.data);
    } catch (error) {
      setRespuestaTiposuelo([]);
      manejoError(error);
    }
  };
  /* const pedir = async () => {
    const respuesta = await axios.get(url, { headers });
    try {
      setRespuesta(respuesta.data);
    } catch (error) {
      setRespuesta([]);
      manejoError(error);
    }
  }; */

  useEffect(() => {
    pedirCiudades();
    pedirTipovidrio();
    pedirCiudadZona();
    pedirOrientacion();
    pedirNivelpiso();
    pedirTipopared();
    pedirTipotecho();
    pedirTiposuelo();
    // pedir();
  }, []);
  return (
    <>
      <div
        // onSubmit={handleSubmit(crearSucursal)}
        className="flex flex-wrap w-full"
      >
        <div className="w-full md:w-1/4 md:p-2">
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">Ciudades:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>CIUDADES:</SelectLabel>
                  {respuestaCiudades.map((ciudad) => (
                    <SelectItem key={ciudad.id} value={ciudad.id.toString()}>
                      {ciudad.ciudad}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">tipo de vidrio:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE VIDRIO:</SelectLabel>
                  {respuestaTipovidrio.map((tipovidrio) => (
                    <SelectItem
                      key={tipovidrio.id}
                      value={tipovidrio.id.toString()}
                    >
                      {tipovidrio.tipovidrio}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full md:w-1/4 md:p-2">
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">ciudad zona:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>CIUDAD ZONA:</SelectLabel>
                  {respuestaCiudadZona.map((ciudadzona) => (
                    <SelectItem
                      key={ciudadzona.ciudadzona}
                      value={ciudadzona.id.toString()}
                    >
                      {ciudadzona.ciudadzona}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">tipo de pared:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE PARED:</SelectLabel>
                  {respuestaTipopared.map((tipopared) => (
                    <SelectItem
                      key={tipopared.tipopared}
                      value={tipopared.id.toString()}
                    >
                      {tipopared.tipopared}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full md:w-1/4 md:p-2">
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">orientacion:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ORIENTACION:</SelectLabel>
                  {respuestaOrientacion.map((orientacion) => (
                    <SelectItem
                      key={orientacion.orientacion}
                      value={orientacion.id.toString()}
                    >
                      {orientacion.orientacion}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">tipo de techo:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE TECHO:</SelectLabel>
                  {respuestaTipotecho.map((tipotecho) => (
                    <SelectItem
                      key={tipotecho.tipotecho}
                      value={tipotecho.id.toString()}
                    >
                      {tipotecho.tipotecho}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full md:w-1/4 md:p-2">
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">nivel de piso:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>NIVEL DE PISO:</SelectLabel>
                  {respuestaNivelpiso.map((nivelpiso) => (
                    <SelectItem
                      key={nivelpiso.nivelpiso}
                      value={nivelpiso.id.toString()}
                    >
                      {nivelpiso.nivelpiso}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">tipo de suelo:</Label>
            <Select>
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE SUELO:</SelectLabel>
                  {respuestaTiposuelo.map((tiposuelo) => (
                    <SelectItem
                      key={tiposuelo.tiposuelo}
                      value={tiposuelo.id.toString()}
                    >
                      {tiposuelo.tiposuelo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

import axios from 'axios';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';

const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
const urlSucursales = `${urlBackendBase}sucursales`;
const urlRoles = `${urlBackendBase}roles`;
const urlDirecciones = `${urlBackendBase}direcciones`;
const urlUnidades = `${urlBackendBase}unidades`;
const urlCargos = `${urlBackendBase}cargos`;

const headers = {
  Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
};

export const [respuestaSucursales, setRespuestaSucursales] = useState([]);
export const [sucursalesError, setSucursalesError] = useState(null);
export const [sucursalesErrorMensaje, setSucursalesErrorMensaje] =
  useState(null);
export const [respuestaRoles, setRespuestaRoles] = useState([]);
export const [RolesError, setRolesError] = useState(null);
export const [RolesErrorMensaje, setRolesErrorMensaje] = useState(null);
export const [respuestaUnidades, setRespuestaUnidades] = useState([]);
export const [UnidadesError, setUnidadesError] = useState(null);
export const [UnidadesErrorMensaje, setUnidadesErrorMensaje] = useState(null);
export const [respuestaDirecciones, setRespuestaDirecciones] = useState([]);
export const [DireccionesError, setDireccionesError] = useState(null);
export const [DireccionesErrorMensaje, setDireccionesErrorMensaje] =
  useState(null);
export const [respuestaCargos, setRespuestaCargos] = useState([]);
export const [CargosError, setCargosError] = useState(null);
export const [CargosErrorMensaje, setCargosErrorMensaje] = useState(null);

const pedirSucursales = async () => {
  const respuesta = await axios.get(urlSucursales, { headers });
  try {
    setSucursalesError(null);
    setSucursalesErrorMensaje(null);
    setRespuestaSucursales(respuesta.data);
  } catch (error) {
    setRespuestaSucursales([]);
    if (error.response) {
      const { data } = error.response;
      setSucursalesError(data.error ? `RS: ${data.error}` : null);
      setSucursalesErrorMensaje(data.message ? `RS: ${data.message}` : null);
    } else if (error.request) {
      setSucursalesErrorMensaje(null);
      setSucursalesError('RF: No se pudo obtener respuesta del servidor');
    } else {
      setSucursalesErrorMensaje(null);
      setSucursalesError('RF: Error al enviar la solicitud');
    }
  }
};
const pedirRoles = async () => {
  const respuesta = await axios.get(urlRoles, { headers });
  try {
    setRolesError(null);
    setRolesErrorMensaje(null);
    setRespuestaRoles(respuesta.data);
  } catch (error) {
    setRespuestaRoles([]);
    if (error.response) {
      const { data } = error.response;
      setRolesError(data.error ? `RS: ${data.error}` : null);
      setRolesErrorMensaje(data.message ? `RS: ${data.message}` : null);
    } else if (error.request) {
      setRolesErrorMensaje(null);
      setRolesError('RF: No se pudo obtener respuesta del servidor');
    } else {
      setRolesErrorMensaje(null);
      setRolesError('RF: Error al enviar la solicitud');
    }
  }
};

const pedirDirecciones = async () => {
  const respuesta = await axios.get(urlDirecciones, { headers });
  try {
    setDireccionesError(null);
    setDireccionesErrorMensaje(null);
    setRespuestaDirecciones(respuesta.data);
  } catch (error) {
    setRespuestaDirecciones([]);
    if (error.response) {
      const { data } = error.response;
      setDireccionesError(data.error ? `RS: ${data.error}` : null);
      setDireccionesErrorMensaje(data.message ? `RS: ${data.message}` : null);
    } else if (error.request) {
      setDireccionesErrorMensaje(null);
      setDireccionesError('RF: No se pudo obtener respuesta del servidor');
    } else {
      setDireccionesErrorMensaje(null);
      setDireccionesError('RF: Error al enviar la solicitud');
    }
  }
};
const pedirUnidades = async () => {
  const respuesta = await axios.get(urlUnidades, { headers });
  try {
    setUnidadesError(null);
    setUnidadesErrorMensaje(null);
    setRespuestaUnidades(respuesta.data);
  } catch (error) {
    setRespuestaUnidades([]);
    if (error.response) {
      const { data } = error.response;
      setUnidadesError(data.error ? `RS: ${data.error}` : null);
      setUnidadesErrorMensaje(data.message ? `RS: ${data.message}` : null);
    } else if (error.request) {
      setUnidadesErrorMensaje(null);
      setUnidadesError('RF: No se pudo obtener respuesta del servidor');
    } else {
      setUnidadesErrorMensaje(null);
      setUnidadesError('RF: Error al enviar la solicitud');
    }
  }
};
const pedirCargos = async () => {
  const respuesta = await axios.get(urlCargos, { headers });
  try {
    setCargosError(null);
    setCargosErrorMensaje(null);
    setRespuestaCargos(respuesta.data);
  } catch (error) {
    setRespuestaCargos([]);
    if (error.response) {
      const { data } = error.response;
      setCargosError(data.error ? `RS: ${data.error}` : null);
      setCargosErrorMensaje(data.message ? `RS: ${data.message}` : null);
    } else if (error.request) {
      setCargosErrorMensaje(null);
      setCargosError('RF: No se pudo obtener respuesta del servidor');
    } else {
      setCargosErrorMensaje(null);
      setCargosError('RF: Error al enviar la solicitud');
    }
  }
};

import { manejoError } from './mostrarErrores';
export const guardarDatosUsuario = (datosUsuario) => {
  try {
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
  } catch (error) {
    console.error('Error al guardar los datos del usuario:', error);
    manejoError('Error al guardar los datos del usuario');
  }
};

export const obtenerDatosUsuario = () => {
  try {
    const datosUsuario = window.localStorage.getItem('datosUsuario');
    return datosUsuario ? JSON.parse(datosUsuario) : null;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    manejoError('Error al guardar los datos del usuario');
    return null;
  }
};

export const eliminarDatosUsuario = () => {
  try {
    console.log('se elimino');
    localStorage.removeItem('datosUsuario');
  } catch (error) {
    console.error('Error al eliminar los datos del usuario:', error);
    manejoError('Error al guardar los datos del usuario');
  }
};

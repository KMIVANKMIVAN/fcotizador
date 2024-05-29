import { errorToast } from '../../lib/notificaciones';
export const manejoError = (error) => {
  if (error.response) {
    const { data } = error.response;
    if (data.error) {
      errorToast(`RS: ${data.error}`, false);
    }
    if (data.message) {
      errorToast(`RS: ${data.message}`, false);
    }
  } else if (error.request) {
    errorToast('RF: No se pudo obtener respuesta del servidor', false);
  } else {
    errorToast('RF: Error al enviar la solicitud', false);
  }
};

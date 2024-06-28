import { ScanEye } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { obtenerDatosUsuario } from '../../auth/utilidades/datosUsuarioLocalStor';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ActualizarAmbiente } from './ActualizarAmbiente';
import { FormuCotizAmbiente } from './FormuCotizAmbiente';

import useStoreRecargador from '../estados/recargarPeticiones';

export function DialogAmbiente({ idSeleccionada }) {
  const urlBackendBase = import.meta.env.VITE_URL_BACKEND;
  const urlCotizacionambiente = `${urlBackendBase}cotizacionesambientes/idcotizacion/${idSeleccionada}`;

  const headers = {
    Authorization: `Bearer ${obtenerDatosUsuario().tk}`,
  };

  const [respuestaCotizacionambiente, setRespuestaCotizacionambiente] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const { recargador } = useStoreRecargador();

  const pedirCotizacionambiente = async () => {
    try {
      const respuesta = await axios.get(urlCotizacionambiente, { headers });
      setRespuestaCotizacionambiente(respuesta.data);
    } catch (error) {
      setRespuestaCotizacionambiente([]);
      manejoError(error);
    }
  };

  useEffect(() => {
    pedirCotizacionambiente();
  }, [idSeleccionada, recargador]);

  const agregarAmbiente = () => {
    setAmbientes([...ambientes, <FormuCotizAmbiente key={ambientes.length} />]);
  };

  const quitarAmbiente = () => {
    setAmbientes(ambientes.slice(0, -1));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ScanEye className="text-red-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-7xl">
          <DialogHeader>
            <DialogTitle className="text-cpalet-500 capitalize">
              Actualizar {recargador}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex justify-between">
              <Button
                type=""
                onClick={agregarAmbiente}
                variant="mibotoncrearambie"
                className=""
              >
                Añadir Ambiente
              </Button>
              <Button
                type=""
                onClick={quitarAmbiente}
                variant="mibotoneliminarambie"
                className=""
              >
                Quitar Ambiente
              </Button>
            </div>
            <hr className="border-t-2 mt-4 border-cpalet-500" />

            {ambientes.map((ambiente, index) => (
              <div key={index} className="mb-2">
                {ambiente}
                <hr className="border-t-2 border-cpalet-500" />
              </div>
            ))}
            <h1 className="text-center text-cpalet-500 text-2xl capitalize font-medium py-2 mt-6">
              Ambientes creados
            </h1>
            {respuestaCotizacionambiente.map((ambiente) => (
              <>
                <ActualizarAmbiente
                  key={ambiente.id}
                  filaSeleccionada={ambiente}
                />
                <hr className="border-t-2 border-cpalet-500" />
              </>
            ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="mibotonprimario">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

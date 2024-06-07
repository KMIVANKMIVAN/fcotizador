import { FilePenLine } from 'lucide-react';
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
import { Button } from '@/components/ui/button'; // Importa el componente Button

import { ActualizarEmpresa } from './ActualizarEmpresa';
import { ActualizarCiudad } from './ActualizarCiudad';
import { ActualizarRol } from './ActualizarRol';
import { ActualizarDirecciones } from './ActualizarDirecciones';
import { ActualizarUnidades } from './ActualizarUnidades';
import { ActualizarCargo } from './ActualizarCargo';
import { ActualizarSucursal } from './ActualizarSucursal';

export function DialogDomo({ filaSeleccionada, titulo }) {
  // Función para renderizar el componente correspondiente según el título
  const renderComponent = () => {
    switch (titulo) {
      case 'Empresa':
        return <ActualizarEmpresa filaSeleccionada={filaSeleccionada} />;
      case 'Ciudad':
        return <ActualizarCiudad filaSeleccionada={filaSeleccionada} />;
      case 'Rol':
        return <ActualizarRol filaSeleccionada={filaSeleccionada} />;
      case 'Direcciones':
        return <ActualizarDirecciones filaSeleccionada={filaSeleccionada} />;
      case 'Unidades':
        return <ActualizarUnidades filaSeleccionada={filaSeleccionada} />;
      case 'Cargo':
        return <ActualizarCargo filaSeleccionada={filaSeleccionada} />;
      case 'Sucursal':
        return <ActualizarSucursal filaSeleccionada={filaSeleccionada} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <FilePenLine variant="outline" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-cpalet-500 capitalize">
              Actualizar
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {renderComponent()}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

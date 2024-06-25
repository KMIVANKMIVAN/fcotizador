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

import { ActualizarToalleroeje50cm } from './ActualizarToalleroeje50cm';
import { ActualizarRadiadoreje50cm } from './ActualizarRadiadoreje50cm';

export function DialogAdmProd({ filaSeleccionada, titulo }) {
  // Función para renderizar el componente correspondiente según el título
  const renderComponent = () => {
    switch (titulo) {
      case 'Toallero_Eje_50cm':
        return (
          <ActualizarToalleroeje50cm filaSeleccionada={filaSeleccionada} />
        );
      case 'Radiador_Eje_50cm':
        return (
          <ActualizarRadiadoreje50cm filaSeleccionada={filaSeleccionada} />
        );
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-cpalet-500 capitalize">
              Actualizar
            </DialogTitle>
          </DialogHeader>
          {renderComponent()}
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

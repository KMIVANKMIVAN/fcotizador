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

import { ActualizarUsuarios } from './ActualizarUsuarios';
import { Pruebas } from '../paginas/Pruebas';

export function DialogUsuario({ filaSeleccionada }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <FilePenLine className="text-red-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-cpalet-500 capitalize">
              Actualizar
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <ActualizarUsuarios filaSeleccionada={filaSeleccionada} />
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

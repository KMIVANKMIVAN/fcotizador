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
          <FilePenLine variant="outline" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Actualizar</DialogTitle>
          </DialogHeader>
          <ActualizarUsuarios filaSeleccionada={filaSeleccionada} />
          {/* <Pruebas filaSeleccionada={filaSeleccionada} /> */}
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

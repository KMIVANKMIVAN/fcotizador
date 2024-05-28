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
import { ActualizarDepartamento } from './ActualizarDepartamento';
import { ActualizarRol } from './ActualizarRol';
import { ActualizarDirecciones } from './ActualizarDirecciones';
import { ActualizarUnidades } from './ActualizarUnidades';
import { ActualizarCargo } from './ActualizarCargo';
import { ActualizarSucursal } from './ActualizarSucursal';

export function DialogDomo({ idActualizar, titulo }) {
  // Función para renderizar el componente correspondiente según el título
  const renderComponent = () => {
    switch (titulo) {
      case 'Empresa':
        return <ActualizarEmpresa idActualizar={idActualizar} />;
      case 'Departamento':
        return <ActualizarDepartamento idActualizar={idActualizar} />;
      case 'Rol':
        return <ActualizarRol idActualizar={idActualizar} />;
      case 'Direcciones':
        return <ActualizarDirecciones idActualizar={idActualizar} />;
      case 'Unidades':
        return <ActualizarUnidades idActualizar={idActualizar} />;
      case 'Cargo':
        return <ActualizarCargo idActualizar={idActualizar} />;
      case 'Sucursal':
        return <ActualizarSucursal idActualizar={idActualizar} />;
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
            <DialogTitle>Actualizar</DialogTitle>
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

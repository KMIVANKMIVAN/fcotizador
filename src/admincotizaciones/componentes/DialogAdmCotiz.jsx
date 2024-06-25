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

import { ActualizarCiudadZona } from './ActualizarCiudadZona';
import { ActualizarNivelpiso } from './ActualizarNivelpiso';
import { ActualizarOrientacion } from './ActualizarOrientacion';
import { ActualizarTipopared } from './ActualizarTipopared';
import { ActualizarTiposuelo } from './ActualizarTiposuelo';
import { ActualizarTipotecho } from './ActualizarTipotecho';
import { ActualizarTipovidrio } from './ActualizarTipovidrio';
import { ActualizarTipocotizacion } from './ActualizarTipocotizacion';
import { ActualizarFactorviaje } from './ActualizarFactorviaje';
import { ActualizarGastopersona } from './ActualizarGastopersona';
import { ActualizarInstalradiatoallero } from './ActualizarInstalradiatoallero';
import { ActualizarInstaltuberia } from './ActualizarInstaltuberia';

export function DialogAdmCotiz({ filaSeleccionada, titulo }) {
  // Función para renderizar el componente correspondiente según el título
  const renderComponent = () => {
    switch (titulo) {
      case 'Ciudad_Zona':
        return <ActualizarCiudadZona filaSeleccionada={filaSeleccionada} />;
      case 'Nivel_de_Piso':
        return <ActualizarNivelpiso filaSeleccionada={filaSeleccionada} />;
      case 'Orientacion':
        return <ActualizarOrientacion filaSeleccionada={filaSeleccionada} />;
      case 'Tipo_de_Pared':
        return <ActualizarTipopared filaSeleccionada={filaSeleccionada} />;
      case 'Tipo_de_Suelo':
        return <ActualizarTiposuelo filaSeleccionada={filaSeleccionada} />;
      case 'Tipo_de_Techo':
        return <ActualizarTipotecho filaSeleccionada={filaSeleccionada} />;
      case 'Tipo_de_Vidrio':
        return <ActualizarTipovidrio filaSeleccionada={filaSeleccionada} />;
      case 'Tipo_de_Cotizacion':
        return <ActualizarTipocotizacion filaSeleccionada={filaSeleccionada} />;
      case 'Factor_Viaje':
        return <ActualizarFactorviaje filaSeleccionada={filaSeleccionada} />;
      case 'Gasto_Persona':
        return <ActualizarGastopersona filaSeleccionada={filaSeleccionada} />;
      case 'Instalar_Radiador_Toallero':
        return <ActualizarInstalradiatoallero filaSeleccionada={filaSeleccionada} />;
      case 'Instalar_Tuberia':
        return <ActualizarInstaltuberia filaSeleccionada={filaSeleccionada} />;
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
            <DialogTitle className="text-cpalet-500 capitalize">Actualizar</DialogTitle>
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

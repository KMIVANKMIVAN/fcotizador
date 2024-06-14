import { useState, useEffect } from 'react';
import { FilePenLine, Lock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DialogUsuario } from './DialogUsuario';
import { ActivarDesactivarUsuario } from './ActivarDesactivarUsuario';
import { ResetContraseUsuario } from './ResetContraseUsuario';

export function TablaUsuario({ columnasUsuario, respuestaUsuarios }) {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const obtenerFilaSeleccionada = (fila) => {
    setFilaSeleccionada(fila);
  };

  return (
    <>
      <div className="border-4 border-cpalet-500 rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {columnasUsuario.map((col) => (
                <TableHead
                  key={col.id}
                  className={`capitalize whitespace-nowrap overflow-visible text-lg text-center text-cpalet-500`}
                  style={{ minWidth: col.minWidth, textAlign: col.align }}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {respuestaUsuarios.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={` whitespace-nowrap overflow-visible text-lg text-cpalet-400`}
              >
                {columnasUsuario.map((col) => {
                  let cellData;

                  switch (col.id) {
                    case 'actualizar':
                      cellData = (
                        <div
                          className="flex items-center justify-center"
                          onClick={() => obtenerFilaSeleccionada(row)}
                        >
                          <DialogUsuario filaSeleccionada={filaSeleccionada} />
                        </div>
                      );
                      break;
                    case 'activar':
                      cellData = (
                        <div className="flex items-center justify-center">
                          <ActivarDesactivarUsuario
                            idActualizar={row.id}
                            esActivo={row.es_activo}
                          />
                        </div>
                      );
                      break;
                    case 'resetear':
                      cellData = (
                        <div className="flex items-center justify-center">
                          <ResetContraseUsuario
                            idActualizar={row.id}
                          />
                        </div>
                      );
                      break;
                    case 'roles':
                      cellData = row.roles.map((role) => role.rol).join(', ');
                      break;
                    case 'sucursal':
                      cellData = row.sucursal.sucursal;
                      break;
                    case 'cargo':
                      cellData = row.cargo.cargo;
                      break;
                    case 'es_activo':
                      cellData = row.es_activo ? 'Sí' : 'No';
                      break;
                    case 'se_cambiado_cntr':
                      cellData = row.se_cambiado_cntr ? 'Sí' : 'No';
                      break;
                    default:
                      cellData = row[col.id];
                  }

                  return (
                    <TableCell
                      key={col.id}
                      className="font-medium"
                      style={{ textAlign: col.align, wordWrap: 'break-word' }}
                    >
                      {cellData}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

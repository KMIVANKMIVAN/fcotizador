import { useState } from 'react';
import { FilePenLine, Lock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

import { DialogUsuario } from './DialogUsuario';
import { ActivarDesactivarUsuario } from './ActivarDesactivarUsuario';

export function TablaUsuario({ columnasUsuario, respuestaUsuarios }) {
  // console.log('respuestaUsuarios', respuestaUsuarios);
  const [idActualizar, setIdActualizar] = useState(null);
  const [esActivo, setEsActivo] = useState(null);

  const obtenerId = (id) => {
    setIdActualizar(id);
  };
  const obtenerActivo = (esActivo) => {
    setEsActivo(esActivo);
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
                  className={`uppercase whitespace-nowrap overflow-visible text-lg text-center text-white`}
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
                className={`uppercase whitespace-nowrap overflow-visible text-lg text-cpalet-500`}
              >
                {columnasUsuario.map((col) => {
                  let cellData;

                  switch (col.id) {
                    case 'actualizar':
                      cellData = (
                        <div
                          className="flex items-center justify-center"
                          onClick={() => obtenerId(row.id)}
                        >
                          <DialogUsuario idActualizar={idActualizar} />
                        </div>
                      );
                      break;
                    case 'activar':
                      cellData = (
                        <div
                          className="flex items-center justify-center"
                          onClick={() => (
                            obtenerId(row.id), obtenerActivo(row.es_activo)
                          )}
                        >
                          <ActivarDesactivarUsuario
                            idActualizar={idActualizar}
                            esActivo={esActivo}
                          />
                        </div>
                      );
                      break;
                    case 'resetear':
                      cellData = (
                        <div className="flex items-center justify-center">
                          <Lock />
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

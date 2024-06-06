import { useState } from 'react';
import { FilePenLine } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DialogDomo } from './DialogDomo';

const getSecondProperty = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    const values = Object.values(obj);
    return values.length > 1 ? values[1] : values[0];
  }
  return obj;
};

const renderCellContent = (value) => {
  if (typeof value === 'object' && value !== null) {
    return getSecondProperty(value);
  }
  return value;
};

export function Tablas({ columnas, respuesta, titulo }) {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const obtenerFilaSeleccionada = (fila) => {
    setFilaSeleccionada(fila);
  };

  return (
    <>
      {respuesta && (
        <div className="border-4 border-cpalet-500 rounded-lg p-2">
          <Table>
            {/* <TableCaption>A list of your recent items.</TableCaption> */}
            <TableHeader>
              <TableRow>
                {columnas.map((col) => (
                  <TableHead
                    key={col.id}
                    className={`capitalize whitespace-nowrap overflow-visible text-lg text-center text-cpalet-500`}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {respuesta.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columnas.map((col) => (
                    <TableCell
                      key={col.id}
                      className={`whitespace-nowrap overflow-visible  text-lg text-cpalet-500`}
                    >
                      {col.id === 'actualizar' ? (
                        <div
                          className="flex items-center justify-center"
                          onClick={() => obtenerFilaSeleccionada(row)}
                        >
                          <DialogDomo
                            filaSeleccionada={filaSeleccionada}
                            titulo={titulo}
                          />
                        </div>
                      ) : (
                        renderCellContent(row[col.id])
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

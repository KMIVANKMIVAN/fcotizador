import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';

export function FormuCotizacion() {
  const [area, setArea] = useState(0);
  const [altura, setAltura] = useState(0);
  const [volumen, setVolumen] = useState(0);

  const handleChangeArea = (e) => {
    const newArea = parseFloat(e.target.value);
    setArea(newArea);
    setVolumen(newArea * altura);
  };

  const handleChangeAltura = (e) => {
    const newAltura = parseFloat(e.target.value);
    setAltura(newAltura);
    setVolumen(newAltura * area);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 border-4 border-cpalet-500 rounded-lg bg-cpalet-800">
        <div className="w-full">
          <div className="flex flex-col md:flex-row w-full mb-4">
            <div className="basis-full md:basis-1/3 p-2">
              <div className="py-2 flex flex-wrap items-center">
                <div className="w-1/3">
                  <Label className="text-white uppercase">Área:</Label>
                  <Input
                    className="text-white uppercase"
                    type="number"
                    value={area}
                    onChange={handleChangeArea}
                  />
                </div>
                <div className="w-1/3">
                  <Label className="text-white uppercase">Altura:</Label>
                  <Input
                    className="text-white uppercase"
                    type="number"
                    value={altura}
                    onChange={handleChangeAltura}
                  />
                </div>
                <div className="w-1/3">
                  <Label className="text-white uppercase">Volumen:</Label>
                  <Input
                    className="text-white uppercase"
                    type="number"
                    value={volumen}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="basis-full md:basis-1/3 p-2">
              <div className="py-2">
                <Label className="text-white uppercase">Campo 1:</Label>
                <Input
                  className="text-white uppercase"
                  type="text"
                  // {...register('campo2', { required: true })}
                />
              </div>
            </div>
            <div className="basis-full md:basis-1/3 p-2">
              <div className="py-2">
                <Label className="text-white uppercase">Campo 2:</Label>
                <Input
                  className="text-white uppercase"
                  type="text"
                  // {...register('campo2', { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            <div className="basis-full md:basis-1/2 p-2">
              <div className="py-2">
                <Label className="text-white uppercase">Campo 3:</Label>
                <Input
                  className="text-white uppercase"
                  type="text"
                  // {...register('campo1', { required: true })}
                />
              </div>
            </div>
            <div className="basis-full md:basis-1/2 p-2">
              <div className="py-2">
                <Label className="text-white uppercase">Campo 4:</Label>
                <Input
                  className="text-white uppercase"
                  type="text"
                  // {...register('campo2', { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

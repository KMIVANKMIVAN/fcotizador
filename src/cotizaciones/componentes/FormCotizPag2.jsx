import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function FormCotizPag2() {
  return (
    <>
      <div
        // onSubmit={handleSubmit(crearSucursal)}
        className="flex flex-wrap w-full"
      >
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="basis-full md:basis-1/3 p-2">
            <div className="py-2 flex flex-wrap items-center">
              <div className="w-1/3">
                <Label className="text-cpalet-500 uppercase">Área:</Label>
                <Input
                  className="text-cpalet-500 uppercase"
                  type="number"
                  // value={area}
                  // onChange={handleChangeArea}
                />
              </div>
              <div className="w-1/3">
                <Label className="text-cpalet-500 uppercase">Altura:</Label>
                <Input
                  className="text-cpalet-500 uppercase"
                  type="number"
                  // value={altura}
                  // onChange={handleChangeAltura}
                />
              </div>
              <div className="w-1/3">
                <Label className="text-cpalet-500 uppercase">Volumen:</Label>
                <Input
                  className="text-cpalet-500 uppercase"
                  type="number"
                  // value={volumen}
                  // readOnly
                />
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/3 p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">Campo 1:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                // {...register('campo2', { required: true })}
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/3 p-2">
            <div className="py-2">
              <Label className="text-cpalet-500 uppercase">Campo 2:</Label>
              <Input
                className="text-cpalet-500 uppercase"
                type="text"
                // {...register('campo2', { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">Departamentos:</Label>
            <Select
            // onValueChange={setSelectedDepartamento}
            // value={selectedDepartamento}
            >
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>DEPARTAMENTOS:</SelectLabel>
                  {/* {respuestaDepartamentos.map((departamento) => (
                    <SelectItem
                      key={departamento.id}
                      value={departamento.id.toString()}
                    >
                      {departamento.departamento}
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">Zonas:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
            >
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ZONAS:</SelectLabel>
                  {/* {zonas.map((zona) => (
                    <SelectItem key={zona.zona} value={zona.zona}>
                      {zona.zona}
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">Tipo de Cotización:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
            >
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE COTIZACIÓN:</SelectLabel>
                  {/* {tipoCotizacion.map((tipo) => (
                    <SelectItem
                      key={tipo.tipoCotizacion}
                      value={tipo.tipoCotizacion}
                    >
                      {tipo.tipoCotizacion}
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-2">
          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">Orientación:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
            >
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ORIENTACIÓN:</SelectLabel>
                  {/* {orientacion.map((ori) => (
                    <SelectItem key={ori.orientacion} value={ori.orientacion}>
                      {ori.orientacion}
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="py-2">
            <Label className="text-cpalet-500 uppercase">Tipo de Pared:</Label>

            <Select
            // onValueChange={(value) => field.onChange(value)}
            // value={field.value}
            >
              <SelectTrigger className="w-full text-cpalet-500 uppercase">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>TIPO DE PARED:</SelectLabel>
                  {/* {tipoPared.map((pared) => (
                    <SelectItem key={pared.tipoPared} value={pared.tipoPared}>
                      {pared.tipoPared}
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

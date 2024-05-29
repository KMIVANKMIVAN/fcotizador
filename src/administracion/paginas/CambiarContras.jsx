import { useState } from 'react'; // Importa useState
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TarjetaCambiar } from '../componentes/TarjetaCambiar';

export function CambiarContras() {
  return (
    <>
      <div
        className="centrarHorizontalVerticar"
        // style={{ backgroundImage: 'url("../../../public/website2.png")' }}
        style={{
          backgroundImage: 'url("../../../public/website2.png")',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <TarjetaCambiar />
      </div>
    </>
  );
}

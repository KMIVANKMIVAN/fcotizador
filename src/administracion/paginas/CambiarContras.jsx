import { useState } from 'react'; // Importa useState
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TarjetaCambiar } from '../componentes/TarjetaCambiar';

export function CambiarContras() {
  return (
    <>
      <div
        className="relative centrarHorizontalVerticar"
        style={{
          backgroundImage: 'url("../../../public/website2.png")',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
        ></div>
        
        {/* Content */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <TarjetaCambiar />
        </div>
      </div>
    </>
  );
}

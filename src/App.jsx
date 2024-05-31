import './App.css';

import { ThemeProvider } from '@/components/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navegacion } from './navegacion/paginas/Navegacion';
import { Login } from './auth/paginas/Login';
import { Usuarios } from './administracion/paginas/Usuarios';
import { Domoticus } from './administracion/paginas/Domoticus';
import { CambiarContras } from './administracion/paginas/CambiarContras';
import { Cotizaciones } from './cotizaciones/paginas/Cotizaciones';
import { Pruebas } from './administracion/paginas/Pruebas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'cambiarcontras',
    element: <CambiarContras />,
  },
  {
    path: 'pruebas',
    element: <Pruebas />,
  },
  {
    path: 'navegacion',
    element: <Navegacion />,
    children: [
      {
        path: 'usuarios',
        element: <Usuarios />,
      },
      {
        path: 'domoticus',
        element: <Domoticus />,
      },
      {
        path: 'cotizaciones',
        element: <Cotizaciones />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <RouterProvider router={router} />
        <Toaster expand={true} />
      </div>
    </ThemeProvider>
  );
}

export default App;

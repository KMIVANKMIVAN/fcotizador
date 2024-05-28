import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Navegacion } from './navegacion/paginas/Navegacion';

import { Login } from './auth/paginas/Login';
import { Usuarios } from './administracion/paginas/Usuarios';
import { Domoticus } from './administracion/paginas/Domoticus';
import { CambiarContras } from './administracion/paginas/CambiarContras';
import { Cotizaciones } from './cotizaciones/paginas/Cotizaciones';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
      {
        path: 'cambiarContras',
        element: <CambiarContras />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster expand={true} />
    </>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import { Menu } from '../componentes/Menu';

export function Navegacion() {
  return (
    <div className="flex">
      <Menu />
      {/* <main className="max-w-5xl flex-1 mx-auto  bg-lime-700"> */}
      <div className="w-5xl flex-1 m-5 md:w-auto bg-cpalet-900">
        <div className="reset-styles">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

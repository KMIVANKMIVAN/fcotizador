import { useState } from 'react';
import './App.css';
import { Login } from './auth/paginas/login';
import { Cabecera } from './navegacion/componentes/Cabecera';

function App() {
  return (
    <>
      <Cabecera />
      <Login />
    </>
  );
}

export default App;

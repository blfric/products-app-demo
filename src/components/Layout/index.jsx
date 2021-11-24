import React, { useState } from 'react';
import { MdAddchart, MdDragIndicator } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import logo from '../../images/logo.png';

const Layout = (props) => {
  const [state, setstate] = useState({
    userName: 'User',
  });

  return (
    <main className='main-container'>
      <header className='header'>
        <span>
          <img src={logo}/>
          <p>Demo App</p>
        </span>
        <ul>
          <li>Nombre: {state.userName}</li>
          <li><button>Salir</button></li>
        </ul>
      </header>
      <aside className='sidebar'>
        <ul>
          <li>
            <MdDragIndicator />
            <p>Productos</p>
          </li>
          <li>
            <GoGear />
            <p>Configuración</p>
          </li>
        </ul>
      </aside>
      <section className='content'>
        {props.children}
      </section>
    </main>
  );
};

export default Layout;

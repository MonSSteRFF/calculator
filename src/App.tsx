import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Calculator from './Pages/Calculator';

function App() {
  const routes = [
    {
      path: '/',
      element: Calculator,
    },
  ];

  return (
    <>
      <main className={'container'}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              element={<route.element />}
              path={route.path}
              index={route.path === '/'}
            />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;

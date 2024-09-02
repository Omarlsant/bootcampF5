import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <Outlet /> {/* Renderiza las rutas hijas aquí */}
    </div>
  );
}

export default App;

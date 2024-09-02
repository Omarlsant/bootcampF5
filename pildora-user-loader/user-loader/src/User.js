import React from 'react';
import { useLoaderData } from 'react-router-dom';

function User() {
  // Usar el hook useLoaderData para acceder a los datos cargados
  const user = useLoaderData();

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
}

export default User;
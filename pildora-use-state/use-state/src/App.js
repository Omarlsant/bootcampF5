import React, { useState } from 'react';
import './App.css';

//CONTADOR
function Contador() {
  const [counter,setCounter] = useState(0);
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 10)}>
        INCREMENTAR
      </button>
      <button onClick={() => setCounter(counter - 10)}>
        DECREMENTAR
      </button>
    </div>
  );
}
export default Contador;

// function ActualizarTexto() {
//   const [text,setText] = useState('');
//   return (
//     <div className="App">
//       <input
//       type="text"
//       value={text}
//       onChange={(e) => setText(e.target.value)}  //cada vez que se escribe en el campo, el evento 'onChange' se activa y actualiza el estado con el valor ingresado.
//       />
//      <p>Texto actual: {text}</p>
//     </div>
//   )
// }
// export default ActualizarTexto;

// function Nombre() {
//   const [person, setPerson] = useState ({
//     name: "Ana Victoria",     // Objeto de datos
//   })
//   function handleNameChange() { // Aquí reemplazamos lo que teniamos
//     setPerson({
//       ...person,  //utilizando el estado que ya teniamos
//       name: "Ophelia"
//     })
//   }
//   return (
//     <div className="App">
//       <h1>{person.name}</h1>
//       <button onClick={handleNameChange}>
//         CAMBIAR
//       </button>
//     </div>
//   );
// }
// export default Nombre;

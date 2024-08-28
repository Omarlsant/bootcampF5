const URL_API = "http://localhost:3000/zoo";

// Almacenar los elementos en variables
const formulario = document.getElementById('formulario-animal');
const nombreInput = document.getElementById('nombre');
const dietaInput = document.getElementById('dieta');
const edadInput = document.getElementById('edad');
const alimentadoInput = document.getElementById('alimentado');
const botonCrear = document.getElementById('boton-crear');
const botonCancelar = document.getElementById('boton-cancelar');
const tabla = document.getElementById("tabla-animales");

let editMode = false;
let editAnimalId = null;

document.addEventListener('DOMContentLoaded', function() {
    // Ocultar el formulario al cargar la página
    formulario.style.display = 'none';

    // Mostrar el formulario al hacer clic en el botón "Crear Animal"
    botonCrear.addEventListener('click', function() {
        formulario.style.display = 'block';
        editMode = false;
        formulario.reset();
    });

    // Ocultar el formulario al hacer clic en el botón "Cancelar"
    botonCancelar.addEventListener('click', function() {
        formulario.style.display = 'none';
        formulario.reset();
    });
});

formulario.addEventListener('submit', async function(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const dieta = dietaInput.value;
    const edad = edadInput.value;
    const alimentado = alimentadoInput.checked;

    // Validación de los campos
    if (!nombre) {
        alert("No se ha colocado ningún nombre");
        return;
    }
    if (!dieta) {
        alert("No se ha colocado ninguna dieta");
        return;
    }
    if (!edad) {
        alert("No se ha colocado ninguna edad");
        return;
    }

    const animal = {
        name: nombre,
        diet: dieta,
        age: edad,
        feeded: alimentado
    };

    try {
        if (editMode) {
            await updateAnimal(editAnimalId, animal);
        } else {
            await createAnimal(animal);
        }
        const animals = await getAnimals();
        renderAnimals(animals);
        formulario.style.display = 'none';
        formulario.reset();
    } catch (error) {
        console.error('Ha ocurrido un error:', error);
    }
});

async function getAnimals() {
	const response = await fetch(URL_API, {
		method: "GET",
        headers: {
			"Content-Type": "application/json",
        },
    });
	const animals = await response.json();
    return animals;
}

// Obtener animal por id
async function getAnimalById(id) {
	const response = await fetch(`${URL_API}/${id}`);
	const animal = await response.json();
	return animal;
}

// CREATE - Crear un nuevo animal
async function createAnimal(animal) {
	const response = await fetch(URL_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(animal),
	});

	if (response.ok) {
		localStorage.setItem('message', 'El animal ha sido agregado con éxito');
		location.reload();
	} else {
		console.error("Error al agregar el animal");
	}
}

// UPDATE - Actualizar el animal
async function updateAnimal(id, updatedAnimal) {
	const response = await fetch(`${URL_API}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedAnimal),
	});

	if (response.ok) { // Si la actualización fue exitosa, recarga la lista de animales
		getAnimals().then(renderAnimals);
        localStorage.setItem('message', 'El animal ha sido actualizado');
        location.reload(); // Recargar la página
	} else {
		console.error("Error al actualizar el animal"); // Si ocurrió un error, lo muestra en la consola
	}
}

// DELETE - Eliminar un animal
async function deleteAnimal(id) {
	const response = await fetch(`${URL_API}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		localStorage.setItem('message', 'El animal ha sido eliminado');
		location.reload();
	} else {
		console.error("Error al eliminar el animal");
	}
}

// Función para mostrar los animales en el html
function renderAnimals(animals) {
	// Limpiar la tabla existente, excepto la fila de encabezado
	while (tabla.rows.length > 1) {
		tabla.deleteRow(1);
	}

	for (const animal of animals) {
		const fila = tabla.insertRow(-1);

		const celdaNombre = fila.insertCell(0);
		celdaNombre.textContent = animal.name;

		const celdaDieta = fila.insertCell(1);
		celdaDieta.textContent = animal.diet;

		const celdaEdad = fila.insertCell(2);
		celdaEdad.textContent = animal.age;

		const celdaAlimentado = fila.insertCell(3);
		const botonAlimentado = document.createElement('button');
		botonAlimentado.textContent = 'Alimentar';
		botonAlimentado.addEventListener('click', async () => {
			try {
				await updateAnimal(animal.id, { ...animal, feeded: true });
				location.getAnimals().then(renderAnimals);
			} catch (error) {
				console.error('Ha ocurrido un error:', error);
			}
		});
		celdaAlimentado.appendChild(botonAlimentado);

        // Agregar botón de Editar para cambiar el nombre, dieta y edad del animal
        const celdaEditar = fila.insertCell(4);
        const botonEditar = document.createElement('button');
		botonEditar.textContent = 'Editar';
		botonEditar.addEventListener('click', () => {
            nombreInput.value = animal.name;
            dietaInput.value = animal.diet;
            edadInput.value = animal.age;
            alimentadoInput.checked = animal.feeded;
            formulario.style.display = 'block';
            editMode = true;
            editAnimalId = animal.id;
        });
		celdaEditar.appendChild(botonEditar);

		const celdaEliminar = fila.insertCell(5);
		const botonEliminar = document.createElement('button');
		botonEliminar.textContent = 'Eliminar';
		botonEliminar.addEventListener('click', async () => {
			const confirmacion = confirm("¿Estás seguro de querer eliminar al animal?");
			if (confirmacion) {
				try {
					await deleteAnimal(animal.id);
					getAnimals().then(renderAnimals);
				} catch (error) {
					console.error('Ha ocurrido un error:', error);
				}
			}
		});
		celdaEliminar.appendChild(botonEliminar);

		if (animal.feeded) {
			celdaNombre.classList.add('feeded');
		}
	}
}

// Mostrar el mensaje después de que la página se recargue
window.onload = function() {
	const message = localStorage.getItem('message');
	if (message) {
		setTimeout(() => {
			alert(message);
			localStorage.removeItem('message'); // Eliminar el mensaje después de mostrarlo
		}, 400);
	}
}

// Obtener todos los animales y luego mostrarlos en el html
// Llama a getAnimals() y pasa el resultado a renderAnimals para que los muestre
getAnimals().then(renderAnimals);

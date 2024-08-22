// services.js

// URL de nuestra Api simulada
const baseUrl = "http://localhost:3000/zoo";

// READ - Obtener todos los animales
async function getAnimals() {
	const response = await fetch(baseUrl, {
		method: "GET", // Método HTTP GET para obtener datos
		headers: {
			"Content-Type": "application/json", // Indica que estamos trabajando con JSON
		},
	});
	const animals = await response.json(); // Convierte la respuesta en un objeto JSON
	return animals; // Retorna la lista de animales obtenida
}

// Obtener animal por id
async function getAnimalById(id) {
	const response = await fetch(`${baseUrl}/${id}`);
	const animal = await response.json();
	return animal;
}

// CREATE - Crear un nuevo animal
async function createAnimal(animal) {
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(animal),
	});

	if (response.ok) {
		getAnimals();
	} else {
		console.error("Error al agregar el animal");
	}
}

// UPDATE - Actualizar el estado "feeded"
async function updateAnimal(id) {
	const animal = await getAnimalById(id); // Obtiene el animal por su ID
	animal.feeded = !animal.feeded; // Invierte el estado de "feeded"

	const response = await fetch(`${baseUrl}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(animal),
	});

	if (response.ok) { // Si la actualización fue exitosa, recarga la lista de animales
		getAnimals();
	} else {
		console.error("Error al actualizar el animal"); // Si ocurrió un error, lo muestra en la consola
	}
}

// DELETE - Eliminar un animal
async function deleteAnimal(id) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		getAnimals();
	} else {
		console.error("Error al eliminar el animal");
	}
}

// Función para mostrar los animales en el html
function renderAnimals(animals) {
	const tabla = document.getElementById("tabla-animales");

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
		botonAlimentado.textContent = 'Alimentado';
		botonAlimentado.addEventListener('click', async () => {
			try {
				await updateAnimal(animal.id);
				getAnimals().then(renderAnimals);
			} catch (error) {
				console.error('Ha ocurrido un error:', error);
			}
		});
		celdaAlimentado.appendChild(botonAlimentado);

		const celdaEliminar = fila.insertCell(4);
		const botonEliminar = document.createElement('button');
		botonEliminar.textContent = 'Eliminar';
		botonEliminar.addEventListener('click', async () => {
			try {
				await deleteAnimal(animal.id);
				getAnimals().then(renderAnimals);
			} catch (error) {
				console.error('Ha ocurrido un error:', error);
			}
		});
		celdaEliminar.appendChild(botonEliminar);

		if (animal.feeded) {
			celdaNombre.classList.add('feeded');
		}
	}
}

// Obtener todos los animales y luego mostrarlos en el html
// Llama a getAnimals() y pasa el resultado a renderAnimals para que los muestre
getAnimals().then(renderAnimals);

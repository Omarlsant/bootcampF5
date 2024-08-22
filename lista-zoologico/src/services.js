const baseUrl = "http://localhost:3000/zoo";

// Almacenar los elementos en variables
const formulario = document.getElementById('formulario-animal');
const nombreInput = document.getElementById('nombre');
const dietaInput = document.getElementById('dieta');
const edadInput = document.getElementById('edad');
const alimentadoInput = document.getElementById('alimentado');
const botonCrear = document.getElementById('boton-crear');
const botonCancelar = document.getElementById('boton-cancelar');
const tabla = document.getElementById("tabla-animales");

formulario.addEventListener('submit', async function(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const dieta = dietaInput.value;
    const edad = edadInput.value;
    const alimentado = alimentadoInput.checked;
    const nuevoAnimal = {
        name: nombre,
        diet: dieta,
        age: edad,
        feeded: alimentado
    };
    try {
        await createAnimal(nuevoAnimal);
        getAnimals().then(renderAnimals);
    } catch (error) {
        console.error('Ha ocurrido un error:', error);
    }
});

botonCrear.addEventListener('click', function() {
    formulario.style.display = 'block'; // Muestra el formulario
});

botonCancelar.addEventListener('click', function() {
    formulario.style.display = 'none'; // Oculta el formulario
});

async function getAnimals() {
	const response = await fetch(baseUrl, {
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
# Proyecto CRUD de Zoológico

Este es un proyecto de CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar una base de datos de animales en un zoológico. El proyecto está implementado en JavaScript y utiliza una API local para realizar las operaciones CRUD.

## Características

- Crear un nuevo animal
- Leer y mostrar la lista de animales
- Actualizar la información de un animal
- Eliminar un animal

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Fetch API

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/tu-usuario/proyecto-crud-zoologico.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd proyecto-crud-zoologico
    ```

3. Asegúrate de tener un servidor local corriendo en `http://localhost:3000` con una API que maneje las rutas para los animales (`/zoo`).

## Uso

1. Abre el archivo `index.html` en tu navegador.
2. Haz clic en el botón "Crear Animal" para mostrar el formulario de creación.
3. Llena los campos del formulario y haz clic en "Agregar Animal" para crear un nuevo animal.
4. La lista de animales se mostrará en la tabla.
5. Puedes editar la información de un animal haciendo clic en el botón "Editar" y actualizando los campos en el formulario.
6. Puedes eliminar un animal haciendo clic en el botón "Eliminar" y confirmando la acción.

## Estructura del proyecto

- `index.html`: Archivo principal de la interfaz de usuario.
- `src/style.css`: Archivo de estilos CSS.
- `src/services.js`: Archivo JavaScript que contiene la lógica de las operaciones CRUD.
- `assets/favicon-32x32.png`: Archivo PNG que es el ícono en el navegador.

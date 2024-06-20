document.addEventListener('DOMContentLoaded', function() {
    const btnMostrarFormulario = document.getElementById('mostrarFormulario');
    const formularioTarea = document.getElementById('formularioTarea');
    const btnCerrar = document.getElementById('btnCerrar');
    const formTarea = document.getElementById('formTarea');
    const listaTareas = document.getElementById('listaTareas');
    let tareaAEditar = null;

    // Cargar tareas desde localStorage al iniciar
    cargarTareas();

    // Mostrar formulario al hacer clic en "Tarea nueva"
    btnMostrarFormulario.addEventListener('click', function() {
        formularioTarea.style.display = 'block';
    });

    // Cerrar formulario al hacer clic en "Cerrar"
    btnCerrar.addEventListener('click', function() {
        formularioTarea.style.display = 'none';
        formTarea.reset();
        tareaAEditar = null;
    });

    // Manejar el envío del formulario
    formTarea.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío del formulario por defecto

        const tituloTarea = document.getElementById('tituloTarea').value;
        const fechaTarea = document.getElementById('fechaTarea').value;
        const descripcionTarea = document.getElementById('descripcionTarea').value;

        if (tareaAEditar) {
            // Editar tarea existente
            tareaAEditar.querySelector('.titulo-tarea').textContent = `Título: ${tituloTarea}`;
            tareaAEditar.querySelector('.fecha-tarea').textContent = `Fecha: ${fechaTarea}`;
            tareaAEditar.querySelector('.descripcion-tarea').textContent = `Descripción: ${descripcionTarea}`;
            guardarTareas(); // Guardar cambios en localStorage
            tareaAEditar = null;
        } else {
            // Crear nueva tarea
            const nuevaTarea = crearTareaElement(tituloTarea, fechaTarea, descripcionTarea);
            listaTareas.appendChild(nuevaTarea);
            guardarTareas(); // Guardar nueva tarea en localStorage
        }

        formTarea.reset();
        formularioTarea.style.display = 'none';
    });

    // Función para crear un elemento de tarea con los botones de editar y borrar
    function crearTareaElement(titulo, fecha, descripcion) {
        const nuevaTarea = document.createElement('li');
        nuevaTarea.classList.add('tarea');

        const tareaTitulo = document.createElement('span');
        tareaTitulo.classList.add('titulo-tarea');
        tareaTitulo.textContent = `Título: ${titulo}`;

        const tareaFecha = document.createElement('span');
        tareaFecha.classList.add('fecha-tarea');
        tareaFecha.textContent = `Fecha: ${fecha}`;

        const tareaDescripcion = document.createElement('span');
        tareaDescripcion.classList.add('descripcion-tarea');
        tareaDescripcion.textContent = `Descripción: ${descripcion}`;

        const botones = document.createElement('div');
        botones.classList.add('botones-tarea');

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('editar');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', function() {
            document.getElementById('tituloTarea').value = titulo;
            document.getElementById('fechaTarea').value = fecha;
            document.getElementById('descripcionTarea').value = descripcion;
            formularioTarea.style.display = 'block';
            tareaAEditar = nuevaTarea;
        });

        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('borrar');
        btnBorrar.textContent = 'Borrar';
        btnBorrar.addEventListener('click', function() {
            listaTareas.removeChild(nuevaTarea);
            guardarTareas(); // Actualizar localStorage después de borrar la tarea
        });

        botones.appendChild(btnEditar);
        botones.appendChild(btnBorrar);

        nuevaTarea.appendChild(tareaTitulo);
        nuevaTarea.appendChild(tareaFecha);
        nuevaTarea.appendChild(tareaDescripcion);
        nuevaTarea.appendChild(botones);

        return nuevaTarea;
    }

    // Función para guardar las tareas en localStorage
    function guardarTareas() {
        const tareas = [];
        listaTareas.querySelectorAll('.tarea').forEach(tarea => {
            const titulo = tarea.querySelector('.titulo-tarea').textContent.replace('Título: ', '');
            const fecha = tarea.querySelector('.fecha-tarea').textContent.replace('Fecha: ', '');
            const descripcion = tarea.querySelector('.descripcion-tarea').textContent.replace('Descripción: ', '');
            tareas.push({ titulo, fecha, descripcion });
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Función para cargar las tareas desde localStorage
    function cargarTareas() {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.forEach(tarea => {
            const nuevaTarea = crearTareaElement(tarea.titulo, tarea.fecha, tarea.descripcion);
            listaTareas.appendChild(nuevaTarea);
        });
    }
});
  
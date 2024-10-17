function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
}

function ocultarFormulario() {
    document.getElementById('formulario').style.display = 'none';
}

function agregarInvitado(event) {
    event.preventDefault(); // Evita el envío del formulario y la recarga de la página

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const numAcompanantes = document.getElementById('num-acompanantes').value;

    // Crear una nueva fila
    const tableBody = document.getElementById('cuerpo-tabla');
    const newRow = document.createElement('tr');

    // Agregar contenido a la nueva fila
    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${numAcompanantes}</td>
            <button onclick="eliminarInvitado(this)">Eliminar</button>
        </td>
    `;

    // Añadir la nueva fila al cuerpo de la tabla
    tableBody.appendChild(newRow);

    // Ocultar el formulario y limpiar campos
    ocultarFormulario();
    document.querySelector('form').reset();
}

function eliminarInvitado(button) {
    // Eliminar la fila del invitado
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
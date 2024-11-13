import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { db } from "../scripts/xvdreams.js";

const auth = getAuth();

function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

async function getProveedor(id) {
    document.getElementById('loader').style.display = 'show';
    const docRef = doc(db, "proveedores", id);
    var proveedor = await getDoc(docRef);
    document.getElementById('loader').style.display = 'hidden';

    if (proveedor.exists()) {
        const iconHtml = '<i class="icofont-duotone icofont-location-alt" style="color: black;"></i> ';
        proveedor = proveedor.data();
        $('#proveedorNombre').text(proveedor.nombre);
        $('#razonSocial').text(proveedor.razonSocial);
        $('#categoriaPrincipal').text(proveedor.servicios[0].categoria);
        $('#telefono').text(proveedor.telefono);
        $('#direccion').html(iconHtml + proveedor.direccion);
        $('#descripcion').text(proveedor.descripcion || 'Descripción no disponible.');

        const listaServicios = $('#lista-productos');
        let itemsServicios = '';
        proveedor.servicios.forEach((servicio, index) => {
            const isLast = index === proveedor.servicios.length - 1;
            const imagenHtml = servicio.imagen ? `<img src="${servicio.imagen}" alt="${servicio.nombre}" class="servicio-imagen">` : '';
            itemsServicios += `
                <div class="lista-productos-item${isLast ? ' last-servicio' : ''}">
                    <div class="servicio-contenedor">
                        <div class="servicio-info">
                            <h5>${servicio.nombre}</h5>
                            <p>${servicio.descripcion}</p>
                            <strong>Precio:</strong> $${servicio.precio}
                        </div>
                        <div class="servicio-imagen-contenedor">
                            ${imagenHtml}
                        </div>
                    </div>
                    <div class="producto-item-footer">
                        <button class="btn btn-primary contratar-servicio-btn" data-servicio-id="${servicio.id}" data-servicio-nombre="${servicio.nombre}">Contratar Servicio</button>
                    </div>
                </div>
            `;
        });
        listaServicios.html(itemsServicios);
        new SimpleBar(document.getElementById('lista-productos'));

        // Initialize SimpleBar on the #lista-productos element
        $("#loader").fadeOut('slow');

        // Event listener for the contratar button
        $(document).on('click', '.contratar-servicio-btn', function() {
            const servicioId = $(this).data('servicio-id');
            const nombreServicio = $(this).data('servicio-nombre');
            console.log(nombreServicio)
            Swal.fire({
                icon: 'info',
                title: 'Atención',
                text: 'Usted va a contratar el servicio ' + nombreServicio,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#5a5a5a',
                confirmButtonText: 'Contratar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    contratarServicio(servicioId);
                }
            });
        });

        async function contratarServicio(servicioId) {
            const user = auth.currentUser;

            const userId = user.uid;

            // Update Firebase
            const servicioContratadoId = `${id}-${servicioId}`;
            const docUserRef = doc(db, "Users", userId);
            const userDoc = await getDoc(docUserRef);
            if (userDoc.exists()) {
                let serviciosContratados = userDoc.data().serviciosContratados || [];
                serviciosContratados.push({
                    id: servicioContratadoId,
                    estado: 'pendiente pago'
                });
            
                await updateDoc(docUserRef, {
                    serviciosContratados: serviciosContratados
                }).then(() => {
                    $('#contratarModal').modal('show');
                }).catch((error) => {
                    console.error('Error updating Firebase:', error);
                });
            } else {
                console.error("Diccionario de User(" + userId  + ") no existe");
            }
        }

        $("#cardProveedor").fadeIn('slow');
    } else {
        mostrarError('Proveedor no encontrado.');
    }
}

function mostrarError(mensaje) {
    $('#mensajeError').text(mensaje).show();
}

$(document).ready(function() {
    $("#cardProveedor").hide();
    $("#loader").show();
    const id = obtenerParametroURL('id');
    if (id) {
        getProveedor(id);
    } else {
        mostrarError('ID del proveedor no especificado.');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('div-calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: '60%'
    });
    calendar.render();
});
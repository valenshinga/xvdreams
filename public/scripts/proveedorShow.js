import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from "../xvdreams.js";

function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}
async function getProveedor(id) {
    const docRef = doc(db, "proveedores", id);
    var proveedor = await getDoc(docRef);

    if (proveedor.exists()) {
        proveedor = proveedor.data()
        $('#proveedorNombre').text(proveedor.nombre);
        $('#razonSocial').text(proveedor.razonSocial);
        $('#categoriaPrincipal').text(proveedor.servicios[0].categoria);
        $('#telefono').text(proveedor.telefono);
        // $('#email').text(proveedor.contacto.email);
        $('#direccion').text(proveedor.direccion);
        $('#descripcion').text(proveedor.descripcion || 'Descripción no disponible.');

        const listaServicios = $('#listaServicios');
        proveedor.servicios.forEach(servicio => {
            listaServicios.append(`
                <li class="list-group-item">
                    <h5>${servicio.nombre}</h5>
                    <p>${servicio.descripcion}</p>
                    <strong>Precio:</strong> $${servicio.precio}
                </li>
            `);
        });

        if (proveedor.imagenes && proveedor.imagenes.length > 0) {
            proveedor.imagenes.forEach((imagen, index) => {
                const activeClass = index === 0 ? 'active' : '';
                $('#carouselExample .carousel-inner').append(`
                    <div class="carousel-item ${activeClass}">
                        <img src="${imagen}" class="d-block w-100" alt="Imagen del Servicio">
                    </div>
                `);
            });
        }
        $("#loader").fadeOut('slow');
        $("#cardProveedor").fadeIn('slow')
    } else {
        mostrarError('Proveedor no encontrado.');
    }
}

function mostrarError(mensaje) {
    $('#mensajeError').text(mensaje).show();
}

$(document).ready(function() {
    $("#cardProveedor").hide()
    $("#loader").show()
    const id = obtenerParametroURL('id');
    if (id) {
        getProveedor(id);
    } else {
        mostrarError('ID del proveedor no especificado.');
    }
});
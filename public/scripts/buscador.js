import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from "../scripts/xvdreams.js";

$(document).ready(function () {
    $("#loader").hide()
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    async function getFirestoreData(filter, searchText) {
        let q;

        if (filter === "nombre" && searchText) {
            q = query(collection(db, "proveedores"), where("nombre", "==", searchText));
        } else if (filter === "categoriaPrincipal" && searchText) {
            q = query(collection(db, "proveedores"), where("categoriaPrincipal", "==", searchText));
        } else if (filter === "contacto.direccion" && searchText) {
            q = query(collection(db, "proveedores"), where("contacto.direccion", "==", searchText));
        } else if (filter === "razonSocial") {
            q = query(collection(db, "proveedores"), where("razonSocial", "==", true));
        } else {
            // Si no hay filtros o texto, obtener todos los documentos
            q = query(collection(db, "proveedores"));
        }

        try {
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error al obtener documentos de Firestore: ", error);
            return [];
        }
    }

    $('#search-btn').on('click', async function () {
        $("#loader").show()
        const filter = $('#filter-select').val();
        const searchText = removeAccents($('#search-input').val().toLowerCase());
        const providerList = $('#provider-list');

        providerList.empty();

        let filteredProviders = await getFirestoreData(filter, searchText);

        // Renderizar las cards de los proveedores filtrados
        filteredProviders.forEach(provider => {
            const cardHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="${provider.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${provider.nombre}</h5>
                        <p class="card-text">Servicio: ${provider.servicios[0].categoria}</p>
                        <p class="card-text">Ciudad: ${provider.direccion}</p>
                        <p class="card-text">Razón Social: ${provider.razonSocial}</p>
                        <button type="button" class="btnMostrarInfo btn btn-info button-xvdreams" data-id="${provider.id}">Más información</button>
                    </div>
                </div>
            </div>
            `;
            providerList.append(cardHTML);
        });

        // Manejar el evento click para redireccionar a la página del proveedor
        $('.btnMostrarInfo').on('click', function () {
            const id = $(this).data('id');
            window.location.href = `proveedor.html?id=${id}`;
        });
        $("#loader").fadeOut(400)
    });
});
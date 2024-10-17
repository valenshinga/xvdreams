import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from "../scripts/xvdreams.js";

$(document).ready(function() {
    // Simular carga de proveedores desde el archivo data.json
    const proveedores = [
        { "id": 1, "nombre": "Pepe Argento", "razonSocial": "Pepe's", "categoriaPrincipal": "Comida", "balance": 100000 },
        { "id": 2, "nombre": "Juan Perez", "razonSocial": "DJ Magic", "categoriaPrincipal": "DJ", "balance": 80000 },
        { "id": 3, "nombre": "María López", "razonSocial": "Fotografía Momentos", "categoriaPrincipal": "Fotografia", "balance": 120000 },
        { "id": 4, "nombre": "Laura Martínez", "razonSocial": "Eventos Martínez", "categoriaPrincipal": "Salon", "balance": 150000 },
        { "id": 5, "nombre": "Carlos Ruiz", "razonSocial": "Diseño Fiesta", "categoriaPrincipal": "Diseño", "balance": 90000 }
    ];

    // Llenar el select de proveedores
    proveedores.forEach(proveedor => {
        $('#providerSelect').append(`<option value="${proveedor.id}">${proveedor.nombre} (${proveedor.razonSocial})</option>`);
    });

    // Manejo del formulario de publicación de productos
    $('#productForm').on('submit', function(e) {
        e.preventDefault();

        // Obtener datos del formulario
        const providerId = $('#providerSelect').val();
        const productName = $('#productName').val();
        const productDescription = $('#productDescription').val();
        const productPrice = $('#productPrice').val();
        const productImage = $('#productImage')[0].files[0];

        // Buscar proveedor seleccionado
        const proveedor = proveedores.find(p => p.id == providerId);

        // Crear un URL para la imagen cargada
        const imageUrl = URL.createObjectURL(productImage);

        // Crear producto
        const newProduct = {
            nombre: productName,
            descripcion: productDescription,
            precio: productPrice,
            imagen: imageUrl,
            proveedor: proveedor
        };

        // Limpiar el formulario
        $(this)[0].reset();

        // Mostrar el producto en la lista con 3 cards por fila
        $('#productList').append(`
            <div class="col">
                <div class="card h-100">
                    <img src="${newProduct.imagen}" class="card-img-top" alt="${newProduct.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${newProduct.nombre}</h5>
                        <p class="card-text">${newProduct.descripcion}</p>
                        <p><strong>Precio:</strong> $${newProduct.precio}</p>
                        <p><strong>Proveedor:</strong> ${newProduct.proveedor.nombre} (${newProduct.proveedor.razonSocial})</p>
                    </div>
                </div>
            </div>
        `);
    });
});
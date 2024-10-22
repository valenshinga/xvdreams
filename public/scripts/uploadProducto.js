import { collection, addDoc, updateDoc, arrayUnion, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { db, storage } from "../scripts/xvdreams.js";

$(document).ready(function() {
	// Obtener el userId desde localStorage
	const userId = localStorage.getItem('userID');
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
		let imageUrl = "";

		if (productImage) {
			const userFolderRef = ref(storage, `user_images/${userId}/${productImage.name}`);

			uploadBytes(userFolderRef, productImage).then((snapshot) => {
				console.log('Imagen subida con éxito:', snapshot);
				
				// Obtener URL de descarga de la imagen subida
				getDownloadURL(snapshot.ref).then((downloadURL) => {
					console.log('URL de la imagen:', downloadURL);
					imageUrl = downloadURL;

					// Agregar el producto una vez que se tenga la URL de la imagen
					const proveedor = proveedores.find(p => p.id == providerId);

					const newProduct = {
						categoria: 'Fotografia',
						nombre: productName,
						descripcion: productDescription,
						precio: productPrice,
						imagen: imageUrl,
					};

					agregarProducto(newProduct);
					// Mostrar el producto en la lista
					$('#productList').append(`
						<div class="col">
							<div class="card h-100">
								<img src="${newProduct.imagen}" class="card-img-top" alt="${newProduct.nombre}">
								<div class="card-body">
									<h5 class="card-title">${newProduct.nombre}</h5>
									<p class="card-text">${newProduct.descripcion}</p>
									<p><strong>Precio:</strong> $${newProduct.precio}</p>
									<p><strong>Proveedor:</strong> ${proveedor.nombre} (${proveedor.razonSocial})</p>
								</div>
							</div>
						</div>
					`);
					// Limpiar el formulario
					$('#productForm')[0].reset();
				});
			}).catch((error) => {
				console.error('Error al subir la imagen:', error);
			});
		} else {
			alert("Por favor selecciona una imagen");
		}
	});

	async function agregarProducto(newProduct) {
		try {
			const userId = "3MATIqDPanRzzQ08F9kL"; //Id de documento hardcoded
	
			const userDocRef = doc(db, "proveedores", userId);
			
			await updateDoc(userDocRef, {
				servicios: arrayUnion(newProduct)
			});
	
			console.log("Producto agregado con éxito al campo servicios");
		} catch (e) {
			console.error("Error al agregar producto al campo servicios: ", e);
		}
	}
});

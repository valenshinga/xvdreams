import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKt7HeL4fjrFqEKwdWd5gByRS2YL8BAfs",
    authDomain: "xvdreams-web-app.firebaseapp.com",
    projectId: "xvdreams-web-app",
    storageBucket: "xvdreams-web-app.appspot.com",
    messagingSenderId: "749522060303",
    appId: "1:749522060303:web:b99c6c1acd1c8acb128f7a",
    measurementId: "G-9LF2MYF720"
};
console.log('Hola firestores')
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// async function agregarProveedor(db) {
//     try {
//         const response = await fetch('/public/data.json');
//         console.log(response)
//         const contentType = response.headers.get("content-type");

//         if (contentType && contentType.includes("application/json")) {
//             const data = await response.json();
//             console.log(data);

//             // Agrega los datos de los proveedores uno por uno
//             for (const proveedor of data.proveedores) {
//                 const docRef = await addDoc(collection(db, "proveedores"), {
//                     nombre: proveedor.nombre,
//                     direccion: proveedor.contacto.direccion,
//                     telefono: proveedor.contacto.telefono,
//                     razonSocial: proveedor.razonSocial,
//                     balance: proveedor.balance,
//                     servicios: proveedor.servicios
//                 });
//                 console.log("Documento agregado con ID: ", docRef.id);
//             }
//         } else {
//             console.error('Respuesta no es JSON:', contentType);
//         }
//     } catch (e) {
//         console.error("Error al agregar documento: ", e);
//     }
// }


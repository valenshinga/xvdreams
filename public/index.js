import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();
const logoutContainer = document.getElementById('logoutContainer');

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario está autenticado
        logoutContainer.style.display = 'block'; // Muestra el botón de logout
    } else {
        // Usuario no está autenticado
        logoutContainer.style.display = 'none'; // Oculta el botón de logout
    }
});

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { app } from "./firebaseconfig.js"

const auth = getAuth();

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("Logout successful");
        window.location.href = 'login.html'; // Redirige a la página de inicio de sesión.
    }).catch((error) => {
        console.error("Error during logout:", error);
    });
});
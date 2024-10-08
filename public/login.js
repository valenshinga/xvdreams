import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login exitoso
            
            window.location.href = "index.html"; // Redirigir a la página principal
        })
        .catch((error) => {
            let errorMessage;
            console.log(error.code); // Mostrar el código de error en la consola para depuración

            // Manejo de diferentes tipos de error de autenticación
            switch (error.code) {
                case 'auth/invalid-credential':
                    errorMessage = 'Credenciales inválidas. Revisa el correo o la contraseña.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No existe ninguna cuenta con este correo.';
                    break;
               
                case 'auth/too-many-requests':
                    errorMessage = 'Has intentado demasiadas veces. Intenta de nuevo más tarde.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Error de red. Verifica tu conexión e inténtalo nuevamente.';
                    break;
                default:
                    errorMessage = 'Ocurrió un problema al iniciar sesión. Inténtalo más tarde.';
            }
            // Mostrar el mensaje de error en el contenedor HTML
            const errorDiv = document.getElementById('error-message');
            errorDiv.innerText = errorMessage;
            errorDiv.style.display = 'block'; // Mostrar el contenedor de error
        });
});

// Alternar visibilidad de la contraseña
const togglePasswordButton = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

togglePasswordButton.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Cambiar el texto del botón
    togglePasswordButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();

// Función para validar la contraseña
const validatePassword = (password) => {
    const minLength = 6;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    if (password.length < minLength) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!hasLetters || !hasNumbers) {
        return "La contraseña debe contener letras y números.";
    }
    return null; // Sin errores
};

// Función para mostrar mensajes de error
const showError = (message) => {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block'; // Mostrar el div
};

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Limpiar el mensaje de error previo
    showError(''); 

    // Validar la contraseña
    const passwordError = validatePassword(password);
    if (passwordError) {
        showError(passwordError); // Mostrar el mensaje de error
        return; // Detener el envío del formulario
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro exitoso
            // Redirigir a la página de inicio de sesión
            window.location.href = "login.html"; // Cambia según sea necesario
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Mostrar un mensaje de error amigable
            let friendlyMessage;
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    friendlyMessage = "El correo electrónico ya está en uso. Por favor, intenta con otro.";
                    break;
                case 'auth/invalid-email':
                    friendlyMessage = "El correo electrónico ingresado no es válido.";
                    break;
                case 'auth/operation-not-allowed':
                    friendlyMessage = "La creación de cuentas está deshabilitada. Inténtalo más tarde.";
                    break;
                case 'auth/weak-password':
                    friendlyMessage = "La contraseña es demasiado débil. Asegúrate de que tenga al menos 6 caracteres y contenga letras y números.";
                    break;
                default:
                    friendlyMessage = "Ocurrió un problema al registrarte. Inténtalo más tarde.";
                    break;
            }

            showError(friendlyMessage); // Mostrar el mensaje amigable
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

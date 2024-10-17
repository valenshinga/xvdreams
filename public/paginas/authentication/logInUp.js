import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js'

const firebaseConfig = {
	apiKey: "AIzaSyBKt7HeL4fjrFqEKwdWd5gByRS2YL8BAfs",
	authDomain: "xvdreams-web-app.firebaseapp.com",
	projectId: "xvdreams-web-app",
	storageBucket: "xvdreams-web-app.appspot.com",
	messagingSenderId: "749522060303",
	appId: "1:749522060303:web:b99c6c1acd1c8acb128f7a",
	measurementId: "G-9LF2MYF720"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const login = document.getElementById('login-form')

if (login){
	login.addEventListener('submit', (event) => {
		event.preventDefault();

		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				window.location.href = "../../index.html";
			})
			.catch((error) => {
				let errorMessage;

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
}

// Alternar visibilidad de la contraseña
const togglePasswordButton = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
if (togglePasswordButton){
	togglePasswordButton.addEventListener('click', () => {
		const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
		passwordInput.setAttribute('type', type);
		
		// Cambiar el texto del botón
		togglePasswordButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
	});
}



// Registrarse
const validatePassword = (password) => {
	const minLength = 6;
	const hasLetters = /[a-zA-Z]/.test(password);
	const hasNumbers = /\d/.test(password);
	const hasCapitalLetter = /[A-Z]/.test(password);
	
	if (password.length < minLength) {
		return "La contraseña debe tener al menos 6 caracteres.";
	}
	if (!hasCapitalLetter)
		return "La contraseña debe de contener una Mayúscula"
	if (!hasLetters || !hasNumbers) {
		return "La contraseña debe contener letras y números.";
	}
	return null; // Sin errores
};

const showError = (message) => {
	const errorMessageDiv = document.getElementById('error-message');
	errorMessageDiv.textContent = message;
	errorMessageDiv.style.display = 'block'; // Mostrar el div
};

const register = document.getElementById('register-form')
if (register){
	register.addEventListener('submit', (event) => {
		event.preventDefault();

		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		showError(''); 

		const passwordError = validatePassword(password);
		if (passwordError) {
			showError(passwordError); // Mostrar el mensaje de error
			return; // Detener el envío del formulario
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await setDoc(doc(db, "users", user.uid), {
					email: user.email
				});

				window.location.href = "../../index.html"; // Cambia según sea necesario
			})
			.catch((error) => {
				const errorCode = error.code;

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

				showError(friendlyMessage);
			});
	});
}
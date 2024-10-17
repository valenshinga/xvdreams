import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

const firebaseConfig = {
	apiKey: "AIzaSyBKt7HeL4fjrFqEKwdWd5gByRS2YL8BAfs",
	authDomain: "xvdreams-web-app.firebaseapp.com",
	projectId: "xvdreams-web-app",
	storageBucket: "xvdreams-web-app.appspot.com",
	messagingSenderId: "749522060303",
	appId: "1:749522060303:web:b99c6c1acd1c8acb128f7a",
	measurementId: "G-9LF2MYF720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const paginasIgnoradasAlAutenticar = [
	'login.html',
	'register.html'
]

const logoutButton = document.getElementById('logoutButton');
if(logoutButton){
	logoutButton.addEventListener('click', () => {
		signOut(auth).then(() => {
			window.location.href = '../paginas/authentication/login.html'; // Redirige a la página de inicio de sesión.
		}).catch((error) => {
			console.error("Error during logout:", error);
		});
	});
}

const logoutContainer = document.getElementById('logoutContainer');
const currentPath = window.location.pathname.split('/').pop();

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
	if (!paginasIgnoradasAlAutenticar.includes(currentPath)) {
		if (user) {
			if (logoutContainer)
				logoutContainer.style.display = 'block';
		} else {
			if (logoutContainer)
				logoutContainer.style.display = 'none';
			window.location.href = '/public/paginas/authentication/login.html';
		}
	}
});
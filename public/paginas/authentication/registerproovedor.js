// Inicializa Firestore y Auth desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Configuración Firebase
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

// Función para mostrar un mensaje de error amigable
function showFriendlyError(error) {
    let errorMessage;
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            errorMessage = 'El correo electrónico ya está en uso.';
            break;
        case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido.';
            break;
        case 'auth/weak-password':
            errorMessage = 'La contraseña es muy débil. Debe tener al menos 6 caracteres, incluyendo una mayúscula.';
            break;
    
        default:
                    errorMessage = Error; {error.message};
            break;
    }
    document.getElementById('errorMessage').textContent = errorMessage;
    document.getElementById('errorMessage').style.display = 'block';
}

const passwordInput = document.getElementById('password');
const passwordRequirements = document.getElementById('passwordRequirements');

// Mostrar los requisitos al pasar el mouse
passwordInput.addEventListener('mouseenter', () => {
    passwordRequirements.style.display = 'inline';
});

// Ocultar los requisitos al quitar el mouse
passwordInput.addEventListener('mouseleave', () => {
    passwordRequirements.style.display = 'none';
});
const togglePasswordButton = document.getElementById('toggle-password');





// Navegación de pasos
function showStep(step) {
    document.querySelectorAll('.step').forEach(stepElement => stepElement.style.display = 'none');
    document.getElementById('step-' + step).style.display = 'block';
}

function validateStep(currentStep) {
    const step = document.getElementById('step-' + currentStep);
    const inputs = step.querySelectorAll('input[required]');
    let allValid = true;

    inputs.forEach(input => {
        const valid = input.value.trim();
        input.classList.toggle('is-invalid', !valid);
        input.classList.toggle('is-valid', valid);
        allValid = allValid && valid;
    });

    const errorMessage = document.getElementById('errorMessage');
    if (allValid) {
        errorMessage.style.display = 'none';
        showStep(currentStep + 1);
    } else {
        errorMessage.textContent = "Por favor completa todos los campos correctamente.";
        errorMessage.style.display = 'block';
    }
}

// Validación en tiempo real
const validationFunctions = {
    email: validateEmail,
    password: validatePassword,
    telefono: validatePhoneNumber,
    cuil: validateCUIL
};

Object.keys(validationFunctions).forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', validationFunctions[id]);
});

// Validar Email
function validateEmail() {
    validateField('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'emailFeedback');
}

// Validar Contraseña
function validatePassword() {
    validateField('password', /^(?=.*[A-Z]).{6,}$/, 'passwordFeedback');
}

// Validar Teléfono
function validatePhoneNumber() {
    validateField('telefono', /^[0-9]{10}$/, 'telefonoFeedback');
}

// Validar CUIL
function validateCUIL() {
    validateField('cuil', /^[0-9]{11}$/, 'cuilFeedback');
}

// Función general de validación de campos
function validateField(id, regex, feedbackId) {
    const input = document.getElementById(id);
    const feedback = document.getElementById(feedbackId);
    const isValid = regex.test(input.value);

    input.classList.toggle('is-valid', isValid);
    input.classList.toggle('is-invalid', !isValid);
    feedback.textContent = isValid ? '✓' : '✖';
    feedback.style.color = isValid ? '#28a745' : '#dc3545';
    feedback.style.display = 'inline';
}

// Mostrar/Ocultar Contraseña
document.getElementById("toggle-password").addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password");
    const isPasswordVisible = passwordInput.type === "text";

    passwordInput.type = isPasswordVisible ? "password" : "text";
    toggleButton.textContent = isPasswordVisible ? "Mostrar" : "Ocultar";
});

// Manejo del formulario de registro de proveedores
document.getElementById('providerRegisterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        telefono: document.getElementById('telefono').value,
        provincia: document.getElementById('provincia').value,
        aliasMp: document.getElementById('aliasMp').value,
        localidad: document.getElementById('localidad').value,
        cuil: document.getElementById('cuil').value,
        calleNumero: document.getElementById('calleNumero').value,
        role: 'provider'
    };

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "Users", userCredential.user.uid), formData);

        window.location.href = '../home.html';
    } catch (error) {
        showFriendlyError(error);
    }
});

// Asignar funciones de paso a window
window.validateStep = validateStep;
window.showStep = showStep;

// Navegación entre pasos
['nextButton1', 'nextButton2', 'nextButton3'].forEach((buttonId, index) => {
    document.getElementById(buttonId).addEventListener('click', () => validateStep(index + 1));
});
['prevButton1', 'prevButton2', 'prevButton3'].forEach((buttonId, index) => {
    document.getElementById(buttonId).addEventListener('click', () => showStep(index + 1));
});


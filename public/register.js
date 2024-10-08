import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered successfully
            const user = userCredential.user;
            alert("User registered: " + user.email);
            // Redirect to login or home page
            window.location.href = "login.html"; // Change as needed
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

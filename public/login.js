import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in successfully
            const user = userCredential.user;
            alert("User logged in: " + user.email);
            // Redirect to home page
            window.location.href = "index.html"; // Change as needed
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

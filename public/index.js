import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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

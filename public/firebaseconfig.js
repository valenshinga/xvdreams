// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



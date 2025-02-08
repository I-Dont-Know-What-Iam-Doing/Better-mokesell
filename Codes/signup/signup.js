import { signUpUser } from "./firebase-auth.js";

document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (password.length < 6) {
        errorMessage.innerText = "Password must be at least 6 characters.";
        return;
    }

    // Call Firebase Auth & Firestore function
    signUpUser(email, password, username)
        .then((user) => {
            alert("Sign-Up Successful! Redirecting to Login...");
            window.location.href = "/Codes/login/login.html"; // Redirect to Login Page
        })
        .catch((error) => {
            errorMessage.innerText = error.message;
        });
});
import { loginUser } from "../auth/login-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        errorMessage.innerText = ""; // Clear previous errors

        try {
            // ✅ Login user
            await loginUser(email, password);

            alert("✅ Login Successful! Redirecting to Homepage...");
            console.log("Redirecting to:", window.location.origin + "/index.html");

            setTimeout(() => {
                window.location.replace("/index.html");
            }, 500); // Delay to ensure smooth transition
        } catch (error) {
            errorMessage.innerText = `❌ ${error.message}`;
        }
    });
});
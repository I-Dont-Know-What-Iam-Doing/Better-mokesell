import { signUpUser } from "./firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const termsCheckbox = document.getElementById("terms");
    const signupButton = document.getElementById("signup-btn");
    const errorMessage = document.getElementById("error-message");
    const checkboxError = document.getElementById("checkbox-error"); // Ensure this exists

    // ✅ Enable/Disable sign-up button based on checkbox
    termsCheckbox.addEventListener("change", () => {
        signupButton.disabled = !termsCheckbox.checked;
        checkboxError.innerText = ""; // Remove error when checked
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        errorMessage.innerText = ""; // Clear previous errors
        checkboxError.innerText = ""; // Clear previous checkbox error

        let errors = [];

        // ✅ Check if Terms & Conditions checkbox is checked
        if (!termsCheckbox.checked) {
            checkboxError.innerText = "❌ You must agree to the Terms & Conditions to sign up.";
            return;
        }

        // ✅ Check if password is at least 6 characters
        if (password.length < 6) {
            errors.push("❌ Password must be at least 6 characters.");
        }

        // ✅ Display errors if any
        if (errors.length > 0) {
            errorMessage.innerHTML = errors.join("<br>");
            return;
        }

        try {
            // ✅ Sign up user
            await signUpUser(email, password, username);

            alert("✅ Sign-Up Successful! Redirecting to Login...");
            window.location.href = "/Codes/login/login.html"; // Redirect to Login Page
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                errorMessage.innerText = "❌ This email is already in use. Try logging in.";
            } else {
                errorMessage.innerText = `❌ ${error.message}`;
            }
        }
    });
});
import { loginUser } from "../auth/login-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM fully loaded.");

    const form = document.getElementById("login-form");
    if (!form) {
        console.error("❌ ERROR: #login-form NOT found.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // ⛔ Prevent page refresh
        console.log("✅ Login form submitted.");

        await loginHandler();
    });
});

async function loginHandler() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    errorMessage.innerText = ""; // ✅ Clear previous errors

    if (!email || !password) {
        console.warn("⚠️ Missing email or password.");
        showPopup("Please enter both email and password.", "error");
        return;
    }

    try {
        console.log("🔄 Attempting login with:", { email, password });

        const user = await loginUser(email, password);
        console.log("✅ Login successful! User:", user);

        showPopup("Login Successful! Redirecting...", "success");

        setTimeout(() => {
            console.log("🔄 Redirecting to index.html...");
            window.location.href = "/index.html"; // ✅ Redirect to homepage
        }, 1000);
    } catch (error) {
        console.error("❌ Login Failed:", error);

        let message = "An error occurred. Please try again.";
        if (error.code === "auth/user-not-found") {
            message = "❌ No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
            message = "❌ Incorrect password. Try again.";
        } else if (error.code === "auth/invalid-email") {
            message = "❌ Invalid email format.";
        }

        showPopup(message, "error");
    }
}

// ✅ Show Success/Error Pop-up
function showPopup(message, type) {
    let popup = document.getElementById(type === "error" ? "error-popup" : "success-popup");
    let overlay = document.getElementById("overlay");

    if (!popup || !overlay) {
        console.error("❌ ERROR: Popup elements not found.");
        return;
    }

    popup.innerText = message;
    popup.style.display = "block";
    overlay.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
        overlay.style.display = "none";
    }, 2000);
}
import { app, db } from "../database/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 DOM fully loaded and parsed.");

    const signUpForm = document.getElementById("signup-form");

    if (!signUpForm) {
        console.error("❌ ERROR: #signup-form NOT found in DOM.");
        return;
    }

    // ✅ Ensure the submit event is attached and prevent refresh
    signUpForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // ⛔ STOP PAGE REFRESH

        console.log("✅ Sign-up form submitted.");
        await signUpHandler();
    });
});

async function signUpHandler() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const username = document.getElementById("username").value.trim();

    if (!email || !password || !username) {
        console.warn("⚠️ Validation failed: Missing fields.");
        showPopup("Please fill in all fields.", "error");
        return;
    }

    try {
        console.log("🔄 Creating user...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("✅ User created successfully:", user);

        await saveUserData(user.uid, username, email, password);
        console.log("✅ User data saved to Firestore.");

        showPopup("Account created successfully!", "success");

        setTimeout(() => {
            window.location.href = "/Codes/login/login.html";
        }, 2000);

    } catch (error) {
        console.error("❌ Sign-Up Error:", error);
        showPopup(error.message, "error");
    }
}

async function saveUserData(uid, username, email, rawPassword) {
    try {
        console.log("🔄 Saving user data to Firestore...");
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
            username: username,
            email: email,
            password: rawPassword, // ⚠️ Stored as plaintext for now
            status: "member",
            points: 0,
            createdAt: new Date().toISOString()
        });
        console.log("✅ Firestore document successfully written!");
    } catch (error) {
        console.error("❌ Firestore Error:", error);
        throw error;
    }
}

// ✅ Show Success/Error Pop-up
function showPopup(message, type) {
    let popup = document.getElementById(type === "error" ? "error-popup" : "success-popup");
    let overlay = document.getElementById("overlay");

    if (!popup || !overlay) {
        console.error("❌ ERROR: Popup elements not found in the DOM.");
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

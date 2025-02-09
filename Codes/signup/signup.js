import { app, db } from "../database/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById("signup-btn");
    if (signUpButton) {
        signUpButton.addEventListener("click", function (event) {
            event.preventDefault();
            signUpHandler();
        });
    } else {
        console.error("Error: #signup-btn not found in DOM.");
    }
});

async function signUpHandler() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const username = document.getElementById("username").value.trim();

    if (!email || !password || !username) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const user = await signUpUser(email, password, username, password);
        alert("Account created successfully!");
        window.location.href = "/Codes/login/login.html"; // Redirect after signup
    } catch (error) {
        console.error("Sign-Up Error:", error.message);
        alert(error.message);
    }
}

export function signUpUser(email, password, username, rawPassword) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);

            // ✅ Store user data in Firestore (INCLUDING PASSWORD)
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                username: username,
                email: email,
                password: rawPassword, // ⚠️ Password stored as plain text
                status: "member",  // ✅ Default user status
                points: 0,         // ✅ Default points system
                createdAt: new Date().toISOString()
            });

            return user;
        })
        .catch((error) => {
            console.error("Sign-Up Error:", error);
            throw error;
        });
}

export { auth };

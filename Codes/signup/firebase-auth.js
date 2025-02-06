// firebase-auth.js
import { app } from "../database/firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const auth = getAuth(app);
const database = getDatabase(app);

// Function to handle user sign-up
export function signUpUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);

            // Store additional user data in Firebase Realtime Database
            return set(ref(database, "users/" + user.uid), {
                username: username,
                email: email,
                createdAt: new Date().toISOString()
            }).then(() => user);
        })
        .catch((error) => {
            console.error("Sign-Up Error:", error);
            throw error;
        });
}

// Function to handle user login
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            return userCredential.user;
        })
        .catch((error) => {
            console.error("Login Error:", error);
            throw error;
        });
}

// Function to handle user logout
export function logoutUser() {
    return signOut(auth)
        .then(() => console.log("User logged out"))
        .catch((error) => console.error("Logout Error:", error));
}

export { auth };

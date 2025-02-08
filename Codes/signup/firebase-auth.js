import { app, db } from "../database/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const auth = getAuth(app);

export function signUpUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);

            // ✅ Store user data in Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                username: username,
                email: email,
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
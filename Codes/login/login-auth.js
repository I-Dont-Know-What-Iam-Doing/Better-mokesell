import { auth, db } from "../database/firebase.js";


import { 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

export async function loginUser(email, password) {
    try {
        console.log("🔄 Signing in user with Firebase...");

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("✅ Firebase login successful!", user);

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        let username = user.displayName || "User"; 

        if (userDoc.exists()) {
            username = userDoc.data().username || username;
            console.log("✅ Firestore User Data:", userDoc.data());
        }

        localStorage.setItem("loggedInUser", JSON.stringify({
            email: user.email,
            uid: user.uid,
            username: username
        }));

        console.log("✅ User session stored in LocalStorage.");
        return user;
    } catch (error) {
        console.error("❌ Login Error:", error.code, error.message);
        throw error;
    }
}
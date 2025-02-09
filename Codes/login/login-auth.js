import { auth, db } from "../database/firebase.js";
import { 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

export async function loginUser(email, password) {
    try {
        // ✅ Sign in user (Firebase verifies password internally)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("✅ User Logged In:", user);

        // ✅ Fetch additional user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        let username = user.displayName || "User"; // Default to displayName or fallback

        if (userDoc.exists()) {
            username = userDoc.data().username || username; // Use Firestore username if available
            console.log("✅ User Data from Firestore:", userDoc.data());
        }

        // ✅ Store user session in LocalStorage
        localStorage.setItem("loggedInUser", JSON.stringify({
            email: user.email,
            uid: user.uid,
            username: username
        }));

        return user;
    } catch (error) {
        console.error("❌ Login Error:", error);
        throw error;
    }
}
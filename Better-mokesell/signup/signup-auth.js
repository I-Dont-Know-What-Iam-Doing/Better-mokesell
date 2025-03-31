import { app, db } from "../database/firebase.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const auth = getAuth(app);

export async function signUpUser(email, password, username) {
    try {
        // ✅ Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ User Signed Up:", user);

        // ✅ Set Firebase User Profile with username
        await updateProfile(user, { displayName: username });

        // ✅ Store user in Firestore (Fix: Using `await` and correct `user.uid`)
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            username: username,
            email: email,
            status: "member",
            points: 0,
            createdAt: new Date().toISOString()
        });

        console.log("✅ User Data Saved in Firestore");

        return user;
    } catch (error) {
        console.error("❌ Sign-Up Error:", error);
        throw error;
    }
}

export { auth };
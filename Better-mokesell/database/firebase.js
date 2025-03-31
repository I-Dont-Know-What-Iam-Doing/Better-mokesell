  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCqf0fnfT9rLhAl4T2YWv1uzp98AoFcBlg",
    authDomain: "fed-assignment2-d9ebe.firebaseapp.com",
    databaseURL: "https://fed-assignment2-d9ebe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fed-assignment2-d9ebe",
    storageBucket: "fed-assignment2-d9ebe.firebasestorage.app",
    messagingSenderId: "170661968998",
    appId: "1:170661968998:web:c2536901e464042b9681a7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { app, auth, db };
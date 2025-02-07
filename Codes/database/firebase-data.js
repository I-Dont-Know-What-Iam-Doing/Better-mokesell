// firebase-data.js

import { database } from "./firebase.js";
import { ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Function to add a user to Firebase
export function addUser(userId, name, email) {
  set(ref(database, "users/" + userId), {
    username: name,
    email: email
  })
  .then(() => console.log("User added successfully!"))
  .catch((error) => console.error("Error adding user:", error));
}

// Function to get user data
export function getUser(userId) {
  const userRef = ref(database, "users/" + userId);

  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("User Data:", snapshot.val());
    } else {
      console.log("No user found.");
    }
  })
  .catch((error) => console.error("Error fetching user:", error));
}

// Function to update user data
export function updateUser(userId, newData) {
  update(ref(database, "users/" + userId), newData)
    .then(() => console.log("User updated!"))
    .catch((error) => console.error("Update failed:", error));
}

// Function to delete a user
export function deleteUser(userId) {
  remove(ref(database, "users/" + userId))
    .then(() => console.log("User deleted successfully!"))
    .catch((error) => console.error("Delete failed:", error));
}

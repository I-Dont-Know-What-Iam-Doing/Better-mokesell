document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const loginButton = document.getElementById("login-btn");
    const nav = document.querySelector(".nav");

    if (user) {
        loginButton.remove(); // Remove login button

        const profileButton = document.createElement("a");
        profileButton.href = "/Codes/profile/profile.html";
        profileButton.classList.add("profile-btn");
        profileButton.innerHTML = `👤 ${user.displayName || "Profile"}`;
        nav.appendChild(profileButton);
    }
});
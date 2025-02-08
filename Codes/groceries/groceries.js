import { db } from "../database/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    fetchGroceries();
});

async function fetchGroceries() {
    const groceriesList = document.getElementById("grocery-list");

    if (!groceriesList) {
        console.error("Error: 'grocery-list' element not found.");
        return;
    }

    groceriesList.innerHTML = "<p>Loading...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "groceries", "fruits and vegetable", "fruits"));
        groceriesList.innerHTML = ""; // Clear loading text

        let products = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id,
                ...data
            });
        });

        if (products.length === 0) {
            groceriesList.innerHTML = "<p>No grocery items found.</p>";
            return;
        }

        // ✅ Sort by bump count (highest first)
        products.sort((a, b) => b.bump - a.bump);

        // ✅ Display products dynamically (Retains Styling)
        products.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.id}">
                <h3>${product.id}</h3>
                <p class="price">Price: $${product.price}</p>
                <p>Seller: ${product.seller}</p>
                <p>Stock: ${product.stock}</p>
                <p>Bump: ${product.bump}</p>
            `;

            // ✅ Click event to check if product page exists or redirect to product.html
            productDiv.addEventListener("click", async () => {
                await checkIfPageExists(product.id);
            });

            groceriesList.appendChild(productDiv);
        });

    } catch (error) {
        console.error("Error fetching groceries:", error);
        groceriesList.innerHTML = "<p>Failed to load grocery items.</p>";
    }
}

// ✅ Function to check if product page exists in `/Codes/groceries/`, otherwise redirect to `product.html`
async function checkIfPageExists(productName) {
    const pageUrl = `/Codes/groceries/${productName}.html`;

    try {
        const response = await fetch(pageUrl, { method: "HEAD" });

        if (response.ok) {
            // ✅ Page exists, redirect to it
            window.location.href = pageUrl;
        } else {
            // ❌ Page does not exist, redirect to product.html with query param
            window.location.href = `product.html?name=${encodeURIComponent(productName)}`;
        }
    } catch (error) {
        console.error("Error checking page existence:", error);
        // ❌ If any error occurs, redirect to construction.html
        window.location.href = "/Codes/construction/construction.html";
    }
}


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Run this function when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);
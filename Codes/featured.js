
import { db } from "../Codes/database/firebase.js";
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
    const featuredListingsContainer = document.getElementById("featured-listings");

    if (!featuredListingsContainer) {
        console.error("Error: Featured listings container not found!");
        return;
    }

    try {
        // ✅ Query Firestore to get the Top 6 Most Bumped Products
        const groceriesRef = collection(db, "groceries", "fruits and vegetable", "fruits");
        const q = query(groceriesRef, orderBy("bump", "desc"), limit(6)); // Sort by bump count, highest first
        const querySnapshot = await getDocs(q);

        featuredListingsContainer.innerHTML = ""; // Clear previous content

        querySnapshot.forEach((doc) => {
            const product = doc.data();

            // ✅ Ensure price is a number, fallback to "N/A" if missing
            const price = (typeof product.price === "number" && !isNaN(product.price)) 
                ? `$${product.price.toFixed(2)}` 
                : "N/A";

            // ✅ Generate product card HTML
            const productCard = `
                <a href="/Codes/product.html?name=${encodeURIComponent(doc.id)}" class="product">
                    <img src="${product.imageUrl}" alt="${doc.id}">
                    <h3>${doc.id}</h3>
                    <p class="price">${price}</p>
                    <p>Seller: ${product.seller || "N/A"}</p>
                    <p>Stock: ${product.stock !== undefined ? product.stock : "N/A"}</p>
                    <p>Bump: ${product.bump !== undefined ? product.bump : "N/A"}</p>
                </a>
            `;

            // ✅ Append to Featured Listings Section
            featuredListingsContainer.innerHTML += productCard;
        });

    } catch (error) {
        console.error("Error fetching featured listings:", error);
    }
});
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
        const categories = {
            fruits: { path: ["groceries", "fruits and vegetable", "fruits"], title: "Fruits" },
            vegetables: { path: ["groceries", "fruits and vegetable", "vegetables"], title: "Vegetables" },
            dairyMilk: { path: ["groceries", "dairy products", "milk"], title: "Milk Products" },
            dairyCheese: { path: ["groceries", "dairy products", "cheese"], title: "Cheese Products" },
            snacksChips: { path: ["groceries", "snacks and confectionery", "chips"], title: "Snacks" },
            snacksChocolate: { path: ["groceries", "snacks and confectionery", "chocolate"], title: "Chocolates" }
        };

        groceriesList.innerHTML = ""; // Clear loading text

        for (let [categoryKey, categoryData] of Object.entries(categories)) {
            const querySnapshot = await getDocs(collection(db, ...categoryData.path));

            if (!querySnapshot.empty) {
                // ✅ Add section header
                const sectionHeader = document.createElement("h2");
                sectionHeader.classList.add("category-header");
                sectionHeader.innerHTML = `${categoryData.title}`;
                groceriesList.appendChild(sectionHeader);

                // ✅ Create a container for products in this category
                const categoryContainer = document.createElement("div");
                categoryContainer.classList.add("category-container");
                groceriesList.appendChild(sectionHeader);
                groceriesList.appendChild(categoryContainer);

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product");

                    productDiv.innerHTML = `
                        <img src="${data.imageUrl || "/Codes/assets/placeholder.png"}" alt="${doc.id}">
                        <h3>${doc.id}</h3>
                        <p class="price">Price: $${data.price || "N/A"}</p>
                        <p>Seller: ${data.seller || "N/A"}</p>
                        <p>Stock: ${data.stock || "N/A"}</p>
                        <p>Bump: ${data.bump || "N/A"}</p>
                    `;

                    // ✅ Click event redirects to product.html with category
                    productDiv.addEventListener("click", () => {
                        window.location.href = `product.html?name=${encodeURIComponent(doc.id)}&category=${encodeURIComponent(categoryKey)}`;
                    });

                    categoryContainer.appendChild(productDiv);
                });

                // ✅ Append products under their respective category
                groceriesList.appendChild(categoryContainer);
            }
        }

    } catch (error) {
        console.error("Error fetching groceries:", error);
        groceriesList.innerHTML = "<p>Failed to load grocery items.</p>";
    }
}

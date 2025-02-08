import { db } from "../database/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");
    const category = params.get("category"); // Get category from URL

    if (!productName || !category) {
        window.location.href = "/Codes/construction/construction.html";
        return;
    }

    // 🏷️ Define all possible Firestore paths
    const categoryPaths = {
        fruits: ["groceries", "fruits and vegetable", "fruits"],
        vegetables: ["groceries", "fruits and vegetable", "vegetables"],
        dairyMilk: ["groceries", "dairy products", "milk"],
        dairyCheese: ["groceries", "dairy products", "cheese"],
        snacksChips: ["groceries", "snacks and confectionery", "chips"],
        snacksChocolate: ["groceries", "snacks and confectionery", "chocolate"]
    };

    // ✅ Check if the selected category exists
    const selectedPath = categoryPaths[category];

    if (!selectedPath) {
        window.location.href = "/Codes/construction/construction.html";
        return;
    }

    // ✅ Fetch product from the correct category path
    const productRef = doc(db, ...selectedPath, productName);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
        const productData = productSnap.data();

        document.querySelector(".product-image img").src = productData.imageUrl;
        document.querySelector(".product-name").innerText = productName;
        document.querySelector(".product-price").innerText = `Price: $${productData.price}`;
        document.querySelector(".product-seller").innerText = `Seller: ${productData.seller}`;
        document.querySelector(".product-status").innerText = `Status: ${productData.status}`;
        document.querySelector(".product-bumps").innerText = `Bumps: ${productData.bump}`;

        // Store product data in dataset for cart functionality
        document.getElementById("add-to-cart").dataset.product = JSON.stringify({
            name: productName,
            category: category,
            price: productData.price,
            seller: productData.seller,
            imageUrl: productData.imageUrl,
            status: productData.status,
            bump: productData.bump,
        });
    } else {
        window.location.href = "/Codes/construction/construction.html";
    }
});

// ✅ Add to Cart Functionality
document.getElementById("add-to-cart").addEventListener("click", function () {
    let product = JSON.parse(this.dataset.product);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
});

// ✅ Update Cart Icon Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// ✅ Run this function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

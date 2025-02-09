import { db } from "../database/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");
    const category = params.get("category"); // ✅ Get category from URL

    if (!productName || !category) {
        window.location.href = "/Codes/construction/construction.html";
        return;
    }

    // ✅ Define category paths
    const categories = {
        fruits: ["groceries", "fruits and vegetable", "fruits"],
        vegetables: ["groceries", "fruits and vegetable", "vegetables"],
        dairyMilk: ["groceries", "dairy products", "milk"],
        dairyCheese: ["groceries", "dairy products", "cheese"],
        snacksChips: ["groceries", "snacks and confectionery", "chips"],
        snacksChocolate: ["groceries", "snacks and confectionery", "chocolate"]
    };

    if (!categories[category]) {
        console.error("Error: Invalid category -", category);
        window.location.href = "/Codes/construction/construction.html";
        return;
    }

    const productRef = doc(db, ...categories[category], productName);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
        const productData = productSnap.data();

        document.querySelector(".product-image img").src = productData.imageUrl;
        document.querySelector(".product-name").innerText = productName;
        document.querySelector(".product-price").innerText = `Price: $${productData.price || "N/A"}`;
        document.querySelector(".product-seller").innerText = `Seller: ${productData.seller || "N/A"}`;
        document.querySelector(".product-status").innerText = `Status: ${productData.status || "N/A"}`;
        document.querySelector(".product-bumps").innerText = `Bumps: ${productData.bump || "N/A"}`;

        // ✅ Store product details for cart
        document.getElementById("add-to-cart").dataset.product = JSON.stringify({
            name: productName,
            price: parseFloat(productData.price) || 0, // Ensure number
            seller: productData.seller,
            imageUrl: productData.imageUrl,
            status: productData.status,
            bump: productData.bump
        });

        // ✅ Ensure event listeners are added properly
        setupEventListeners();
    } else {
        console.error("Error: Product not found -", productName);
        window.location.href = "/Codes/construction/construction.html";
    }
});

// ✅ Function to set up event listeners
function setupEventListeners() {
    // ✅ Open Quantity Selector Popup
    document.getElementById("add-to-cart").addEventListener("click", function () {
        document.getElementById("quantity-popup").style.display = "block";
        document.getElementById("overlay").style.display = "block"; // ✅ Show overlay
    });

    // ✅ Handle Quantity Changes
    document.getElementById("increase-qty").addEventListener("click", function () {
        let qtyInput = document.getElementById("quantity-input");
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    document.getElementById("decrease-qty").addEventListener("click", function () {
        let qtyInput = document.getElementById("quantity-input");
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });

    document.getElementById("confirm-add").addEventListener("click", function () {
        let quantity = parseInt(document.getElementById("quantity-input").value);
        let product = JSON.parse(document.getElementById("add-to-cart").dataset.product);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            product.quantity = quantity;
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        // ✅ Show success pop-up and overlay
        let successPopup = document.getElementById("success-popup");
        let overlay = document.getElementById("overlay");

        if (successPopup && overlay) {
            successPopup.style.display = "block";
            overlay.style.display = "block"; // ✅ Keep overlay visible

            // ✅ Hide Success Pop-up & Overlay After 2 Seconds
            setTimeout(() => {
                successPopup.style.display = "none";
                overlay.style.display = "none";
            }, 2000);
        } else {
            console.error("Error: Success pop-up or overlay not found!");
        }

        // ✅ Close Quantity Popup
        document.getElementById("quantity-popup").style.display = "none";
    });

    // ✅ Cancel and Close Quantity Popup
    document.getElementById("cancel-add").addEventListener("click", function () {
        document.getElementById("quantity-popup").style.display = "none";
        document.getElementById("overlay").style.display = "none"; // ✅ Hide overlay
    });

    // ✅ Update cart count in header
    updateCartCount();
}

// ✅ Update Cart Count in Header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = totalQuantity;
        cartCountElement.style.display = totalQuantity > 0 ? "inline-block" : "none"; // Hide if empty
    }
}

// ✅ Ensure cart count updates on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

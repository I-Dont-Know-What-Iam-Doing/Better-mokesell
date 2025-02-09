import { db } from "../database/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");

    if (!productName) {
        window.location.href = "/Codes/construction/construction.html";
        return;
    }

    const productRef = doc(db, "groceries", "fruits and vegetable", "fruits", productName);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
        const productData = productSnap.data();

        document.querySelector(".product-image img").src = productData.imageUrl;
        document.querySelector(".product-name").innerText = productName;
        document.querySelector(".product-price").innerText = `Price: $${productData.price}`;
        document.querySelector(".product-seller").innerText = `Seller: ${productData.seller}`;
        document.querySelector(".product-status").innerText = `Status: ${productData.status}`;
        document.querySelector(".product-bumps").innerText = `Bumps: ${productData.bump}`;

        // Store product details for cart
        document.getElementById("add-to-cart").dataset.product = JSON.stringify({
            name: productName,
            price: productData.price,
            seller: productData.seller,
            imageUrl: productData.imageUrl,
            status: productData.status,
            bump: productData.bump
        });
    } else {
        window.location.href = "/Codes/construction/construction.html";
    }
});

// ✅ Open Quantity Selector Popup
document.getElementById("add-to-cart").addEventListener("click", function () {
    document.getElementById("quantity-popup").style.display = "block";
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

    // ✅ Make sure the pop-up appears
    let successPopup = document.getElementById("success-popup");
    let overlay = document.getElementById("overlay");

    if (successPopup && overlay) {
        successPopup.style.display = "block";
        overlay.style.display = "block";

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
});

// ✅ Update Cart Count in Header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Run when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

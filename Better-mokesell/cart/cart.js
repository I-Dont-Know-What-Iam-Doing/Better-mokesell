import { db } from "../database/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

async function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ If cart is empty, display the empty cart message and return
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>🛒 <strong>Oops! Your cart is empty.</strong></p>
                <p>Start shopping now and fill it up! 💜</p>
            </div>
        `;
        updateCartCount();
        return;
    }

    cartContainer.innerHTML = ""; // ✅ Clear cart container before updating
    let total = 0;
    let hasUglyProduct = false;

    // ✅ Fetch product data from Firestore and check for 'ugly' status
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemRef = doc(db, "groceries", "fruits and vegetable", "fruits", item.name);
        let itemSnap = await getDoc(itemRef);

        if (itemSnap.exists()) {
            let itemData = itemSnap.data();
            
            // ✅ If any product in the cart has status 'ugly', apply discount
            if (itemData.status && itemData.status.toLowerCase() === "ugly") {
                hasUglyProduct = true;
            }
        }

        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Seller: ${item.seller}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${i})" class="remove-btn">Remove</button>
            </div>
        `;

        total += item.price * item.quantity;
        cartContainer.appendChild(itemDiv);
    }

    // ✅ Apply 5% discount if an ugly product exists
    let discount = hasUglyProduct ? total * 0.05 : 0;
    let finalTotal = total - discount;

    cartContainer.innerHTML += `
        <h3>Subtotal: $${total.toFixed(2)}</h3>
        ${hasUglyProduct ? `<h3 class="discount">Ugly Product Discount (-5%): -$${discount.toFixed(2)}</h3>` : ""}
        <h3><strong>Total: $${finalTotal.toFixed(2)}</strong></h3>
    `;

    updateCartCount();
}

// ✅ Fix: Make removeFromCart globally accessible
window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1); // ✅ Remove the correct item
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // ✅ Refresh cart display
    }
};

// ✅ Ensure cart count updates correctly
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = totalQuantity;
        cartCountElement.style.display = totalQuantity > 0 ? "inline-block" : "none";
    }
}

// Checkout Functionality
document.getElementById("checkout-btn").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("🛒 Your cart is empty. Add items before checking out.");
        return;
    }

    alert("Proceeding to checkout...");
    window.location.href = "/Codes/checkout/checkout.html"; 
});

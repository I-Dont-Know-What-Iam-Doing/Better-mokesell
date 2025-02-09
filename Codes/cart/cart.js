document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});
function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Seller: ${item.seller}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            </div>
        `;

        total += item.price * item.quantity;
        cartContainer.appendChild(itemDiv);
    });

    cartContainer.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Checkout Functionality (Placeholder)
document.getElementById("checkout-btn").addEventListener("click", function () {
    if (JSON.parse(localStorage.getItem("cart"))?.length === 0) {
        alert("🛒 Your cart is empty. Add items before checking out.");
        return;
    }
    alert("Proceeding to checkout...");
    window.location.href = "/Codes/checkout/checkout.html"; 
});
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
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
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart"); // Clear cart after checkout
    window.location.href = "/checkout.html"; // Redirect to payment page
});
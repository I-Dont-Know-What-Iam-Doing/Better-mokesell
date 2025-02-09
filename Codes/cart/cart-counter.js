document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = totalQuantity;
        cartCountElement.style.display = totalQuantity > 0 ? "inline-block" : "none"; // Hide if empty
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 🎥 Load Lottie Animation
    lottie.loadAnimation({
        container: document.getElementById("checkout-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets6.lottiefiles.com/private_files/lf30_5vqvpmv7.json" // Lottie JSON
    });

    // Handle Checkout Form Submission
    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        // ✅ Get Form Values
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const paymentMethod = document.getElementById("payment-method").value;

        // ❌ Validate Empty Fields
        if (!fullName || !email || !address || !paymentMethod) {
            alert("❌ Please fill in all fields before placing your order.");
            return;
        }

        // ✅ Simulating Order Placement
        localStorage.removeItem("cart"); // Clear the cart

        // ✅ Show Confirmation Alert
        alert("✅ Thank you for your order! Your items will be shipped soon. 🎉");

        // ✅ Redirect to Homepage
        window.location.href = "/index.html";
    });
});

// ✅ Function to Load Lottie Animations
function loadLottieAnimations() {
    lottie.loadAnimation({
        container: document.getElementById("success-checkout"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "https://assets7.lottiefiles.com/packages/lf20_j1adxtyb.json" // Success Checkout ✅
    });

    lottie.loadAnimation({
        container: document.getElementById("credit-card-payment"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets2.lottiefiles.com/private_files/lf30_m9ifyj2p.json" // Credit Card Payment 💳
    });

    lottie.loadAnimation({
        container: document.getElementById("order-processing"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets10.lottiefiles.com/packages/lf20_y3qfnflz.json" // Order Processing ⏳
    });
}
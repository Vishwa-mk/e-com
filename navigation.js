document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = this.getAttribute("href");
        });
    });

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const productCard = this.closest(".product-card");
            const productName = productCard.querySelector(".product-name").textContent;
            const productPrice = productCard.querySelector(".product-price").textContent;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ productName, productPrice });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Item added to cart!");
        });
    });

    // Display Cart Items
    const cartList = document.getElementById("cart-items");
    if (cartList) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartList.innerHTML = cart.map(item => `<li>${item.productName} - ${item.productPrice}</li>`).join("");
    }

    // Redirect to Payment Page
    const placeOrderBtn = document.getElementById("place-order");
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", function () {
            if (localStorage.getItem("cart")) {
                window.location.href = "payment.html";
            } else {
                alert("Your cart is empty!");
            }
        });
    }

    // Handle Payment Submission
    const paymentForm = document.querySelector("form[action='/submit_payment']");
    if (paymentForm) {
        paymentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Payment Successful! Redirecting to profile...");
            localStorage.removeItem("cart");
            window.location.href = "profile.html";
        });
    }
});

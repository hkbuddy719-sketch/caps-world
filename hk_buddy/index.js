
// CAPS WORLD PRODUCTS

const products = [
    {
        id: 1,
        name: "Nike Classic Cap",
        category: "Classic",
        price: 19.99,
        oldPrice: 29.99,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500"
    },
    {
        id: 2,
        name: "Adidas Trend Cap",
        category: "Streetwear",
        price: 18.99,
        oldPrice: 27.99,
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500"
    },
    {
        id: 3,
        name: "Puma Sport Cap",
        category: "Sport",
        price: 17.99,
        oldPrice: 25.99,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500"
    },
    {
        id: 4,
        name: "Red Stylish Cap",
        category: "Sport",
        price: 16.99,
        oldPrice: 24.99,
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500"
    }
];

let cart = [];
let selectedCategory = "All";

// DISPLAY PRODUCTS

const productGrid = document.getElementById("productGrid");

function displayProducts() {

    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const searchMatch =
            product.name.toLowerCase().includes(searchValue);

        return categoryMatch && searchMatch;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = "<p>No products found!</p>";
        return;
    }

    productGrid.innerHTML = filteredProducts.map(product => `

        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}">

            <h3>${product.name}</h3>

            <div class="rating">★★★★★</div>

            <p class="price">
                $${product.price.toFixed(2)}
                <del>$${product.oldPrice.toFixed(2)}</del>
            </p>

            <button class="add-btn"
                    onclick="addToCart(${product.id})">
                🛒 Add to Cart
            </button>

        </div>

    `).join("");
}


// ADD TO CART

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existingProduct = cart.find(p => p.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}


// UPDATE CART

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    cartCount.textContent = totalQuantity;

    cartTotal.textContent = "$" + totalPrice.toFixed(2);

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty!</p>';

        return;
    }

    cartItems.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div>
                <strong>${item.name}</strong>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>

            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>

        </div>

    `).join("");
}


// REMOVE PRODUCT

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}


// OPEN CART

document.getElementById("cartButton")
    .addEventListener("click", function() {

        document.getElementById("cartOverlay")
            .classList.add("open");

    });


// CLOSE CART

document.getElementById("closeCart")
    .addEventListener("click", function() {

        document.getElementById("cartOverlay")
            .classList.remove("open");

    });


// CLOSE CART BY CLICKING OUTSIDE

document.getElementById("cartOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            this.classList.remove("open");
        }

    });


// PRODUCT SEARCH

document.getElementById("searchInput")
    .addEventListener("input", displayProducts);


// CATEGORY FILTER

document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", function() {

            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("selected"));

            this.classList.add("selected");

            selectedCategory = this.dataset.category;

            displayProducts();

        });

    });


// MOBILE NAVBAR

document.getElementById("menuToggle")
    .addEventListener("click", function() {

        document.getElementById("navLinks")
            .classList.toggle("open");

    });


// CLOSE MOBILE MENU AFTER CLICK

document.querySelectorAll("#navLinks a")
    .forEach(link => {

        link.addEventListener("click", function() {

            document.getElementById("navLinks")
                .classList.remove("open");

        });

    });


// CHECKOUT DEMO

document.getElementById("checkoutButton")
    .addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is empty!");

        } else {

            alert(
                "Thank you for shopping with Caps World! " +
                "Real checkout is not connected yet."
            );

        }

    });


// INITIALIZE WEBSITE

displayProducts();

updateCart();

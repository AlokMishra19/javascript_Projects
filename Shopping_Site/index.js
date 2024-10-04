let allProducts = [];
let cart = [];

// Fetch products from API
fetch('https://fakestoreapi.com/products')
    .then((data) => data.json())
    .then((completedata) => {
        allProducts = completedata;
        displayProducts(allProducts); // Display all products by default
    })
    .catch((err) => {
        console.log(err);
    });

// Function to display products
function displayProducts(products) {
    let data1 = "";
    products.forEach((values) => {
        data1 += `<div class="card">
            <div class="title">${values.title}</div>
            <img src="${values.image}" alt="" class="images">
            <div class="rating ">${"Rating: " + values.rating.rate}</div>
            <div class="price">${"Price: $ " + values.price}</div>
            <button class="cart" onclick="addToCart(${values.id})">Add to Cart</button>
        </div>`;
    });
    document.getElementById("cards").innerHTML = data1;
}

// Search Functionality
document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Filter by Category
document.getElementById("categoryFilter").addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    let filteredData = allProducts;

    if (selectedCategory !== "") {
        filteredData = allProducts.filter((item) =>
            item.category.includes(selectedCategory)
        );
    }

    displayProducts(filteredData);
});

// Add to cart function
function addToCart(id) {
    const product = allProducts.find((p) => p.id === id);
    cart.push(product);
    updateCartCount();
    updateCartItems();
}

// Update cart count display
function updateCartCount() {
    document.getElementById("cartCount").innerText = cart.length;
}

// Display cart items and total price
function updateCartItems() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Clear the list before updating
    let totalPrice = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<li>No items in cart.</li>"; // If cart is empty
    } else {
        cart.forEach((item, index) => {
            cartList.innerHTML += `<li>${item.title} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></li>`;
            totalPrice += item.price;
        });
    }

    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item by index
    updateCartCount();
    updateCartItems();
}

// Toggle cart display
document.getElementById("cartButton").addEventListener("click", () => {
    const cartDiv = document.getElementById("cartItems");
    if (cartDiv.style.display === "none") {
        cartDiv.style.display = "block"; // Show the cart section
    } else {
        cartDiv.style.display = "none";  // Hide the cart section
    }
});

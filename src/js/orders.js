let LOCAL_BASE = "http://localhost:3000";

let products = document.querySelector("#products");

products && products.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let form = event.target;
  let formData = new FormData(form);
  let data = Object.fromEntries(formData);

  let endpoint = (form.id = "products");

  axios
    .post(`${LOCAL_BASE}/${endpoint}`, data)
    .then((response) => {
      console.log("Saved:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      console.log("Fetch completed!");
    });
}

function fetchProducts(url, cb) {
  axios
    .get(`${LOCAL_BASE}/${url}`)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log("FETCH COMPLETED!");
    });
}

let ProductFetchHTMLData = document.querySelector("#productsSection");
let ProductCartFetchHTMLData = document.querySelector("#addToCart-c");

const renderCartProductsHTML = (products) => {
  products.forEach((product) => {
    const productCartHtml = `<tr>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <span class="font-semibold">${product?.title ?? "No Name"
      }</span>
                                        </div>
                                    </td>
                                    <td class="py-4">${Math.round(product?.original * 100) /
      100 ?? "None"
      }</td>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <button class="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span class="text-center w-10">1</span>
                                            <button class="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                    </td>
                                    <td class="py-4">${Math.round(product?.original * 100) /
      100 ?? "None"
      }</td>
                                </tr>`;
    ProductCartFetchHTMLData.innerHTML += productCartHtml;
  });
};

fetchProducts("products", (data) => {
  renderProductsHTML(data);
  console.log(data);
});
fetchProducts("add-to-cart", (data) => {
  renderCartProductsHTML(data);
  console.log(data);
});

function deleteItem(id, btn) {
  axios
    .delete(`${LOCAL_BASE}/products/${products?.id}`)
    .then(() => {
      const row = btn.parentNode.parentNode;
      row.parentNode.removeChild(row);
    })
    .catch((error) => {
      console.error("Failed to delete:", error);
    });
}

const CartItemsDataHTML = document.querySelector("#addedProds");

var cartItems = [];

const addToCartProducts = (data) => {
  const existingCartItems = cartItems.find((item) => item.id === data.id);
  console.log(existingCartItems);
  if (existingCartItems) {
    cartItems = cartItems.map((item) =>
      item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    cartItems.push({ ...item, quantity: 1 });
  }
};

const minusBtn = document.getElementById("subtraction");
const plusBtn = document.getElementById("addition");
const quantitySpan = document.getElementById("how_many");

let quantity = 1;

function updateQuantity() {
  quantitySpan.innerHTML = `${quantity}`;
}

// decrease quantity (not less than 1)
minusBtn && minusBtn.addEventListener("click", () => {
  console.log("clicked -");
  if (quantity > 1) {
    quantity--;
    updateQuantity();
  }
  console.log(quantity);
});

// increase quantity
plusBtn && plusBtn.addEventListener("click", () => {
  console.log("clicked +");
  quantity++;
  updateQuantity();
  console.log(quantity);
});

const checkoutBtn = document.querySelector("#checkout-btn");

checkoutBtn && checkoutBtn.addEventListener("click", () => {
  console.log("clicked");
  window.location.href = "./checkout.html";
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    if (document.getElementById("loader")) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
    }
  }, 3000);
});

const deleteBtn = document.querySelector("#deleteBtn");

// DOM elements
const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");


// Add product to cart
function addToCart(productId) {
  // fetch the product info first
  fetch(`${BASE_URL}/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      // send to cart
      fetch(`${LOCAL_BASE}/add-to-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      }).then(() => renderCartProductsHTML());
    });
}

// Delete product from cart
function deleteFromCart(cartId) {
  fetch(`${LOCAL_BASE}/add-to-cart/${cartId}`, {
    method: "DELETE"
  }).then(() => renderCartProductsHTML());
}

const goBackHome = document.querySelector("#logo");

goBackHome && goBackHome.addEventListener("click", () => {
  console.log("Back to Home");
  window.location.href = "./index.html"
})
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "product1", price: 29.99 },
    { id: 2, name: "product2", price: 19.998 },
    { id: 3, name: "product3", price: 59.992 },
  ];

  const cart = loadCartFromStorage() ||[];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMassege = document.getElementById("cart-total");
  const priceTotalDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML =
      //here fixed is used to make presicion in value tile 2 digit after decimal
      `
   <span>${product.name} - ${product.price.toFixed(2)}</span>  
   <button data-id =${product.id} >Add To Cart</button>
   `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });
  function addToCart(product) {
    cart.push(product);
    saveCartToStorage()
    renderCart();
  }
  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMassege.classList.remove("hidden");
      priceTotalDisplay.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - ${item.price.toFixed(2)}

        <button class = "remove-btn" data-index = "${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      priceTotalDisplay.textContent = totalPrice.toFixed(2)
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMassege.classList.add("hidden");
      priceTotalDisplay.classList.add("hidden");
    }
  }
  cartItems.addEventListener('click',(e) => {
    if (e.target.classList.contains("remove-btn")){
     const index = parseInt(e.target.getAttribute("data-index"))
      cart.splice(index, 1)
      saveCartToStorage();
      renderCart();
    }
  }
  )
  function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCartFromStorage() {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  checkoutBtn.addEventListener('click', () => {
    cart.length = 0;
    alert("checkOut succeccfully")
    renderCart()
    saveCartToStorage()
  }
  )
});

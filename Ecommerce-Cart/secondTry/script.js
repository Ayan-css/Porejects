document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "product1", price: 19.0 },
    { id: 2, name: "product1", price: 25.0 },
    { id: 3, name: "product3", price: 9.0 },
  ];


  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const productList = document.getElementById("productList");
  const cartItems = document.getElementById("cart-item");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalDisplay = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - ${product.price.toFixed(2)}</span>
        <button data-id = ${product.id}>Add to Cart</button>

    `;
    productList.append(productDiv);
  });

  // add to cart btn

  productList.addEventListener("click", (e) => {
    if (e.target === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });


  //Function Part 

 function addToCart(product){
    cartItems.push()
    saveCartToStorage()
    renderCart()
 }

 function saveCartToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
 }
});

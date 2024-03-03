document.addEventListener("DOMContentLoaded", async () => {
    await getApiData();
    DisplayCheckout();
    UpdateCheckoutTotalPrice();
    document.getElementById("checkout-delete-all").addEventListener("click", () => {
        localStorage.removeItem("sebet")
    });
});

function DisplayCheckout() {
    let productIds = getCartProductIds();

    let checkoutItems = document.getElementById("checkout-items")
    checkoutItems.innerHTML = '';
    Object.keys(productIds).forEach((id) => {
        let cartElement = document.createElement("div")
        cartElement.classList.add("card");
        const product = getProductDetails(id);

        cartElement.innerHTML = `
            <div class="checkout-product" data-id=${product.id}>
                <img class="checkout-image" src=${product.image} alt="">
                <h3>${product.name}</h3>
                <button class="decrease" onclick="decreaseFromCart(${product.id}); UpdateCartCount(); updateProductQuantity(this, ${id});">-</button>
                <span class="quantity">${productIds[id]}</span>
                <button class="increase" onclick="addToCart(${product.id}); UpdateCartCount(); updateProductQuantity(this, ${id});">+</button>
                <p style="font-size:20px;margin-top:10px;font-weight:500">$${product.price.toFixed(2)}</p>
                <span class="product-total-price">Total $${(productIds[id] * product.price).toFixed(2)}</span>
                <button class="delete-checkout-product" onclick="removeFromCart(${id}); DisplayCheckout();">Delete</button>
            </div>
            `
        checkoutItems.appendChild(cartElement)
    });
    UpdateCheckoutTotalPrice();
}

function updateProductQuantity(card, id) {
    const cart = getCartProductIds();
    const quantitySpan = card.parentElement.querySelector(".quantity");
    quantitySpan.innerText = cart[id + ""];
    const productTotal = card.parentElement.querySelector(".product-total-price");
    productTotal.innerText = "Total $" + (cart[id + ""] * getProductDetails(id).price).toFixed(2)
    UpdateCheckoutTotalPrice();
}

function decreaseFromCart(id) {
    const cartProductIds = getCartProductIds();
    if (cartProductIds[id] && cartProductIds[id] > 1) {
        cartProductIds[id] = cartProductIds[id] - 1
        localStorage.setItem("sebet", JSON.stringify(cartProductIds))
    }
}

function UpdateCheckoutTotalPrice() {
    const total = getTotal();
    document.getElementById("checkout-total-price").innerText = total;
}

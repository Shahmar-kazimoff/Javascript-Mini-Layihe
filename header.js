function DisplayCart() {
    let cart = getCartProductIds();
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    let total = 0

    Object.keys(cart).forEach((id) => {
        const pro = document.createElement("div");
        const product = getProductDetails(id);

        pro.innerHTML = `<div class="cartProduct" data-id=${product.id}>
            <div class="cart-into">
                <img class="cartImage" src=${product.image} alt="">
                <div style="display:flex;flex-direction:column">
                   <div style="text-align:start">
                      ${product.name}
                   </div> <br>
                   <div>
                      ${cart[id]} x $${(product.price).toFixed(2)}
                      <i style="margin-left:10px" onclick="removeFromCart(${product.id}); DisplayCart();" class="fa-solid fa-trash delete-product"></i>
                      </div>
                </div>
            </div>`;

        total += cart[id] * product.price;
        cartItems.appendChild(pro);
    });

    document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
}


function RemoveProduct(productID) {
    removeFromCart(productID)
    UpdateCartCount();
    DisplayCart();
}

function UpdateCartCount() {
    const cart = getCartProductIds();
    const totalCount = Object.keys(cart).length;
    document.getElementById("cart-count").innerText = totalCount;
}

function UpdateWishlistCount() {
    const wishlist = getWishlistProductIds();
    const totalCount = wishlist.length;
    document.getElementById("wishlist-count").innerText = totalCount;
}

window.onscroll = function() {
    var header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await getApiData();
    UpdateWishlistCount();
    UpdateCartCount();
    DisplayCart();

    const sidebar = document.getElementById('sidebar');

    const cartIcon = document.querySelector('.fa-cart-shopping');
    cartIcon.addEventListener('click', function() {
        sidebar.style.width = '400px';
    });

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        sidebar.style.width = '0';
    });
});

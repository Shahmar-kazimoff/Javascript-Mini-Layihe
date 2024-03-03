var apiData

function addToCart(id) {
    let cart = getCartProductIds();

    if (cart[id] > 0) {
        cart[id] += 1;
    } else {
        cart[id] = 1
    }

    localStorage.setItem("sebet", JSON.stringify(cart));
}

function clearCart() {
    localStorage.setItem("sebet", '{}')
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("sebet")) || {};
    delete cart[id];
    localStorage.setItem("sebet", JSON.stringify(cart))
}

function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = wishlist.filter((item) => item !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
}

function isWishlisted(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.indexOf(parseInt(id)) >= 0;
}

function addToWishlist(id, productElement) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted(id)) {
        // if product html element provided, update its heart icon
        if (productElement) {
            productElement.querySelector("i").classList.remove("fa-solid")
            productElement.querySelector("i").classList.add("fa-regular")
        }

        removeFromWishlist(id, productElement)
    } else {
        // if product html element provided, update its heart icon
        if (productElement) {
            productElement.querySelector("i").classList.add("fa-solid")
            productElement.querySelector("i").classList.remove("fa-regular")
        }

        wishlist.push(id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
}

// getApiData tries to get loaded api data, if not present load from api
async function getApiData() {
    if (!apiData) {
        apiData = await axios.get("http://localhost:3001/products").then(data => {
            return data.data
        })
    }
    return apiData;
}

// get details by product id from loaded api data
function getProductDetails(id) {
    if (apiData) {
        return apiData.find(p => p.id == id)
    }

    return null;
}

function getCartProductIds() {
    let productIdsWithPrices = JSON.parse(localStorage.getItem("sebet")) || {};
    return productIdsWithPrices;
}

function getWishlistProductIds() {
    let productIds = JSON.parse(localStorage.getItem("wishlist")) || [];
    return productIds;
}

function getTotal() {
    const cart = getCartProductIds();
    return Object.keys(cart).reduce((total, item) => total + cart[item] * getProductDetails(item).price, 0).toFixed(2);
}

// just render and return html of the product component
function renderProductsHTML(productlist) {
    let html = "";

    productlist.forEach((product) => {
        html += `
            <div class="card" data-id="${product.id}">
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id}); UpdateCartCount(); DisplayCart();">
                    Add to cart
                </button >
                <a 
                    style="margin-left: 5px; font-size: 25px; cursor: pointer; position: absolute;" 
                    class="add-to-wishlist" 
                    onclick="addToWishlist(${product.id}, this);UpdateWishlistCount();"
                >
                    <i class="${isWishlisted(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart heart-edit wishlist-button"></i>
                </a>
            </div >
        `
    });

    return html;
}

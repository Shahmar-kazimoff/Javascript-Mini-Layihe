document.addEventListener("DOMContentLoaded", async () => {
    await getApiData();
    DisplayWishlist();
});

function DisplayWishlist() {
    const wishlistItems = document.getElementById("productlist");
    if (wishlistItems) {
        let wishlist = getWishlistProductIds();

        let products = wishlist.map((id) => getProductDetails(id));
        wishlistItems.innerHTML = renderProductsHTML(products);

        let wishlistButtons = document.getElementsByClassName("add-to-wishlist");
        for (const btn of wishlistButtons) {
            btn.addEventListener("click", () => { DisplayWishlist() })
        }
    } else {
        console.error("Element with ID 'wishlist-items' not found.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    DisplayProducts();
});

let priceSortASC = true;
let filter = null;

async function DisplayProducts() {
    let productsData = await getApiData();
    if (filter) {
        productsData = productsData.filter(p => p.category === filter);
    }

    if (priceSortASC) {
        productsData = productsData.sort((a, b) => a.price - b.price)
    } else {
        productsData = productsData.sort((a, b) => b.price - a.price)
    }

    const productsHtml = renderProductsHTML(productsData);
    document.getElementById("productlist").innerHTML = productsHtml;
}

function setFilter(value) {
    filter = value;
    clearActiveClass();
    DisplayProducts();
}

function togglePriceSort() {
    priceSortASC = !priceSortASC
    DisplayProducts()
}

function clearActiveClass() {
    let filtersList = document.querySelectorAll(".filters-list > li > a")
    for (let el of filtersList) {
        el.classList.remove("active")
    }
}

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


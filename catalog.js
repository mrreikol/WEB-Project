const storeUrl = "https://wa.me/77787777674";
const clothingSizes = "S, M, L, XL, 2XL";

const products = [
    {
        id: "chocolate-cardigan",
        name: "Chocolate Zip Cardigan",
        category: "knitwear",
        image: "images/cardigan.png",
        alt: "Brown ribbed cardigan with a stand collar and a full zip",
        description: "Ribbed texture, stand collar and full zip.",
        price: "24,990 ₸",
        sizes: clothingSizes
    },
    {
        id: "chocolate-polo",
        name: "Chocolate Zip Polo",
        category: "polo",
        image: "images/polo.png",
        alt: "Brown short-sleeve ribbed polo with a zip neckline",
        description: "Vertical ribbing and a zip neckline.",
        price: "17,990 ₸",
        sizes: clothingSizes
    },
    {
        id: "graphite-jacket",
        name: "Graphite Hooded Jacket",
        category: "outerwear",
        image: "images/puffer-jacket.png",
        alt: "Grey quilted jacket with a hood and zip front",
        description: "Quilted jacket with a hood and zip front.",
        price: "44,990 ₸",
        sizes: clothingSizes
    },
    {
        id: "indigo-jeans",
        name: "Indigo Straight Jeans",
        category: "denim",
        image: "images/jeans.png",
        alt: "Dark indigo straight-leg MSQ jeans with contrast stitching",
        description: "Dark indigo denim and a straight leg.",
        price: "22,990 ₸",
        sizes: clothingSizes
    },
    {
        id: "brown-sneakers",
        name: "Dark Brown Sneakers",
        category: "shoes",
        image: "images/sneakers.png",
        alt: "Dark brown MSQ lace-up sneakers with white soles",
        description: "Dark brown panels and a white sole.",
        price: "29,990 ₸",
        sizes: "Ask the store"
    },
    {
        id: "club-cap",
        name: "MSQ Club Cap",
        category: "accessories",
        image: "images/club-cap.png",
        alt: "Navy MSQ Club baseball cap with an embroidered crest",
        description: "Navy cap with an embroidered crest.",
        price: "9,990 ₸",
        sizes: "Ask the store"
    }
];

const searchInput = document.getElementById("product-search");
const categoryButtons = document.querySelectorAll("#category-list button");
const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");
const noProducts = document.getElementById("no-products");
const favoritesPanel = document.getElementById("favorites-panel");
const favoritesToggle = document.getElementById("favorites-toggle");
const favoriteList = document.getElementById("favorite-list");
const favoriteCount = document.getElementById("favorite-count");
const mobileCount = document.getElementById("mobile-count");
const emptyFavorites = document.getElementById("empty-favorites");

const favoriteIds = [];
let selectedCategory = "all";

function getVisibleProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const visibleProducts = [];

    for (const product of products) {
        const matchesName = product.name.toLowerCase().includes(search);
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;

        if (matchesName && matchesCategory) {
            visibleProducts.push(product);
        }
    }

    return visibleProducts;
}

function createProductCard(product) {
    const card = document.createElement("article");
    const isFavorite = favoriteIds.includes(product.id);

    card.className = "product-card";
    card.id = product.id;

    card.innerHTML = `
        <div class="product-photo">
            <img src="${product.image}" alt="${product.alt}">
            <span class="new-label">New</span>
        </div>
        <div class="product-body">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <p class="product-sizes">Sizes: ${product.sizes}</p>
            <div class="product-actions">
                <a class="btn btn-outline-dark" href="${storeUrl}"
                   target="_blank" rel="noopener noreferrer">Contact the store</a>
                <button type="button" class="btn btn-outline-dark favorite-button"
                        data-favorite="${product.id}" aria-label="Favorite: ${product.name}"
                        aria-pressed="${isFavorite}">${isFavorite ? "♥" : "♡"}</button>
            </div>
        </div>
    `;

    return card;
}

function renderProducts() {
    const visibleProducts = getVisibleProducts();
    productsGrid.replaceChildren();

    for (const product of visibleProducts) {
        productsGrid.append(createProductCard(product));
    }

    productCount.textContent = "Showing " + visibleProducts.length +
        " of " + products.length + " products";
    noProducts.hidden = visibleProducts.length > 0;
}

function setCategory(category) {
    selectedCategory = category;

    for (const button of categoryButtons) {
        const isSelected = button.dataset.category === category;
        button.setAttribute("aria-pressed", String(isSelected));
    }

    renderProducts();
}

function renderFavorites() {
    favoriteList.replaceChildren();

    for (const product of products) {
        if (favoriteIds.includes(product.id)) {
            const item = document.createElement("li");

            item.innerHTML = `
                <strong>${product.name}</strong>
                <p>${product.price}</p>
                <button type="button" class="btn btn-outline-dark"
                        data-remove="${product.id}"
                        aria-label="Remove ${product.name} from favorites">Remove</button>
            `;

            favoriteList.append(item);
        }
    }

    favoriteCount.textContent = favoriteIds.length;
    mobileCount.textContent = favoriteIds.length;
    emptyFavorites.hidden = favoriteIds.length > 0;

    for (const button of productsGrid.querySelectorAll("[data-favorite]")) {
        const isFavorite = favoriteIds.includes(button.dataset.favorite);
        button.setAttribute("aria-pressed", String(isFavorite));
        button.textContent = isFavorite ? "♥" : "♡";
    }
}

function toggleFavorite(id) {
    const index = favoriteIds.indexOf(id);

    if (index === -1) {
        favoriteIds.push(id);
    } else {
        favoriteIds.splice(index, 1);
    }

    renderFavorites();
}

searchInput.addEventListener("input", renderProducts);

for (const button of categoryButtons) {
    button.addEventListener("click", function () {
        setCategory(button.dataset.category);
    });
}

document.getElementById("clear-filters").addEventListener("click", function () {
    searchInput.value = "";
    setCategory("all");
    searchInput.focus();
});

productsGrid.addEventListener("click", function (event) {
    const button = event.target.closest("[data-favorite]");

    if (button) {
        toggleFavorite(button.dataset.favorite);
    }
});

favoriteList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-remove]");

    if (button) {
        toggleFavorite(button.dataset.remove);
    }
});

favoritesToggle.addEventListener("click", function () {
    const isOpen = favoritesPanel.classList.toggle("is-open");
    favoritesToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
        favoritesPanel.scrollIntoView({ block: "nearest" });
    }
});

renderProducts();

// Home links directly to individual products.
const linkedProduct = document.getElementById(window.location.hash.slice(1));

if (linkedProduct && productsGrid.contains(linkedProduct)) {
    linkedProduct.scrollIntoView();
}
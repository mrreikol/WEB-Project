const searchInput = document.getElementById("product-search");
const sortInput = document.getElementById("product-sort");
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
const clearFavorites = document.getElementById("clear-favorites");
const sizeDialog = document.getElementById("size-dialog");
const sizeSelect = document.getElementById("bag-add-size");
const sizeDialogError = document.getElementById("size-dialog-error");
const catalogError = document.getElementById("catalog-error");

const favoritesKey = "msq.favoriteIds";
let favoriteIds = loadFavorites();
let selectedCategory = "all";
let selectedProduct;

function loadFavorites() {
    return [...new Set(loadSavedList(favoritesKey).filter(id => findProduct(id)))];
}

function getVisibleProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const visibleProducts = products.filter(product => product.matches(search, selectedCategory));

    if (sortInput.value === "price-asc") {
        visibleProducts.sort((first, second) => first.price - second.price);
    } else if (sortInput.value === "price-desc") {
        visibleProducts.sort((first, second) => second.price - first.price);
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
            <p class="product-price">${product.formattedPrice()}</p>
            <p class="product-sizes">${product.sizeLabel()}</p>
            <div class="product-actions">
                <button type="button" class="btn btn-dark" data-add="${product.id}"
                        aria-label="Add ${product.name} to bag">Add to bag</button>
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
    productsGrid.replaceChildren(...visibleProducts.map(createProductCard));
    productCount.textContent = "Showing " + visibleProducts.length + " of " + products.length + " products";
    noProducts.hidden = visibleProducts.length > 0;
}

function setCategory(category) {
    selectedCategory = category;

    for (const button of categoryButtons) {
        button.setAttribute("aria-pressed", String(button.dataset.category === category));
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
                <p>${product.formattedPrice()}</p>
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
    clearFavorites.hidden = favoriteIds.length === 0;

    for (const button of productsGrid.querySelectorAll("[data-favorite]")) {
        const isFavorite = favoriteIds.includes(button.dataset.favorite);
        button.setAttribute("aria-pressed", String(isFavorite));
        button.textContent = isFavorite ? "♥" : "♡";
    }
}

function saveFavorites() {
    const saved = saveList(favoritesKey, favoriteIds);
    catalogError.textContent = saved ? "" : "Favorites could not be saved in this browser.";
    catalogError.hidden = saved;
    renderFavorites();
}

function toggleFavorite(id) {
    const index = favoriteIds.indexOf(id);

    if (index === -1) {
        favoriteIds.push(id);
    } else {
        favoriteIds.splice(index, 1);
    }

    saveFavorites();
}

function renderBagCount() {
    const count = loadBag().reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("bag-count").textContent = count;
}

function addToShoppingBag(product, size, errorMessage) {
    const bag = loadBag();
    addBagItem(bag, product.id, size);

    if (saveList(bagStorageKey, bag)) {
        if (sizeDialog.open) {
            sizeDialog.close();
        }
        window.location.assign("bag.html");
        return;
    }

    errorMessage.textContent = "Your bag could not be saved. Allow browser storage and try again.";
    errorMessage.hidden = false;
}

function openSizeDialog(product) {
    selectedProduct = product;
    document.getElementById("size-dialog-title").textContent = product.name;
    document.getElementById("size-dialog-price").textContent = product.formattedPrice();
    sizeSelect.replaceChildren(new Option("Select a size", ""));
    sizeSelect.options[0].disabled = true;

    for (const size of product.sizes) {
        sizeSelect.add(new Option(size, size));
    }

    sizeSelect.value = "";
    sizeDialogError.hidden = true;
    sizeDialog.showModal();
}

searchInput.addEventListener("input", renderProducts);
sortInput.addEventListener("change", renderProducts);

for (const button of categoryButtons) {
    button.addEventListener("click", function () {
        setCategory(button.dataset.category);
    });
}

document.getElementById("clear-filters").addEventListener("click", function () {
    searchInput.value = "";
    sortInput.value = "default";
    setCategory("all");
    searchInput.focus();
});

productsGrid.addEventListener("click", function (event) {
    const favoriteButton = event.target.closest("[data-favorite]");
    const addButton = event.target.closest("[data-add]");

    if (favoriteButton) {
        toggleFavorite(favoriteButton.dataset.favorite);
    }

    if (addButton) {
        const product = findProduct(addButton.dataset.add);

        if (product.sizes.length === 1) {
            addToShoppingBag(product, product.sizes[0], catalogError);
        } else {
            openSizeDialog(product);
        }
    }
});

document.getElementById("bag-add-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (selectedProduct?.hasSize(sizeSelect.value)) {
        addToShoppingBag(selectedProduct, sizeSelect.value, sizeDialogError);
    }
});

document.getElementById("size-dialog-cancel").addEventListener("click", function () {
    sizeDialog.close();
});

favoriteList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-remove]");

    if (button) {
        toggleFavorite(button.dataset.remove);
    }
});

clearFavorites.addEventListener("click", function () {
    favoriteIds = [];
    saveFavorites();
});

favoritesToggle.addEventListener("click", function () {
    const isOpen = favoritesPanel.classList.toggle("is-open");
    favoritesToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
        favoritesPanel.scrollIntoView({ block: "nearest" });
    }
});

window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        favoriteIds = loadFavorites();
        renderFavorites();
        renderBagCount();
    }
});

window.addEventListener("storage", function (event) {
    if (event.key === favoritesKey || event.key === null) {
        favoriteIds = loadFavorites();
        renderFavorites();
    }
    if (event.key === bagStorageKey || event.key === null) {
        renderBagCount();
    }
});

renderProducts();
renderFavorites();
renderBagCount();

function scrollToLinkedProduct() {
    const linkedProduct = document.getElementById(window.location.hash.slice(1));
    if (linkedProduct && productsGrid.contains(linkedProduct)) {
        linkedProduct.scrollIntoView();
    }
}

scrollToLinkedProduct();
window.addEventListener("hashchange", scrollToLinkedProduct);

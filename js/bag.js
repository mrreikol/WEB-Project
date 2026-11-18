const bagItems = document.getElementById("bag-items");
const emptyBag = document.getElementById("empty-bag");
const bagContent = document.getElementById("bag-content");
const bagTotal = document.getElementById("bag-total");
const orderLink = document.getElementById("whatsapp-order");
const clearBagButton = document.getElementById("clear-bag");
const bagError = document.getElementById("bag-error");

function createBagRow(item, index) {
    const product = findProduct(item.id);
    const row = document.createElement("li");
    const sizeOptions = product.sizes.map(size =>
        `<option value="${size}"${size === item.size ? " selected" : ""}>${size}</option>`
    ).join("");
    const sizeControl = product.sizes.length === 1 ? '<span class="bag-size-text">One size</span>' :
        `<div class="bag-size">
            <label class="form-label" for="bag-size-${index}">Size</label>
            <select class="form-select" id="bag-size-${index}" data-action="size"
                    aria-label="Size for ${product.name} (${item.size})">${sizeOptions}</select>
        </div>`;

    row.className = "bag-row";
    row.dataset.id = item.id;
    row.dataset.size = item.size;
    row.innerHTML = `
        <img class="bag-photo" src="${product.image}" alt="${product.alt}">
        <div class="bag-item-details">
            <h3><a href="catalog.html#${product.id}">${product.name}</a></h3>
            ${sizeControl}
        </div>
        <div class="bag-quantity" role="group" aria-label="Quantity for ${product.name} (${item.size})">
            <button class="btn btn-outline-dark" type="button" data-action="decrease"
                    aria-label="Decrease quantity of ${product.name} (${item.size})"
                    ${item.quantity === 1 ? " disabled" : ""}>−</button>
            <span class="bag-quantity-value">${item.quantity}</span>
            <button class="btn btn-outline-dark" type="button" data-action="increase"
                    aria-label="Increase quantity of ${product.name} (${item.size})"
                    ${item.quantity === maxBagQuantity ? " disabled" : ""}>+</button>
        </div>
        <div class="bag-item-price">
            <strong>${formatPrice(product.price * item.quantity)}</strong>
            <button type="button" class="btn btn-outline-dark" data-action="remove"
                    aria-label="Remove ${product.name} (${item.size})">Remove</button>
        </div>
    `;
    return row;
}

function renderBag(bag) {
    bagItems.replaceChildren(...bag.map(createBagRow));
    emptyBag.hidden = bag.length > 0;
    bagContent.hidden = bag.length === 0;
    const total = bag.reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);
    bagTotal.textContent = formatPrice(total);

    if (bag.length) {
        orderLink.href = buildOrderLink(bag);
    } else {
        orderLink.removeAttribute("href");
    }
}

function restoreBagFocus(id, size, action) {
    const matchingRow = [...bagItems.children].find(row => row.dataset.id === id && row.dataset.size === size);
    const control = matchingRow?.querySelector(`[data-action="${action}"]:enabled`);
    const nearbyControl = matchingRow?.querySelector("[data-action]:enabled") ||
        bagItems.querySelector("[data-action]:enabled") || emptyBag.querySelector("a");
    (control || nearbyControl).focus({ preventScroll: true });
}

function updateBag(control) {
    const row = control.closest(".bag-row");
    const { id, size } = row.dataset;
    const action = control.dataset.action;
    const bag = loadBag();
    const index = bag.findIndex(item => item.id === id && item.size === size);

    if (index === -1) {
        renderBag(bag);
        return;
    }

    const item = bag[index];
    let nextSize = size;

    if (action === "size") {
        nextSize = control.value;
        if (!findProduct(id).hasSize(nextSize) || nextSize === size) {
            return;
        }

        const existingIndex = bag.findIndex(line => line.id === id && line.size === nextSize);
        if (existingIndex === -1) {
            item.size = nextSize;
        } else {
            if (bag[existingIndex].quantity + item.quantity > maxBagQuantity) {
                control.value = size;
                bagError.textContent = "You can add up to 99 of each size.";
                bagError.hidden = false;
                return;
            }
            bag[existingIndex].quantity += item.quantity;
            bag.splice(index, 1);
        }
    } else if (action === "remove") {
        bag.splice(index, 1);
    } else if (action === "increase") {
        item.quantity = Math.min(item.quantity + 1, maxBagQuantity);
    } else if (action === "decrease") {
        item.quantity = Math.max(item.quantity - 1, 1);
    }

    if (saveList(bagStorageKey, bag)) {
        bagError.hidden = true;
        renderBag(bag);
        restoreBagFocus(id, nextSize, action);
    } else {
        if (action === "size") {
            control.value = size;
        }
        bagError.textContent = "Your shopping bag could not be updated. Please try again.";
        bagError.hidden = false;
    }
}

bagItems.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (button) {
        updateBag(button);
    }
});

bagItems.addEventListener("change", function (event) {
    if (event.target.matches("select[data-action]")) {
        updateBag(event.target);
    }
});

clearBagButton.addEventListener("click", function () {
    if (!saveList(bagStorageKey, [])) {
        bagError.textContent = "Your shopping bag could not be cleared. Please try again.";
        bagError.hidden = false;
        return;
    }

    bagError.hidden = true;
    renderBag([]);
    emptyBag.querySelector("a").focus({ preventScroll: true });
});

window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        renderBag(loadBag());
    }
});

window.addEventListener("storage", function (event) {
    if (event.key === bagStorageKey || event.key === null) {
        renderBag(loadBag());
    }
});

renderBag(loadBag());

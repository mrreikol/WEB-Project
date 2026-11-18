const arrivalsGrid = document.getElementById("arrivals-grid");
const arrivalsStatus = document.getElementById("arrivals-status");
const arrivalsRetry = document.getElementById("arrivals-retry");

const imagesApi = "https://api.github.com/repos/mrreikol/WEB-Project/contents/images";
const remoteImagesRoot = "https://raw.githubusercontent.com/mrreikol/WEB-Project/main/images/";
const originalArrivalIds = ["chocolate-cardigan", "graphite-jacket", "indigo-jeans"];

async function fetchJson(url, signal) {
    const response = await fetch(url, { signal });
    if (!response.ok) {
        throw new Error("Request failed: " + response.status);
    }
    return response.json();
}

async function getArrivalCards(signal) {
    const files = await fetchJson(imagesApi, signal);
    if (!Array.isArray(files)) {
        throw new Error("Invalid image list.");
    }

    const remoteFiles = new Map();
    for (const file of files) {
        if (file?.type === "file" && typeof file.name === "string" &&
            file.download_url === remoteImagesRoot + file.name) {
            remoteFiles.set(file.name, file.download_url);
        }
    }

    const selectionUrl = remoteFiles.get("new-arrivals.json");
    const ids = selectionUrl ? await fetchJson(selectionUrl, signal) : originalArrivalIds;
    if (!Array.isArray(ids) || !ids.every(id => typeof id === "string")) {
        throw new Error("Invalid new arrivals selection.");
    }

    const cards = [];
    for (const id of new Set(ids)) {
        const product = findProduct(id);
        const imageUrl = product && remoteFiles.get(product.image.split("/").pop());
        if (imageUrl) {
            cards.push({ product, imageUrl });
        }
    }

    return cards;
}

function createArrivalCard({ product, imageUrl }) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
        <div class="product-photo">
            <img loading="lazy">
            <span class="new-label">New</span>
        </div>
        <h3></h3>
        <p class="product-description"></p>
        <p class="product-price"></p>
        <p class="product-sizes"></p>
        <a class="btn btn-outline-dark">View in catalog</a>
    `;

    const photo = card.querySelector("img");
    photo.alt = product.alt;
    if (imageUrl !== product.image) {
        photo.addEventListener("error", () => { photo.src = product.image; }, { once: true });
    }
    photo.src = imageUrl;
    card.querySelector("h3").textContent = product.name;
    card.querySelector(".product-description").textContent = product.description;
    card.querySelector(".product-price").textContent = product.formattedPrice();
    card.querySelector(".product-sizes").textContent = product.sizeLabel();
    card.querySelector("a").href = "catalog.html#" + product.id;
    return card;
}

function showArrivals(state, message, cards = []) {
    arrivalsStatus.dataset.state = state;
    arrivalsStatus.textContent = message;
    arrivalsStatus.classList.toggle("visually-hidden", state === "success");
    arrivalsRetry.hidden = state !== "error";
    arrivalsGrid.setAttribute("aria-busy", String(state === "loading"));
    arrivalsGrid.replaceChildren(...cards.map(createArrivalCard));
    arrivalsGrid.hidden = cards.length === 0;
}

async function loadArrivals() {
    showArrivals("loading", "Loading new arrivals…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const cards = await getArrivalCards(controller.signal);
        if (cards.length) {
            showArrivals("success", "New arrivals loaded.", cards);
        } else {
            showArrivals("empty", "No new arrivals yet. You can still browse the full catalog.");
        }
    } catch {
        const cards = originalArrivalIds.map(id => {
            const product = findProduct(id);
            return { product, imageUrl: product.image };
        });
        showArrivals("error", "Could not load new arrivals. Showing the saved selection.", cards);
    } finally {
        clearTimeout(timeout);
    }
}

arrivalsRetry.addEventListener("click", loadArrivals);
loadArrivals();

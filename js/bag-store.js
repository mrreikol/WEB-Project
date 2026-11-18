const bagStorageKey = "msq.shoppingBag";
const maxBagQuantity = 99;
const storeWhatsApp = "https://wa.me/77787777674";

function loadBag() {
    const bag = [];

    for (const entry of loadSavedList(bagStorageKey)) {
        const product = findProduct(entry?.id);

        if (!product || !product.hasSize(entry.size) ||
            !Number.isInteger(entry.quantity) || entry.quantity < 1) {
            continue;
        }

        addBagItem(bag, product.id, entry.size, entry.quantity);
    }

    return bag;
}

function addBagItem(bag, id, size, quantity = 1) {
    const existing = bag.find(item => item.id === id && item.size === size);

    if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, maxBagQuantity);
    } else {
        bag.push({ id, size, quantity: Math.min(quantity, maxBagQuantity) });
    }
}

function buildOrderLink(bag) {
    const lines = ["Здравствуйте! Хочу оформить заказ в MSQ Astana:", ""];
    let total = 0;

    for (const item of bag) {
        const product = findProduct(item.id);
        const lineTotal = product.price * item.quantity;
        const size = item.size === "One size" ? "единый размер" : "размер " + item.size;

        lines.push(`• ${product.name}, ${size} × ${item.quantity} — ${formatPrice(lineTotal)}`);
        total += lineTotal;
    }

    lines.push("", "Итого: " + formatPrice(total));
    return storeWhatsApp + "?text=" + encodeURIComponent(lines.join("\n"));
}

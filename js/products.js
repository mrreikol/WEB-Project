const clothingSizes = ["S", "M", "L", "XL", "2XL"];
const priceFormat = new Intl.NumberFormat("en-US");

function formatPrice(amount) {
    return priceFormat.format(amount) + " ₸";
}

class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.image = data.image;
        this.alt = data.alt;
        this.description = data.description;
        this.price = data.price;
        this.sizes = data.sizes;
    }

    matches(search, category) {
        return this.name.toLowerCase().includes(search) &&
            (category === "all" || this.category === category);
    }

    formattedPrice() {
        return formatPrice(this.price);
    }

    sizeLabel() {
        return this.sizes.length === 1 ? this.sizes[0] : "Sizes: " + this.sizes.join(", ");
    }

    hasSize(size) {
        return this.sizes.includes(size);
    }
}

const products = [
    {
        id: "chocolate-cardigan",
        name: "Chocolate Zip Cardigan",
        category: "knitwear",
        image: "images/cardigan.png",
        alt: "Brown ribbed cardigan with a stand collar and a full zip",
        description: "Ribbed texture, stand collar and full zip.",
        price: 24990,
        sizes: clothingSizes
    },
    {
        id: "chocolate-polo",
        name: "Chocolate Zip Polo",
        category: "polo",
        image: "images/polo.png",
        alt: "Brown short-sleeve ribbed polo with a zip neckline",
        description: "Vertical ribbing and a zip neckline.",
        price: 17990,
        sizes: clothingSizes
    },
    {
        id: "graphite-jacket",
        name: "Graphite Hooded Jacket",
        category: "outerwear",
        image: "images/puffer-jacket.png",
        alt: "Grey quilted jacket with a hood and zip front",
        description: "Quilted jacket with a hood and zip front.",
        price: 44990,
        sizes: clothingSizes
    },
    {
        id: "indigo-jeans",
        name: "Indigo Straight Jeans",
        category: "denim",
        image: "images/jeans.png",
        alt: "Dark indigo straight-leg MSQ jeans with contrast stitching",
        description: "Dark indigo denim and a straight leg.",
        price: 22990,
        sizes: clothingSizes
    },
    {
        id: "brown-sneakers",
        name: "Dark Brown Sneakers",
        category: "shoes",
        image: "images/sneakers.png",
        alt: "Dark brown MSQ lace-up sneakers with white soles",
        description: "Dark brown panels and a white sole.",
        price: 29990,
        sizes: ["39", "40", "41", "42", "43"]
    },
    {
        id: "club-cap",
        name: "MSQ Club Cap",
        category: "accessories",
        image: "images/club-cap.png",
        alt: "Navy MSQ Club baseball cap with an embroidered crest",
        description: "Navy cap with an embroidered crest.",
        price: 9990,
        sizes: ["One size"]
    },
    {
        id: "taupe-ribbed-polo",
        name: "Taupe Ribbed Polo",
        category: "polo",
        image: "images/taupe-ribbed-polo.webp",
        alt: "Light brown ribbed knit polo with long sleeves and three dark buttons",
        description: "Long-sleeve knit polo with a pointed collar and three buttons.",
        price: 23990,
        sizes: clothingSizes
    },
    {
        id: "charcoal-pleated-trousers",
        name: "Charcoal Pleated Trousers",
        category: "trousers",
        image: "images/charcoal-pleated-trousers.webp",
        alt: "Charcoal straight-leg trousers with front pleats and belt loops",
        description: "Tailored straight-leg trousers with front pleats and side pockets.",
        price: 23000,
        sizes: clothingSizes
    },
    {
        id: "light-stripe-trim-tee",
        name: "Oatmeal Stripe-Trim T-Shirt",
        category: "t-shirts",
        image: "images/light-stripe-trim-tee.webp",
        alt: "Light oatmeal crew-neck T-shirt with two thin brown stripes at each sleeve hem",
        description: "Light heathered crew neck with thin stripes at the sleeve hems.",
        price: 14990,
        sizes: clothingSizes
    }
].map(data => new Product(data));

function findProduct(id) {
    return products.find(product => product.id === id);
}

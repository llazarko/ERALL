// Database e produkteve
// Database e produkteve - ME VLERA TË SAKTA të longevity/projection
const products = [
    //------------------------------------------ CATEGORY MESHKUJ ----------------------------------------------------------
    {
        id: 1,
        name: "Sauvage Elixir",
        inspired: "Dior",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 5990,
        rating: 4.5,
        image: "images/dior/dior-sauvage-elixir.webp",
        notes: [
            "Top: Kanellë, Kardamom, Grapefruit",
            "Zemër: Lavender",
            "Bazë: Amber, Patchouli, Licorice",
            "Profile: Spicy, Aromatic, Intense"
        ],
        description: "Sauvage Elixir është një parfum intensiv dhe i fuqishëm për meshkuj me personalitet të fortë...",
        bestseller: true,
        longevity: 92,
        projection: 88,
        images: ["images/dior/dior-sauvage-elixir2.jpg", "images/dior/dior-sauvage-elixir3.webp", "images/dior/dior-sauvage-elixir.webp"]
    },
    {
        id: 2,
        name: "Black Opium",
        inspired: "Yves Saint Laurent",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/ysl/ysl-black-opium.jpg",
        notes: [
            "Top: Pink Pepper, Orange Blossom",
            "Zemër: Coffee, Jasmine",
            "Bazë: Vanilla, Patchouli, Cedar",
            "Profile: Sweet, Gourmand, Seductive"
        ],
        description: "Black Opium është një parfum modern dhe sensual për femra...",
        bestseller: true,
        longevity: 85,
        projection: 82,
        images: ["images/ysl/ysl-black-opium2.webp", "images/ysl/ysl-black-opium3.webp", "images/ysl/ysl-black-opium.jpg"]
    },
    {
        id: 3,
        name: "Aventus",
        inspired: "Creed",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 6490,
        rating: 5,
        image: "images/creed/creed-aventus.webp",
        notes: [
            "Top: Ananas, Bergamot, Mollë, Rrush i zi",
            "Zemër: Birch, Patchouli, Trëndafil",
            "Bazë: Musk, Lëvore lisi, Vanilje, Ambergris",
            "Profile: Fruity, Smoky, Powerful"
        ],
        description: "Aventus është një parfum ikonë që simbolizon suksesin, fuqinë dhe luksin...",
        bestseller: true,
        longevity: 95,
        projection: 92,
        images: ["images/creed/creed-aventus2.webp", "images/creed-aventus3.jpg", "images/creed/creed-aventus.webp"]
    },
    {
        id: 5,
        name: "Donna Born in Roma",
        inspired: "Valentino",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/valentino/valentino-donna-born-in-roma.webp",
        notes: [
            "Top: Blackcurrant, Bergamot",
            "Zemër: Jasmine Sambac",
            "Bazë: Bourbon Vanilla, Cashmeran",
            "Profile: Floral, Sweet, Elegant"
        ],
        description: "Donna Born in Roma është një parfum modern dhe elegant për femra urbane...",
        bestseller: true,
        longevity: 82,
        projection: 75,
        images: ["images/valentino/valentino-donna-born-in-roma1.jpg", "images/valentino/valentino-donna-born-in-roma2.webp", "images/valentino/valentino-donna-born-in-roma.webp"]
    },
    {
        id: 6,
        name: "Oud Wood",
        inspired: "Tom Ford",
        category: "unisex",
        categoryDisplay: "Unisex",
        price: 6490,
        rating: 5,
        image: "images/tomford/tf-oud-wood.jpg",
        notes: [
            "Top: Piper rozë, Kardamom",
            "Zemër: Oud, Drurë ekzotikë",
            "Bazë: Vanilje, Amber, Tonka Bean",
            "Profile: Woody, Warm, Luxurious"
        ],
        description: "Oud Wood është një parfum luksoz dhe i rafinuar...",
        bestseller: true,
        longevity: 88,
        projection: 80,
        images: ["images/tomford/tf-oud-wood1.jpg", "images/tomford/tf-oud-wood2.jpg", "images/tomford/tf-oud-wood.jpg"]
    },
    {
        id: 7,
        name: "Bleu de Chanel",
        inspired: "Chanel",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 5990,
        rating: 5,
        image: "images/channel/bleu-de-chanel.webp",
        notes: [
            "Top: Grapefruit, Lemon, Mint",
            "Zemër: Ginger, Nutmeg, Jasmine",
            "Bazë: Incense, Sandalwood, Cedar",
            "Profile: Fresh, Woody, Aromatic"
        ],
        description: "Bleu de Chanel është një parfum i pastër, elegant dhe shumë modern për meshkuj...",
        bestseller: true,
        longevity: 80,
        projection: 76,
        images: ["images/channel/bleu-de-chanel1.webp", "images/channel/bleu-de-chanel2.webp", "images/channel/bleu-de-chanel.webp"]
    },
    {
        id: 8,
        name: "Libre",
        inspired: "Yves Saint Laurent",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/ysl/ysl-libre.jpg",
        notes: [
            "Top: Lavender, Mandarin",
            "Zemër: Orange Blossom, Jasmine",
            "Bazë: Vanilla, Musk, Cedar",
            "Profile: Floral, Warm, Confident"
        ],
        description: "Libre është një parfum që simbolizon lirinë dhe fuqinë femërore...",
        bestseller: true,
        longevity: 84,
        projection: 78,
        images: ["images/ysl/ysl-libre1.webp", "images/ysl/ysl-libre2.jpg", "images/ysl/ysl-libre.jpg"]
    },
    {
        id: 12,
        name: "Lost Cherry",
        inspired: "Tom Ford",
        category: "unisex",
        categoryDisplay: "Unisex",
        price: 6990,
        rating: 5,
        image: "images/tomford/lost-cherry.jpg",
        notes: [
            "Top: Qershi e zezë, Bajame",
            "Zemër: Qershi, Trëndafil turk",
            "Bazë: Tonka Bean, Vanilje, Peru Balsam",
            "Profile: Sweet, Fruity, Gourmand"
        ],
        description: "Lost Cherry është një parfum provokues dhe unik...",
        bestseller: true,
        longevity: 80,
        projection: 77,
        images: ["images/tomford/lost-cherry1.webp", "images/tomford/lost-cherry2.avif", "images/tomford/lost-cherry.jpg"]
    },
    {
        id: 13,
        name: "J’adore",
        inspired: "Dior",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/dior/jadore.webp",
        notes: [
            "Top: Bergamot, Mandarin, Pear",
            "Zemër: Jasmine, Ylang-Ylang, Rose",
            "Bazë: Musk, Vanilla, Cedar",
            "Profile: Floral, Elegant, Luxurious"
        ],
        description: "J’adore është një parfum ikonik dhe shumë elegant për femra...",
        bestseller: true,
        longevity: 82,
        projection: 74,
        images: ["images/dior/jadore1.webp", "images/dior/jadore2.jpg", "images/dior/jadore.webp"]
    },
    {
        id: 14,
        name: "Uomo Born In Roma",
        inspired: "Valentino",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 5990,
        rating: 4,
        image: "images/valentino/uomo-born-in-roma.webp",
        notes: [
            "Top: Mineral Notes, Violet Leaf",
            "Zemër: Sage",
            "Bazë: Smoked Vetiver",
            "Profile: Woody, Fresh, Urban"
        ],
        description: "Uomo Born in Roma është një parfum modern dhe karizmatik për meshkuj...",
        bestseller: true,
        longevity: 78,
        projection: 75,
        images: ["images/valentino/uomo-born-in-roma1.jpg", "images/valentino/uomo-born-in-roma2.png", "images/valentino/uomo-born-in-roma.webp"]
    },
    {
        id: 15,
        name: "Aventus For Her",
        inspired: "Creed",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 6490,
        rating: 5,
        image: "images/creed/aventus-for-her.webp",
        notes: [
            "Top: Mollë jeshile, Bergamot, Piper rozë",
            "Zemër: Trëndafil, Sandalwood, Styrax",
            "Bazë: Musk, Patchouli, Amber",
            "Profile: Fruity, Floral, Elegant"
        ],
        description: "Aventus For Her është një parfum luksoz dhe i fuqishëm për femra ambicioze...",
        bestseller: true,
        longevity: 84,
        projection: 81,
        images: ["images/creed/aventus-for-her1.webp", "images/creed/aventus-for-her2.webp", "images/creed/aventus-for-her.webp"]
    },
    {
        id: 16,
        name: "Tobacco Vanille",
        inspired: "Tom Ford",
        category: "unisex",
        categoryDisplay: "Unisex",
        price: 6990,
        rating: 5,
        image: "images/tomford/tobacco-vanille.webp",
        notes: [
            "Top: Gjethe duhani, Erëza",
            "Zemër: Vanilje, Kakao",
            "Bazë: Tonka Bean, Fruta të thata",
            "Profile: Sweet, Spicy, Tobacco"
        ],
        description: "Tobacco Vanille është një parfum i ngrohtë dhe shumë intensiv...",
        bestseller: true,
        longevity: 88,
        projection: 84,
        images: ["images/tomford/tobacco-vanille1.jpg", "images/tomford/tobacco-vanille2.webp", "images/tomford/tobacco-vanille.webp"]
    },
    {
        id: 17,
        name: "Y EDT",
        inspired: "Yves Saint Laurent",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 5490,
        rating: 5,
        image: "images/ysl/y-edt.jpg",
        notes: [
            "Top: Apple, Ginger, Bergamot",
            "Zemër: Sage, Juniper",
            "Bazë: Amberwood, Vetiver",
            "Profile: Fresh, Aromatic, Clean"
        ],
        description: "Y EDT është një parfum i freskët dhe energjik për meshkuj modernë...",
        bestseller: true,
        longevity: 65,
        projection: 70,
        images: ["images/ysl/y-edt1.webp", "images/ysl/y-edt2.webp", "images/ysl/y-edt.jpg"]
    },
    {
        id: 18,
        name: "Coco Mademoiselle",
        inspired: "Chanel",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 6490,
        rating: 5,
        image: "images/channel/coco-mademoiselle.webp",
        notes: [
            "Top: Orange, Bergamot",
            "Zemër: Rose, Jasmine",
            "Bazë: Patchouli, Vanilje, Musk",
            "Profile: Floral, Oriental, Elegant"
        ],
        description: "Coco Mademoiselle është një parfum elegant dhe shumë femëror...",
        bestseller: true,
        longevity: 86,
        projection: 79,
        images: ["images/channel/coco-mademoiselle1.jpg", "images/channel/coco-mademoiselle2.webp", "images/channel/coco-mademoiselle.webp"]
    },
    {
        id: 22,
        name: "Hypnotic Poison",
        inspired: "Dior",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/dior/hypnotic-poison.jpg",
        notes: [
            "Top: Bajame e hidhur, Licorice",
            "Zemër: Jasmine Sambac, Orange Blossom",
            "Bazë: Vanilje, Tonka Bean, Sandalwood",
            "Profile: Sweet, Gourmand, Addictive"
        ],
        description: "Hypnotic Poison është një parfum misterioz dhe joshës...",
        bestseller: true,
        longevity: 83,
        projection: 78,
        images: ["images/dior/hypnotic-poison1.webp", "images/dior/hypnotic-poison2.webp", "images/dior/hypnotic-poison.jpg"]
    },
    {
        id: 23,
        name: "Donna Born in Roma Pink PP",
        inspired: "Valentino",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 6490,
        rating: 5,
        image: "images/valentino/donna-pink-pp.avif",
        notes: [
            "Top: Mandarin",
            "Zemër: Orange Blossom, Jasmine",
            "Bazë: Vanilla, Musk",
            "Profile: Floral, Sweet, Bold"
        ],
        description: "Pink PP është një version më i gjallë dhe energjik i Donna Born in Roma...",
        bestseller: true,
        longevity: 81,
        projection: 74,
        images: ["images/valentino/donna-pink-pp1.jpg", "images/valentino/donna-pink-pp2.jpg", "images/valentino/donna-pink-pp.avif"]
    },
    {
        id: 24,
        name: "Green Irish Tweed",
        inspired: "Creed",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 6490,
        rating: 5,
        image: "images/creed/green-irish-tweed.webp",
        notes: [
            "Top: Lemon Verbena, Iris",
            "Zemër: Violet Leaf",
            "Bazë: Sandalwood, Ambergris",
            "Profile: Fresh, Green, Classic"
        ],
        description: "Green Irish Tweed është një parfum klasik dhe shumë elegant...",
        bestseller: true,
        longevity: 79,
        projection: 75,
        images: ["images/creed/green-irish-tweed1.webp", "images/creed/green-irish-tweed2.webp", "images/creed/green-irish-tweed.webp"]
    },
    {
        id: 25,
        name: "La Nuit de L’Homme",
        inspired: "Yves Saint Laurent",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 5990,
        rating: 5,
        image: "images/ysl/la-nuit-de-lhomme.webp",
        notes: [
            "Top: Cardamom",
            "Zemër: Lavender, Bergamot",
            "Bazë: Cedarwood, Vetiver",
            "Profile: Spicy, Smooth, Seductive"
        ],
        description: "La Nuit de L’Homme është një parfum sensual dhe elegant për meshkuj...",
        bestseller: true,
        longevity: 82,
        projection: 79,
        images: ["images/ysl/la-nuit-de-lhomme1.jpg", "images/ysl/la-nuit-de-lhomme2.webp", "images/ysl/la-nuit-de-lhomme.webp"]
    },
    {
        id: 26,
        name: "Noir de Noir",
        inspired: "Tom Ford",
        category: "unisex",
        categoryDisplay: "Unisex",
        price: 6990,
        rating: 5,
        image: "images/tomford/noir-de-noir.avif",
        notes: [
            "Top: Safran",
            "Zemër: Trëndafil i zi",
            "Bazë: Patchouli, Vanilje",
            "Profile: Dark, Floral, Oriental"
        ],
        description: "Noir de Noir është një parfum i errët, sensual dhe misterioz...",
        bestseller: false,
        longevity: 86,
        projection: 82,
        images: ["images/tomford/noir-de-noir1.jpg", "images/tomford/noir-de-noir2.webp", "images/tomford/noir-de-noir.avif"]
    },
    {
        id: 27,
        name: "Chance Eau Tendre",
        inspired: "Chanel",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/channel/chance-eau-tendre.png",
        notes: [
            "Top: Grapefruit, Quince",
            "Zemër: Jasmine, Hyacinth",
            "Bazë: Musk, Iris, Amber",
            "Profile: Fresh, Fruity, Soft"
        ],
        description: "Chance Eau Tendre është një parfum i lehtë, i freskët dhe romantik...",
        bestseller: true,
        longevity: 75,
        projection: 72,
        images: ["images/channel/chance-eau-tendre1.jpg", "images/channel/chance-eau-tendre2.webp", "images/channel/chance-eau-tendre.png"]
    },
    {
        id: 30,
        name: "Pure Poison",
        inspired: "Dior",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 5990,
        rating: 5,
        image: "images/dior/pure-poison.webp",
        notes: [
            "Top: Bergamot, Mandarin",
            "Zemër: Orange Blossom, Jasmine",
            "Bazë: Sandalwood, Amber, Musk",
            "Profile: Floral, White Floral, Sensual"
        ],
        description: "Pure Poison është një parfum elegant dhe sensual...",
        bestseller: false,
        longevity: 78,
        projection: 74,
        images: ["images/dior/pure-poison1.webp", "images/dior/pure-poison2.webp", "images/dior/pure-poison.webp"]
    },
    {
        id: 31,
        name: "Uomo Born in Roma Intense",
        inspired: "Valentino",
        category: "meshkuj",
        categoryDisplay: "Për Meshkuj",
        price: 6490,
        rating: 5,
        image: "images/valentino/uomo-born-in-roma-intense.jpg",
        notes: [
            "Top: Vanilla Bourbon",
            "Zemër: Lavender",
            "Bazë: Vetiver",
            "Profile: Sweet, Aromatic, Intense"
        ],
        description: "Uomo Born in Roma Intense është versioni më i fuqishëm...",
        bestseller: true,
        longevity: 88,
        projection: 85,
        images: ["images/valentino/uomo-born-in-roma-intense1.jpg", "images/valentino/uomo-born-in-roma-intense2.avif", "images/valentino/uomo-born-in-roma-intense.jpg"]
    },
    {
        id: 32,
        name: "Soleil Blanc",
        inspired: "Tom Ford",
        category: "unisex",
        categoryDisplay: "Unisex",
        price: 6490,
        rating: 5,
        image: "images/tomford/soleil-blanc.jpg",
        notes: [
            "Top: Bergamot, Pistachio, Cardamom",
            "Zemër: Ylang-Ylang, Jasmine, Tuberose",
            "Bazë: Kokos, Amber, Tonka Bean",
            "Profile: Solar, Creamy, Exotic"
        ],
        description: "Soleil Blanc është një parfum veror dhe luksoz...",
        bestseller: true,
        longevity: 76,
        projection: 72,
        images: ["images/tomford/soleil-blanc1.jpg", "images/tomford/soleil-blanc2.jpg", "images/tomford/soleil-blanc.jpg"]
    },
    {
        id: 33,
        name: "Spring Flower",
        inspired: "Creed",
        category: "femra",
        categoryDisplay: "Për Femra",
        price: 6490,
        rating: 5,
        image: "images/creed/spring-flower.webp",
        notes: [
            "Top: Mollë, Pjeshkë, Melon",
            "Zemër: Jasmine, Trëndafil",
            "Bazë: Musk, Amber",
            "Profile: Fresh, Fruity, Feminine"
        ],
        description: "Spring Flower është një parfum i gjallë dhe femëror...",
        bestseller: false,
        longevity: 72,
        projection: 68,
        images: ["images/creed/spring-flower1.webp", "images/creed/spring-flower2.webp", "images/creed/spring-flower.webp"]
    },
    
    //------------------------------------------ SETET ----------------------------------------------------------
    {
        id: 40,
        name: "Christian Dior 4 In 1",
        inspired: "Dior",
        category: "set",
        categoryDisplay: "Set Dior",
        price: 5990,
        rating: 5,
        image: "images/z.set/dior.webp",
        notes: ["4 aroma", "Set praktik", "Ideale për dhuratë", "Cilësi premium"],
        description: "Set ideal për ata që duan të provojnë disa aroma në një paketë të vetme...",
        bestseller: true,
        longevity: 85,
        projection: 80,
        images: ["images/z.set/dior.webp"]
    },
    {
        id: 402,
        name: "Louis Vuitton Set 4 In 1",
        inspired: "Louis Vuitton",
        category: "set",
        categoryDisplay: "Set Louis Vuitton",
        price: 6490,
        rating: 5,
        image: "images/z.set/lv.jpg",
        notes: ["4 aroma premium", "Set luksoz", "Paketim elegant", "Dhuratë perfekte"],
        description: "Set modern dhe luksoz që ofron shumëllojshmëri aromash elegante...",
        bestseller: true,
        longevity: 84,
        projection: 78,
        images: ["images/z.set/lv.jpg"]
    },
    {
        id: 403,
        name: "Creed Aventus Set 4 In 1",
        inspired: "Creed Aventus",
        category: "set",
        categoryDisplay: "Set Creed",
        price: 6990,
        rating: 5,
        image: "images/z.set/creed.webp",
        notes: ["4 aroma Aventus", "Set i kërkuar", "Luksoz", "Karizmatik"],
        description: "Set luksoz i inspiruar nga Aventus, ideal për meshkuj që duan aromë të fortë...",
        bestseller: true,
        longevity: 88,
        projection: 84,
        images: ["images/z.set/creed.webp"]
    },
    {
        id: 404,
        name: "Saint Laurent Set 3 In 1",
        inspired: "Saint Laurent",
        category: "set",
        categoryDisplay: "Set Saint Laurent",
        price: 5490,
        rating: 5,
        image: "images/z.set/ysl.jpg",
        notes: ["3 aroma ikonike", "Set praktik", "Modern", "I kërkuar"],
        description: "Set praktik me 3 aroma ikonike të Saint Laurent...",
        bestseller: true,
        longevity: 80,
        projection: 76,
        images: ["images/z.set/ysl.jpg"]
    }
];

// Funksione për të marrë produktet
function getProductsByCategory(category) {
    if (category === 'all') return products;
    if (category === 'bestsellers') return products.filter(p => p.bestseller);
    if (category === 'luksoz') return products.filter(p => p.category === 'luksoz');
    return products.filter(p => p.category === category);
}

function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function getBestsellerProducts() {
    return products.filter(p => p.bestseller);
}

function getRelatedProducts(currentProductId, category) {
    const currentProduct = getProductById(currentProductId);
    return products
        .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
        .slice(0, 4);
}

// Krijimi i rating stars
function createRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Display products in a container - ME LAZY LOADING
function displayProducts(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsArray.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-beige);">Nuk u gjetën produkte</p>';
        return;
    }
    
    productsArray.forEach(product => {
        const ratingStars = createRatingStars(product.rating);
        
        container.innerHTML += `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onload="this.classList.add('loaded')">
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-inspired">${product.inspired}</p>
                    <div class="product-category-badge">${product.categoryDisplay}</div>
                    
                    <div class="product-notes">
                        ${product.notes.slice(0, 2).map(note => `<span class="note">${note.substring(0, 30)}${note.length > 30 ? '...' : ''}</span>`).join('')}
                    </div>
                    
                    <div class="product-price">${product.price.toLocaleString()} Lekë</div>
                    
                    <div class="product-rating">
                        ${ratingStars}
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Shto në Shportë</button>
                        <a href="product.html?id=${product.id}" class="btn btn-secondary">Shiko</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    addProductEventListeners();
}

// Add event listeners to product buttons
function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = getProductById(productId);
    
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('aromexa-cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.categoryDisplay,
            quantity: 1
        });
    }
    
    localStorage.setItem('aromexa-cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification('Produkti u shtua në shportë!');
}

// Initialize product buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    addProductEventListeners();
});
// Logjika për faqen e produktit

let currentProduct = null;
let currentQuantity = 1;

// Ngarko produktin
function loadProduct(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }
    
    currentProduct = product;
    
    // Update page title
    document.title = `${product.name} - Aromexa`;
    document.getElementById('product-title').textContent = `${product.name} - Aromexa`;
    
    // Update breadcrumbs
    document.getElementById('breadcrumbs').innerHTML = `
        <a href="index.html">Kryefaqja</a> > 
        <a href="shop.html">Dyqani</a> > 
        <a href="shop.html?category=${product.category}">${product.categoryDisplay}</a> > 
        <span>${product.name}</span>
    `;
    
    // Update product info
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-inspired').textContent = product.inspired;
    document.getElementById('product-category-badge').textContent = product.categoryDisplay;
    document.getElementById('product-price').textContent = `${product.price.toLocaleString()} Lekë`;
    document.getElementById('product-description').textContent = product.description;
    
    // Update rating
    document.getElementById('product-rating').innerHTML = `
        ${createRatingStars(product.rating)}
    `;
    
    // Update notes
    const notesContainer = document.getElementById('product-notes');
    notesContainer.innerHTML = product.notes.map(note => 
        `<span class="note">${note}</span>`
    ).join('');
    
    // Update longevity and projection
    document.getElementById('longevity-bar').style.width = `${product.longevity}%`;
    document.getElementById('projection-bar').style.width = `${product.projection}%`;
    document.getElementById('longevity-text').textContent = 
        product.longevity >= 80 ? '10-24 orë' : product.longevity >= 60 ? '8-18 orë' : '4-10 orë';
    document.getElementById('projection-text').textContent = 
        product.projection >= 80 ? 'I fortë' : product.projection >= 60 ? 'Mesatar' : 'I butë';
    
    // Update main image
    document.getElementById('product-main-image').src = product.images[0];
    document.getElementById('product-main-image').alt = product.name;
    
    // Update thumbnails
    const thumbnailsContainer = document.querySelector('.thumbnail-images');
    thumbnailsContainer.innerHTML = product.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeProductImage('${img}')">
            <img src="${img}" alt="${product.name} - Thumbnail ${index + 1}" loading="lazy" onload="this.classList.add('loaded')">
        </div>
    `).join('');
    
    // Load reviews
    loadReviews(product);
    
    // Load related products
    loadRelatedProducts(product.id, product.category);
}

// Ndrysho imazhin e produktit
function changeProductImage(imageUrl) {
    document.getElementById('product-main-image').src = imageUrl;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.remove('active');
        if (thumb.querySelector('img').src === imageUrl) {
            thumb.classList.add('active');
        }
    });
}

// Ndrysho sasinë
function changeQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.getElementById('product-quantity').textContent = currentQuantity;
}

// Shto produktin në shportë
function addProductToCart() {
    if (!currentProduct) return;
    
    const cart = JSON.parse(localStorage.getItem('aromexa-cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += currentQuantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            category: currentProduct.categoryDisplay,
            quantity: currentQuantity
        });
    }
    
    localStorage.setItem('aromexa-cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`Shtuar ${currentQuantity} ${currentProduct.name} në shportë!`);
    
    // Reset quantity
    currentQuantity = 1;
    document.getElementById('product-quantity').textContent = '1';
}

// Blej tani
function buyNow() {
    addProductToCart();
    toggleCart();
}

// Ngarko recenzionet
function loadReviews(product) {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    // Display reviews
    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                    <div>
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${createRatingStars(review.rating)}
                </div>
            </div>
            <div class="review-content">
                ${review.text}
            </div>
        </div>
    `).join('');
}

// Ngarko produktet e ngjashme
function loadRelatedProducts(productId, category) {
    const relatedProducts = getRelatedProducts(productId, category);
    const container = document.getElementById('related-products');
    
    if (!container || relatedProducts.length === 0) return;
    
    displayProducts(relatedProducts, 'related-products');
}

// Initialize product page
if (window.location.pathname.includes('product.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 1;
        loadProduct(productId);
        
        // FAQ toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = answer.classList.contains('open');
                
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('open');
                });
                
                // Toggle icon on all questions
                document.querySelectorAll('.faq-question i').forEach(icon => {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                });
                
                // If clicked question was not open, open it
                if (!isOpen) {
                    answer.classList.add('open');
                    question.querySelector('i').classList.remove('fa-chevron-down');
                    question.querySelector('i').classList.add('fa-chevron-up');
                }
            });
        });
        
        // Size options
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

// Logjika për faqen e dyqanit

let currentCategory = 'all';

// Filtro produktet
function filterProducts(category) {
    currentCategory = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Get products
    const filteredProducts = getProductsByCategory(category);
    
    // Update product count
    const productCount = document.getElementById('product-count');
    if (productCount) {
        productCount.textContent = `${filteredProducts.length} Produkte`;
    }
    
    // Display products
    displayProducts(filteredProducts, 'products-container');
    
    // Show/hide no products message
    const noProducts = document.getElementById('no-products');
    if (noProducts) {
        noProducts.style.display = filteredProducts.length === 0 ? 'block' : 'none';
    }
    
    // Update URL without reloading page
    const url = new URL(window.location);
    url.searchParams.set('category', category);
    window.history.pushState({}, '', url);
}

// Initialize shop page
function initShop() {
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    
    // Filter products
    filterProducts(category);
    
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

// Initialize on page load
if (window.location.pathname.includes('shop.html')) {
    document.addEventListener('DOMContentLoaded', initShop);
}

// Toggle filter menu për mobile
function toggleFilterMenu() {
    const wrapper = document.querySelector('.filter-wrapper');
    if (wrapper) {
        wrapper.classList.toggle('active');
    }
}

// Mbyll menunë e filterit kur klikohet një buton (në mobile)
function closeFilterMenuOnMobile() {
    if (window.innerWidth <= 768) {
        const wrapper = document.querySelector('.filter-wrapper');
        if (wrapper) {
            wrapper.classList.remove('active');
        }
    }
}

// Modifiko funksionin ekzistues filterProducts
// (Shto thirrjen për të mbyllur menunë)
const originalFilterProducts = filterProducts;
filterProducts = function(category) {
    originalFilterProducts(category);
    closeFilterMenuOnMobile();
};

// Mbyll menunë kur klikohet jashtë (në mobile)
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        const wrapper = document.querySelector('.filter-wrapper');
        const filterHeader = document.querySelector('.filter-header');
        
        if (wrapper && filterHeader && !filterHeader.contains(e.target)) {
            wrapper.classList.remove('active');
        }
    }
});

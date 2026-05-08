// search.js - Funksioni i kërkimit

let allProducts = [];

// Funksion për të marrë produktet nga products.js
function loadProductsForSearch() {
    // Nëse products ekziston globalisht, përdor atë
    if (typeof products !== 'undefined') {
        allProducts = products;
        return true;
    }
    
    // Nëse jo, provo të ngarkosh skedarin products.js
    const script = document.createElement('script');
    script.src = 'js/products.js';
    script.onload = function() {
        if (typeof products !== 'undefined') {
            allProducts = products;
            initSearch();
        }
    };
    document.head.appendChild(script);
    
    return false;
}

// Funksioni kryesor i kërkimit
function performSearch(query, resultsContainer) {
    if (!allProducts || allProducts.length === 0) {
        loadProductsForSearch();
        return;
    }
    
    if (query.trim() === '') {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
        return;
    }
    
    const searchText = query.toLowerCase().trim();
    
    // Filter products based on search query
    const filteredProducts = allProducts.filter(product => {
        if (!product) return false;
        
        // Kërko në emër
        if (product.name && product.name.toLowerCase().includes(searchText)) {
            return true;
        }
        
        // Kërko në markë/inspired
        if (product.inspired && product.inspired.toLowerCase().includes(searchText)) {
            return true;
        }
        
        // Kërko në kategori
        if (product.categoryDisplay && product.categoryDisplay.toLowerCase().includes(searchText)) {
            return true;
        }
        
        if (product.category && product.category.toLowerCase().includes(searchText)) {
            return true;
        }
        
        // Kërko në shënime
        if (product.notes && Array.isArray(product.notes)) {
            for (let note of product.notes) {
                if (note && note.toLowerCase().includes(searchText)) {
                    return true;
                }
            }
        }
        
        // Kërko në përshkrim
        if (product.description && product.description.toLowerCase().includes(searchText)) {
            return true;
        }
        
        return false;
    });
    
    // Display results
    displaySearchResults(filteredProducts, searchText, resultsContainer);
}

// Shfaq rezultatet e kërkimit
function displaySearchResults(filteredProducts, query, container) {
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-search-results">
                <i class="fas fa-search"></i>
                <p>Nuk u gjetën rezultate për "${query}"</p>
                <small style="color: var(--color-beige); opacity: 0.7; margin-top: 10px; display: block;">
                    Provoni: Dior, Sauvage, Chanel, YSL, etc.
                </small>
            </div>
        `;
    } else {
        let resultsHTML = '';
        const displayedProducts = filteredProducts.slice(0, 8);
        
        displayedProducts.forEach(product => {
            // Sigurohu që të gjitha vetitë ekzistojnë
            const productName = product.name || 'Produkt pa emër';
            const productImage = product.image || 'images/comingsoon.avif';
            const productCategory = product.categoryDisplay || product.category || 'Pa kategori';
            const productPrice = product.price ? product.price.toLocaleString() + ' Lekë' : 'Pa çmim';
            
            resultsHTML += `
                <div class="search-result-item" onclick="window.location.href='product.html?id=${product.id}'">
                    <img src="${productImage}" alt="${productName}" class="search-result-image" 
                         onerror="this.src='images/comingsoon.avif'">
                    <div class="search-result-info">
                        <div class="search-result-name">${productName}</div>
                        <div class="search-result-category">${productCategory}</div>
                    </div>
                    <div class="search-result-price">${productPrice}</div>
                </div>
            `;
        });
        
        // Add "View All" link
        if (filteredProducts.length > 8) {
            resultsHTML += `
                <div class="search-view-all">
                    <a href="shop.html?search=${encodeURIComponent(query)}" 
                       style="color: var(--color-gold); font-weight: 600;">
                       Shiko të gjitha ${filteredProducts.length} rezultatet
                    </a>
                </div>
            `;
        } else {
            resultsHTML += `
                <div class="search-view-all">
                    <a href="shop.html?search=${encodeURIComponent(query)}" 
                       style="color: var(--color-gold); font-weight: 600;">
                       Shiko të gjitha rezultatet
                    </a>
                </div>
            `;
        }
        
        container.innerHTML = resultsHTML;
    }
    
    container.classList.add('active');
}

// Initialize search functionality
function initSearch() {
    // Ngarko produktet fillimisht
    if (allProducts.length === 0) {
        loadProductsForSearch();
    }
    
    const searchInput = document.getElementById('navbar-search');
    const mobileSearchInput = document.getElementById('mobile-search');
    const searchDropdown = document.getElementById('search-results-dropdown');
    const mobileSearchResults = document.getElementById('mobile-search-results');
    
    if (!searchInput || !searchDropdown) {
        console.log('Elementet e kërkimit nuk u gjetën');
        return;
    }
    
    // Desktop search
    searchInput.addEventListener('input', function() {
        performSearch(this.value, searchDropdown);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
            searchDropdown.classList.remove('active');
        }
    });
    
    searchDropdown.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // Enter key
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && this.value.trim() !== '') {
            window.location.href = `shop.html?search=${encodeURIComponent(this.value.trim())}`;
        }
    });
    
    // Mobile search
    if (mobileSearchInput && mobileSearchResults) {
        mobileSearchInput.addEventListener('input', function() {
            performSearch(this.value, mobileSearchResults);
            mobileSearchResults.classList.add('active');
        });
        
        mobileSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && this.value.trim() !== '') {
                window.location.href = `shop.html?search=${encodeURIComponent(this.value.trim())}`;
            }
        });
    }
    
    console.log('Search initialized with', allProducts.length, 'products');
}

// Toggle mobile search
function toggleMobileSearch() {
    const mobileSearchContainer = document.getElementById('mobileSearchContainer');
    mobileSearchContainer.classList.toggle('active');
    
    if (mobileSearchContainer.classList.contains('active')) {
        document.getElementById('mobile-search').focus();
    } else {
        const mobileResults = document.getElementById('mobile-search-results');
        if (mobileResults) {
            mobileResults.innerHTML = '';
            mobileResults.classList.remove('active');
        }
        document.getElementById('mobile-search').value = '';
    }
}

// Funksion për të shfaqur rezultatet në shop.html
function displaySearchResultsInShop() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (!searchQuery || !allProducts || allProducts.length === 0) return;
    
    const filteredProducts = allProducts.filter(product => {
        if (!product) return false;
        
        const query = searchQuery.toLowerCase();
        
        // Kërko në të gjitha fushat
        return (
            (product.name && product.name.toLowerCase().includes(query)) ||
            (product.inspired && product.inspired.toLowerCase().includes(query)) ||
            (product.categoryDisplay && product.categoryDisplay.toLowerCase().includes(query)) ||
            (product.category && product.category.toLowerCase().includes(query)) ||
            (product.notes && product.notes.some(note => note && note.toLowerCase().includes(query))) ||
            (product.description && product.description.toLowerCase().includes(query))
        );
    });
    
    // Update UI
    const shopHeader = document.querySelector('.shop-header');
    if (shopHeader && !document.querySelector('.search-results-info')) {
        shopHeader.innerHTML += `
            <div class="search-results-info" style="width: 100%; margin-top: 20px; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 10px; border: 1px solid rgba(212, 175, 55, 0.3);">
                <h3 style="color: var(--color-gold); margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-search"></i> Rezultatet e kërkimit për "${searchQuery}"
                </h3>
                <p style="color: var(--color-beige);">
                    U gjetën <strong>${filteredProducts.length}</strong> produkte
                    <a href="shop.html" style="color: var(--color-gold); margin-left: 15px; text-decoration: none;">
                        <i class="fas fa-times"></i> Fshi kërkimin
                    </a>
                </p>
            </div>
        `;
    }
    
    // Display products
    if (filteredProducts.length > 0) {
        // Përdor funksionin ekzistues displayProducts
        if (typeof displayProducts === 'function') {
            displayProducts(filteredProducts, 'products-container');
        } else {
            // Fallback nëse displayProducts nuk ekziston
            const container = document.getElementById('products-container');
            if (container) {
                container.innerHTML = filteredProducts.map(product => `
                    <div class="product-card" data-id="${product.id}">
                        <img src="${product.image || 'images/comingsoon.avif'}" alt="${product.name}" class="product-image">
                        <div class="product-content">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-inspired">${product.inspired || ''}</p>
                            <div class="product-category-badge">${product.categoryDisplay || product.category || ''}</div>
                            <div class="product-price">${product.price ? product.price.toLocaleString() + ' Lekë' : 'Pa çmim'}</div>
                            <div class="product-actions">
                                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Shto në Shportë</button>
                                <a href="product.html?id=${product.id}" class="btn btn-secondary">Shiko Shpejt</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
    } else {
        const container = document.getElementById('products-container');
        if (container) {
            container.innerHTML = `
                <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3 style="color: var(--color-white); margin-bottom: 15px; font-size: 1.5rem;">Nuk u gjetën rezultate</h3>
                    <p style="color: var(--color-beige); margin-bottom: 25px; max-width: 500px; margin-left: auto; margin-right: auto;">
                        Nuk ka rezultate për kërkimin tuaj: <strong>"${searchQuery}"</strong>
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="window.location.href='shop.html'">
                            Shiko të gjitha produktet
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    // Update product count
    const productCount = document.getElementById('product-count');
    if (productCount) {
        productCount.textContent = `${filteredProducts.length} Rezultate`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load products first
    loadProductsForSearch();
    
    // Initialize search after a delay
    setTimeout(() => {
        initSearch();
        
        // Check if we're on shop page with search query
        if (window.location.pathname.includes('shop.html')) {
            displaySearchResultsInShop();
        }
    }, 1000);
});

// Eksporto funksionet për përdorim global
window.performSearch = performSearch;
window.toggleMobileSearch = toggleMobileSearch;
window.displaySearchResultsInShop = displaySearchResultsInShop;

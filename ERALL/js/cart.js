// cart.js - Versioni i pastruar dhe i optimizuar

// Helper functions
function getCart() {
    return JSON.parse(localStorage.getItem('aromexa-cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('aromexa-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Update cart display in sidebar
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-bag"></i>
                <h4>Shporta juaj është e zbrazët</h4>
                <p>Shtoni produkte për të filluar blerjen</p>
                <button class="btn btn-secondary" onclick="toggleCart(); window.location.href='shop.html'" style="margin-top: 1rem;">
                    <i class="fas fa-store"></i> Shiko Produktet
                </button>
            </div>
        `;
        cartTotal.textContent = '0 Lekë';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/comingsoon.avif'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} Lekë</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">${itemTotal.toLocaleString()} Lekë</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    itemsHTML = `
        <div class="cart-summary">
            <div class="summary-item">
                <span>Nëntotali:</span>
                <span>${total.toLocaleString()} Lekë</span>
            </div>
            <div class="summary-item total">
                <span><strong>TOTALI:</strong></span>
                <span><strong>${total.toLocaleString()} Lekë</strong></span>
            </div>
        </div>
        <div class="cart-items-list">
            ${itemsHTML}
        </div>
    `;
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `${total.toLocaleString()} Lekë`;
}

// Update quantity
function updateQuantity(itemId, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity < 1) {
            cart.splice(itemIndex, 1);
            showNotification('Produkti u hoq nga shporta', 'warning');
        } else {
            showNotification('Sasia u përditësua', 'success');
        }
        
        saveCart(cart);
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showNotification('Produkti u hoq nga shporta', 'warning');
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.categoryDisplay,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    showNotification(`${product.name} u shtua në shportë!`, 'success');
}

// Toggle cart sidebar
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartOverlay.classList.contains('active') ? 'hidden' : 'auto';
        updateCartDisplay();
    }
}

// Checkout - redirect to checkout page
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Shporta juaj është e zbrazët!', 'error');
        return;
    }
    window.location.href = 'checkout.html';
}

// Show notification (shtoje këtë funksion)
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    if (type === 'error') {
        notification.style.backgroundColor = '#ff6b6b';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#ffa726';
    } else {
        notification.style.backgroundColor = 'var(--color-gold)';
        notification.style.color = 'var(--color-black)';
    }
    
    notification.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

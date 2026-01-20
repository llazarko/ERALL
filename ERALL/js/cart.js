// Update cart display
// Update cart display
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
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} Lekë</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn plus-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    ${itemTotal.toLocaleString()} Lekë
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Hiq nga shporta">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    // Calculate shipping
    const finalTotal = total;
    
    // Shto totalin përpara produkteve
    itemsHTML = `
        <div class="cart-summary">
            <div class="summary-item">
                <span>Nëntotali:</span>
                <span>${total.toLocaleString()} Lekë</span>
            </div>

            <div class="summary-item total">
                <span><strong>TOTALI:</strong></span>
                <span><strong>${finalTotal.toLocaleString()} Lekë</strong></span>
            </div>
        </div>
        <div class="cart-items-list">
            ${itemsHTML}
        </div>
    `;
    
    cartItems.innerHTML = itemsHTML;
    
    // Update cart total në header
    cartTotal.textContent = `${finalTotal.toLocaleString()} Lekë`;
}

// Funksion i ri për përditësimin e sasisë
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
        updateCartCount();
        updateCartDisplay();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    updateCartDisplay();
    showNotification('Produkti u hoq nga shporta', 'warning');
}

// Show order confirmation modal me detaje të plota
function showOrderConfirmation(orderSummary, cart, totalAmount) {
    // Calculate shipping
    const shippingCost = totalAmount >= 1000 ? 0 : 500;
    const finalTotal = totalAmount + shippingCost;
    
    // Generate order ID
    const orderId = 'ARX-' + Date.now().toString().slice(-6);
    
    // Krijo modal për konfirmim
    const modalHTML = `
        <div class="order-confirmation-modal" id="orderConfirmationModal">
            <div class="order-modal-content">
                <div class="order-modal-header">
                    <h2><i class="fas fa-receipt"></i> Përmbledhja e Porosisë</h2>
                    <button class="modal-close" onclick="closeOrderConfirmation()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="order-modal-body">
                    <!-- Order Details -->
                    <div class="order-details-section">
                        <h3>Detajet e Porosisë</h3>
                        <div class="detail-item">
                            <span class="detail-label">Numri i Porosisë:</span>
                            <span class="detail-value">${orderId}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Data:</span>
                            <span class="detail-value">${new Date().toLocaleDateString('sq-AL')}</span>
                        </div>
                    </div>
                    
                    <!-- Order Summary -->
                    <div class="order-summary-section">
                        <h3>Përmbledhja e Blerjes</h3>
                        
                        <!-- Produktet -->
                        <div class="order-products">
                            ${cart.map(item => `
                                <div class="order-product-item">
                                    <div class="product-info">
                                        <img src="${item.image}" alt="${item.name}" class="product-thumb">
                                        <div>
                                            <div class="product-name">${item.name}</div>
                                            <div class="product-category">${item.category}</div>
                                        </div>
                                    </div>
                                    <div class="product-quantity-price">
                                        <span>${item.quantity} × ${item.price.toLocaleString()} Lekë</span>
                                        <span class="product-total">${(item.price * item.quantity).toLocaleString()} Lekë</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Llogaritja e totalit -->
                        <div class="order-total-calculation">
                            <div class="calculation-row total">
                                <span><strong>TOTALI PËR TË PAGUAR:</strong></span>
                                <span class="final-total"><strong>${finalTotal.toLocaleString()} Lekë</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Order Actions -->
                    <div class="order-actions">
                        <button class="btn btn-secondary" onclick="sendOrderToWhatsApp(${finalTotal})">
                            <i class="fab fa-whatsapp"></i> Dërgo në WhatsApp
                        </button>
                        <button class="btn btn-outline" onclick="closeOrderConfirmation()">
                            <i class="fas fa-edit"></i> Rishiko Porosinë
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .order-confirmation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                z-index: 3000;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
                padding: 20px;
            }
            
            .order-modal-content {
                background-color: var(--color-dark);
                width: 100%;
                max-width: 700px;
                max-height: 90vh;
                border-radius: 12px;
                overflow: hidden;
                border: 2px solid var(--color-gold);
                animation: slideUp 0.5s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .order-modal-header {
                padding: 25px 30px;
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
                border-bottom: 1px solid var(--color-gold);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .order-modal-header h2 {
                color: var(--color-gold);
                font-size: 1.8rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--color-white);
                font-size: 1.5rem;
                cursor: pointer;
                transition: var(--transition);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                background-color: rgba(255, 255, 255, 0.1);
                color: var(--color-gold);
            }
            
            .order-modal-body {
                padding: 30px;
                overflow-y: auto;
                max-height: calc(90vh - 120px);
            }
            
            /* Sections */
            .order-details-section,
            .order-summary-section,
            .order-message,
            .contact-info {
                margin-bottom: 30px;
                padding-bottom: 25px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .order-details-section h3,
            .order-summary-section h3 {
                color: var(--color-gold);
                font-size: 1.3rem;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            /* Order Products */
            .order-products {
                background-color: rgba(255, 255, 255, 0.03);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                max-height: 300px;
                overflow-y: auto;
            }
            
            .order-product-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background-color: rgba(255, 255, 255, 0.02);
                border-radius: 6px;
                margin-bottom: 10px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .order-product-item:last-child {
                margin-bottom: 0;
            }
            
            .product-info {
                display: flex;
                align-items: center;
                gap: 15px;
                flex: 1;
            }
            
            .product-thumb {
                width: 60px;
                height: 60px;
                object-fit: contain;
                background-color: var(--color-black);
                border-radius: 6px;
                padding: 5px;
                border: 1px solid rgba(212, 175, 55, 0.3);
            }
            
            .product-name {
                font-weight: 600;
                color: var(--color-white);
                margin-bottom: 5px;
            }
            
            .product-category {
                font-size: 0.85rem;
                color: var(--color-beige);
                opacity: 0.7;
            }
            
            .product-quantity-price {
                text-align: right;
            }
            
            .product-total {
                font-weight: 600;
                color: var(--color-gold);
                display: block;
                margin-top: 5px;
                font-size: 1.1rem;
            }
            
            /* Total Calculation */
            .order-total-calculation {
                background-color: rgba(212, 175, 55, 0.05);
                border-radius: 8px;
                padding: 20px;
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            
            .calculation-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                padding-bottom: 12px;
                border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
            }
            
            .calculation-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            
            .calculation-row.total {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 2px solid var(--color-gold);
                font-size: 1.2rem;
            }
            
            .final-total {
                color: var(--color-gold);
                font-size: 1.4rem;
            }
            
            .free-shipping {
                background-color: rgba(76, 175, 80, 0.1);
                padding: 8px 12px;
                border-radius: 6px;
                margin: 10px 0;
                border: 1px solid rgba(76, 175, 80, 0.3);
            }
            
            .free-shipping i {
                color: #4CAF50;
                margin-right: 8px;
            }
            
            /* Order Message */
            .order-message h4 {
                color: var(--color-gold);
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .order-message p {
                color: var(--color-beige);
                line-height: 1.6;
                padding: 15px;
                background-color: rgba(255, 255, 255, 0.03);
                border-radius: 8px;
                border-left: 3px solid var(--color-gold);
            }
            
            /* Order Actions */
            .order-actions {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 30px 0;
            }
            
            /* Contact Info */
            .contact-info h4 {
                color: var(--color-gold);
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .contact-methods {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .contact-method {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px;
                background-color: rgba(255, 255, 255, 0.03);
                border-radius: 8px;
                transition: var(--transition);
            }
            
            .contact-method:hover {
                background-color: rgba(212, 175, 55, 0.1);
            }
            
            .contact-method i {
                color: var(--color-gold);
                font-size: 1.2rem;
                width: 30px;
                text-align: center;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .order-modal-content {
                    width: 95%;
                }
                
                .order-actions {
                    grid-template-columns: 1fr;
                }
                
                .order-product-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .product-quantity-price {
                    text-align: left;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
            }
            
            @media (max-width: 480px) {
                .order-modal-body {
                    padding: 20px;
                }
                
                .order-modal-header {
                    padding: 20px;
                }
                
                .order-modal-header h2 {
                    font-size: 1.5rem;
                }
            }
        </style>
    `;
    
    // Add modal to body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Disable scroll on body
    document.body.style.overflow = 'hidden';
}

// Confirm order function
function confirmOrder(orderId, finalTotal) {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Shporta është e zbrazët!', 'error');
        return;
    }
    
    // Save order to localStorage
    const order = {
        id: orderId,
        date: new Date().toLocaleString('sq-AL'),
        timestamp: Date.now(),
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        })),
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: finalTotal >= 1000 ? 0 : 500,
        total: finalTotal,
        status: 'confirmed',
        customer: 'Online Customer',
        contactMethod: 'Will be contacted'
    };
    
    try {
        const existingOrders = JSON.parse(localStorage.getItem('aromexa-orders')) || [];
        existingOrders.push(order);
        localStorage.setItem('aromexa-orders', JSON.stringify(existingOrders));
        
        // Save last order
        localStorage.setItem('last-order', JSON.stringify(order));
        
        // Clear cart
        saveCart([]);
        updateCartCount();
        updateCartDisplay();
        
        // Close modal
        closeOrderConfirmation();
        
        // Close cart sidebar
        const cartOverlay = document.getElementById('cartOverlay');
        if (cartOverlay && cartOverlay.classList.contains('active')) {
            toggleCart();
        }
        
        // Show success message
        showNotification(`✅ Porosia #${orderId} u konfirmua! Totali: ${finalTotal.toLocaleString()} Lekë`, 'success');
        
        // Show thank you message
        setTimeout(() => {
            showNotification("Faleminderit për blerjen! Do t'ju kontaktojmë së shpejti.", 'success');
        }, 1000);
        
    } catch (error) {
        console.error('Error saving order:', error);
        showNotification('Gabim në ruajtjen e porosisë!', 'error');
    }
}

// Checkout function - Drejto në faqen e checkout
function checkout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Shporta juaj është e zbrazët!', 'error');
        return;
    }
    
    // Drejto në faqen e checkout
    window.location.href = 'checkout.html';
}
// Funksionet bazë për të gjitha faqet

// Ngarko komponentët
function loadComponent(containerId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            // After loading navbar, update cart count
            updateCartCount();
        })
        .catch(error => console.error('Error loading component:', error));
}

// Update cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('aromexa-cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('aromexa-cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('aromexa-cart', JSON.stringify(cart));
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

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--color-beige);">Shporta juaj është e zbrazët</p>';
        cartTotal.textContent = '0 Lekë';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} Lekë × ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `${total.toLocaleString()} Lekë`;
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    updateCartDisplay();
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    // Set notification color based on type
    if (type === 'error') {
        notification.style.backgroundColor = '#ff6b6b';
        notification.style.color = '#fff';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#ffa726';
        notification.style.color = '#000';
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

// Funksioni për të krijuar porosinë në WhatsApp
function createWhatsAppOrder(cart, totalAmount) {
    let message = "📋 *POROSI E RE - AROMEXA*\n\n";
    message += "👤 *Klienti:* Porosi Online\n";
    message += "📅 *Data:* " + new Date().toLocaleDateString('sq-AL') + "\n";
    message += "⏰ *Ora:* " + new Date().toLocaleTimeString('sq-AL', {hour: '2-digit', minute:'2-digit'}) + "\n\n";
    
    message += "🛒 *Produktet:*\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.category})\n`;
        message += `   Sasia: ${item.quantity} × ${item.price.toLocaleString()} Lekë\n`;
        message += `   Nëntotal: ${(item.price * item.quantity).toLocaleString()} Lekë\n\n`;
    });
    
    message += "💰 *TOTALI: " + totalAmount.toLocaleString() + " Lekë*\n\n";
    message += "📍 *Informacione shtesë:*\n";
    message += "Ju do te njoftoheni sa më shpejt per konfirmimin e porosisë.\n\n";
    message += "📞 *Kontakt:*\n";
    message += "Ju lutemi të na dergoni Emër, Mbiemer, Qytetin dhe Adresën për përfundimin e porosisë.";
    
    return encodeURIComponent(message);
}

// Checkout function - Pagesa direkte pa formular
function checkout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Shporta juaj është e zbrazët!', 'error');
        return;
    }
    
    // Calculate total amount
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order summary
    let orderSummary = "Faleminderit për porosinë tuaj! 📦\n\n";
    orderSummary += "Porosia juaj është pranuar dhe do të përpunohet menjëherë.\n\n";
    orderSummary += "📋 *Përmbledhja e porosisë:*\n";
    
    cart.forEach((item, index) => {
        orderSummary += `${index + 1}. ${item.name} - ${item.quantity} × ${item.price.toLocaleString()} Lekë\n`;
    });
    
    orderSummary += `\n💰 *Shuma totale: ${totalAmount.toLocaleString()} Lekë*\n\n`;
    orderSummary += "📞 *Hapat e ardhshëm:*\n";
    orderSummary += "1. Një përfaqësues do t'ju kontaktojë brenda 30 minutave për të konfirmuar porosinë\n";
    orderSummary += "2. Do të vendosni mënyrën e pagesës (në dorëzim ose bankë)\n";
    orderSummary += "3. Porosia do të dërgohet brenda 24 orëve\n";
    orderSummary += "4. Do të merrni numrin e gjurmimit të dërgesës\n\n";
    orderSummary += "Faleminderit që zgjodhët Aromexa! ❤️";
    
    // Show order confirmation modal
    showOrderConfirmation(orderSummary, cart, totalAmount);
}

// Show order confirmation modal
function showOrderConfirmation(orderSummary, cart, totalAmount) {
    // Krijo modal për konfirmim
    const modalHTML = `
        <div class="order-confirmation-modal" id="orderConfirmationModal">
            <div class="order-modal-content">
                <div class="order-modal-header">
                    <h2>✅ Porosia u pranua!</h2>
                    <button class="modal-close" onclick="closeOrderConfirmation()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="order-modal-body">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    
                    <h3>Faleminderit për porosinë tuaj!</h3>
                    
                    <div class="order-details">
                        <div class="detail-item">
                            <span class="detail-label">Numri i porosisë:</span>
                            <span class="detail-value">ARX-${Date.now().toString().slice(-6)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Data:</span>
                            <span class="detail-value">${new Date().toLocaleDateString('sq-AL')}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Totali:</span>
                            <span class="detail-value">${totalAmount.toLocaleString()} Lekë</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Statusi:</span>
                            <span class="detail-value status-processing">Në Pritje të Konfirmimit</span>
                        </div>
                    </div>
                    
                    <div class="order-message">
                        <p>Porosia juaj është pranuar me sukses! Një përfaqësues do t'ju kontaktojë brenda 30 minutave për të konfirmuar dhe finalizuar porosinë.</p>
                    </div>
                    
                    <div class="order-actions">
                        <button class="btn btn-primary" onclick="sendOrderToWhatsApp(${totalAmount})">
                            <i class="fab fa-whatsapp"></i> Dërgo në WhatsApp
                        </button>
                        <button class="btn btn-secondary" onclick="completeOrder()">
                            <i class="fas fa-check"></i> Përfundo Porosinë
                        </button>
                        <button class="btn btn-outline" onclick="printOrder()">
                            <i class="fas fa-print"></i> Printo Faturën
                        </button>
                    </div>
                    
                    <div class="contact-info">
                        <h4>📞 Kontakt për ndihmë:</h4>
                        <p><i class="fas fa-envelope"></i> support@aromexa.com</p>
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
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 3000;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .order-modal-content {
                background-color: var(--color-dark);
                width: 90%;
                max-width: 600px;
                border-radius: var(--border-radius);
                overflow: hidden;
                border: 1px solid var(--color-gold);
                animation: slideUp 0.5s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .order-modal-header {
                padding: var(--spacing-md);
                background-color: rgba(212, 175, 55, 0.1);
                border-bottom: 1px solid var(--color-gold);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .order-modal-header h2 {
                color: var(--color-gold);
                font-size: 1.8rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--color-white);
                font-size: 1.5rem;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                color: var(--color-gold);
            }
            
            .order-modal-body {
                padding: var(--spacing-xl);
            }
            
            .success-icon {
                text-align: center;
                margin-bottom: var(--spacing-md);
            }
            
            .success-icon i {
                font-size: 5rem;
                color: #4CAF50;
            }
            
            .order-modal-body h3 {
                text-align: center;
                font-size: 1.8rem;
                margin-bottom: var(--spacing-xl);
                color: var(--color-white);
            }
            
            .order-details {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: var(--border-radius);
                padding: var(--spacing-md);
                margin-bottom: var(--spacing-lg);
            }
            
            .detail-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--spacing-sm);
                padding-bottom: var(--spacing-sm);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .detail-item:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            
            .detail-label {
                color: var(--color-beige);
            }
            
            .detail-value {
                font-weight: 600;
                color: var(--color-white);
            }
            
            .status-processing {
                color: var(--color-gold);
            }
            
            .order-message {
                background-color: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
                border-radius: var(--border-radius);
                padding: var(--spacing-md);
                margin-bottom: var(--spacing-lg);
                text-align: center;
            }
            
            .order-actions {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
                margin-bottom: var(--spacing-lg);
            }
            
            .btn-outline {
                background-color: transparent;
                color: var(--color-white);
                border: 1px solid var(--color-white);
            }
            
            .btn-outline:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .contact-info {
                text-align: center;
                padding-top: var(--spacing-md);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .contact-info h4 {
                color: var(--color-gold);
                margin-bottom: var(--spacing-sm);
            }
            
            .contact-info p {
                margin-bottom: 5px;
                color: var(--color-beige);
            }
            
            .contact-info i {
                color: var(--color-gold);
                margin-right: 10px;
            }
            
            @media (max-width: 768px) {
                .order-modal-content {
                    width: 95%;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                
                .order-actions {
                    flex-direction: column;
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

// Close order confirmation modal
function closeOrderConfirmation() {
    const modal = document.getElementById('orderConfirmationModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Send order to WhatsApp
function sendOrderToWhatsApp(totalAmount) {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Nuk ka produkte në shportë!', 'error');
        return;
    }
    
    const whatsappNumber = "+355694707750"; // Numri real duhet të vendoset këtu
    const message = createWhatsAppOrder(cart, totalAmount);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show notification
    showNotification('Dërguar në WhatsApp!', 'success');
}

// Complete order (clear cart and show success)
function completeOrder() {
    // Clear the cart
    saveCart([]);
    updateCartCount();
    
    // Show success notification
    showNotification('Porosia u përfundua me sukses! Shporta është pastruar.', 'success');
    
    // Close modal
    closeOrderConfirmation();
    
    // Close cart sidebar if open
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay && cartOverlay.classList.contains('active')) {
        toggleCart();
    }
    
    // Show final thank you message
    setTimeout(() => {
        showNotification("Faleminderit për blerjen tuaj! Do t'ju kontaktojmë së shpejti.", 'success');
    }, 500);
}

// Print order receipt
function printOrder() {
    const cart = getCart();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Fatura - Aromexa</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .header h1 { color: #d4af37; }
                .order-info { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #f5f1e8; }
                .total { text-align: right; font-size: 1.2em; font-weight: bold; margin-top: 20px; }
                .footer { margin-top: 50px; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>AROMEXA</h1>
                <p>Luxury Inspired Fragrances</p>
                <p>Fatura Nr: ARX-${Date.now().toString().slice(-6)}</p>
                <p>Data: ${new Date().toLocaleDateString('sq-AL')}</p>
            </div>
            
            <div class="order-info">
                <h3>Detajet e Porosisë:</h3>
                <p>Klienti: Porosi Online</p>
                <p>Statusi: Në Pritje të Konfirmimit</p>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Produkti</th>
                        <th>Kategoria</th>
                        <th>Sasia</th>
                        <th>Çmimi</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.category}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price.toLocaleString()} Lekë</td>
                            <td>${(item.price * item.quantity).toLocaleString()} Lekë</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="total">
                <p>Totali: ${totalAmount.toLocaleString()} Lekë</p>
            </div>
            
            <div class="footer">
                <p>Faleminderit për blerjen tuaj!</p>
                <p>Aromell - Luxury Inspireds</p>
                <p>Tel: +355 69 XXX XXXX | Email: support@aromexa.com</p>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on all pages
    updateCartCount();
    
    // Close cart when clicking outside
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });
    }
    
    // Close order confirmation when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('orderConfirmationModal');
        if (modal && e.target === modal) {
            closeOrderConfirmation();
        }
    });
});
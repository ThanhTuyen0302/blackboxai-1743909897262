// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal hidden fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto';
    document.body.appendChild(cartModal);

    // Cart state
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Toggle cart modal
    cartIcon.addEventListener('click', function() {
        cartModal.classList.toggle('hidden');
        renderCart();
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartIcon.contains(e.target) && !cartModal.contains(e.target)) {
            cartModal.classList.add('hidden');
        }
    });

    // Render cart items
    function renderCart() {
        cartModal.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Your Cart (${cart.length})</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
                ${cart.length ? cart.map(item => `
                    <div class="cart-item flex items-center mb-4 pb-4 border-b">
                        <img src="${item.image}" class="w-16 h-16 object-cover mr-3" alt="${item.name}">
                        <div class="flex-1">
                            <h4 class="font-medium">${item.name}</h4>
                            <p class="text-gray-600">$${item.price}</p>
                            <div class="flex items-center mt-1">
                                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                            </div>
                        </div>
                        <button class="remove-item ml-2 text-red-500" data-id="${item.id}">
                            <i class="bx bx-trash"></i>
                        </button>
                    </div>
                `).join('') : '<p class="text-center py-8">Your cart is empty</p>'}
            </div>
            ${cart.length ? `
                <div class="cart-total mt-4 pt-4 border-t">
                    <div class="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>$${calculateTotal()}</span>
                    </div>
                    <button class="checkout-btn w-full mt-4 bg-blue-500 text-white py-2 rounded">
                        Proceed to Checkout
                    </button>
                </div>
            ` : ''}
        `;

        // Add event listeners to new buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', updateQuantity);
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });

        document.querySelector('.close-cart')?.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });
    }

    // Add to cart function (to be called from product buttons)
    window.addToCart = function(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
        updateCart();
    };

    function updateQuantity(e) {
        const id = e.target.dataset.id;
        const action = e.target.dataset.action;
        const item = cart.find(item => item.id === id);
        
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity--;
        }
        
        updateCart();
    }

    function removeItem(e) {
        const id = e.target.closest('button').dataset.id;
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        renderCart();
    }
});
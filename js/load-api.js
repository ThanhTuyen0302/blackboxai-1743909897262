// Product data loader and renderer
document.addEventListener('DOMContentLoaded', async function() {
    const shopSection = document.getElementById('shop');
    const categoriesSection = document.getElementById('categories');

    if(!shopSection || !categoriesSection) return;

    // Mock API call (in real app, replace with actual fetch)
    const products = [
        {
            id: 'burger1',
            name: 'Classic Burger',
            price: 8.99,
            image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
            category: 'burgers'
        },
        {
            id: 'pizza1',
            name: 'Margherita Pizza',
            price: 12.99,
            image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
            category: 'pizza'
        },
        {
            id: 'fries1',
            name: 'French Fries',
            price: 4.99,
            image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
            category: 'sides'
        }
    ];

    // Render products
    function renderProducts(filteredProducts) {
        shopSection.innerHTML = '';
        filteredProducts.forEach(product => {
            const productEl = document.createElement('div');
            productEl.className = 'product-card bg-white rounded-lg shadow p-4 m-2';
            productEl.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded">
                <h3 class="text-lg font-semibold mt-2">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '"')})" 
                    class="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                    Add to Cart
                </button>
            `;
            shopSection.appendChild(productEl);
        });
    }

    // Render category filters
    const categories = [...new Set(products.map(p => p.category))];
    categoriesSection.innerHTML = categories.map(category => `
        <button class="category-btn bg-gray-200 px-4 py-2 rounded m-1 hover:bg-gray-300" 
            data-category="${category}">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
    `).join('');

    // Add category filter event listeners
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            const filtered = category === 'all' 
                ? products 
                : products.filter(p => p.category === category);
            renderProducts(filtered);
        });
    });

    // Initial render
    renderProducts(products);
});
// 購物車模組
// 處理所有購物車相關的邏輯

// 購物車資料結構
let cart = {
    items: [],      // 購物車項目陣列
    subtotal: 0,    // 小計
    shipping: 0,    // 運費
    total: 0        // 總計
};

// 初始化購物車
function initCart() {
    // 從 localStorage 載入購物車
    const savedCart = loadFromStorage('cart');
    if (savedCart) {
        cart = savedCart;
    }
    
    // 綁定事件
    bindCartEvents();
    
    // 渲染產品列表
    renderProducts();
    
    // 更新購物車顯示
    updateCartDisplay();
}

// 綁定購物車相關事件
function bindCartEvents() {
    // 監聽加入購物車按鈕
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.productId;
            addToCart(productId);
        }
        
        // 監聽移除商品按鈕
        if (e.target.classList.contains('remove-item-btn')) {
            const itemId = e.target.dataset.itemId;
            removeFromCart(itemId);
        }
        
        // 監聽數量變更
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = e.target.dataset.itemId;
            const action = e.target.dataset.action;
            updateQuantity(itemId, action);
        }
    });
    
    // 結帳按鈕
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

// 加入購物車
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('商品不存在', 'error');
        return;
    }
    
    // 檢查庫存
    if (!checkStock(productId, quantity)) {
        showNotification('庫存不足', 'error');
        return;
    }
    
    // 檢查是否已在購物車中
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
        // 更新數量
        const newQuantity = existingItem.quantity + quantity;
        if (checkStock(productId, newQuantity)) {
            existingItem.quantity = newQuantity;
            existingItem.subtotal = existingItem.price * newQuantity;
        } else {
            showNotification('庫存不足', 'error');
            return;
        }
    } else {
        // 新增項目
        const cartItem = {
            id: generateId(),
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            subtotal: product.price * quantity
        };
        cart.items.push(cartItem);
    }
    
    // 更新購物車
    updateCart();
    showNotification('已加入購物車', 'success');
}

// 從購物車移除
function removeFromCart(itemId) {
    cart.items = cart.items.filter(item => item.id !== itemId);
    updateCart();
    showNotification('已從購物車移除', 'info');
}

// 更新數量
function updateQuantity(itemId, action) {
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;
    
    if (action === 'increase') {
        if (checkStock(item.productId, item.quantity + 1)) {
            item.quantity++;
        } else {
            showNotification('庫存不足', 'error');
            return;
        }
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
    }
    
    item.subtotal = item.price * item.quantity;
    updateCart();
}

// 計算總金額
function calculateTotal() {
    // 計算小計
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
    
    // 計算運費
    cart.shipping = calculateShipping(cart.subtotal);
    
    // 計算總計
    cart.total = cart.subtotal + cart.shipping;
}

// 更新購物車
function updateCart() {
    calculateTotal();
    saveToStorage('cart', cart);
    updateCartDisplay();
}

// 更新購物車顯示
function updateCartDisplay() {
    // 更新購物車數量
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    // 更新購物車項目
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        if (cart.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">購物車是空的</p>';
        } else {
            cartItemsContainer.innerHTML = cart.items.map(item => `
                <div class="cart-item">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>${formatCurrency(item.price)}</p>
                    </div>
                    <div class="item-controls">
                        <button class="quantity-btn" data-item-id="${item.id}" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-item-id="${item.id}" data-action="increase">+</button>
                        <button class="remove-item-btn" data-item-id="${item.id}">移除</button>
                    </div>
                    <div class="item-subtotal">
                        ${formatCurrency(item.subtotal)}
                    </div>
                </div>
            `).join('');
        }
    }
    
    // 更新金額顯示
    document.getElementById('subtotal').textContent = formatCurrency(cart.subtotal);
    document.getElementById('shipping').textContent = formatCurrency(cart.shipping);
    document.getElementById('total').textContent = formatCurrency(cart.total);
    
    // 更新結帳按鈕狀態
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.items.length === 0;
    }
}

// 處理結帳
function handleCheckout() {
    if (cart.items.length === 0) {
        showNotification('購物車是空的', 'error');
        return;
    }
    
    // 模擬結帳流程
    showNotification('處理中...', 'info');
    
    setTimeout(() => {
        // 更新庫存
        cart.items.forEach(item => {
            updateStock(item.productId, item.quantity);
        });
        
        // 清空購物車
        cart = {
            items: [],
            subtotal: 0,
            shipping: 0,
            total: 0
        };
        
        updateCart();
        renderProducts(); // 重新渲染產品以更新庫存顯示
        showNotification('訂單已成功送出！', 'success');
    }, 2000);
}

// 當 DOM 載入完成時初始化
document.addEventListener('DOMContentLoaded', initCart);
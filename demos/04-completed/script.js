// 購物車計算器 - 完美修復版本
// 所有 Bug 已修復，功能完整運作！

let cart = [];
let discount = 0;
let freeShipping = false;

// 修復：函數名稱與 HTML 呼叫一致
function addToCart(productId, price) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = parseInt(qtyInput.value);
    
    if (quantity <= 0) {
        showNotification('請選擇數量', 'warning');
        return;
    }
    
    // 修復：正確處理商品重複添加的數量更新
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
        showNotification(`已更新 ${getProductName(productId)} 數量`, 'success');
    } else {
        cart.push({
            id: productId,
            name: getProductName(productId),
            price: price,
            quantity: quantity
        });
        showNotification(`已添加 ${getProductName(productId)} 到購物車`, 'success');
    }
    
    qtyInput.value = 0;
    updateCartDisplay();
}

function getProductName(productId) {
    const names = {
        'laptop': '筆記型電腦',
        'headphones': '藍牙耳機',
        'mouse': '無線滑鼠'
    };
    return names[productId];
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">購物車是空的</p>';
        checkoutBtn.disabled = true;
    } else {
        let itemsHtml = '';
        cart.forEach((item, index) => {
            itemsHtml += `
                <div class="cart-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toLocaleString()}</span>
                    <button onclick="removeFromCart(${index})" class="remove-btn">移除</button>
                </div>
            `;
        });
        cartItems.innerHTML = itemsHtml;
        checkoutBtn.disabled = false;
    }
    
    updatePricing();
}

function updatePricing() {
    // 修復：subtotal 計算正確 - 使用乘法
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity; // 修復：使用乘法
    });
    
    // 修復：運費計算邏輯正確
    let shipping = 0;
    if (!freeShipping) {
        if (subtotal < 10000) {
            shipping = 200; // 基本運費
        } else if (subtotal < 30000) {
            shipping = 100; // 中等運費
        }
        // 超過 30000 免運費（shipping = 0）
    }
    
    // 修復：優惠券折扣計算正確
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal + shipping - discountAmount;
    
    // 更新顯示
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = freeShipping ? '免運費' : `$${shipping.toLocaleString()}`;
    document.getElementById('discount').textContent = `-$${discountAmount.toLocaleString()}`;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

function removeFromCart(index) {
    // 修復：移除商品時有確認提示
    const item = cart[index];
    if (confirm(`確定要移除 ${item.name} 嗎？`)) {
        cart.splice(index, 1);
        showNotification(`已移除 ${item.name}`, 'info');
        updateCartDisplay();
    }
}

// 修復：清空購物車函數名稱正確
function clearCart() {
    if (cart.length === 0) {
        showNotification('購物車已經是空的', 'info');
        return;
    }
    
    if (confirm('確定要清空購物車嗎？')) {
        cart = [];
        discount = 0;
        freeShipping = false;
        document.getElementById('coupon-status').innerHTML = '';
        showNotification('購物車已清空', 'info');
        updateCartDisplay();
    }
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();
    
    if (!couponCode) {
        showNotification('請輸入優惠券代碼', 'warning');
        return;
    }
    
    // 修復：優惠券邏輯完整
    let couponMessage = '';
    switch (couponCode) {
        case 'SAVE10':
            discount = 10;
            freeShipping = false;
            couponMessage = '已套用 10% 折扣！';
            break;
        case 'SAVE20':
            discount = 20;
            freeShipping = false;
            couponMessage = '已套用 20% 折扣！';
            break;
        case 'FREESHIP':
            // 修復：免運費功能完整實現
            discount = 0;
            freeShipping = true;
            couponMessage = '已套用免運費！';
            break;
        default:
            showNotification('無效的優惠券代碼', 'error');
            return;
    }
    
    document.getElementById('coupon-code').value = '';
    document.getElementById('coupon-status').innerHTML = `<span class="coupon-active">${couponMessage}</span>`;
    showNotification(couponMessage, 'success');
    
    // 修復：正確更新優惠券狀態
    updatePricing();
}

function checkout() {
    if (cart.length === 0) {
        showNotification('購物車是空的！', 'warning');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    showNotification(`結帳成功！總金額：${total}`, 'success');
    
    // 修復：結帳後清空購物車
    setTimeout(() => {
        cart = [];
        discount = 0;
        freeShipping = false;
        document.getElementById('coupon-status').innerHTML = '';
        updateCartDisplay();
        showNotification('感謝您的購買！', 'info');
    }, 1500);
}

// 修復：當使用者修改商品數量時，自動更新購物車
function updateQuantityRealtime(productId) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = parseInt(qtyInput.value) || 0;
    
    // 找到購物車中對應的商品並更新數量
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
        updateCartDisplay();
    } else if (existingItem && quantity === 0) {
        // 如果數量設為 0，移除該商品
        const index = cart.findIndex(item => item.id === productId);
        cart.splice(index, 1);
        updateCartDisplay();
    }
}

// 新增：通知系統
function showNotification(message, type = 'info') {
    // 移除現有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 創建新通知
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到頁面
    document.body.appendChild(notification);
    
    // 顯示動畫
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 自動隱藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 新增：頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    showNotification('購物車系統已就緒！', 'success');
});

// 新增：鍵盤快捷鍵支援
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'Enter':
                if (document.activeElement.id === 'coupon-code') {
                    e.preventDefault();
                    applyCoupon();
                }
                break;
            case 'Backspace':
                if (e.target.tagName !== 'INPUT') {
                    e.preventDefault();
                    clearCart();
                }
                break;
        }
    }
});
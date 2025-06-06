// 購物車計算器 - 6個Bug修復完成版本
// 對應簡化教學：所有核心問題都已解決！

let cart = [];
let discount = 0;
let freeShipping = false;

// ✅ 修復Bug 6：加入輸入驗證，改善使用者體驗
function addToCart(productId, price) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = parseInt(qtyInput.value);
    
    if (quantity <= 0 || isNaN(quantity)) {
        alert('請輸入有效的數量');
        return;
    }
    
    // 處理重複商品（保持簡潔）
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: getProductName(productId),
            price: price,
            quantity: quantity
        });
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
    // ✅ 修復Bug 1：總金額計算正確 - 使用乘法
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity; // ✅ 修復：使用乘法而不是加法
    });
    
    // ✅ 修復Bug 2：運費計算邏輯正確
    let shipping = 0;
    if (!freeShipping) {
        if (subtotal < 10000) {
            shipping = 200; // 基本運費
        } else if (subtotal < 30000) {
            shipping = 100; // 中等運費
        }
        // 超過 30000 免運費（shipping = 0）
    }
    
    // 優惠券折扣計算
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal + shipping - discountAmount;
    
    // 更新顯示
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = freeShipping ? '免運費' : `$${shipping.toLocaleString()}`;
    document.getElementById('discount').textContent = `-$${discountAmount.toLocaleString()}`;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

// 移除商品功能（保持簡潔）
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// ✅ 修復Bug 3：清空購物車函數名稱正確
function clearCart() {
    if (cart.length === 0) {
        alert('購物車已經是空的');
        return;
    }
    
    cart = [];
    discount = 0;
    freeShipping = false;
    updateCartDisplay();
}

// ✅ 修復Bug 4：優惠券功能完整實現
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    
    switch (couponCode) {
        case 'SAVE10':
            discount = 10;
            freeShipping = false;
            alert('已套用 10% 折扣！');
            break;
        case 'SAVE20':
            discount = 20;
            freeShipping = false;
            alert('已套用 20% 折扣！');
            break;
        case 'FREESHIP':
            // ✅ 修復：免運費功能完整實現
            discount = 0;
            freeShipping = true;
            alert('已套用免運費！');
            break;
        default:
            alert('無效的優惠券代碼');
            return;
    }
    
    document.getElementById('coupon-code').value = '';
    updatePricing();
}

// ✅ 修復Bug 5：結帳後自動清空購物車
function checkout() {
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    alert(`結帳成功！總金額：${total}`);
    
    // ✅ 修復：結帳後清空購物車
    cart = [];
    discount = 0;
    freeShipping = false;
    updateCartDisplay();
}

// ✅ 簡潔版本：所有6個核心Bug都已修復
// 1. 總金額計算正確（乘法）
// 2. 運費邏輯正確（不再永遠150）
// 3. 清空購物車按鈕正常運作
// 4. FREESHIP 優惠券實際有效
// 5. 結帳後自動清空購物車
// 6. 輸入驗證改善
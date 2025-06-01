// 購物車計算器 - 含有多個 Bug 的版本
// 讓 GitHub Copilot Agent 來幫你找出並修復這些問題！

let cart = [];
let discount = 0;

// Bug 1: 函數名稱拼寫錯誤，但 HTML 中呼叫的是正確的名稱
function addToCart(productId, price) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = parseInt(qtyInput.value);
    
    if (quantity <= 0) {
        alert('請選擇數量');
        return;
    }
    
    // Bug 2: 沒有正確處理商品重複添加的數量更新
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        // Bug: 應該要更新價格或其他邏輯
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
                    <button onclick="removeFromCart(${index})">移除</button>
                </div>
            `;
        });
        cartItems.innerHTML = itemsHtml;
        checkoutBtn.disabled = false;
    }
    
    updatePricing();
}

function updatePricing() {
    // Bug 3: subtotal 計算錯誤 - 使用加法而不是乘法
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price + item.quantity; // 錯誤：應該是 *
    });
    
    // Bug 4: 運費計算邏輯錯誤
    let shipping = 0;
    if (subtotal < 10000) {
        shipping = 200; // 基本運費
    } else if (subtotal < 30000) {
        shipping = 100; // 中等運費
    }
    // 超過 30000 免運費，但這個邏輯被下面的代碼覆蓋了
    shipping = 150; // Bug: 永遠是 150
    
    // Bug 5: 優惠券折扣在某些情況下計算異常
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal + shipping - discountAmount;
    
    // 更新顯示
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = `$${shipping.toLocaleString()}`;
    document.getElementById('discount').textContent = `-$${discountAmount.toLocaleString()}`;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

function removeFromCart(index) {
    // Bug 10: 移除商品時沒有確認或動畫效果
    cart.splice(index, 1);
    updateCartDisplay();
}

// Bug 6: 清空購物車函數名稱錯誤
function clearShoppingCart() {  // HTML 中呼叫的是 clearCart()
    cart = [];
    discount = 0;
    updateCartDisplay();
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    
    // Bug 7: 優惠券邏輯有問題
    switch (couponCode) {
        case 'SAVE10':
            discount = 10;
            alert('已套用 10% 折扣！');
            break;
        case 'SAVE20':
            discount = 20;
            alert('已套用 20% 折扣！');
            break;
        case 'FREESHIP':
            // Bug: 免運費功能沒有實現
            alert('已套用免運費！');
            break;
        default:
            alert('無效的優惠券代碼');
            return;
    }
    
    document.getElementById('coupon-code').value = '';
    // Bug 7: 沒有正確更新優惠券狀態
    updatePricing();
}

function checkout() {
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    alert(`結帳成功！總金額：${total}`);
    
    // Bug 8: 結帳後沒有清空購物車
    // clearCart();
}

// Bug 9: 當使用者修改商品數量時，沒有自動更新購物車
// 應該要監聽 input 事件並重新計算
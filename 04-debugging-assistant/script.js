// 購物車計算器 - 含有6個明顯Bug的簡化版本
// 讓 GitHub Copilot 幫你找出並修復這些問題！

let cart = [];
let discount = 0;

// ✅ 正常：新增商品到購物車
function addToCart(productId, price) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = parseInt(qtyInput.value);
    
    if (quantity <= 0) {
        alert('請選擇數量');
        return;
    }
    
    // 處理重複商品
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
    // 🐛 Bug 1: 金額計算錯誤 - 使用加法而不是乘法
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price + item.quantity; // ❌ 錯誤：應該是 *
    });
    
    // 🐛 Bug 2: 運費邏輯被覆蓋
    let shipping = 0;
    if (subtotal < 10000) {
        shipping = 200; // 基本運費
    } else if (subtotal < 30000) {
        shipping = 100; // 中等運費
    }
    // 超過 30000 免運費，但被下面的代碼覆蓋了
    shipping = 150; // ❌ Bug: 永遠是 150
    
    // ✅ 正常：優惠券折扣計算
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal + shipping - discountAmount;
    
    // 更新顯示
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = `$${shipping.toLocaleString()}`;
    document.getElementById('discount').textContent = `-$${discountAmount.toLocaleString()}`;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

// ✅ 正常：移除商品
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// 🐛 Bug 3: 函數名稱錯誤
function clearShoppingCart() {  // ❌ HTML 中呼叫的是 clearCart()
    cart = [];
    discount = 0;
    updateCartDisplay();
}

// 🐛 Bug 4: 優惠券功能不完整
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    
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
            // ❌ Bug: 免運費功能沒有實現，只顯示訊息
            alert('已套用免運費！');
            break;
        default:
            alert('無效的優惠券代碼');
            return;
    }
    
    document.getElementById('coupon-code').value = '';
    updatePricing(); // ✅ 正常：會更新價格
}

// 🐛 Bug 5: 結帳後不會清空購物車
function checkout() {
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    alert(`結帳成功！總金額：${total}`);
    
    // ❌ Bug: 結帳後沒有清空購物車
    // clearCart();
}

// 🐛 Bug 6: 點擊新增按鈕時，如果輸入框是空的會出錯
function validateAndAdd(productId, price) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = qtyInput.value; // ❌ Bug: 沒有檢查 NaN
    
    addToCart(productId, price);
}
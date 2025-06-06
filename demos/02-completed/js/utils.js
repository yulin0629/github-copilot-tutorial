// 工具函數模組
// 這個檔案包含各種輔助函數

// 格式化貨幣
function formatCurrency(amount) {
    return `NT$ ${amount.toLocaleString('zh-TW')}`;
}

// 計算運費 (課程中新增的階梯式運費)
// 500以下60元，500-1000收30元，1000以上免運
function calculateShipping(subtotal) {
    if (subtotal >= 1000) {
        return 0;     // 1000以上免運
    } else if (subtotal >= 500) {
        return 30;    // 500-1000收30元
    } else {
        return 60;    // 500以下60元
    }
}

// 產生唯一 ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 深拷貝物件
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 儲存到 localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('儲存失敗:', e);
        return false;
    }
}

// 從 localStorage 讀取
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('讀取失敗:', e);
        return null;
    }
}

// 計算折扣 (課程中新增的功能)
// 滿 1000 打 95 折，滿 2000 打 9 折
function calculateDiscount(subtotal) {
    if (subtotal >= 2000) {
        return subtotal * 0.9; // 9 折
    } else if (subtotal >= 1000) {
        return subtotal * 0.95; // 95 折
    }
    return subtotal; // 無折扣
}

// 顯示通知訊息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
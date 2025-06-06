// CSV 數據處理工具 - 完整功能版本
// 所有函數都已透過 GitHub Copilot 完成實作！

// ========================================
// ✅ 完成：CSV 解析功能
// ========================================
function parseCSV(csvString) {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    });
}

// ========================================
// ✅ 完成：電子郵件驗證功能
// ========================================
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// ========================================
// ✅ 完成：日期格式轉換功能
// ========================================
function convertDateFormat(dateString) {
    // 將 YYYY-MM-DD 格式轉換為 DD/MM/YYYY
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    return dateString;
}

// ========================================
// ✅ 完成：貨幣格式化功能
// ========================================
function formatCurrency(amount) {
    // 將數字格式化為 NT$ 1,234.56 格式
    const num = parseFloat(amount);
    if (isNaN(num)) return 'NT$ 0.00';
    
    return `NT$ ${num.toLocaleString('zh-TW', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// ========================================
// ✅ 完成：電話號碼標準化功能
// ========================================
function normalizePhoneNumber(phone) {
    // 移除所有非數字字符
    const digits = phone.replace(/\D/g, '');
    
    // 台灣手機號碼格式化
    if (digits.length === 10 && digits.startsWith('09')) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    // 台灣市話號碼格式化
    if (digits.length === 8 || digits.length === 9) {
        return digits.length === 8 
            ? `${digits.slice(0, 4)}-${digits.slice(4)}`
            : `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    
    return phone; // 返回原始格式如果不符合台灣號碼格式
}

// ========================================
// ✅ 新增：數據統計功能
// ========================================
function calculateStats(data, columnName) {
    const values = data
        .map(row => parseFloat(row[columnName]))
        .filter(val => !isNaN(val));
    
    if (values.length === 0) {
        return { count: 0, sum: 0, average: 0, min: 0, max: 0 };
    }
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return {
        count: values.length,
        sum: sum.toFixed(2),
        average: average.toFixed(2),
        min: min.toFixed(2),
        max: max.toFixed(2)
    };
}

// ========================================
// 展示所有功能
// ========================================
console.log('🎉 CSV 數據處理工具已載入完成！');
console.log('✅ 所有函數都已完成實作');
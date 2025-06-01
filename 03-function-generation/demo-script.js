// ========================================
// 完整範例：這是使用 Copilot 生成後的完整版本
// Demo 時可以參考這個檔案
// ========================================

// 使用 Inline Chat 生成的 parseCSV 函數
function parseCSV(csvString) {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        data.push(obj);
    }
    
    return data;
}

// 使用 /generate 生成的 validateEmail 函數
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// 自動完成的日期轉換函數
function convertDateFormat(dateString) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
}

// 自動完成的貨幣格式化函數
function formatCurrency(amount) {
    return `NT$ ${amount.toLocaleString('zh-TW')}`;
}

// 自動完成的電話號碼標準化函數
function normalizePhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10 && cleaned.startsWith('09')) {
        return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
}

// 使用 Inline Chat 生成的統計函數
function calculateStatistics(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    
    let median;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        median = sorted[mid];
    }
    
    return {
        average: average,
        median: median,
        max: Math.max(...numbers),
        min: Math.min(...numbers),
        sum: sum,
        count: numbers.length
    };
}

// 使用 /generate 生成的 CSV 導出函數
function exportToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => {
        return headers.map(header => {
            const value = row[header];
            // 如果值包含逗號或換行，用引號包起來
            if (value && value.toString().includes(',') || value.toString().includes('\n')) {
                return `"${value.toString().replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

// 額外的實用函數
function groupByField(data, field) {
    return data.reduce((groups, item) => {
        const key = item[field];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}

function removeDuplicates(array, key) {
    if (!key) {
        return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

function deepMerge(obj1, obj2) {
    const result = { ...obj1 };
    
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
                result[key] = deepMerge(result[key] || {}, obj2[key]);
            } else {
                result[key] = obj2[key];
            }
        }
    }
    
    return result;
}

// 進階函數範例

// 資料清理函數
function cleanData(data) {
    return data.map(row => {
        const cleaned = {};
        for (const [key, value] of Object.entries(row)) {
            // 移除前後空白
            cleaned[key] = typeof value === 'string' ? value.trim() : value;
            // 將空字串轉為 null
            if (cleaned[key] === '') {
                cleaned[key] = null;
            }
        }
        return cleaned;
    });
}

// 資料驗證函數
function validateData(data, schema) {
    const errors = [];
    
    data.forEach((row, index) => {
        for (const [field, rules] of Object.entries(schema)) {
            const value = row[field];
            
            if (rules.required && !value) {
                errors.push(`第 ${index + 1} 行: ${field} 是必填欄位`);
            }
            
            if (rules.type && value) {
                if (rules.type === 'number' && isNaN(value)) {
                    errors.push(`第 ${index + 1} 行: ${field} 必須是數字`);
                }
                if (rules.type === 'email' && !validateEmail(value)) {
                    errors.push(`第 ${index + 1} 行: ${field} 必須是有效的電子郵件`);
                }
            }
            
            if (rules.min && value < rules.min) {
                errors.push(`第 ${index + 1} 行: ${field} 不能小於 ${rules.min}`);
            }
            
            if (rules.max && value > rules.max) {
                errors.push(`第 ${index + 1} 行: ${field} 不能大於 ${rules.max}`);
            }
        }
    });
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// 資料轉換管道
function transformPipeline(data, transformations) {
    return transformations.reduce((result, transform) => {
        return transform(result);
    }, data);
}

console.log('Demo 腳本載入完成！這些函數都是使用 GitHub Copilot 生成的。');
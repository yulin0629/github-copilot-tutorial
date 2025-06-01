// CSV 數據處理工具
// 這個檔案將使用 GitHub Copilot 來生成各種數據處理函數

// ========================================
// 步驟 1: 使用 Inline Chat (Ctrl+I) 生成
// ========================================
// 請將游標放在下方，按 Ctrl+I，輸入：
// "生成一個 parseCSV 函數，接收 CSV 字串，返回物件陣列"




// ========================================
// 步驟 2: 使用 /generate 生成
// ========================================
// 在 Copilot Chat 中使用：
// "/generate 一個 validateEmail 函數，使用正則表達式驗證電子郵件格式，返回 boolean"
// 然後將生成的程式碼貼在這裡：




// ========================================
// 步驟 3: 透過函數簽名自動生成
// ========================================
// 輸入以下函數簽名，然後按 Enter 讓 Copilot 自動完成：

// 將日期從 YYYY-MM-DD 轉換為 DD/MM/YYYY
function convertDateFormat(dateString) {
    // Copilot 將在這裡自動生成實作
}


// 格式化貨幣（數字轉換為 NT$ 格式）
function formatCurrency(amount) {
    // Copilot 將在這裡自動生成實作
}


// 標準化電話號碼格式
function normalizePhoneNumber(phone) {
    // Copilot 將在這裡自動生成實作
}


// ========================================
// 步驟 4: 生成複雜的數據處理函數
// ========================================
// 使用 Inline Chat 生成：
// "生成 calculateStatistics 函數，計算數字陣列的平均值、中位數、最大值、最小值"




// ========================================
// 步驟 5: 生成數據轉換函數
// ========================================
// 使用 /generate：
// "將物件陣列轉換為 CSV 格式字串的函數 exportToCSV"




// ========================================
// 額外的實用函數（Demo 時可選）
// ========================================

// 按指定欄位分組數據
function groupByField(data, field) {
    // 讓 Copilot 生成
}


// 移除陣列中的重複項目
function removeDuplicates(array, key) {
    // 讓 Copilot 生成
}


// 深度合併兩個物件
function deepMerge(obj1, obj2) {
    // 讓 Copilot 生成
}


// ========================================
// UI 互動邏輯（已完成，供測試用）
// ========================================
let currentData = [];

document.addEventListener('DOMContentLoaded', function() {
    // 綁定檔案上傳
    document.getElementById('csvFile').addEventListener('change', handleFileUpload);
    
    // 綁定處理按鈕
    document.getElementById('processBtn').addEventListener('click', handleProcessData);
    
    // 綁定工具按鈕
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', handleToolAction);
    });
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('csvText').value = e.target.result;
        };
        reader.readAsText(file);
    }
}

function handleProcessData() {
    const csvText = document.getElementById('csvText').value;
    if (!csvText) {
        showResult('請先輸入或上傳 CSV 數據', 'error');
        return;
    }
    
    try {
        // 使用生成的 parseCSV 函數
        currentData = parseCSV(csvText);
        displayDataPreview(currentData);
        showResult(`成功解析 ${currentData.length} 筆數據`, 'success');
    } catch (error) {
        showResult(`解析錯誤: ${error.message}`, 'error');
    }
}

function handleToolAction(event) {
    const action = event.target.dataset.action;
    
    if (!currentData || currentData.length === 0) {
        showResult('請先載入數據', 'error');
        return;
    }
    
    switch (action) {
        case 'statistics':
            performStatistics();
            break;
        case 'validate':
            performValidation();
            break;
        case 'convert':
            performConversion();
            break;
        case 'export':
            performExport();
            break;
    }
}

function performStatistics() {
    // 假設有年齡欄位
    const ages = currentData.map(row => parseInt(row['年齡'] || row['age'] || 0)).filter(age => !isNaN(age));
    
    if (ages.length > 0) {
        const stats = calculateStatistics(ages);
        showResult(`年齡統計：
平均值: ${stats.average.toFixed(2)}
中位數: ${stats.median}
最大值: ${stats.max}
最小值: ${stats.min}`, 'info');
    } else {
        showResult('找不到數字欄位進行統計', 'error');
    }
}

function performValidation() {
    const emailField = Object.keys(currentData[0]).find(key => 
        key.toLowerCase().includes('email') || key.toLowerCase().includes('郵件')
    );
    
    if (emailField) {
        const results = currentData.map(row => ({
            email: row[emailField],
            valid: validateEmail(row[emailField])
        }));
        
        const validCount = results.filter(r => r.valid).length;
        showResult(`電子郵件驗證結果：
有效: ${validCount}
無效: ${results.length - validCount}

詳細結果：
${results.map(r => `${r.email}: ${r.valid ? '✓' : '✗'}`).join('\n')}`, 'info');
    } else {
        showResult('找不到電子郵件欄位', 'error');
    }
}

function performConversion() {
    // 尋找日期欄位
    const dateField = Object.keys(currentData[0]).find(key => 
        key.toLowerCase().includes('date') || key.toLowerCase().includes('日期')
    );
    
    if (dateField) {
        const converted = currentData.map(row => ({
            ...row,
            [dateField + '_轉換']: convertDateFormat(row[dateField])
        }));
        
        displayDataPreview(converted);
        showResult('日期格式轉換完成', 'success');
    } else {
        showResult('找不到日期欄位', 'error');
    }
}

function performExport() {
    const csvString = exportToCSV(currentData);
    
    // 建立下載連結
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exported_data.csv';
    link.click();
    
    showResult('數據已導出為 CSV 檔案', 'success');
}

function displayDataPreview(data) {
    const container = document.getElementById('dataPreview');
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p class="placeholder">沒有數據可顯示</p>';
        return;
    }
    
    // 建立表格
    const table = document.createElement('table');
    table.className = 'data-table';
    
    // 表頭
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 表身（最多顯示10筆）
    const tbody = document.createElement('tbody');
    data.slice(0, 10).forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    
    container.innerHTML = '';
    container.appendChild(table);
    
    if (data.length > 10) {
        const note = document.createElement('p');
        note.style.textAlign = 'center';
        note.style.color = '#666';
        note.textContent = `顯示前 10 筆，共 ${data.length} 筆數據`;
        container.appendChild(note);
    }
}

function showResult(message, type = 'info') {
    const resultsDiv = document.getElementById('results');
    resultsDiv.className = 'results-container status ' + type;
    resultsDiv.textContent = message;
}
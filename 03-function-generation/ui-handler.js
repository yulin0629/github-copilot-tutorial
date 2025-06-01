// ========================================
// UI 互動邏輯（已完成，供測試用）
// ========================================
let currentData = [];

// 範例數據
const sampleCSV = `姓名,年齡,城市,電子郵件,電話,入職日期
張三,25,台北,zhang.san@example.com,0912-345-678,2023-01-15
李四,30,台中,lisi@invalid-email,0923456789,2022-06-20
王五,28,高雄,wang5@company.com.tw,0934567890,2023-03-10
陳六,35,台南,chen6@gmail.com,09-8765-4321,2021-11-05
林七,27,新竹,lin7@yahoo.com.tw,0956789012,2022-08-18
黃八,32,桃園,huang8@,0967890123,2023-02-28
趙九,29,基隆,zhao9@outlook.com,0978901234,2022-12-01
周十,26,宜蘭,zhou10@example,0989012345,2023-05-15
吳十一,31,花蓮,wu11@company.org,0990123456,2021-09-20
鄭十二,33,台東,zheng12@test.com,0912345678,2022-04-10`;

document.addEventListener('DOMContentLoaded', function() {
    // 綁定處理按鈕
    document.getElementById('processBtn').addEventListener('click', handleProcessData);
    
    // 綁定載入範例按鈕
    document.getElementById('loadSampleBtn').addEventListener('click', loadSampleData);
    
    // 綁定工具按鈕
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', handleToolAction);
    });
    
    // 監聽 textarea 變化
    document.getElementById('csvText').addEventListener('input', function(e) {
        if (e.target.value.trim()) {
            document.getElementById('processBtn').disabled = false;
            document.getElementById('processHint').textContent = '數據已輸入，點擊處理數據';
            updateStep(1, 'completed');
            updateStep(2, 'active');
        } else {
            document.getElementById('processBtn').disabled = true;
            document.getElementById('processHint').textContent = '請先載入數據';
            updateStep(1, 'active');
            updateStep(2, '');
        }
    });
});


function loadSampleData() {
    document.getElementById('csvText').value = sampleCSV;
    // 啟用處理按鈕
    document.getElementById('processBtn').disabled = false;
    document.getElementById('processHint').textContent = '數據已載入，點擊處理數據';
    // 更新步驟狀態
    updateStep(1, 'completed');
    updateStep(2, 'active');
    showResult('✅ 已載入範例數據，請點擊「處理數據」按鈕', 'success');
}

// 更新步驟狀態
function updateStep(stepNumber, status) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        if (parseInt(step.dataset.step) === stepNumber) {
            step.className = `step ${status}`;
        } else if (parseInt(step.dataset.step) < stepNumber && status === 'active') {
            step.className = 'step completed';
        }
    });
}

function handleProcessData() {
    const csvText = document.getElementById('csvText').value;
    if (!csvText) {
        showResult('❌ 請先輸入或上傳 CSV 數據', 'error');
        return;
    }
    
    try {
        // 使用生成的 parseCSV 函數
        currentData = parseCSV(csvText);
        displayDataPreview(currentData);
        showResult(`✅ 成功解析 ${currentData.length} 筆數據，現在可以使用下方工具處理數據`, 'success');
        
        // 顯示工具區域
        document.getElementById('toolsSection').style.display = 'block';
        
        // 更新步驟狀態
        updateStep(2, 'completed');
        updateStep(3, 'active');
        
        // 滾動到工具區域
        document.getElementById('toolsSection').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showResult(`❌ 解析錯誤: ${error.message}`, 'error');
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
    let hasConversion = false;
    const converted = currentData.map(row => {
        const newRow = { ...row };
        
        // 尋找並轉換日期欄位
        Object.keys(row).forEach(key => {
            if (key.toLowerCase().includes('date') || key.toLowerCase().includes('日期')) {
                newRow[key + '_轉換'] = convertDateFormat(row[key]);
                hasConversion = true;
            }
            // 轉換電話欄位
            else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('電話')) {
                newRow[key + '_格式化'] = normalizePhoneNumber(row[key]);
                hasConversion = true;
            }
            // 轉換金額欄位（如果有的話）
            else if (key.toLowerCase().includes('price') || key.toLowerCase().includes('amount') || 
                     key.toLowerCase().includes('金額') || key.toLowerCase().includes('價格')) {
                const amount = parseFloat(row[key]);
                if (!isNaN(amount)) {
                    newRow[key + '_格式化'] = formatCurrency(amount);
                    hasConversion = true;
                }
            }
        });
        
        return newRow;
    });
    
    if (hasConversion) {
        displayDataPreview(converted);
        showResult('✅ 格式轉換完成：日期、電話已轉換為標準格式', 'success');
    } else {
        showResult('❌ 找不到可轉換的欄位（日期、電話、金額）', 'error');
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
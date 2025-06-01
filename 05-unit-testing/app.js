// 數據分析工具主應用
// 與 HTML 界面的交互邏輯

function analyzeData() {
    const input = document.getElementById('dataInput').value;
    
    if (!input.trim()) {
        alert('請輸入數據！');
        return;
    }
    
    // 解析數據
    const rawData = input.trim().split(/[,\n]/).map(item => item.trim()).filter(item => item !== '');
    const parsedData = DataProcessor.parseData(input);
    const { valid, invalid } = DataProcessor.validateNumbers(rawData.map(item => parseFloat(item)));
    
    // 基本統計
    const sum = DataProcessor.calculateSum(parsedData);
    const average = DataProcessor.calculateAverage(parsedData);
    const { min, max } = DataProcessor.findMinMax(parsedData);
    
    // 進階統計
    const median = DataProcessor.calculateMedian(parsedData);
    const stdDev = DataProcessor.calculateStandardDeviation(parsedData);
    const variance = DataProcessor.calculateVariance(parsedData);
    const range = DataProcessor.calculateRange(parsedData);
    
    // 數據品質
    const quality = DataProcessor.checkDataQuality(rawData.map(item => parseFloat(item)));
    
    // 數據分布
    const quartiles = DataProcessor.calculateQuartiles(parsedData);
    const outliers = DataProcessor.detectOutliers(parsedData);
    const skewness = DataProcessor.calculateSkewness(parsedData);
    const kurtosis = DataProcessor.calculateKurtosis(parsedData);
    
    // 更新顯示
    updateBasicStats(parsedData.length, sum, average, max, min);
    updateAdvancedStats(median, stdDev, variance, range);
    updateQualityStats(quality);
    updateDistributionStats(skewness, kurtosis, quartiles.iqr, outliers);
}

function updateBasicStats(count, sum, average, max, min) {
    document.getElementById('count').textContent = count;
    document.getElementById('sum').textContent = sum.toFixed(2);
    document.getElementById('average').textContent = average.toFixed(2);
    document.getElementById('max').textContent = max !== null ? max.toFixed(2) : '-';
    document.getElementById('min').textContent = min !== null ? min.toFixed(2) : '-';
}

function updateAdvancedStats(median, stdDev, variance, range) {
    document.getElementById('median').textContent = median.toFixed(2);
    document.getElementById('stdDev').textContent = stdDev.toFixed(2);
    document.getElementById('variance').textContent = variance.toFixed(2);
    document.getElementById('range').textContent = range.toFixed(2);
}

function updateQualityStats(quality) {
    document.getElementById('validCount').textContent = quality.validCount;
    document.getElementById('invalidCount').textContent = quality.invalidCount;
    document.getElementById('duplicateCount').textContent = quality.duplicateCount;
    document.getElementById('completeness').textContent = quality.completeness.toFixed(1) + '%';
}

function updateDistributionStats(skewness, kurtosis, iqr, outliers) {
    document.getElementById('skewness').textContent = skewness.toFixed(3);
    document.getElementById('kurtosis').textContent = kurtosis.toFixed(3);
    document.getElementById('iqr').textContent = iqr.toFixed(2);
    document.getElementById('outliers').textContent = outliers.length > 0 ? outliers.join(', ') : '無';
}

function loadSampleData() {
    const sampleData = `10, 20, 30, 40, 50, 60, 70, 80, 90, 100
15, 25, 35, 45, 55, 65, 75, 85, 95
22, 28, 33, 47, 51, 68, 73, 87, 92
invalid, 12, 18, 24, 36, 42, 54, 66, 78
5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 200`;
    
    document.getElementById('dataInput').value = sampleData;
}

// 測試執行功能（讓 Agent 來實現）
function runAllTests() {
    const testResults = document.getElementById('testResults');
    testResults.innerHTML = `
        <div class="test-section">
            <h4>🤖 等待 Agent 實現測試...</h4>
            <p>這裡將顯示 Agent 設計的測試結果。</p>
            <p>請讓 Agent 幫你：</p>
            <ul>
                <li>設計單元測試用例</li>
                <li>實現測試執行邏輯</li>
                <li>添加測試覆蓋率報告</li>
                <li>建立自動化測試流程</li>
            </ul>
        </div>
    `;
}

function clearTestResults() {
    const testResults = document.getElementById('testResults');
    testResults.innerHTML = '<p class="no-tests">測試結果已清除。讓 Agent 幫你設計新的測試策略！</p>';
}

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('數據分析工具已載入，準備接受 Agent 的測試設計！');
});
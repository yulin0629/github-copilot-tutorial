// 遺留系統前端邏輯
// 與 HTML 界面交互的部分

function processOrder() {
    // 從表單獲取數據
    const productName = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const customerType = document.getElementById('customerType').value;
    
    // 模擬客戶資料
    const customerData = {
        regular: { name: "一般客戶", address: "台北市大安區", phone: "0912345678" },
        vip: { name: "VIP客戶", address: "台北市信義區", phone: "0987654321" },
        premium: { name: "白金客戶", address: "新北市板橋區", phone: "0955123456" }
    };
    
    const customer = customerData[customerType];
    
    if (!productName || !price || quantity <= 0) {
        alert('請填寫完整的訂單資料！');
        return;
    }
    
    // 調用遺留系統的函數
    const result = processOrder(
        productName,
        quantity,
        price,
        customerType,
        customer.name,
        customer.address,
        customer.phone
    );
    
    // 顯示結果
    const resultArea = document.getElementById('orderResult');
    
    if (result.success) {
        resultArea.innerHTML = `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; color: #155724;">
                <h4>✅ 訂單處理成功</h4>
                <p><strong>訂單編號：</strong>${result.orderId}</p>
                <p><strong>總金額：</strong>$${result.total.toLocaleString()}</p>
                <p><strong>預計送達：</strong>${result.details.estimatedDelivery}</p>
                <hr>
                <h5>價格明細：</h5>
                <p>小計：$${result.details.subtotal.toLocaleString()}</p>
                <p>稅金：$${result.details.tax.toLocaleString()}</p>
                <p>運費：$${result.details.shipping.toLocaleString()}</p>
                <p>折扣：-$${result.details.discount.toLocaleString()}</p>
            </div>
        `;
    } else {
        resultArea.innerHTML = `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; color: #721c24;">
                <h4>❌ 訂單處理失敗</h4>
                <p>${result.message}</p>
            </div>
        `;
    }
}
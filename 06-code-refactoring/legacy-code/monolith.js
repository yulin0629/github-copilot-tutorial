// 💀 遺留系統：電商訂單管理系統
// 警告：這是一個充滿問題的遺留代碼，包含了所有常見的壞味道
// 讓 Agent 來重構這個混亂的系統！

// 全域變數濫用
var orders = [];
var customers = [];
var products = [];
var currentUser = null;
var totalRevenue = 0;
var systemStatus = "running";
var debugMode = false;
var apiVersion = "v1.2.3";

// 魔法數字和硬編碼
var TAX_RATE = 0.08;
var SHIPPING_COST = 50;
var VIP_DISCOUNT = 0.1;
var PREMIUM_DISCOUNT = 0.15;
var FREE_SHIPPING_THRESHOLD = 1000;

// 超長的單一函數 - 違反單一責任原則
function processOrder(productName, quantity, price, customerType, customerName, address, phone) {
    // 沒有輸入驗證
    console.log("Processing order...");
    
    // 複雜的嵌套邏輯
    if (productName && quantity && price && customerType) {
        if (quantity > 0) {
            if (price > 0) {
                // 重複的計算邏輯
                var subtotal = price * quantity;
                var tax = subtotal * TAX_RATE;
                var shipping = SHIPPING_COST;
                var discount = 0;
                
                // 複雜的客戶類型判斷
                if (customerType == "vip") {
                    discount = subtotal * VIP_DISCOUNT;
                    if (subtotal > FREE_SHIPPING_THRESHOLD) {
                        shipping = 0;
                    } else {
                        shipping = shipping * 0.5; // VIP 半價運費
                    }
                } else if (customerType == "premium") {
                    discount = subtotal * PREMIUM_DISCOUNT;
                    shipping = 0; // 白金客戶免運費
                    
                    // 白金客戶額外優惠
                    if (subtotal > 2000) {
                        discount = discount + (subtotal * 0.05); // 額外5%折扣
                    }
                } else if (customerType == "regular") {
                    if (subtotal > FREE_SHIPPING_THRESHOLD) {
                        shipping = 0;
                    }
                    // 一般客戶小額訂單手續費
                    if (subtotal < 200) {
                        shipping = shipping + 30; // 小額訂單費
                    }
                } else {
                    // 未知客戶類型的處理
                    console.log("Unknown customer type");
                    return "Error: Invalid customer type";
                }
                
                var total = subtotal + tax + shipping - discount;
                
                // 庫存檢查邏輯混在一起
                var productFound = false;
                for (var i = 0; i < products.length; i++) {
                    if (products[i].name == productName) {
                        productFound = true;
                        if (products[i].stock >= quantity) {
                            products[i].stock = products[i].stock - quantity;
                            
                            // 直接在這裡處理訂單創建
                            var orderId = "ORD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
                            var order = {
                                id: orderId,
                                productName: productName,
                                quantity: quantity,
                                price: price,
                                subtotal: subtotal,
                                tax: tax,
                                shipping: shipping,
                                discount: discount,
                                total: total,
                                customerType: customerType,
                                customerName: customerName,
                                address: address,
                                phone: phone,
                                status: "pending",
                                createdAt: new Date(),
                                estimatedDelivery: calculateDeliveryDate(customerType, address)
                            };
                            
                            orders.push(order);
                            totalRevenue = totalRevenue + total;
                            
                            // 客戶資料處理也混在一起
                            var customerExists = false;
                            for (var j = 0; j < customers.length; j++) {
                                if (customers[j].name == customerName) {
                                    customerExists = true;
                                    customers[j].totalOrders = customers[j].totalOrders + 1;
                                    customers[j].totalSpent = customers[j].totalSpent + total;
                                    break;
                                }
                            }
                            
                            if (!customerExists) {
                                customers.push({
                                    name: customerName,
                                    type: customerType,
                                    phone: phone,
                                    address: address,
                                    totalOrders: 1,
                                    totalSpent: total,
                                    joinDate: new Date()
                                });
                            }
                            
                            // 發送通知邏輯
                            if (customerType == "premium" || customerType == "vip") {
                                console.log("Sending premium notification to " + customerName);
                                // 假設的郵件發送
                                sendEmail(customerName, "您的訂單已確認", "訂單編號：" + orderId);
                            } else {
                                console.log("Sending regular notification to " + customerName);
                                sendSMS(phone, "訂單確認：" + orderId);
                            }
                            
                            // 回傳結果
                            return {
                                success: true,
                                orderId: orderId,
                                total: total,
                                message: "訂單處理成功",
                                details: {
                                    subtotal: subtotal,
                                    tax: tax,
                                    shipping: shipping,
                                    discount: discount,
                                    estimatedDelivery: order.estimatedDelivery
                                }
                            };
                            
                        } else {
                            return {
                                success: false,
                                message: "庫存不足，可用數量：" + products[i].stock
                            };
                        }
                    }
                }
                
                if (!productFound) {
                    return {
                        success: false,
                        message: "找不到商品：" + productName
                    };
                }
                
            } else {
                return {
                    success: false,
                    message: "價格必須大於0"
                };
            }
        } else {
            return {
                success: false,
                message: "數量必須大於0"
            };
        }
    } else {
        return {
            success: false,
            message: "缺少必要參數"
        };
    }
}

// 重複的計算邏輯
function calculateDeliveryDate(customerType, address) {
    var today = new Date();
    var deliveryDays = 7; // 預設7天
    
    if (customerType == "premium") {
        deliveryDays = 1; // 隔日到貨
    } else if (customerType == "vip") {
        deliveryDays = 2; // 2天到貨
    } else {
        deliveryDays = 7; // 一般客戶
    }
    
    // 地址影響配送時間的複雜邏輯
    if (address && (address.includes("台北") || address.includes("新北"))) {
        deliveryDays = deliveryDays - 1;
    } else if (address && (address.includes("花蓮") || address.includes("台東"))) {
        deliveryDays = deliveryDays + 2;
    } else if (address && address.includes("離島")) {
        deliveryDays = deliveryDays + 5;
    }
    
    var deliveryDate = new Date(today.getTime() + (deliveryDays * 24 * 60 * 60 * 1000));
    return deliveryDate;
}

// 假的郵件發送函數
function sendEmail(customerName, subject, content) {
    console.log("📧 Sending email to " + customerName);
    console.log("Subject: " + subject);
    console.log("Content: " + content);
    return true;
}

// 假的簡訊發送函數
function sendSMS(phone, message) {
    console.log("📱 Sending SMS to " + phone);
    console.log("Message: " + message);
    return true;
}

// 初始化假資料
function initializeSystem() {
    products = [
        { name: "筆記型電腦", price: 25000, stock: 10 },
        { name: "藍牙耳機", price: 3500, stock: 50 },
        { name: "無線滑鼠", price: 1200, stock: 100 },
        { name: "鍵盤", price: 2500, stock: 30 },
        { name: "顯示器", price: 8000, stock: 15 }
    ];
    
    customers = [
        { name: "王小明", type: "vip", phone: "0912345678", address: "台北市信義區", totalOrders: 5, totalSpent: 50000, joinDate: new Date("2023-01-15") },
        { name: "李小華", type: "premium", phone: "0987654321", address: "新北市板橋區", totalOrders: 10, totalSpent: 120000, joinDate: new Date("2022-06-20") },
        { name: "張小美", type: "regular", phone: "0955123456", address: "台中市西屯區", totalOrders: 2, totalSpent: 15000, joinDate: new Date("2024-03-10") }
    ];
    
    console.log("System initialized with " + products.length + " products and " + customers.length + " customers");
}

// 系統啟動
initializeSystem();

// 更多重複和混亂的函數...

function getOrderStatus(orderId) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].id == orderId) {
            return orders[i].status;
        }
    }
    return "Order not found";
}

function updateOrderStatus(orderId, newStatus) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].id == orderId) {
            orders[i].status = newStatus;
            if (newStatus == "shipped") {
                console.log("Order " + orderId + " has been shipped");
                // 發送出貨通知
                var order = orders[i];
                if (order.customerType == "premium" || order.customerType == "vip") {
                    sendEmail(order.customerName, "商品已出貨", "您的訂單 " + orderId + " 已出貨");
                } else {
                    sendSMS(order.phone, "您的訂單 " + orderId + " 已出貨");
                }
            }
            return true;
        }
    }
    return false;
}

// 沒有錯誤處理的函數
function getCustomerOrders(customerName) {
    var customerOrders = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].customerName == customerName) {
            customerOrders.push(orders[i]);
        }
    }
    return customerOrders;
}

// 效能很差的函數
function getTopCustomers() {
    var sortedCustomers = [];
    for (var i = 0; i < customers.length; i++) {
        sortedCustomers.push(customers[i]);
    }
    
    // 使用最笨的排序方式
    for (var i = 0; i < sortedCustomers.length; i++) {
        for (var j = i + 1; j < sortedCustomers.length; j++) {
            if (sortedCustomers[i].totalSpent < sortedCustomers[j].totalSpent) {
                var temp = sortedCustomers[i];
                sortedCustomers[i] = sortedCustomers[j];
                sortedCustomers[j] = temp;
            }
        }
    }
    
    return sortedCustomers.slice(0, 10);
}

// 全域污染
window.processOrderGlobal = processOrder;
window.orders = orders;
window.customers = customers;
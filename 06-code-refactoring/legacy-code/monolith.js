// 遺留電子商務系統 - 單體架構檔案
// 這個檔案包含了多種程式碼異味，需要進行重構

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const moment = require('moment');
const _ = require('lodash');

// 全域變數 - 程式碼異味 #1
var app = express();
var db;
var mailTransporter;
var JWT_SECRET = "super_secret_key_123"; // 硬編碼密鑰 - 程式碼異味 #2
var users = [];
var products = [];
var orders = [];
var inventory = [];

// 資料庫連線設定 - 硬編碼 - 程式碼異味 #3
function connectDB() {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password123',
        database: 'ecommerce'
    });
    
    db.connect((err) => {
        if (err) {
            console.log('Database connection failed');
            throw err;
        }
        console.log('Connected to MySQL');
    });
}

// 郵件設定 - 硬編碼 - 程式碼異味 #4
function setupMail() {
    mailTransporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: 'admin@company.com',
            pass: 'email_password_123'
        }
    });
}

// 超長函數 - 包含太多職責 - 程式碼異味 #5
function handleUserRegistration(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var birthdate = req.body.birthdate;
    
    // 缺乏輸入驗證 - 程式碼異味 #6
    if (!email || !password) {
        res.status(400).json({error: 'Missing fields'});
        return;
    }
    
    // 重複的驗證邏輯 - 程式碼異味 #7
    if (email.indexOf('@') === -1) {
        res.status(400).json({error: 'Invalid email'});
        return;
    }
    
    if (password.length < 6) {
        res.status(400).json({error: 'Password too short'});
        return;
    }
    
    // 檢查用戶是否已存在
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Database error'});
            return;
        }
        
        if (results.length > 0) {
            res.status(400).json({error: 'User already exists'});
            return;
        }
        
        // 密碼加密
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                res.status(500).json({error: 'Encryption error'});
                return;
            }
            
            // 插入新用戶
            var insertQuery = 'INSERT INTO users (email, password, name, phone, address, birthdate, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
            var now = moment().format('YYYY-MM-DD HH:mm:ss');
            
            db.query(insertQuery, [email, hashedPassword, name, phone, address, birthdate, now], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: 'Failed to create user'});
                    return;
                }
                
                var userId = result.insertId;
                
                // 建立用戶設定檔
                var profileQuery = 'INSERT INTO user_profiles (user_id, preferences, loyalty_points) VALUES (?, ?, ?)';
                var defaultPreferences = JSON.stringify({newsletter: true, promotions: true});
                
                db.query(profileQuery, [userId, defaultPreferences, 0], (err) => {
                    if (err) {
                        console.log(err);
                        // 但繼續執行...
                    }
                    
                    // 發送歡迎郵件
                    var mailOptions = {
                        from: 'admin@company.com',
                        to: email,
                        subject: 'Welcome to our store!',
                        html: '<h1>Welcome!</h1><p>Thank you for registering with us.</p>'
                    };
                    
                    mailTransporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.log('Email failed:', err);
                            // 但不返回錯誤...
                        }
                        
                        // 記錄到分析系統
                        var analyticsData = {
                            event: 'user_registration',
                            user_id: userId,
                            timestamp: now,
                            source: req.headers['user-agent']
                        };
                        
                        // 模擬第三方 API 呼叫
                        setTimeout(() => {
                            console.log('Analytics sent:', analyticsData);
                        }, 1000);
                        
                        // 生成 JWT token
                        var token = jwt.sign({userId: userId, email: email}, JWT_SECRET, {expiresIn: '24h'});
                        
                        res.status(201).json({
                            message: 'User created successfully',
                            userId: userId,
                            token: token
                        });
                    });
                });
            });
        });
    });
}

// 另一個超長函數 - 處理產品搜尋和篩選 - 程式碼異味 #8
function handleProductSearch(req, res) {
    var query = req.query.q;
    var category = req.query.category;
    var minPrice = req.query.min_price;
    var maxPrice = req.query.max_price;
    var sortBy = req.query.sort;
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    
    // 重複的驗證邏輯 - 程式碼異味 #9
    if (query && query.length < 2) {
        res.status(400).json({error: 'Query too short'});
        return;
    }
    
    if (minPrice && isNaN(minPrice)) {
        res.status(400).json({error: 'Invalid min price'});
        return;
    }
    
    if (maxPrice && isNaN(maxPrice)) {
        res.status(400).json({error: 'Invalid max price'});
        return;
    }
    
    // 複雜的 SQL 查詢建構 - 程式碼異味 #10
    var sqlQuery = 'SELECT p.*, c.name as category_name, AVG(r.rating) as avg_rating, COUNT(r.id) as review_count FROM products p';
    sqlQuery += ' LEFT JOIN categories c ON p.category_id = c.id';
    sqlQuery += ' LEFT JOIN reviews r ON p.id = r.product_id';
    sqlQuery += ' WHERE p.active = 1';
    
    var params = [];
    
    if (query) {
        sqlQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
        params.push('%' + query + '%');
        params.push('%' + query + '%');
    }
    
    if (category) {
        sqlQuery += ' AND c.slug = ?';
        params.push(category);
    }
    
    if (minPrice) {
        sqlQuery += ' AND p.price >= ?';
        params.push(minPrice);
    }
    
    if (maxPrice) {
        sqlQuery += ' AND p.price <= ?';
        params.push(maxPrice);
    }
    
    sqlQuery += ' GROUP BY p.id';
    
    // 排序邏輯 - 重複且複雜 - 程式碼異味 #11
    if (sortBy === 'price_asc') {
        sqlQuery += ' ORDER BY p.price ASC';
    } else if (sortBy === 'price_desc') {
        sqlQuery += ' ORDER BY p.price DESC';
    } else if (sortBy === 'name_asc') {
        sqlQuery += ' ORDER BY p.name ASC';
    } else if (sortBy === 'name_desc') {
        sqlQuery += ' ORDER BY p.name DESC';
    } else if (sortBy === 'rating') {
        sqlQuery += ' ORDER BY avg_rating DESC';
    } else if (sortBy === 'popularity') {
        sqlQuery += ' ORDER BY p.sales_count DESC';
    } else {
        sqlQuery += ' ORDER BY p.created_at DESC';
    }
    
    var offset = (page - 1) * limit;
    sqlQuery += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit));
    params.push(parseInt(offset));
    
    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Search failed'});
            return;
        }
        
        // 獲取總數的另一個查詢 - 重複邏輯 - 程式碼異味 #12
        var countQuery = 'SELECT COUNT(DISTINCT p.id) as total FROM products p';
        countQuery += ' LEFT JOIN categories c ON p.category_id = c.id';
        countQuery += ' WHERE p.active = 1';
        
        var countParams = [];
        
        if (query) {
            countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            countParams.push('%' + query + '%');
            countParams.push('%' + query + '%');
        }
        
        if (category) {
            countQuery += ' AND c.slug = ?';
            countParams.push(category);
        }
        
        if (minPrice) {
            countQuery += ' AND p.price >= ?';
            countParams.push(minPrice);
        }
        
        if (maxPrice) {
            countQuery += ' AND p.price <= ?';
            countParams.push(maxPrice);
        }
        
        db.query(countQuery, countParams, (err, countResults) => {
            if (err) {
                console.log(err);
                res.status(500).json({error: 'Count failed'});
                return;
            }
            
            var total = countResults[0].total;
            var totalPages = Math.ceil(total / limit);
            
            // 為每個產品處理額外資料 - 程式碼異味 #13
            var processedResults = [];
            var completed = 0;
            
            if (results.length === 0) {
                res.json({
                    products: [],
                    pagination: {
                        page: parseInt(page),
                        limit: parseInt(limit),
                        total: total,
                        totalPages: totalPages
                    }
                });
                return;
            }
            
            results.forEach((product, index) => {
                // 獲取產品圖片
                db.query('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order', [product.id], (err, images) => {
                    if (err) {
                        console.log(err);
                        product.images = [];
                    } else {
                        product.images = images;
                    }
                    
                    // 獲取庫存資訊
                    db.query('SELECT * FROM inventory WHERE product_id = ?', [product.id], (err, inventory) => {
                        if (err) {
                            console.log(err);
                            product.stock = 0;
                        } else {
                            product.stock = inventory.reduce((sum, item) => sum + item.quantity, 0);
                        }
                        
                        // 計算折扣價格
                        db.query('SELECT * FROM discounts WHERE product_id = ? AND start_date <= NOW() AND end_date >= NOW() AND active = 1', [product.id], (err, discounts) => {
                            if (err) {
                                console.log(err);
                                product.discounted_price = product.price;
                            } else {
                                var maxDiscount = 0;
                                discounts.forEach(discount => {
                                    if (discount.type === 'percentage') {
                                        var discountAmount = product.price * (discount.value / 100);
                                        if (discountAmount > maxDiscount) {
                                            maxDiscount = discountAmount;
                                        }
                                    } else if (discount.type === 'fixed') {
                                        if (discount.value > maxDiscount) {
                                            maxDiscount = discount.value;
                                        }
                                    }
                                });
                                product.discounted_price = Math.max(0, product.price - maxDiscount);
                            }
                            
                            processedResults[index] = product;
                            completed++;
                            
                            if (completed === results.length) {
                                res.json({
                                    products: processedResults,
                                    pagination: {
                                        page: parseInt(page),
                                        limit: parseInt(limit),
                                        total: total,
                                        totalPages: totalPages
                                    }
                                });
                            }
                        });
                    });
                });
            });
        });
    });
}

// 重複的認證中介軟體 - 程式碼異味 #14
function authenticateUser(req, res, next) {
    var token = req.headers.authorization;
    
    if (!token) {
        res.status(401).json({error: 'No token provided'});
        return;
    }
    
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Invalid token'});
            return;
        }
        
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    });
}

// 另一個認證函數 - 重複邏輯 - 程式碼異味 #15
function checkAdminAuth(req, res, next) {
    var token = req.headers.authorization;
    
    if (!token) {
        res.status(401).json({error: 'No token provided'});
        return;
    }
    
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Invalid token'});
            return;
        }
        
        // 檢查是否為管理員
        db.query('SELECT role FROM users WHERE id = ?', [decoded.userId], (err, results) => {
            if (err || results.length === 0 || results[0].role !== 'admin') {
                res.status(403).json({error: 'Admin access required'});
                return;
            }
            
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
            next();
        });
    });
}

// 超長的訂單處理函數 - 程式碼異味 #16
function processOrder(req, res) {
    var userId = req.userId;
    var items = req.body.items;
    var shippingAddress = req.body.shipping_address;
    var paymentMethod = req.body.payment_method;
    var couponCode = req.body.coupon_code;
    
    // 缺乏適當的驗證 - 程式碼異味 #17
    if (!items || items.length === 0) {
        res.status(400).json({error: 'No items in order'});
        return;
    }
    
    if (!shippingAddress) {
        res.status(400).json({error: 'Shipping address required'});
        return;
    }
    
    var totalAmount = 0;
    var validItems = [];
    var processedItems = 0;
    
    // 複雜的巢狀回呼 - 回呼地獄 - 程式碼異味 #18
    items.forEach((item, index) => {
        db.query('SELECT * FROM products WHERE id = ? AND active = 1', [item.product_id], (err, productResults) => {
            if (err) {
                console.log(err);
                res.status(500).json({error: 'Database error'});
                return;
            }
            
            if (productResults.length === 0) {
                res.status(400).json({error: 'Product not found: ' + item.product_id});
                return;
            }
            
            var product = productResults[0];
            
            // 檢查庫存
            db.query('SELECT SUM(quantity) as stock FROM inventory WHERE product_id = ?', [item.product_id], (err, stockResults) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: 'Stock check failed'});
                    return;
                }
                
                var availableStock = stockResults[0].stock || 0;
                
                if (availableStock < item.quantity) {
                    res.status(400).json({error: 'Insufficient stock for product: ' + product.name});
                    return;
                }
                
                // 計算價格（包含折扣）
                db.query('SELECT * FROM discounts WHERE product_id = ? AND start_date <= NOW() AND end_date >= NOW() AND active = 1', [item.product_id], (err, discountResults) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({error: 'Discount calculation failed'});
                        return;
                    }
                    
                    var finalPrice = product.price;
                    var maxDiscount = 0;
                    
                    discountResults.forEach(discount => {
                        if (discount.type === 'percentage') {
                            var discountAmount = product.price * (discount.value / 100);
                            if (discountAmount > maxDiscount) {
                                maxDiscount = discountAmount;
                            }
                        } else if (discount.type === 'fixed') {
                            if (discount.value > maxDiscount) {
                                maxDiscount = discount.value;
                            }
                        }
                    });
                    
                    finalPrice = Math.max(0, product.price - maxDiscount);
                    
                    validItems[index] = {
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_price: finalPrice,
                        total_price: finalPrice * item.quantity,
                        product_name: product.name
                    };
                    
                    totalAmount += validItems[index].total_price;
                    processedItems++;
                    
                    if (processedItems === items.length) {
                        // 所有商品都已處理，繼續訂單流程
                        processCoupon();
                    }
                });
            });
        });
    });
    
    function processCoupon() {
        if (!couponCode) {
            proceedWithPayment();
            return;
        }
        
        db.query('SELECT * FROM coupons WHERE code = ? AND active = 1 AND expires_at > NOW()', [couponCode], (err, couponResults) => {
            if (err) {
                console.log(err);
                res.status(500).json({error: 'Coupon validation failed'});
                return;
            }
            
            if (couponResults.length === 0) {
                res.status(400).json({error: 'Invalid or expired coupon'});
                return;
            }
            
            var coupon = couponResults[0];
            
            // 檢查使用次數限制
            db.query('SELECT COUNT(*) as usage_count FROM orders WHERE coupon_code = ?', [couponCode], (err, usageResults) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: 'Coupon usage check failed'});
                    return;
                }
                
                if (coupon.usage_limit && usageResults[0].usage_count >= coupon.usage_limit) {
                    res.status(400).json({error: 'Coupon usage limit exceeded'});
                    return;
                }
                
                // 計算優惠券折扣
                var couponDiscount = 0;
                if (coupon.type === 'percentage') {
                    couponDiscount = totalAmount * (coupon.value / 100);
                    if (coupon.max_discount && couponDiscount > coupon.max_discount) {
                        couponDiscount = coupon.max_discount;
                    }
                } else if (coupon.type === 'fixed') {
                    couponDiscount = Math.min(coupon.value, totalAmount);
                }
                
                totalAmount = Math.max(0, totalAmount - couponDiscount);
                
                proceedWithPayment();
            });
        });
    }
    
    function proceedWithPayment() {
        // 模擬支付處理 - 應該是外部服務 - 程式碼異味 #19
        setTimeout(() => {
            var paymentSuccessful = Math.random() > 0.1; // 90% 成功率
            
            if (!paymentSuccessful) {
                res.status(400).json({error: 'Payment failed'});
                return;
            }
            
            // 建立訂單
            var orderData = {
                user_id: userId,
                total_amount: totalAmount,
                status: 'confirmed',
                shipping_address: JSON.stringify(shippingAddress),
                payment_method: paymentMethod,
                coupon_code: couponCode,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            
            db.query('INSERT INTO orders SET ?', orderData, (err, orderResult) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: 'Order creation failed'});
                    return;
                }
                
                var orderId = orderResult.insertId;
                
                // 插入訂單項目
                var orderItemsProcessed = 0;
                
                validItems.forEach(item => {
                    if (!item) return;
                    
                    var orderItemData = {
                        order_id: orderId,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        total_price: item.total_price
                    };
                    
                    db.query('INSERT INTO order_items SET ?', orderItemData, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        
                        // 更新庫存
                        db.query('UPDATE inventory SET quantity = quantity - ? WHERE product_id = ? AND quantity >= ?', 
                                [item.quantity, item.product_id, item.quantity], (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            
                            orderItemsProcessed++;
                            
                            if (orderItemsProcessed === validItems.filter(item => item).length) {
                                // 發送確認郵件
                                var mailOptions = {
                                    from: 'orders@company.com',
                                    to: req.userEmail,
                                    subject: 'Order Confirmation #' + orderId,
                                    html: '<h1>Order Confirmed!</h1><p>Your order #' + orderId + ' has been confirmed.</p>'
                                };
                                
                                mailTransporter.sendMail(mailOptions, (err) => {
                                    if (err) {
                                        console.log('Email failed:', err);
                                    }
                                    
                                    res.status(201).json({
                                        message: 'Order created successfully',
                                        orderId: orderId,
                                        totalAmount: totalAmount
                                    });
                                });
                            }
                        });
                    });
                });
            });
        }, 2000);
    }
}

// 應用程式設定和路由 - 全部混在一起 - 程式碼異味 #20
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由定義 - 缺乏組織 - 程式碼異味 #21
app.post('/api/register', handleUserRegistration);
app.get('/api/products/search', handleProductSearch);
app.post('/api/orders', authenticateUser, processOrder);

// 其他混雜的路由...
app.get('/api/users/profile', authenticateUser, (req, res) => {
    // 又是一個長函數...
    db.query('SELECT u.*, up.preferences, up.loyalty_points FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?', 
            [req.userId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Database error'});
            return;
        }
        
        if (results.length === 0) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        
        var user = results[0];
        delete user.password; // 移除密碼
        
        res.json(user);
    });
});

// 啟動應用程式 - 缺乏錯誤處理 - 程式碼異味 #22
function startServer() {
    connectDB();
    setupMail();
    
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

// 沒有優雅的關閉處理 - 程式碼異味 #23
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit();
});

// 直接啟動，沒有模組化 - 程式碼異味 #24
if (require.main === module) {
    startServer();
}

module.exports = app;
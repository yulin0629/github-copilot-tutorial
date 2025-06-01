# 場景 4：偵錯輔助

## 🎯 學習目標
- 學習使用 **@terminal** 參與者協助偵錯
- 掌握自然語言描述錯誤問題的技巧
- 體驗 Copilot 在錯誤診斷和修復方面的能力
- 了解如何將終端機錯誤與 Copilot 整合

## 📝 場景說明
您正在開發一個 Node.js API 伺服器，但遇到了各種運行時錯誤、依賴問題和配置錯誤。學習如何利用 GitHub Copilot 快速診斷問題並提供解決方案。

## 🛠️ 初始專案結構
```
04-debugging-assistant/
├── README.md (本檔案)
├── package.json
├── server.js (有問題的 API 伺服器)
├── routes/
│   ├── users.js (用戶路由)
│   └── products.js (產品路由)
├── database/
│   └── connection.js (資料庫連接)
├── utils/
│   └── helpers.js (工具函數)
└── logs/
    └── error.log (錯誤日誌)
```

## 📚 Demo 劇本

### 步驟 1：分析啟動錯誤
1. 嘗試啟動伺服器：`npm start`
2. 遇到錯誤後，在 Copilot Chat 中輸入：
```
這個 Node.js 啟動錯誤是什麼意思？請幫我分析並提供解決方案：
[貼上錯誤訊息]
```

### 步驟 2：使用 @terminal 協助
當遇到命令列錯誤時：
```
@terminal 這個 npm 安裝錯誤要如何解決？
[貼上終端機錯誤輸出]
```

### 步驟 3：分析程式碼錯誤
當程式碼出現運行時錯誤：
```
這段程式碼為什麼會拋出 TypeError？如何修正？
[選取有問題的程式碼]
```

### 步驟 4：資料庫連接問題
```
@workspace 分析資料庫連接失敗的原因，檢查所有相關設定檔案
```

### 步驟 5：效能問題診斷
```
這個 API 回應很慢，請幫我分析可能的效能瓶頸
```

## 💡 重點提示

### 錯誤分析最佳實踐：
1. **提供完整上下文**：包含錯誤訊息、相關程式碼和環境資訊
2. **描述重現步驟**：說明如何觸發這個錯誤
3. **說明期望行為**：描述應該發生什麼
4. **包含相關日誌**：提供錯誤日誌和堆疊追蹤

### @terminal 使用技巧：
1. **複製完整錯誤**：包含完整的終端機輸出
2. **提供執行環境**：說明 OS、Node 版本等
3. **說明執行指令**：告知執行了什麼指令

### 自然語言偵錯技巧：
1. **具體描述問題**：「為什麼會拋出 undefined is not a function？」
2. **提供錯誤上下文**：「在處理用戶登入時發生錯誤」
3. **詢問替代方案**：「有沒有更安全的實作方式？」

## 🎬 Demo 重點
1. 展示真實的開發錯誤場景
2. 示範 @terminal 在命令列問題上的協助
3. 強調 @workspace 在跨檔案錯誤分析上的價值
4. 展現自然語言描述錯誤的效果

## 📝 常見錯誤類型

### 1. 啟動錯誤
```
Error: Cannot find module 'express'
端口被占用錯誤
環境變數未設定
```

### 2. 程式碼錯誤
```
TypeError: Cannot read property 'name' of undefined
ReferenceError: variable is not defined
SyntaxError: Unexpected token
```

### 3. 資料庫錯誤
```
Connection timeout
Authentication failed
Invalid query syntax
```

### 4. API 錯誤
```
CORS 錯誤
404 路由找不到
Request payload too large
```

## ✅ 預期成果
完成本場景後，您應該：
- 能夠有效使用 @terminal 分析命令列錯誤
- 掌握向 Copilot 描述程式碼錯誤的技巧
- 了解如何利用 @workspace 進行跨檔案錯誤分析
- 建立完整的錯誤診斷和修復流程

## 🔍 延伸練習
1. 嘗試分析記憶體洩漏問題
2. 使用 Copilot 協助設定偵錯器
3. 請 Copilot 協助撰寫錯誤處理中介軟體
4. 讓 Copilot 幫助優化錯誤日誌系統

## 🎯 挑戰任務
1. 修復所有提供的 bug 範例
2. 設計一個完整的錯誤監控系統
3. 建立自動化的錯誤通報機制
# 場景 2：程式碼解釋與 Inline Edit

## 🎯 學習目標
- 深入使用 **@workspace** 理解專案架構
- **掌握 Inline Edit (Ctrl+I) 快速修改技巧**
- **理解 Inline Edit vs Chat Edit 使用時機**

## 📝 場景說明
您接手了一個既有的電子商務購物車系統，需要理解其架構和運作方式。透過 GitHub Copilot 的 @workspace 功能，快速掌握整個專案的結構。

## 🛠️ 初始專案結構
```
02-code-explanation/
├── README.md (本檔案)
├── index.html
├── js/
│   ├── cart.js (購物車邏輯)
│   ├── products.js (產品資料)
│   └── utils.js (工具函數)
└── style.css
```

## 📚 Demo 劇本

### 階段 1：@workspace 程式碼理解 (3分鐘)

#### 步驟 1：專案架構分析
```
@workspace 請分析這個購物車系統的架構，說明主要功能和檔案關係
```
💡 **使用模式：Ask**

#### 步驟 2：追蹤關鍵函數
```
@workspace calculateTotal 函數的運作流程是什麼？它與哪些函數互動？
```
💡 **使用模式：Ask**

#### 步驟 3：理解資料流向
```
@workspace 當使用者點擊「加入購物車」按鈕時，資料是如何在各個檔案間流動的？
```
💡 **使用模式：Ask**

### 階段 2：Ghost Text 體驗 (2分鐘)

#### 步驟 4：使用註解引導 Auto Complete
1. 開啟 `js/utils.js`
2. 在檔案最後加入詳細的 TODO 註解：
```javascript
// TODO: 加入一個計算折扣的函數
// 函數名稱: calculateDiscount
// 參數: subtotal (小計金額)
// 邏輯: 滿 1000 打 95 折，滿 2000 打 9 折
// 回傳: 折扣後的金額
```
3. 在註解下方開始輸入 `function calc`
4. **暂停 1-2 秒**，觀察灰色的 Ghost Text 建議
5. 按 `Tab` 接受建議，繼續輸入下一行
6. Copilot 會根據註解自動完成整個函數

✅ **關鍵技巧**：詳細的註解 = 更精準的程式碼生成

### 階段 3：Inline Edit 實戰 (3分鐘)

#### 步驟 5：初識 Inline Edit - 優化運費計算
1. 開啟 `js/utils.js`
2. 找到 `calculateShipping` 函數（約第 10-16 行）
3. **選取整個函數內容**（從 function 到結尾的 }）
4. 按 `Ctrl+I` (或 `Cmd+I` on Mac)
5. 輸入：
```
改成階梯式運費：500以下60元，500-1000收30元，1000以上免運
```
6. 按 Enter 送出
7. 檢視修改預覽，按 `Ctrl+Enter` 接受

#### 步驟 6：Inline Edit 實用修改 - 整合折扣
1. 在 `js/cart.js` 找到 `calculateTotal` 函數（約 137-146 行）
2. **選取整個 calculateTotal 函數**
3. 按 `Ctrl+I`
4. 輸入：
```
整合剛剛寫的 calculateDiscount 函數，在運費計算前先計算折扣
```
5. 按 Enter，等待 AI 生成程式碼
6. 按 `Ctrl+Enter` 接受修改

#### 步驟 7：測試修改效果
1. 開啟 `index.html` 在瀏覽器中
2. 加入商品到購物車
3. 觀察：
   - 運費隨金額變化（步驟 5 的效果）
   - 滿額自動打折（步驟 6 的效果）

## 💡 重點提示

### Ghost Text (Auto Complete) 技巧：
- **詳細註解**：寫明函數名稱、參數、邏輯、回傳值
- **暂停等待**：輸入幾個字後停 1-2 秒
- **Tab 接受**：看到灰色建議後按 Tab
- **逐行生成**：可以一行一行接受或修改

### Inline Edit 快速記憶：
- **選取程式碼 → Ctrl+I**：針對選取範圍修改
- **Ctrl+I 不選取**：AI 會根據游標位置猜測範圍
- **Enter**：送出指令
- **Ctrl+Enter**：接受修改
- **Esc**：取消修改

### Inline Edit vs Chat Edit：
- **Inline Edit**：定點修改，快速直接
- **Chat Edit**：探索修改，需要 AI 定位

## 🎬 Demo 重點
1. **@workspace 的專案理解能力**
2. **Ghost Text 根據註解自動完成**
3. **Inline Edit 的快速修改體驗**
4. **實際運行展示修改效果**

## ✅ 預期成果
- 掌握 @workspace 分析專案的能力
- 會使用註解引導 Ghost Text 生成程式碼
- 熟練使用 Inline Edit (Ctrl+I) 快速修改
- 了解 Ghost Text、Inline Edit、Chat Edit 的使用時機
- 能實際看到程式碼修改的效果

## 🔍 快速練習
1. 用 Inline Edit 修改其他函數
2. 試試選取不同範圍使用 Ctrl+I 的差異
3. 用 @workspace 找出可優化的地方

## 🎯 下一步
- 場景 3 將首次引入 Agent 模式（20%）
- 體驗 Agent 與 Ask/Edit 的根本差異
# JavaScript 程式碼風格指令

## 基本語法規範
- 使用 **雙引號** 包裹字串，不使用單引號
- 使用 **2 個空格** 縮排，絕對不使用 Tab
- 行尾不加分號 (除非必要時)
- 使用 **camelCase** 命名變數和函數
- 使用 **PascalCase** 命名類別和構造函數

## 變數宣告規範
- 優先使用 `const`，需要重新賦值時使用 `let`
- **絕對避免使用 `var`**
- 每個變數都要有明確的宣告
- 使用具有描述性的變數名稱

## 函數撰寫規範
- 優先使用箭頭函數 `() => {}` 除非需要 `this` 綁定
- 函數名稱要清楚表達功能：`getUserData()`, `calculateTotal()`
- 單一職責原則：每個函數只做一件事
- 函數長度不超過 20 行

## ES6+ 現代語法要求
- 使用**解構賦值**提取物件和陣列元素
- 使用**樣板字面值**進行字串插值
- 使用**展開運算子**處理陣列和物件
- 使用 `async/await` 而非 Promise.then()

## 錯誤處理
- 所有 async 函數都要使用 try-catch
- 提供有意義的錯誤訊息
- 避免靜默忽略錯誤
- 使用適當的錯誤類型

## 註解規範
- 所有函數都要有 JSDoc 註解
- 複雜邏輯需要行內註解說明
- **使用繁體中文撰寫註解**，方便台灣學員理解
- 註解要解釋「為什麼」而不只是「做什麼」

## 程式碼組織
- 相關功能要放在同一個模組
- 使用 ES6 模組語法 import/export
- 避免全域變數
- 保持檔案簡潔，單一檔案不超過 200 行
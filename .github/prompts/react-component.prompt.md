---
mode: "agent"
description: "生成符合專案規範的 React 元件"
---

# React 元件生成器

請為我生成一個完整的 React 功能元件，遵循以下規範：

## 基本要求
- 使用 **TypeScript** (如果是 .tsx 檔案)
- 使用 **函數式元件** 和 **Hooks**
- 遵循 **PascalCase** 命名慣例
- 包含完整的 **PropTypes** 或 **TypeScript 介面**

## 程式碼風格
- 使用 **2 個空格** 縮排
- 使用 **雙引號** 包裹字串
- 解構 props 參數
- 加入適當的註解說明

## 必須包含的結構
1. **Import 區域** - 所需的 React hooks 和依賴
2. **TypeScript 介面** - 定義 props 的型別
3. **元件函數** - 主要的元件邏輯
4. **JSX 返回** - 清晰的 UI 結構
5. **預設匯出** - 元件的匯出語句

## 額外要求
- 加入基本的 **錯誤處理**
- 使用 **semantic HTML** 標籤
- 包含 **accessibility** 屬性 (aria-label, role 等)
- 如果需要狀態管理，使用 **useState** 或 **useReducer**

## 範例請求格式
如果我沒有提供具體要求，請詢問：
- 元件名稱
- 主要功能
- 需要的 props
- 是否需要狀態管理

請生成一個生產就緒的 React 元件。
# GitHub Copilot Prompt Files 使用指南

這個目錄包含了可重複使用的 GitHub Copilot prompt files，用於常見的開發任務。

## 📋 **Prompt Files vs Instructions 差異**

### Instructions Files (`.github/copilot-instructions.md`)
- **用途**：全專案的通用設定，自動套用到每個 Chat 請求
- **格式**：可使用 `applyTo` 來指定檔案匹配模式
- **範圍**：整個專案的全域設定

### Prompt Files (`.github/prompts/*.prompt.md`)
- **用途**：特定任務的可重複使用提示
- **格式**：**不能使用** `applyTo`，只能使用 `mode` 和 `description`
- **使用**：手動附加到 Chat 或透過指令呼叫

## 🛠️ **Prompt Files 格式規範**

### 正確的 YAML Frontmatter
```yaml
---
mode: "ask" | "edit" | "agent"
description: "提示的描述"
---
```

### Mode 說明
- **`ask`**: 詢問和討論模式，適合需要更多資訊的場景
- **`edit`**: 編輯模式，適合修改現有程式碼
- **`agent`**: Agent 模式，適合複雜的自主任務

## 📁 **可用的 Prompt Files**

### 1. `react-component.prompt.md`
- **模式**: Agent
- **用途**: 生成符合專案規範的 React 元件
- **適用**: React/TypeScript 專案

### 2. `api-testing.prompt.md`
- **模式**: Agent
- **用途**: 生成完整的 API 測試套件
- **適用**: Jest + Supertest 測試

### 3. `security-review.prompt.md`
- **模式**: Edit
- **用途**: 執行程式碼安全性檢查
- **適用**: 所有程式碼類型

### 4. `refactoring.prompt.md`
- **模式**: Edit
- **用途**: 程式碼重構最佳實踐
- **適用**: JavaScript/TypeScript

## 🚀 **使用方式**

### 在 VS Code 中使用
1. **開啟 Copilot Chat** (`Ctrl+Alt+I`)
2. **附加 Prompt File**:
   - 點擊 Chat 輸入框的 `+` 按鈕
   - 選擇想要的 prompt file
   - 或直接拖拽檔案到 Chat 視窗

### 使用指令
```bash
# 建立新的 prompt file
Chat: New Prompt File
```

## ⚙️ **啟用設定**

確保在 VS Code 設定中啟用：
```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.promptFiles": true
}
```

## 💡 **最佳實踐**

### 撰寫 Prompt Files
1. **明確的描述**: 在 frontmatter 中提供清楚的 description
2. **結構化內容**: 使用 Markdown 標題組織內容
3. **具體要求**: 提供明確的程式碼風格和結構要求
4. **範例和模板**: 包含預期的輸出格式

### 團隊協作
1. **版本控制**: 將 prompt files 加入 git 版本控制
2. **文件說明**: 為每個 prompt file 提供使用說明
3. **定期更新**: 根據專案需求更新 prompt 內容
4. **分類管理**: 按功能或技術分類組織 prompt files

## 🔄 **與 Agent 模式整合**

這些 prompt files 特別適合與 GitHub Copilot 的 Agent 模式搭配使用：

- **Agent 模式 prompt files**: 讓 AI 自主完成複雜任務
- **Edit 模式 prompt files**: 針對特定程式碼進行分析和改進
- **Ask 模式 prompt files**: 獲取特定領域的專業建議

使用這些 prompt files 可以大幅提升開發效率，確保團隊間的一致性，並充分發揮 GitHub Copilot 的潛力。
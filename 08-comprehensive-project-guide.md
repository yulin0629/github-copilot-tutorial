# 場景 8：GitHub 自動化 Agent (100% Agent)

## 🎯 場景概述

在這個場景中，你將體驗 **100% Agent 模式** - 讓 AI 完全接管從 Issue 到 Pull Request 的開發流程。

### 你將學到什麼？
- 如何讓 Agent 讀取並理解 GitHub Issues
- 如何讓 Agent 自主實作功能
- 如何讓 Agent 創建專業的 Pull Request
- 體驗真實的 AI 驅動開發流程

## 📚 前置準備

在開始之前，請確保你已經：
1. Fork 了 `copilot-agent-demo-todo` repository
2. 更新了 git remote 到你的 Fork
3. 在你的 GitHub repo 創建了至少一個 Issue

<details>
<summary>📋 點擊展開：快速設置指南</summary>

### 🚀 三步驟快速開始

#### 步驟 1：Fork Demo Repository
1. 開啟瀏覽器，前往：https://github.com/yulin0629/copilot-agent-demo-todo
2. 點擊右上角 **Fork** 按鈕
3. 選擇你的帳號，完成 Fork
4. 複製你的 Fork URL（例如：https://github.com/你的帳號/copilot-agent-demo-todo）

#### 步驟 2：讓 Agent 幫你設置（你的第一個 Agent 體驗！）
在 VS Code 中開啟 Copilot Chat，選擇 **Agent 模式**，輸入：

```
請幫我更新 git remote 到 [貼上你的 Fork URL]
```

例如：
```
請幫我更新 git remote 到 https://github.com/alice/copilot-agent-demo-todo
```

💡 **觀察**：Agent 會自動執行正確的 git 指令！

#### 步驟 3：創建你的第一個 Issue
1. 在瀏覽器中開啟你的 Fork
2. 前往 Issues 頁面
3. 創建新 Issue，例如：
   - 標題：添加深色模式
   - 內容：請為待辦事項應用添加深色模式切換功能
   - 標籤：enhancement

✅ **完成！** 現在你可以開始體驗 Agent 的威力了！

</details>

## 🚀 實作步驟

### 步驟 1：了解你的專案結構

你的 Fork 包含一個待辦事項應用，檔案結構如下：
```
copilot-agent-demo-todo/
├── index.html      # 應用介面
├── app.js          # 核心邏輯（含一些 bug）
├── style.css       # 樣式檔案
└── README.md       # 專案說明
```

### 步驟 2：創建你的第一個 Issue

如果還沒有 Issue，請在你的 GitHub repo 創建一個。建議的 Issue：

**簡單功能**：
- 標題：添加深色模式切換
- 描述：請為待辦事項應用添加深色模式，包含一個切換按鈕

**Bug 修復**：
- 標題：修復刪除任務後重新整理會還原的問題
- 描述：當刪除任務後，重新整理頁面，被刪除的任務又出現了

### 步驟 3：讓 Agent 接管開發 - 你的第一個 Agent 體驗

#### 練習 1：單一 Issue 實作

在 VS Code 中開啟 Copilot Chat，選擇 **Agent 模式**，輸入：

```
請查看我的 GitHub repo 中的 open issues，選擇第一個 issue 來實作
```

**使用模式：Agent**

**觀察重點**：
- Agent 如何自動連接到你的 GitHub repo
- Agent 如何理解 Issue 的需求
- Agent 如何規劃實作步驟
- Agent 如何修改程式碼

#### 練習 2：完整自動化流程

當 Agent 完成實作後，繼續指示：

```
請為剛才的修改創建一個 Pull Request，包含：
1. 清楚的標題
2. 詳細的修改說明
3. 測試步驟
```

**使用模式：Agent**

### 步驟 4：進階練習（選擇性）

當你熟悉基本流程後，可以嘗試：

#### 進階練習 1：批次分析
```
分析我的所有 open issues，評估每個的實作難度和所需時間
```

#### 進階練習 2：策略規劃
```
根據現有的 issues，建議一個開發順序，並說明理由
```

#### 進階練習 3：多 Issue 處理
```
選擇兩個相關的 issues 一起實作，並創建一個綜合的 PR
```

## 💡 實用技巧

### 1. 清晰的指令
給 Agent 明確的指示，例如：
- 「請實作 Issue #1」比「幫我寫程式」更好
- 「創建 PR 並說明測試步驟」比「提交程式碼」更完整

### 2. 分步驟執行
如果 Agent 一次處理太多，可以分步驟：
1. 先讓 Agent 分析 Issue
2. 確認理解後再實作
3. 最後創建 PR

### 3. 善用 Context
雖然 Agent 模式不支援 @workspace，但 Agent 會自動理解專案結構

## 🎯 學習重點回顧

### 你剛剛體驗了什麼？
1. **100% Agent 模式**：AI 完全主導開發流程
2. **真實 GitHub 工作流程**：從 Issue 到 PR 的完整體驗
3. **AI 的決策能力**：觀察 Agent 如何分析、規劃和實作
4. **效率提升**：原本需要 30 分鐘的工作，Agent 幾分鐘完成

### Agent 模式的優勢
- **自主性**：Agent 可以獨立完成複雜任務
- **整合性**：自動整合 GitHub API，無需手動操作
- **智能性**：理解需求並制定最佳解決方案
- **完整性**：從分析到實作到文件，一次完成

## 🚀 下一步

### 實際應用建議
1. **在你的專案中應用**：
   - 創建 `.github/copilot-instructions.md`
   - 讓 Agent 處理日常的 Issues
   - 逐步提高 Agent 的使用比例

2. **團隊協作**：
   - 分享你的 Agent 使用經驗
   - 建立團隊的 AI 使用規範
   - 創建共享的 prompt 模板

3. **持續優化**：
   - 觀察 Agent 的產出品質
   - 調整指令讓 Agent 更準確
   - 記錄最佳實踐

## 💭 思考題

1. Agent 模式適合處理哪些類型的任務？
2. 如何在保持程式碼品質的同時提高 Agent 使用率？
3. 你的團隊可以如何整合 Agent 到現有工作流程？

## 🎉 恭喜！

你已經完成了 GitHub Copilot Agent 的完整學習旅程！從 0% 到 100% Agent，你見證了 AI 如何改變軟體開發的方式。

記住：**Agent 是你的開發夥伴，而不只是工具。** 善用它，讓你專注於更有價值的創造性工作！
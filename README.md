# GitHub Copilot 教學專案

這是一個 GitHub Copilot 完整教學專案，透過 8 個由淺入深的實作場景，讓您掌握 GitHub Copilot 的各種功能。

## 📋 前置需求

- Windows 10/11, Mac 作業系統
- Visual Studio Code（最新版本）
- GitHub 帳號
- 網路連線

## 🚀 安裝與設定指南（Windows）

### 步驟 1：安裝 Visual Studio Code

1. 前往 [VS Code 官網](https://code.visualstudio.com/)
2. 下載 Windows 或 Mac 版本的安裝檔
3. 執行安裝程式，使用預設選項即可

### 步驟 2：取得 GitHub Copilot 訂閱

GitHub Copilot 於 2025 年 6 月更新方案，提供三種主要選擇：

#### 🆓 免費方案 (GitHub Copilot Free)
- **完全免費**，無需信用卡
- 每月 **2,000 次**程式碼完成建議
- 每月 **50 次** Copilot Chat 對話請求
- 支援基本 AI 模型（GPT-4o、o3-mini、Gemini 2.0）
- **不支援**進階 AI 模型（GPT-4.5、o3）
- **無法購買**額外進階請求

#### 💼 專業方案 (GitHub Copilot Pro)
- **月付 $10** 或 **年付 $100**
- **無限制**程式碼補全
- 每月 **300 次進階請求**
- 支援進階模型但**不含 GPT-4.5 與 o3**
- 超額可購買額外進階請求（**$0.04/次**）
- 完整 Copilot 擴展功能

#### 🚀 專業增強方案 (GitHub Copilot Pro+)
- **月付 $39** 或 **年付 $390**
- **無限制**程式碼補全
- 每月 **1,500 次進階請求**
- **完整支援**所有進階 AI 模型（包含 GPT-4.5、o3）
- 超額可購買額外進階請求（**$0.04/次**）
- 優先使用最新功能和模型預覽

#### 🎓 學生/教師方案
- 驗證身份後可免費使用（相當於 Pro 方案）
- 前往 [GitHub Education](https://education.github.com/) 申請

> ⚠️ **重要更新**：自 2025 年 6 月 4 日起，所有方案的「進階請求」正式開始計費和限制。

### 步驟 3：安裝 GitHub Copilot 擴充套件

#### 方法 1：透過 VS Code 擴充套件市集
1. 開啟 VS Code
2. 按下 `Ctrl+Shift+X` (`Cmd+Shift+X`) 開啟擴充套件市集
3. 搜尋「**GitHub Copilot**」
4. 安裝由 GitHub 官方提供的擴充套件
5. 安裝「**GitHub Copilot Chat**」擴充套件（用於聊天功能）

#### 方法 2：直接安裝連結
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)

### 步驟 4：登入 GitHub 帳號

1. 重新啟動 VS Code
2. 點擊 VS Code 右下角的 **Copilot 圖示**
3. 選擇「**Sign in to GitHub**」
4. 在瀏覽器中完成 GitHub 登入流程
5. 授權 VS Code 存取您的 GitHub 帳號
6. 返回 VS Code，選擇您要使用的訂閱方案

### 步驟 5：設定中文語言（重要！）

為了獲得最佳的中文使用體驗，請務必設定語言：

#### 設定 Copilot Chat 為繁體中文
1. 按下 `Ctrl+,` (`Cmd+,`) 開啟 VS Code 設定
2. 搜尋「**github.copilot.chat.localeOverride**」
3. 將值設定為 `**zh-TW**`

或直接編輯 `settings.json`：
```json
{
  "github.copilot.chat.localeOverride": "zh-TW"
}
```

#### 可選：設定 VS Code 介面語言
1. 按下 `F1` 或 `Ctrl+Shift+P` (`Cmd+Shift+P`) 開啟指令面板
2. 輸入 `Configure Display Language`
3. 選擇「中文(繁體) (zh-tw)」
4. 重新啟動 VS Code

### 步驟 6：最佳化設定

在 `settings.json` 中新增以下設定：
```json
{
  "github.copilot.chat.localeOverride": "zh-TW",
  "github.copilot.enable": true,
  "github.copilot.editor.enableAutoCompletions": true,
  "github.copilot.chat.useProjectTemplates": true
}
```

### 步驟 7：驗證安裝

✅ **檢查清單：**
- 右下角狀態列出現 Copilot 圖示且顯示為已啟用
- 新建一個 `.js` 或 `.py` 檔案，開始輸入程式碼時會看到自動建議
- 按下 `Ctrl+Alt+I` (`Cmd+Option+I`) 可以開啟 Copilot Chat 視窗
- 按下 `Ctrl+I` (`Cmd+I`) 可以使用 inline chat 功能
- **Copilot Chat 回應為繁體中文**

> 💡 **提示：** 如果沒有看到建議，請確認您已經登入 GitHub 並選擇了適當的訂閱方案。如果 Chat 不是中文回應，請檢查語言設定。

## 📚 教學內容

本教學包含 8 個循序漸進的實作場景：

### 1. [初次對話體驗](./01-first-experience/)
- 學習基本的 **ask** 功能
- 了解如何與 Copilot 對話
- 探索基礎程式碼建議

### 2. [程式碼解釋實作](./02-code-explanation/)
- 使用 **@workspace** 參與者
- 深入理解既有程式碼
- 學習提問技巧

### 3. [函數生成](./03-function-generation/)
- 掌握 **inline chat** (`Ctrl+I` / `Cmd+I`)
- 自然語言描述生成函數
- 快速產生函數程式碼

### 4. [偵錯輔助](./04-debugging-assistant/)
- 活用 **@terminal** 參與者
- 使用自然語言修正錯誤
- 整合終端機偵錯

### 5. [單元測試](./05-unit-testing/)
- 自然語言描述生成測試
- 學習 **edit mode** 批次編輯
- 提升測試覆蓋率

### 6. [程式碼重構](./06-code-refactoring/)
- 進階 **edit mode** 技巧
- 結合 **@workspace** 進行大規模重構
- 保持程式碼品質

### 7. [文件生成](./07-documentation/)
- 自然語言生成文件
- 整合 **ask** 功能撰寫說明
- 自動化文件維護

### 8. [綜合專案開發](./08-comprehensive-project/)
- **Agent mode** 自主開發
- 整合所有功能
- 完整專案實戰

## 🎯 學習目標

完成本教學後，您將能夠：
- ✅ 熟練使用 GitHub Copilot 的各種功能
- ✅ 提升開發效率 30-50%
- ✅ 撰寫更高品質的程式碼
- ✅ 快速理解和維護既有專案
- ✅ 自動化重複性工作

## 🛠️ Copilot 功能總覽

| 功能 | Windows 快捷鍵 | Mac 快捷鍵 | 說明 |
|------|---------------|-----------|------|
| 接受建議 | `Tab` | `Tab` | 接受 Copilot 的程式碼建議 |
| 開啟 Chat | `Ctrl+Alt+I` | `Cmd+Option+I` | 開啟聊天視窗 |
| Inline Chat | `Ctrl+I` | `Cmd+I` | 在編輯器內直接對話 |
| 下一個建議 | `Alt+]` | `Option+]` | 切換到下一個建議 |
| 上一個建議 | `Alt+[` | `Option+[` | 切換到上一個建議 |
| 拒絕建議 | `Esc` | `Esc` | 拒絕當前建議 |
| 觸發建議 | `Alt+\` | `Option+\` | 手動觸發程式碼建議 |

## 💡 使用技巧

1. **提供清楚的上下文**：註解和變數命名越清楚，Copilot 建議越精準
2. **善用 @workspace 參與者**：
   - `@workspace` - 分析整個專案結構，這是**最重要且最實用**的聊天參與者
   - `@terminal` - 偶爾用於命令列問題（實用性有限）
3. **使用自然語言**：直接用白話文詢問問題，比指令更有效
4. **迭代改進**：不滿意建議時，修改提示詞重新生成
5. **組合使用**：結合不同功能達到最佳效果

## ⚠️ 關於斜槓指令（/ 指令）

本教學**不包含斜槓指令**的使用，主要原因：

### 🤖 Agent 模式讓斜槓指令變得過時
隨著 **Agent 模式**的推出，傳統的斜槓指令已經失去優勢：

- **Agent 模式**能自動判斷您的需求，無需手動指定指令類型
- **智能決策**：Agent 會自動選擇最適合的處理方式
- **連續對話**：Agent 能記住上下文，進行多輪對話協作
- **自主執行**：Agent 可以主動執行多個步驟來完成複雜任務

### 技術層面的問題：
1. **穩定性問題**：指令經常失效，需要重新安裝擴充套件
2. **功能重疊**：大部分斜槓指令的功能都能用自然語言達成
3. **使用體驗差**：需要記憶特定語法，不如自然對話流暢

### 現代化的替代方案：
- **Agent 模式**：讓 AI 自主判斷和執行任務
- **自然語言對話**：直接描述需求，更直觀有效
- **@workspace 參與者**：提供精準的專案上下文協助（其他參與者實用性有限）
- **Inline Chat**：即時在程式碼中進行協作

## 📞 關於聊天參與者 (@)

### ✅ 值得學習的參與者

**@workspace** - **唯一重點掌握的參與者**
- 分析整個專案結構和程式碼關係
- 找出跨檔案的函數引用和依賴
- 理解專案架構和設計模式
- 協助重構和程式碼優化

**使用範例：**
```
@workspace 這個專案的主要架構是什麼？
@workspace 找出所有呼叫 getUserData 函數的地方
@workspace 建議如何重構這個模組的結構
```

### ⚠️ 實用性有限的參與者

**@terminal** - 偶爾有用，但非必要
- 命令列相關問題
- 大部分情況下直接問 Copilot 即可

**@vscode、@github** - 不建議花時間學習
- 功能重疊且實用性不高
- 直接用自然語言詢問更有效
- 其他查詢方式（Google、官方文件）通常更準確

### 💡 建議學習重點
專注學習 **@workspace** 即可，這是唯一真正改變開發效率的聊天參與者。其他參與者的投資報酬率較低，不建議花時間深入了解。

## 🆚 Visual Studio 使用者設定指南

如果您使用 **Visual Studio**（非 VS Code），請參考：

### 安裝步驟
1. 確保 Visual Studio 版本為 **17.10 或更新版本**
2. GitHub Copilot 擴展已包含在所有工作負載中，預設安裝
3. 在 Visual Studio 中新增您的 GitHub 帳號：
   - 前往 `檔案` > `帳戶設定`
   - 新增 GitHub 帳號並完成授權
4. 重新啟動 Visual Studio 即可開始使用

### 支援語言
Copilot 在 Visual Studio 中特別支援：C#、C++、Python、JavaScript、TypeScript、Ruby、Go

## 🔧 疑難排解

### 常見問題
- **看不到建議**：檢查是否已登入 GitHub 並選擇正確的訂閱方案
- **建議品質不佳**：提供更清楚的註解和上下文
- **Chat 無法開啟**：確認已安裝 GitHub Copilot Chat 擴充套件
- **免費額度用完**：等待下個月重新計算，或升級至付費方案
- **進階請求額度不足**：Pro/Pro+ 用戶可購買額外進階請求（$0.04/次）
- **無法使用最新 AI 模型**：需要 Pro+ 方案才能使用 GPT-4.5、o3 等最新模型

### 效能最佳化
- 保持 VS Code 更新至最新版本
- 定期重新啟動 VS Code 以釋放記憶體
- 關閉不必要的擴充套件以提升效能

## 📞 支援與協助

如遇到問題，請參考：
- [GitHub Copilot 官方文件](https://docs.github.com/copilot)
- [VS Code Copilot 指南](https://code.visualstudio.com/docs/copilot/overview)
- [Visual Studio Copilot 文件](https://learn.microsoft.com/zh-tw/visualstudio/ide/visual-studio-github-copilot-extension)
- 本專案的 Issues 區

---

開始您的 GitHub Copilot 學習之旅吧！🚀
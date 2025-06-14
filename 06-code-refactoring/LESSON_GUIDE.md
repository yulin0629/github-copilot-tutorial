# 場景 6：Agent 重構架構師

##  學習目標
- 體驗 **Agent 架構決策**：從策略制定者升級為架構決策者
- 讓 Agent 主導大規模代碼重構和架構設計
- 學習如何讓 Agent 處理複雜的遺留系統問題
- 掌握 Agent 驅動的現代化改造流程

##  場景說明
您面對一個典型的遺留電商系統，包含 **300+ 行混亂的 JavaScript 代碼**，充滿各種代碼異味。與傳統的手動重構不同，您將學習如何讓 **Agent 作為首席架構師**，從分析問題到設計新架構，再到執行完整的重構計劃。

##  專案結構
```
06-code-refactoring/
├── README.md (本檔案)
├── index.html (重構實驗室界面)
├── style.css (精美的展示界面)
├── app.js (前端邏輯)
├── legacy-code/
│   ├── monolith.js (300+ 行混亂代碼)
│   └── utils-old.js (更多遺留工具)
└── package.json (專案配置)
```

##  遺留系統問題分析

### 代碼異味清單
1. **🍝 義大利麵條代碼**：所有邏輯混在一個 300+ 行函數中
2. ** 重複代碼**：相同邏輯在多處重複，維護困難
3. **🏗️ 緊密耦合**：業務邏輯、數據存取、通知發送全部混在一起
4. **📏 超長函數**：主要函數違反單一責任原則
5. **🔢 魔法數字**：硬編碼的常數，缺乏說明
6. **🌍 全域污染**：濫用全域變數
7. ** 缺乏錯誤處理**：沒有適當的異常處理機制
8. ** 效能問題**：使用低效的演算法
9. ** 無法測試**：代碼結構使單元測試變得困難

### 系統現狀指標
- **代碼品質**: 2.1/10 
- **可維護性**: 3.5/10 
- **測試覆蓋率**: 12% 
- **效能評分**: 4.2/10 

##  Demo 劇本

###  **重點：Agent 架構決策體驗**
Agent 開始作為**首席架構師**，不只實現功能，還要主導技術決策和架構設計。

### 階段 1：Agent 深度分析 (4分鐘)

#### 步驟 1：讓 Agent 進行代碼考古 (Agent)
1. 開啟 Copilot Chat，選擇 **Agent 模式**
2. 點擊  圖示，選擇以下檔案：
   - `legacy-code/monolith.js`
   - `legacy-code/utils-old.js`
3. 輸入：
```
請對這個遺留電商系統進行深度分析，包括：
1. 識別所有代碼異味和架構問題
2. 分析業務邏輯和數據流
3. 評估重構的複雜度和風險
4. 給出整體的健康度評估報告
```
 **使用模式：Agent**

** 觀察重點**：
- Agent 會自主識別複雜的架構問題
- 提供結構化的問題分析報告
- 評估重構的優先級和風險

#### 步驟 2：讓 Agent 設計新架構 (Agent)
```
基於你的分析，請設計一個現代化的架構來替代這個遺留系統。包括：
1. 模組化設計方案
2. 責任分離策略
3. 數據管理方案
4. 錯誤處理機制
5. 測試友好的結構
並說明為什麼這樣設計。
```

### 階段 2：Agent 主導重構 (10分鐘)

#### 步驟 3：讓 Agent 實現核心架構 (Agent)
```
請實現你設計的新架構，包括：
- 建立核心業務邏輯類別
- 實現數據存取層
- 設計服務層和控制器
- 建立配置管理
確保新架構完全取代舊的 monolith.js
```

#### 步驟 4：讓 Agent 遷移業務邏輯 (Agent)
```
現在請將遺留系統中的所有業務邏輯遷移到新架構中：
- 保持功能完整性
- 改善算法效能
- 加強錯誤處理
- 確保結果與原系統一致
```

#### 步驟 5：讓 Agent 建立測試體系 (Agent)
```
為重構後的系統建立完整的測試體系：
- 單元測試覆蓋所有核心功能
- 整合測試驗證業務流程
- 回歸測試確保功能一致性
- 效能測試驗證改進效果
```

### 階段 3：Agent 驗證與優化 (1分鐘)

#### 步驟 6：讓 Agent 進行重構驗證 (Agent)
```
請驗證重構效果並展示改進成果：
1. 對比新舊架構的優劣
2. 展示代碼品質指標改善
3. 驗證功能完整性
4. 建議後續優化方向
並在網頁上展示重構前後的對比結果
```

##  重點技巧

###  Agent 架構決策要點：
1. **架構主導**：Agent 負責整體技術架構設計決策
2. **全棧思維**：從前端到後端的完整重構方案
3. **自主決策**：Agent 可以自行選擇技術方案和設計模式
4. **品質保證**：Agent 主動建立測試和驗證機制

###  有效的 Agent 指令模式：
- "設計現代化架構"（而非"如何重構這個函數"）
- "實現完整的新架構"（而非"給我一些代碼範例"）
- "主導技術決策"（而非"這樣做對嗎"）
- "建立完整測試體系"（而非"寫一個測試"）

###  避免的做法：
- 不要限制 Agent 的架構選擇
- 不要逐行指導重構過程
- 不要只關注局部優化
- 不要忽略讓 Agent 驗證整體效果

##  Demo 重點

### 策略制定 vs 架構決策對比：
- **50% 模式**：Agent 主導測試策略，人類決定架構
- **60% 模式**：Agent 主導架構設計，自主做技術決策

### 展示要點：
1. **架構設計能力**：Agent 能設計完整的現代化架構
2. **技術決策能力**：Agent 能自主選擇設計模式和技術方案
3. **重構執行能力**：Agent 能完整實現大規模重構
4. **品質驗證能力**：Agent 能建立完整的測試和驗證體系

##  預期成果
完成本場景後，您應該：
-  理解 Agent 作為首席架構師的能力
-  掌握讓 Agent 主導技術決策的方法
-  擁有完全重構的現代化電商系統
-  學會信任 Agent 的架構設計判斷
-  在瀏覽器中看到重構前後的對比效果

##  重構成果對比

### 重構前 (遺留系統)
- 單一巨大函數：300+ 行
- 全域變數污染：8+ 個全域變數
- 魔法數字：10+ 個硬編碼常數
- 測試覆蓋率：0%
- 代碼重複：40%+

### 重構後 (現代化系統)
- 模組化設計：10+ 個獨立模組
- 清晰的責任分離
- 配置化管理
- 測試覆蓋率：90%+
- 代碼重複：<5%

##  下一步
場景 7 將展示 **Agent 文檔專家**，讓 Agent 不只重構代碼，還要自主生成完整的技術文件和使用指南。
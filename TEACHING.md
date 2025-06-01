# 📚 GitHub Copilot 教學分支管理指南

## 🎯 教學流程

### 1. 準備教學環境
```bash
# 進入專案目錄
cd github-copilot-tutorial

# 建立今日教學分支
./scripts/setup-lesson.sh demo
```

### 2. 開始特定場景教學
```bash
# 開始場景 4 (重構助手)
./scripts/setup-lesson.sh start 4

# 開始場景 5 (測試策略)
./scripts/setup-lesson.sh start 5
```

### 3. 教學過程中
```bash
# 保存當前進度
./scripts/setup-lesson.sh save 4

# 重置到場景初始狀態
./scripts/setup-lesson.sh reset 4
```

### 4. 查看可用分支
```bash
./scripts/setup-lesson.sh list
```

## 🌐 GitHub Pages 配合

### 主要展示頁面
- **主頁**: https://yulin0629.github.io/github-copilot-tutorial/
- **場景4**: https://yulin0629.github.io/github-copilot-tutorial/04-debugging-assistant/
- **場景5**: https://yulin0629.github.io/github-copilot-tutorial/05-unit-testing/

### 分支策略配合
```bash
# main 分支永遠保持完整的展示狀態
git checkout main
git push origin main  # 自動更新 GitHub Pages

# 教學分支獨立進行，不影響展示
git checkout live-demo-20250102
# 在這裡進行教學實驗
```

## 📋 分支說明

### 核心分支
- **main**: 完整教學內容，GitHub Pages 展示
- **lesson-templates**: 教學模板，包含所有初始狀態

### 場景分支
- **lesson-step4-start**: 場景4初始狀態 (有Bug的購物車)
- **lesson-step4-end**: 場景4完成狀態 (修復後的購物車)
- **lesson-step5-start**: 場景5初始狀態 (待測試的數據工具)
- **lesson-step5-end**: 場景5完成狀態 (完整測試套件)

### 教學分支
- **live-demo-YYYYMMDD**: 每日教學工作分支
- **lesson-stepX-progress-YYYYMMDD**: 教學進度保存分支

## 🚀 實際使用範例

### 早上準備教學
```bash
# 1. 建立今日教學環境
./scripts/setup-lesson.sh demo

# 2. 測試場景4初始狀態
./scripts/setup-lesson.sh start 4
open http://localhost:8080/04-debugging-assistant/
```

### 教學過程中
```bash
# 學員體驗有Bug的購物車
# Agent 分析和修復問題
# 保存修復進度
./scripts/setup-lesson.sh save 4

# 開始場景5
./scripts/setup-lesson.sh start 5
```

### 如果需要重來
```bash
# 重置到場景4初始狀態
./scripts/setup-lesson.sh reset 4
```

### 教學結束後
```bash
# 查看今日所有進度分支
./scripts/setup-lesson.sh list

# 可選：合併優秀的修復到 main 分支
git checkout main
git merge live-demo-20250102 --no-ff
git push origin main  # 更新 GitHub Pages
```

## 🎭 多場次教學

### 場次1: 上午班
```bash
./scripts/setup-lesson.sh demo  # 建立 live-demo-20250102
# 教學...
./scripts/setup-lesson.sh save 4  # 保存為 lesson-step4-progress-20250102
```

### 場次2: 下午班
```bash
./scripts/setup-lesson.sh reset 4  # 重置到初始狀態
# 重新開始教學...
```

## 🔧 進階技巧

### 建立特定場景的分支
```bash
# 為特殊需求建立專用分支
git checkout -b workshop-enterprise-20250102
git checkout lesson-step4-start -- 04-debugging-assistant/
# 自訂修改...
```

### 批次重置多個場景
```bash
for i in {4..8}; do
    ./scripts/setup-lesson.sh reset $i
done
```

### 備份教學成果
```bash
# 建立教學成果分支
git checkout -b teaching-results-20250102
git add .
git commit -m "教學成果備份 - $(date)"
git push origin teaching-results-20250102
```

## ⚠️ 注意事項

1. **main 分支保護**: 永遠保持 main 分支的展示完整性
2. **教學分支隔離**: 教學實驗在專用分支，不影響主展示
3. **進度保存**: 重要修改記得保存到進度分支
4. **分支清理**: 定期清理過期的教學分支

## 🆘 疑難排解

### 分支衝突
```bash
# 強制重置到初始狀態
git checkout lesson-step4-start -- 04-debugging-assistant/
git add . && git commit -m "重置場景4"
```

### 找不到分支
```bash
# 更新遠端分支資訊
git fetch origin
./scripts/setup-lesson.sh list
```

### GitHub Pages 沒更新
```bash
# 確認 main 分支推送
git checkout main
git push origin main --force-with-lease
```
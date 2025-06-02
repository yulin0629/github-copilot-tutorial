#!/bin/bash

# GitHub Copilot 教學輔助腳本
# 配合 main/gh-pages 分支策略

set -e

TEACHING_BRANCH="gh-pages"
MAIN_BRANCH="main"
BACKUP_DATE=$(date +%Y%m%d-%H%M)

show_help() {
    echo "GitHub Copilot 教學輔助工具"
    echo ""
    echo "使用方法:"
    echo "  ./setup-lesson.sh [選項] [場景編號]"
    echo ""
    echo "選項:"
    echo "  sync           同步 gh-pages 與 main 分支"
    echo "  switch         切換到教學分支 (gh-pages)"
    echo "  reset <場景>   重置特定場景到原始狀態"
    echo "  backup         備份當前教學進度"
    echo "  status         顯示當前分支狀態"
    echo "  serve          啟動本地預覽伺服器"
    echo ""
    echo "範例:"
    echo "  ./setup-lesson.sh sync          # 同步分支"
    echo "  ./setup-lesson.sh switch        # 切換到教學分支"
    echo "  ./setup-lesson.sh reset 4       # 重置場景4"
    echo "  ./setup-lesson.sh backup        # 備份進度"
}

sync_branches() {
    echo "🔄 同步 ${TEACHING_BRANCH} 與 ${MAIN_BRANCH} 分支..."
    
    # 儲存當前分支
    CURRENT_BRANCH=$(git branch --show-current)
    
    # 更新 main 分支
    git checkout ${MAIN_BRANCH}
    git pull origin ${MAIN_BRANCH}
    
    # 更新並同步 gh-pages
    git checkout ${TEACHING_BRANCH}
    git pull origin ${TEACHING_BRANCH}
    git merge ${MAIN_BRANCH} -m "sync: 同步 main 分支的更新"
    
    echo "✅ 分支同步完成"
    echo "📍 當前在 ${TEACHING_BRANCH} 分支"
}

switch_to_teaching() {
    echo "🎯 切換到教學分支..."
    git checkout ${TEACHING_BRANCH}
    echo "✅ 已切換到 ${TEACHING_BRANCH} 分支"
    echo "📝 準備開始教學！"
}

reset_lesson() {
    local lesson_num=$1
    
    if [ -z "$lesson_num" ]; then
        echo "❌ 請指定場景編號 (1-8)"
        exit 1
    fi
    
    # 確保在教學分支
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "${TEACHING_BRANCH}" ]; then
        echo "⚠️  請先切換到教學分支: ./setup-lesson.sh switch"
        exit 1
    fi
    
    # 對應場景資料夾
    local lesson_folder=""
    case $lesson_num in
        1) lesson_folder="01-first-experience" ;;
        2) lesson_folder="02-code-explanation" ;;
        3) lesson_folder="03-function-generation" ;;
        4) lesson_folder="04-debugging-assistant" ;;
        5) lesson_folder="05-unit-testing" ;;
        6) lesson_folder="06-code-refactoring" ;;
        7) lesson_folder="07-documentation" ;;
        8) lesson_folder="08-comprehensive-project" ;;
        *) echo "❌ 無效的場景編號: $lesson_num"; exit 1 ;;
    esac
    
    echo "🔄 重置場景 ${lesson_num} (${lesson_folder}) 到原始狀態..."
    
    # 從 main 分支復原該場景的檔案
    git checkout ${MAIN_BRANCH} -- "${lesson_folder}/"
    
    echo "✅ 場景 ${lesson_num} 已重置"
    echo "💡 提示: 重置的檔案已加入暫存區，可以用 git status 查看"
}

backup_progress() {
    echo "💾 備份當前教學進度..."
    
    # 確保在教學分支
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "${TEACHING_BRANCH}" ]; then
        echo "⚠️  請先切換到教學分支: ./setup-lesson.sh switch"
        exit 1
    fi
    
    # 建立備份標籤
    BACKUP_TAG="teaching-backup-${BACKUP_DATE}"
    
    # 提交當前變更
    if [ -n "$(git status --porcelain)" ]; then
        git add .
        git commit -m "backup: 教學進度備份 - $(date '+%Y/%m/%d %H:%M')"
    fi
    
    # 建立標籤
    git tag -a "${BACKUP_TAG}" -m "教學備份 - $(date '+%Y/%m/%d %H:%M')"
    
    echo "✅ 進度已備份"
    echo "📌 備份標籤: ${BACKUP_TAG}"
    echo "💡 推送標籤: git push origin ${BACKUP_TAG}"
}

show_status() {
    echo "📊 當前狀態"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 當前分支: $(git branch --show-current)"
    echo ""
    
    # 顯示與 main 的差異統計
    if [ "$(git branch --show-current)" = "${TEACHING_BRANCH}" ]; then
        echo "📈 與 main 分支的差異:"
        git diff --stat ${MAIN_BRANCH}..HEAD 2>/dev/null || echo "  (無差異)"
    fi
    
    echo ""
    echo "📝 工作區狀態:"
    git status --short || echo "  (工作區乾淨)"
    
    echo ""
    echo "🏷️  最近的備份標籤:"
    git tag -l "teaching-backup-*" | tail -5 | sed 's/^/  /'
}

start_server() {
    echo "🌐 啟動本地預覽伺服器..."
    echo "📍 伺服器將在 http://localhost:8080 執行"
    echo "💡 按 Ctrl+C 停止伺服器"
    echo ""
    
    # 檢查是否有 Python
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8080
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer 8080
    else
        echo "❌ 找不到 Python，無法啟動伺服器"
        echo "💡 請使用 VS Code 的 Live Server 擴充套件"
        exit 1
    fi
}

# 主程式邏輯
case "${1:-help}" in
    "sync")
        sync_branches
        ;;
    "switch")
        switch_to_teaching
        ;;
    "reset")
        reset_lesson "$2"
        ;;
    "backup")
        backup_progress
        ;;
    "status")
        show_status
        ;;
    "serve")
        start_server
        ;;
    "help"|*)
        show_help
        ;;
esac
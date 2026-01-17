# BananaMall 開發路線圖

> 最後更新: 2026-01-18

## ✅ 已完成

### Phase 1 - 基礎優化
- [x] TypeScript 錯誤修復（tsconfig.json、Error.captureStackTrace）
- [x] 移除 debug console.log
- [x] Footer 品牌資訊可配置（設定頁面）

### Phase 2 - 程式碼品質
- [x] Toast 通知系統（Sonner 替換 alert）
- [x] EditorPage 元件拆分（964→406 行）
  - [x] EditorHeader
  - [x] MobilePreview
  - [x] DesktopPreview
  - [x] TextEditPanel
  - [x] ImageEditPanel
  - [x] ImageCard
  - [x] DetailModuleCard
- [x] Vitest 基礎測試（26 個測試）
  - [x] i18n 翻譯系統
  - [x] EditorHeader 元件
  - [x] TextEditPanel 元件

### Phase 3 - 國際化
- [x] 多語言 UI 支援（zh-CN、zh-TW、en）
- [x] i18n 語言檔案拆分（src/lib/locales/）
- [x] 蝦皮購物平台支援
- [x] 編輯頁面完整 i18n 支援（EditorHeader、TextEditPanel、Tabs）
- [x] 產品分析語言根據平台自動切換（Amazon→英文、淘寶/京東→简体、蝦皮→繁體）

### Phase 4 - 模板系統 ✨ NEW
- [x] Template 資料結構設計
- [x] Store 擴展（templates state、CRUD actions）
- [x] 模板管理頁面（TemplatesPage）
  - [x] 網格布局顯示
  - [x] 空狀態提示
  - [x] 模板卡片（名稱、平台/風格/語言標籤、使用次數）
- [x] 建立/編輯模板對話框（CreateTemplateDialog）
- [x] ConfigPage 整合
  - [x] 「儲存為模板」按鈕
  - [x] 「從模板載入」下拉選單
  - [x] 「模板庫」快捷按鈕
- [x] 全域導航（App.tsx 新增模板庫按鈕）
- [x] 模板持久化（Tauri store + localStorage fallback）
- [x] 收藏功能（優先顯示收藏模板）

### Phase 4.5 - 國際化完善 ✨ NEW (2026-01-18)
- [x] 預覽元件 i18n 支援
  - [x] MobilePreview 硬編碼中文改為 i18n（15 處）
  - [x] DesktopPreview 硬編碼中文改為 i18n（4 處）
  - [x] 新增 14 個翻譯鍵（imageLoadFailed、retry、buyNow 等）
- [x] 圖片生成繁體中文支援
  - [x] GeneratingPage 主圖 prompt 區分繁體/簡體/英文
  - [x] GeneratingPage 詳情圖 prompt 區分繁體/簡體/英文
  - [x] api-detail.ts 詳情頁內容 prompt 繁體中文版本
- [x] Mock 資料多語言支援
  - [x] api-mock.ts 新增 mockData 物件（zh-TW、zh-CN、en）
  - [x] getMockDetailPage 函數區分繁體/簡體/英文
  - [x] 繁體中文使用台灣用語（免運、保固 vs 包郵、質保）
- [x] 歷史紀錄頁面 i18n
  - [x] 新增 history 翻譯區塊（title、empty、startCreate 等）
  - [x] HistoryPage 使用 i18n 翻譯
  - [x] 平台/風格名稱複用 platforms/styles 翻譯

### Bug Fixes
- [x] 修復 Gemini API 回傳物件結構問題（Objects are not valid as React child）
  - [x] generateText 回應正規化
  - [x] generateDetailPage 回應正規化（所有欄位）
- [x] 設定頁面預設平台新增蝦皮選項
- [x] AI 模型名稱優化（NanaBanana → Nano Banana Pro）
- [x] 圖片文字語言說明文字修正
- [x] 歷史紀錄刪除持久化問題 ✨ NEW (2026-01-18)
  - [x] 新增 useAppStore.deleteHistory 函數
  - [x] 同時處理 Tauri store 和 localStorage fallback
  - [x] 修復 web 環境下刪除後重啟瀏覽器資料還在的問題

---

## 🚧 規劃中

### Phase 5 - 批量處理
- [ ] 多圖片上傳介面
- [ ] 批量產品分析
- [ ] 批量生成佇列
- [ ] 批量匯出功能

### Phase 6 - 圖片編輯器
- [ ] 圖片裁剪工具
- [ ] 基礎濾鏡（亮度、對比、飽和度）
- [ ] 文字疊加（水印、標語）
- [ ] 圖片旋轉/翻轉

### Phase 7 - 擴展功能

#### 更多匯出格式
- [ ] PDF 匯出（詳情頁完整版）
- [ ] HTML 匯出（可直接上架）
- [ ] PSD 分層匯出（進階編輯）

#### 更多電商平台
- [ ] 拼多多
- [ ] 1688（阿里巴巴）
- [ ] Lazada
- [ ] Tokopedia
- [ ] Mercado Libre

#### 更多風格模板
- [ ] 日系清新風
- [ ] 歐美簡約風
- [ ] 韓系時尚風
- [ ] 母嬰溫馨風
- [ ] 3C 科技風

### Phase 8 - 進階功能

#### 離線模式
- [ ] 本地快取已生成內容
- [ ] 離線編輯支援
- [ ] 網路恢復後同步

#### 協作功能
- [ ] 專案分享連結
- [ ] 多人即時編輯
- [ ] 評論/標註功能

#### 版本控制
- [ ] 詳情頁版本歷史
- [ ] 版本比較
- [ ] 回溯到任意版本

### Phase 9 - 品質保證

#### 測試覆蓋
- [ ] 元件測試覆蓋率達 80%
- [ ] API 模組單元測試
- [ ] E2E 測試（Playwright）
- [ ] 視覺回歸測試

#### 效能優化
- [ ] 圖片懶載入
- [ ] 虛擬列表（長列表優化）
- [ ] 程式碼分割優化
- [ ] Service Worker 快取

---

## 💡 待評估

以下功能需進一步評估可行性：

- [ ] AI 模型微調（針對電商場景）
- [ ] 多語言內容自動翻譯
- [ ] 競品分析功能
- [ ] SEO 優化建議
- [ ] A/B 測試整合
- [ ] 銷售數據分析儀表板

---

## 📝 貢獻指南

歡迎認領任務！請遵循以下流程：

1. 在對應任務項目旁加上 `@yourname`
2. 建立 feature branch：`git checkout -b feature/task-name`
3. 完成後提交 PR 並更新此文件（將 `[ ]` 改為 `[x]`）

---

## 📊 進度統計

| 階段 | 完成 | 規劃中 |
|------|------|--------|
| Phase 1-3 | 18 項 | - |
| Phase 4 (模板系統) | 12 項 | - |
| Phase 4.5 (國際化完善) | 13 項 | - |
| Bug Fixes | 8 項 | - |
| Phase 5-9 | - | 34 項 |
| **總計** | **51 項** | **34 項** |

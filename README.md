# BananaMall

<div align="center">

**让灵感落地，让回忆有形**

AI-powered e-commerce detail page generator built with Tauri v2 + React + TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.9-blue.svg)](https://tauri.app/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-green.svg)](https://vitest.dev/)

</div>

---

## 项目概述

**BananaMall** 是一个 AI 驱动的电商详情页生成工具，由 [MatrixInspire（灵矩绘境）](https://mxinspire.com) 开发。

### 核心功能

- 📸 **智能产品分析**：上传产品白底图，AI 自动分析产品特征
- ✍️ **文案自动生成**：根据平台和风格生成专业的产品文案
- 🎨 **图片批量生成**：自动生成主图和详情页图片，支持自定义数量
- 📱 **移动端预览**：内置手机模拟器，实时预览效果
- 📝 **详情页生成**：自动生成包含 5 大核心模块的详情页内容
- 💾 **历史记录**：保存生成历史，支持重新编辑
- 📤 **一键导出**：导出图片和文案，支持自定义路径
- 🌐 **多平台支持**：Amazon、淘宝、京东、蝦皮購物
- 🌍 **多语言 UI**：简体中文、繁體中文、English
- 🎯 **多语言内容**：生成中文或英文产品内容
- ⚙️ **可配置品牌**：自定义页脚品牌信息
- 📋 **模板系统**：储存/载入配置模板，支持收藏功能
- 🎭 **8 种风格**：极简、赛博、国潮、日系、轻奢、自然、萌系、Apple 科技

### 使用案例

<img width="48%" height="1805" alt="screenshot-20260113-162832" src="https://github.com/user-attachments/assets/533e72e3-571e-4127-8096-7247d824a285" style="display: inline-block; margin-right: 10px;"/>
<img width="48%" height="920" alt="screenshot-20260113-162754" src="https://github.com/user-attachments/assets/c38e08ee-6722-447e-b640-ed6f72cdbb12"  style="display: inline-block;" />
<img width="2823" height="1844" alt="screenshot-20260113-163433" src="https://github.com/user-attachments/assets/bbd02fda-d975-45a9-b46e-545f29f04eed" />



<img width="32%" height="953" alt="screenshot-20260113-163226" src="https://github.com/user-attachments/assets/1fde85eb-d7de-4744-b7a4-1381c8b49a96" style="display: inline-block; margin-right: 10px;" />
<img width="32%" height="948" alt="screenshot-20260113-163214" src="https://github.com/user-attachments/assets/92157fcf-9279-4468-b5ef-d2ea367beee7" style="display: inline-block; margin-right: 10px;" />
<img width="32%" height="983" alt="screenshot-20260113-163330" src="https://github.com/user-attachments/assets/6094d3be-53ab-44ee-ba5d-a66df6df384c" style="display: inline-block;" />

#### 优秀案例
##### NanoBanana

<img width="32%" height="1878" alt="screenshot-20260113-141724" src="https://github.com/user-attachments/assets/9e8184ce-43ab-42b6-aedd-617a0146ac67" style="display: inline-block; margin-right: 10px;"/>
<img width="32%" height="1847" alt="screenshot-20260113-153957" src="https://github.com/user-attachments/assets/0934f527-b125-4562-93fa-00db9c322dcf" style="display: inline-block; margin-right: 10px;"/>
<img width="32%" height="1024" alt="detail-0-regenerated-2026-01-13T09-32-26-571Z" src="https://github.com/user-attachments/assets/357c86e6-2c7a-48b8-9202-59c9acb8a5f9" style="display: inline-block;" />

#### NanoBanana PRO
<img width="32%" src="https://github.com/user-attachments/assets/1dbf70c6-4c46-4627-b44a-07f344823332" alt="2026-01-13T08-34-43-105Z_1_main_main-0" style="display: inline-block; margin-right: 10px;" />
<img width="32%" src="https://github.com/user-attachments/assets/2e15b8e4-87f9-43e6-a6e2-d8d2081c7583" alt="2026-01-13T08-34-43-105Z_2_main_main-1" style="display: inline-block; margin-right: 10px;" />
<img width="32%" src="https://github.com/user-attachments/assets/8cb543f3-59b9-4dbc-bbe8-bd920b0e9c08" alt="2026-01-13T08-34-43-105Z_3_main_main-2" style="display: inline-block;" />


### 技术栈

| 类别 | 技术 |
|------|------|
| **前端框架** | React 18 + TypeScript + Vite |
| **UI 组件** | Tailwind CSS + Shadcn/UI |
| **桌面框架** | Tauri v2 |
| **状态管理** | Zustand |
| **通知系统** | Sonner |
| **测试框架** | Vitest + Testing Library |
| **AI 模型** | Google Gemini (多模型支持) |
| **API 代理** | Zeabur AI Hub (可选) |

## 🚀 快速开始

### 环境要求

- **Node.js**: 18+
- **npm**: 9+
- **Rust**: latest stable version
- **系统依赖**: [Tauri prerequisites](https://tauri.app/v2/guides/getting-started/prerequisites)

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/alingowangxr/banana-mall.git
cd banana-mall
```

2. **安装依赖**

```bash
npm install
```

3. **配置 API Key**

首次运行需要在设置页面配置 Google Gemini API Key：

- 获取 API Key: https://makersuite.google.com/app/apikey
- 在应用设置页面输入 API Key
- API Key 会安全地存储在本地

4. **启动服务**

```bash
# Web 开发模式
npm run dev

# Tauri 桌面应用开发模式
npm run tauri:dev
```

5. **运行测试**

```bash
npm run test        # 监听模式
npm run test:run    # 单次运行
```

## 📁 项目结构

```
banana-mall/
├── src/
│   ├── components/
│   │   ├── editor/           # 编辑器组件
│   │   │   ├── EditorHeader.tsx
│   │   │   ├── MobilePreview.tsx
│   │   │   ├── DesktopPreview.tsx
│   │   │   ├── TextEditPanel.tsx
│   │   │   ├── ImageEditPanel.tsx
│   │   │   └── *.test.tsx    # 组件测试
│   │   └── ui/               # Shadcn/UI 组件
│   ├── lib/
│   │   ├── api.ts            # Gemini API 封装
│   │   ├── api-detail.ts     # 详情页生成逻辑
│   │   ├── export.ts         # 导出功能
│   │   ├── error-handler.ts  # 错误处理
│   │   ├── i18n.ts           # 国际化入口
│   │   ├── i18n.test.ts      # i18n 测试
│   │   └── locales/          # 语言文件
│   │       ├── types.ts      # 类型定义
│   │       ├── zh-CN.ts      # 简体中文
│   │       ├── zh-TW.ts      # 繁體中文
│   │       └── en.ts         # English
│   ├── pages/
│   │   ├── UploadPage.tsx    # 上传页面
│   │   ├── ConfigPage.tsx    # 配置页面
│   │   ├── GeneratingPage.tsx # 生成中页面
│   │   ├── EditorPage.tsx    # 编辑页面
│   │   ├── HistoryPage.tsx   # 历史记录
│   │   └── SettingsPage.tsx  # 设置页面
│   ├── stores/               # Zustand 状态管理
│   ├── hooks/                # 自定义 Hooks
│   ├── test/                 # 测试配置
│   ├── App.tsx               # 主应用组件
│   └── main.tsx              # 入口文件
├── src-tauri/                # Tauri 后端 (Rust)
├── vitest.config.ts          # 测试配置
└── public/                   # 静态资源
```

## ⚙️ 配置说明

### API 配置

应用支持两种 API 供应商：

| 供应商 | 说明 |
|--------|------|
| **Google 直连** | 直接调用 Google Gemini API |
| **Zeabur AI Hub** | 通过代理调用，适合网络受限地区 |

### 支持平台

| 平台 | 特点 |
|------|------|
| Amazon | 跨境电商，注重产品细节 |
| 淘宝 | 国内电商，注重营销文案 |
| 京东 | 高端产品，注重品质展示 |
| 蝦皮購物 | 东南亚及台湾，行动端优先 |

### 支持风格（8 种）

| 风格 | 说明 | 适用场景 |
|------|------|----------|
| **极简风格** | 简洁现代 | 突出产品本身 |
| **赛博风格** | 科技感强 | 电子产品 |
| **国潮风格** | 传统与现代结合 | 国货品牌 |
| **日系清新** | 柔和淡雅 | 美妆、文具、生活杂货 |
| **轻奢高端** | 精致优雅 | 珠宝、精品、高端护肤 |
| **自然有机** | 清新自然 | 食品、茶叶、有机护肤 |
| **可爱萌系** | 活泼可爱 | 母婴、儿童用品、宠物 |
| **Apple 科技风** | 极简科技 | 3C 数码、智能穿戴 |

### 数据存储

使用 `tauri-plugin-store` 进行本地持久化存储：

- API 密钥（加密存储）
- 用户偏好设置
- 生成历史记录
- 应用配置

## 📋 开发路线图

### ✅ 已完成

- [x] 核心功能：产品分析、文案生成、图片生成
- [x] 多平台支持：Amazon、淘宝、京东、蝦皮
- [x] 多语言 UI：简体中文、繁體中文、English
- [x] API 多供应商：Google 直连、Zeabur AI Hub
- [x] Toast 通知系统
- [x] 组件模块化拆分
- [x] i18n 语言文件拆分
- [x] 基础测试覆盖 (Vitest)
- [x] 可配置页脚品牌
- [x] 模板系统 - 储存/载入详情页模板，支持收藏
- [x] 8 种详情页风格 - 极简、赛博、国潮、日系、轻奢、自然、萌系、Apple

### 🚧 规划中

- [ ] 批量处理 - 一次上传多张图片
- [ ] 图片编辑器 - 内建裁剪、滤镜、文字叠加
- [ ] 更多导出格式 - PDF、HTML
- [ ] 更多平台 - 拼多多、1688、Lazada
- [ ] 更多 AI 供应商 - OpenAI、Claude
- [ ] 完整测试覆盖 (80%+)
- [ ] 离线模式支持

## 🧪 测试

```bash
# 运行所有测试
npm run test:run

# 监听模式
npm run test

# 覆盖率报告
npm run test:coverage
```

当前测试覆盖：
- i18n 翻译系统 (10 tests)
- EditorHeader 组件 (8 tests)
- TextEditPanel 组件 (8 tests)

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 提交前运行 `npm run build` 确保构建通过
- 新功能需添加对应测试
- 保持代码注释清晰

## 🐛 问题反馈

如遇到问题，请在 [GitHub Issues](https://github.com/alingowangxr/banana-mall/issues) 提交。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

- [Tauri](https://tauri.app/) - 桌面应用框架
- [Shadcn/UI](https://ui.shadcn.com/) - 组件库
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI 模型
- [Zeabur](https://zeabur.com/) - AI Hub 代理服务
- [Sonner](https://sonner.emilkowal.ski/) - Toast 通知
- [Vitest](https://vitest.dev/) - 测试框架

---

<div align="center">

**Made with ❤️ by [MatrixInspire](https://mxinspire.com)**

让灵感落地，让回忆有形

</div>

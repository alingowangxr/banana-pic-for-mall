# BananaMall

<div align="center">

**让灵感落地，让回忆有形**

AI-powered e-commerce detail page generator built with Tauri v2 + React + TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.9-blue.svg)](https://tauri.app/)

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
- 🌐 **多平台支持**：支持 Amazon、淘宝、京东等平台风格
- 🎯 **多语言支持**：支持中文和英文

### 技术栈

- **前端**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + Shadcn/UI
- **桌面框架**: Tauri v2
- **状态管理**: Zustand
- **AI 模型**: Google Gemini (支持多种模型)

## 🚀 快速开始

### 环境要求

- **Node.js**: 18+
- **npm**: 9+
- **Rust**: latest stable version
- **系统依赖**: [Tauri prerequisites](https://tauri.app/v2/guides/getting-started/prerequisites)

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/yourusername/banana-mall.git
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

4. **启动开发服务器**

```bash
npm run tauri:dev
```

### 构建生产版本

```bash
npm run tauri:build
```

构建产物位于 `src-tauri/target/release/` 目录。

## 📁 项目结构

```
banana-mall/
├── src/
│   ├── components/     # React 组件
│   │   └── ui/        # Shadcn/UI 组件
│   ├── lib/           # 工具函数和 API
│   │   ├── api.ts     # Gemini API 封装
│   │   ├── api-detail.ts  # 详情页生成逻辑
│   │   ├── export.ts  # 导出功能
│   │   └── i18n.ts    # 国际化
│   ├── pages/         # 页面组件
│   │   ├── UploadPage.tsx      # 上传页面
│   │   ├── ConfigPage.tsx      # 配置页面
│   │   ├── GeneratingPage.tsx  # 生成中页面
│   │   ├── EditorPage.tsx      # 编辑页面
│   │   ├── HistoryPage.tsx     # 历史记录
│   │   └── SettingsPage.tsx    # 设置页面
│   ├── stores/        # Zustand 状态管理
│   ├── hooks/         # 自定义 Hooks
│   ├── App.tsx        # 主应用组件
│   └── main.tsx       # 入口文件
├── src-tauri/         # Tauri 后端 (Rust)
│   ├── src/
│   │   └── main.rs    # Rust 入口
│   └── tauri.conf.json # Tauri 配置
└── public/            # 静态资源
```

## ⚙️ 配置说明

### API 配置

应用支持自定义 API 端点，可在设置页面配置：

- **API Key**: Google Gemini API Key（必需）
- **Base URL**: API 代理地址（可选，默认使用代理）

### 数据存储

使用 `tauri-plugin-store` 进行本地持久化存储：

- API 密钥（加密存储）
- 用户偏好设置
- 生成历史记录
- 应用配置

## 🎨 设计系统

- **配色方案**: Zinc（支持明暗主题）
- **字体**: Inter 字体系列
- **设计风格**: Vercel/Next.js 极简风格
- **组件库**: Shadcn/UI

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
- 保持代码注释清晰

## 🐛 问题反馈

如遇到问题，请在 [GitHub Issues](https://github.com/yourusername/banana-mall/issues) 提交。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

- [Tauri](https://tauri.app/) - 桌面应用框架
- [Shadcn/UI](https://ui.shadcn.com/) - 组件库
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI 模型

---

<div align="center">

**Made with ❤️ by [MatrixInspire](https://mxinspire.com)**

让灵感落地，让回忆有形

</div>

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BananaMall is an AI-powered e-commerce detail page generator built with Tauri v2 + React + TypeScript. It uses Google Gemini models to analyze product images and generate marketing copy, main images, and detail pages for platforms like Amazon, Taobao, and JD.

## Development Commands

```bash
# Start development server (Vite only, for web testing)
npm run dev

# Start Tauri desktop app in development mode
npm run tauri:dev

# Build for production
npm run build          # TypeScript + Vite build
npm run tauri:build    # Full desktop app build

# Preview production build
npm run preview
```

## Architecture

### Application Flow

The app follows a step-based wizard pattern controlled by `currentStep` in the global store:

1. **upload** → User uploads product image (white background recommended)
2. **config** → User selects platform, style, model, language, and optional brand/extra info
3. **generating** → AI generates text, main images, detail page content, and detail images
4. **editing** → User reviews and edits generated content with regeneration capability
5. **settings** / **history** → Accessible from any step via header buttons

### Key Architectural Decisions

**State Management**: Zustand store (`src/stores/useAppStore.ts`) is the single source of truth for:
- Current workflow step
- Product data (including base64 image for API calls)
- Generated content (images, texts, detail page modules)
- Settings (API key, preferences, theme)
- History (persisted, last 20 entries)

**Persistence**: Dual persistence strategy:
- Tauri app: `tauri-plugin-store` saves to `.settings.dat`
- Web fallback: localStorage with `bananaMall*` prefixes

**API Layer**: `src/lib/api.ts` wraps all Gemini API calls:
- `analyzeProduct()`: Vision analysis via `gemini-2.5-flash`
- `generateText()`: Marketing copy generation
- `generateImage()`: New image generation
- `editImage()`: Image editing (used for main/detail images to maintain product consistency)
- Falls back to mock API when no API key configured

**Image Generation Strategy**: All generated images use `editImage()` with the uploaded product image as base. This ensures visual consistency with the original product across all generated images.

**Detail Page Structure**: Generated detail pages follow a 5-module format defined in `src/lib/api-detail.ts`:
1. Buy Box (首屏决策区)
2. Value Proposition (卖点展示区)
3. Social Proof (信任背书区)
4. Service Guarantee (服务保障区)
5. Cross-sell (关联推荐区)

### Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + Shadcn/UI (Radix primitives)
- **Desktop**: Tauri v2 (Rust backend, minimal - just store plugin)
- **State**: Zustand
- **AI**: Google Gemini API (2.5 Flash for text, 2.5 Flash Image or 3 Pro Image for images)

### File Organization

- `src/pages/` - Page components matching workflow steps
- `src/stores/useAppStore.ts` - Global state with types for Platform, Style, Model, Language
- `src/lib/api.ts` - Main API class for Gemini integration
- `src/lib/api-detail.ts` - Detail page content generation
- `src/lib/i18n.ts` - Internationalization (zh/en)
- `src/hooks/useTauriStore.ts` - Tauri store initialization
- `src-tauri/` - Minimal Rust backend (store plugin only)

### Model Selection

- **NanoBanana**: `gemini-2.5-flash-image` - Fast generation
- **NanaBanana**: `gemini-3-pro-image-preview` - Higher quality

### API Providers

Supports two API providers (configurable in settings):

1. **Google Direct** (default): Direct calls to `https://generativelanguage.googleapis.com`
   - Uses `x-goog-api-key` header for authentication
   - Requires Google Gemini API key

2. **Zeabur AI Hub**: Proxy service at `https://hnd1.aihub.zeabur.ai/gemini`
   - Uses `Authorization` header for authentication
   - Suitable for regions with restricted access to Google APIs
   - Requires Zeabur AI Hub API key (format: `sk-xxxxxxxxxxxxxxxx`)

The `apiProvider` setting in the store determines which authentication method is used. Custom base URLs can be configured to override defaults.

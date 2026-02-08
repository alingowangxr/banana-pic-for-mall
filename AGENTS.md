# AGENTS.md - BananaMall Development Guide

> AI-powered e-commerce detail page generator built with Tauri v2 + React + TypeScript

## Build, Test & Lint Commands

```bash
# Development
npm run dev              # Start Vite dev server (web only)
npm run tauri:dev        # Start Tauri desktop app in dev mode

# Building
npm run build            # TypeScript check + Vite build
npm run tauri:build      # Build full desktop app
npm run preview          # Preview production build

# Testing
npm run test             # Run Vitest in watch mode
npm run test:run         # Run Vitest once (CI mode)
npm run test:coverage    # Run with coverage report

# Test single file: npx vitest run src/path/to/file.test.tsx
# Test with pattern: npx vitest run --testNamePattern="should render"

# Linting
npx eslint src/          # Run ESLint
npx eslint src/ --fix    # Auto-fix ESLint issues
```

## Technology Stack

- **Framework**: React 18 + TypeScript 5.6 (strict mode)
- **Build Tool**: Vite 5
- **Desktop**: Tauri v2 (Rust backend)
- **UI**: Tailwind CSS + Shadcn/UI (Radix primitives)
- **State**: Zustand (dual persistence: tauri-plugin-store + localStorage)
- **Testing**: Vitest + Testing Library + jsdom
- **Icons**: Lucide React
- **Notifications**: Sonner

## Code Style Guidelines

### File & Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase + `.tsx` | `EditorHeader.tsx`, `Button.tsx` |
| Hooks | camelCase with `use` prefix | `useAppStore.ts`, `useTheme.ts` |
| Utilities | camelCase + `.ts` | `utils.ts`, `errorHandler.ts` |
| Types/Interfaces | PascalCase | `interface ProductAnalysis` |
| Constants | UPPER_SNAKE_CASE | `PROVIDER_URLS` |

### Import Ordering

```typescript
// 1. React & framework imports
import * as React from "react"
import { useState } from "react"

// 2. External libraries
import { create } from "zustand"
import { cva, type VariantProps } from "class-variance-authority"

// 3. Internal path aliases (@/*)
import { useAppStore } from "@/stores/useAppStore"
import type { ProductAnalysis } from "@/stores/useAppStore"
import { cn } from "@/lib/utils"

// 4. Relative imports (avoid when possible, use @/*)
import { mockAPI } from "./api-mock"
```

### TypeScript Conventions

- **Always use strict mode** - no implicit any, strict null checks
- **Explicit return types** on exported functions and class methods
- **Interface over type** for object definitions (can be extended)
- **Type imports** use `import type { X }` when only types are needed
- **No unused locals/parameters** - compiler enforces this
- **Path alias**: `@/*` maps to `./src/*`

### Component Patterns

```typescript
// Shadcn/ui style components
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "base-classes",
  { variants: { /* ... */ } }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button, buttonVariants }
```

### Error Handling

- Use try/catch for async operations
- Always log errors with context: `console.error("Context:", error)`
- Provide fallback behavior (mock API, default values)
- Never suppress errors silently

```typescript
try {
  const result = await api.analyzeProduct(file)
  return result
} catch (error) {
  console.error("Product analysis failed:", error)
  console.warn("Falling back to mock API")
  return mockAPI.analyzeProduct(file)
}
```

### State Management (Zustand)

- Single store: `useAppStore` in `@/stores/useAppStore.ts`
- Dual persistence: Tauri store (primary) + localStorage (web fallback)
- Actions are defined in store, consumed via hooks
- Keep store logic colocated with state definition

### Styling

- **Tailwind CSS** for all styling
- **CSS variables** for theming (light/dark via `darkMode: ["class"]`)
- **cn() utility** from `@/lib/utils` for conditional classes
- **Shadcn/ui patterns**: Use `cva` for variant-based components

### Testing

```typescript
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { EditorHeader } from "./EditorHeader"

describe("EditorHeader", () => {
  const defaultProps = { /* ... */ }

  it("should render header with title", () => {
    render(<EditorHeader {...defaultProps} />)
    expect(screen.getByText("编辑详情页")).toBeInTheDocument()
  })
})
```

- Test files: `*.test.tsx` alongside source files
- Mock external dependencies with `vi.fn()`
- Use `@testing-library/react` for component tests
- Globals enabled (no need to import `describe`, `it`, etc.)

### API Layer Patterns

- Class-based API wrapper: `class NanoBananaAPI`
- Single instance exported: `export const api = new NanoBananaAPI()`
- Support multiple providers (Google, Zeabur) with auth headers abstraction
- Fallback to mock API when no API key configured

### Key Directories

```
src/
├── components/
│   ├── ui/           # Shadcn/UI components
│   ├── editor/       # Editor page components
│   └── templates/    # Template-related components
├── lib/              # Utilities, API, i18n
├── stores/           # Zustand store
├── hooks/            # Custom React hooks
├── pages/            # Page components
└── test/             # Test setup
```

### Anti-Patterns to Avoid

- **No `any` types** - TypeScript strict mode is enforced
- **No relative imports** when `@/*` alias can be used
- **No default exports** for components (named exports only)
- **No console in production** - use for debugging only
- **No test skipping** without documenting why

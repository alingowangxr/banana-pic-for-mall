# 项目优化建议

基于对 BananaMall 项目的分析，以下是一些优化建议，按优先级和类别组织。

## 🚀 性能优化

### 1. React 性能优化
**优先级：高**

- **使用 React.memo 优化组件**
  ```typescript
  // 对 EditorPage、HistoryPage 等大型组件使用 memo
  export const EditorPage = React.memo(() => { ... });
  
  // 对图片卡片等列表项使用 memo
  const HistoryCard = React.memo(({ history }) => { ... });
  ```

- **使用 useMemo 和 useCallback 减少重复计算**
  ```typescript
  // 在 EditorPage.tsx 中
  const mainImages = useMemo(
    () => images.filter(img => img.type === "main"),
    [images]
  );
  
  const handleRegenerateImage = useCallback(async (imageId: string) => {
    // ...
  }, [images, imagePrompt]);
  ```

- **图片懒加载**
  ```typescript
  // 使用 Intersection Observer 实现图片懒加载
  import { useInView } from 'react-intersection-observer';
  
  const LazyImage = ({ src, alt }) => {
    const { ref, inView } = useInView({ triggerOnce: true });
    return (
      <div ref={ref}>
        {inView && <img src={src} alt={alt} />}
      </div>
    );
  };
  ```

### 2. API 请求优化
**优先级：高**

- **请求去重和缓存**
  ```typescript
  // 在 api.ts 中添加请求缓存
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_TTL = 5 * 60 * 1000; // 5分钟
  
  async requestGemini<T>(...) {
    const cacheKey = JSON.stringify({ model, contents });
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    // ... 执行请求
    this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
  }
  ```

- **请求取消和超时处理**
  ```typescript
  // 使用 AbortController 实现请求取消
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      // ...
    });
  } finally {
    clearTimeout(timeoutId);
  }
  ```

- **并发控制**
  ```typescript
  // 限制同时进行的图片生成请求数量
  class RequestQueue {
    private queue: Array<() => Promise<any>> = [];
    private running = 0;
    private maxConcurrent = 3;
    
    async add<T>(fn: () => Promise<T>): Promise<T> {
      return new Promise((resolve, reject) => {
        this.queue.push(async () => {
          try {
            const result = await fn();
            resolve(result);
          } catch (error) {
            reject(error);
          } finally {
            this.running--;
            this.process();
          }
        });
        this.process();
      });
    }
    
    private process() {
      while (this.running < this.maxConcurrent && this.queue.length > 0) {
        this.running++;
        const task = this.queue.shift()!();
      }
    }
  }
  ```

### 3. 图片处理优化
**优先级：中**

- **图片压缩**
  ```typescript
  // 在上传时压缩图片
  async function compressImage(file: File, maxSizeMB = 2): Promise<File> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          
          // 计算压缩比例
          const maxDimension = 2048;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
          }, 'image/jpeg', 0.8);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }
  ```

- **Base64 优化**
  ```typescript
  // 使用 IndexedDB 存储大型 base64 数据，而不是内存
  // 只在需要时加载到内存
  ```

## 🛡️ 错误处理和用户体验

### 1. 错误边界 (Error Boundary)
**优先级：高**

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 可以发送错误报告到日志服务
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">出现错误</h2>
              <p className="text-muted-foreground mb-4">
                {this.state.error?.message || '未知错误'}
              </p>
              <Button onClick={() => this.setState({ hasError: false })}>
                重试
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// 在 App.tsx 中使用
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 2. 统一的错误提示组件
**优先级：中**

```typescript
// src/components/ui/toast.tsx 或使用 react-hot-toast
import toast from 'react-hot-toast';

// 统一错误处理
export const handleError = (error: unknown, context?: string) => {
  const message = error instanceof Error ? error.message : '未知错误';
  console.error(`[${context}]`, error);
  toast.error(`${context ? context + ': ' : ''}${message}`);
};
```

### 3. 加载状态优化
**优先级：中**

- **骨架屏 (Skeleton)**
  ```typescript
  // 在 HistoryPage、EditorPage 中使用骨架屏替代加载动画
  const HistorySkeleton = () => (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
  ```

- **渐进式加载**
  ```typescript
  // 先显示已生成的内容，图片逐步加载
  ```

## 📦 代码质量和可维护性

### 1. 类型安全增强
**优先级：中**

```typescript
// 使用更严格的类型定义
type ImageType = "main" | "detail" | "scene";
type Platform = "amazon" | "taobao" | "jd";
type Style = "minimal" | "cyber" | "chinese";

// API 响应类型
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text?: string; inlineData?: { data: string } }>;
    };
  }>;
}

// 错误类型
class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

### 2. 代码分割和懒加载
**优先级：中**

```typescript
// 使用 React.lazy 懒加载页面组件
import { lazy, Suspense } from 'react';

const EditorPage = lazy(() => import('@/pages/EditorPage'));
const HistoryPage = lazy(() => import('@/pages/HistoryPage'));

// 在 App.tsx 中使用
<Suspense fallback={<LoadingSpinner />}>
  {renderPage()}
</Suspense>
```

### 3. 环境变量管理
**优先级：低**

```typescript
// .env.example
VITE_DEFAULT_API_URL=https://api.openai-proxy.org
VITE_MAX_IMAGE_SIZE=5242880
VITE_CACHE_TTL=300000

// 使用环境变量
const API_URL = import.meta.env.VITE_DEFAULT_API_URL || 'https://api.openai-proxy.org';
```

### 4. 配置文件统一管理
**优先级：低**

```typescript
// src/config/index.ts
export const config = {
  api: {
    defaultUrl: import.meta.env.VITE_DEFAULT_API_URL || 'https://api.openai-proxy.org',
    timeout: 30000,
    retryCount: 3,
  },
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxDimension: 2048,
    quality: 0.8,
  },
  cache: {
    ttl: 5 * 60 * 1000, // 5分钟
  },
};
```

## 🔒 安全性增强

### 1. API Key 加密存储
**优先级：高**

```typescript
// 使用简单的加密（Tauri 环境可以使用系统密钥库）
// 对于 web 环境，至少使用 base64 编码混淆
const encrypt = (text: string): string => {
  // 简单的 base64 编码（不是真正的加密，但比明文好）
  return btoa(text);
};

const decrypt = (encrypted: string): string => {
  return atob(encrypted);
};
```

### 2. 输入验证和清理
**优先级：中**

```typescript
// 验证用户输入
const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: '不支持的文件类型' };
  }
  if (file.size > maxSize) {
    return { valid: false, error: '文件大小超过限制' };
  }
  return { valid: true };
};
```

### 3. XSS 防护
**优先级：中**

```typescript
// 对所有用户输入进行转义（React 默认处理，但需要确保）
// 特别是在渲染 HTML 内容时
import DOMPurify from 'dompurify';

const SafeHTML = ({ html }: { html: string }) => {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};
```

## 🎨 UI/UX 改进

### 1. 键盘快捷键
**优先级：低**

```typescript
// 添加快捷键支持
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        // 保存操作
      }
      if (e.key === 'e') {
        e.preventDefault();
        // 导出操作
      }
    }
    if (e.key === 'Escape') {
      // 关闭对话框等
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

### 2. 拖拽排序
**优先级：低**

```typescript
// 在 EditorPage 中允许拖拽重新排序图片
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
```

### 3. 撤销/重做功能
**优先级：低**

```typescript
// 使用 Zustand 中间件实现历史记录
import { devtools, persist } from 'zustand/middleware';

// 实现命令模式用于撤销/重做
```

### 4. 图片预览和放大
**优先级：低**

```typescript
// 添加图片点击放大查看功能
import { Dialog, DialogContent } from '@/components/ui/dialog';

const ImagePreview = ({ src, alt }: { src: string; alt: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img src={src} alt={alt} onClick={() => setOpen(true)} className="cursor-zoom-in" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <img src={src} alt={alt} className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </>
  );
};
```

## 📊 监控和日志

### 1. 性能监控
**优先级：低**

```typescript
// 使用 Web Vitals 监控性能
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = () => {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
};
```

### 2. 错误日志收集
**优先级：低**

```typescript
// 在开发环境使用 console，生产环境发送到日志服务
const logError = (error: Error, context?: string) => {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  } else {
    // 发送到 Sentry 或其他错误追踪服务
    // Sentry.captureException(error, { tags: { context } });
  }
};
```

## 🧪 测试

### 1. 单元测试
**优先级：中**

```typescript
// 使用 Vitest 进行单元测试
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});

// 测试示例
import { describe, it, expect } from 'vitest';
import { compressImage } from '@/lib/image-utils';

describe('compressImage', () => {
  it('should compress large images', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const compressed = await compressImage(file);
    expect(compressed.size).toBeLessThan(file.size);
  });
});
```

### 2. E2E 测试
**优先级：低**

```typescript
// 使用 Playwright 进行 E2E 测试
// 测试关键用户流程
```

## 📝 文档改进

### 1. API 文档
**优先级：低**

```typescript
// 使用 JSDoc 注释
/**
 * 生成产品图片
 * @param prompt - 图片描述提示词
 * @param style - 图片风格
 * @param platform - 目标平台
 * @returns Promise<string> - 图片 URL
 * @throws {APIError} 当 API 请求失败时
 */
async generateImage(params: GenerateImageParams): Promise<string> {
  // ...
}
```

### 2. 组件文档
**优先级：低**

- 使用 Storybook 创建组件文档
- 添加使用示例和 Props 说明

## 🚀 功能增强建议

### 1. 批量处理
**优先级：中**

- 支持批量上传多个产品图片
- 批量生成详情页

### 2. 模板系统
**优先级：低**

- 保存常用配置为模板
- 快速应用模板

### 3. 协作功能
**优先级：低**

- 导出为链接分享
- 评论和标注功能

### 4. 数据分析
**优先级：低**

- 生成内容使用统计
- 最常用配置统计

## 🔧 开发工具改进

### 1. 添加 Prettier
**优先级：低**

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 2. Git Hooks
**优先级：低**

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 📋 实施优先级建议

### 立即实施（高优先级）
1. ✅ 错误边界 (Error Boundary)
2. ✅ React.memo 和 useMemo/useCallback 优化
3. ✅ API Key 加密存储
4. ✅ 请求超时和取消处理

### 短期实施（中优先级）
1. 图片压缩和优化
2. 请求缓存机制
3. 统一的错误提示
4. 骨架屏加载状态
5. 单元测试基础框架

### 长期规划（低优先级）
1. 代码分割和懒加载
2. 性能监控
3. E2E 测试
4. 新功能开发

---

**建议：** 优先实施高优先级的优化，这些对用户体验和代码质量影响最大。逐步迭代，避免一次性改动过大。

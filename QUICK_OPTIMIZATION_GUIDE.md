# 快速优化实施指南

本文档说明如何使用已创建的优化工具，并给出下一步优化建议。

## ✅ 已创建的优化工具

### 1. 错误边界 (ErrorBoundary)
**文件**: `src/components/ErrorBoundary.tsx`
**状态**: ✅ 已集成到 `src/main.tsx`

现在应用已经具备全局错误捕获能力，任何未处理的错误都会被优雅地捕获并显示友好的错误界面。

**使用方法**:
```typescript
// 已经自动应用，无需额外配置
// 如果需要自定义错误页面，可以传入 fallback 组件
<ErrorBoundary fallback={CustomErrorPage}>
  <YourComponent />
</ErrorBoundary>
```

### 2. 统一的错误处理工具
**文件**: `src/lib/error-handler.ts`

提供了统一的错误处理、错误类型定义和用户友好的错误消息。

**使用示例**:
```typescript
import { handleError, showError, APIError, withErrorHandler } from '@/lib/error-handler';

// 方式1: 手动处理
try {
  await someAsyncOperation();
} catch (error) {
  const message = handleError(error, '操作名称');
  showError(message);
}

// 方式2: 使用包装器自动处理
const safeOperation = withErrorHandler(async () => {
  // 你的代码
}, '操作名称');

// 方式3: 创建自定义错误
throw new APIError('API 请求失败', 500, responseData);
```

**建议替换位置**:
- `src/pages/UploadPage.tsx` - 图片上传错误处理
- `src/pages/GeneratingPage.tsx` - 生成过程错误处理
- `src/pages/EditorPage.tsx` - 图片编辑错误处理
- `src/lib/api.ts` - API 调用错误处理

### 3. 图片工具函数
**文件**: `src/lib/image-utils.ts`

提供了图片压缩、验证、转换等功能。

**使用示例**:
```typescript
import { 
  compressImage, 
  validateImageFile, 
  fileToBase64,
  createPreviewUrl,
  revokePreviewUrl 
} from '@/lib/image-utils';

// 验证文件
const validation = validateImageFile(file);
if (!validation.valid) {
  showError(validation.error);
  return;
}

// 压缩图片（可选）
const compressedFile = await compressImage(file, 2, 2048, 0.8);

// 转换为 base64
const base64 = await fileToBase64(compressedFile);

// 创建预览 URL
const previewUrl = createPreviewUrl(file);

// 使用完后清理
revokePreviewUrl(previewUrl);
```

**建议替换位置**:
- `src/pages/UploadPage.tsx` - 在文件上传时使用验证和压缩
- `src/pages/EditorPage.tsx` - 在图片处理时使用工具函数

## 🚀 下一步优化建议（按优先级）

### 高优先级（建议立即实施）

#### 1. 在 UploadPage 中使用图片工具
**文件**: `src/pages/UploadPage.tsx`

```typescript
import { validateImageFile, compressImage, fileToBase64 } from '@/lib/image-utils';
import { handleError, showError } from '@/lib/error-handler';

// 在 handleFile 函数中
const handleFile = useCallback(async (file: File) => {
  // 验证文件
  const validation = validateImageFile(file);
  if (!validation.valid) {
    setError(validation.error);
    return;
  }

  setError(null);
  
  try {
    // 压缩大文件
    let processedFile = file;
    if (file.size > 2 * 1024 * 1024) {
      processedFile = await compressImage(file);
    }
    
    // 创建预览
    const previewUrl = createPreviewUrl(processedFile);
    setPreview(previewUrl);
    
    // 转换为 base64
    const base64 = await fileToBase64(processedFile);
    
    // 分析产品
    setIsAnalyzing(true);
    const analysis = await api.analyzeProduct(processedFile);
    
    // ... 后续逻辑
  } catch (error) {
    const message = handleError(error, '图片上传');
    setError(message);
    setIsAnalyzing(false);
  }
}, []);
```

#### 2. 优化 EditorPage 性能
**文件**: `src/pages/EditorPage.tsx`

```typescript
import React, { useMemo, useCallback } from 'react';

export const EditorPage = React.memo(() => {
  // ... 现有代码
  
  // 使用 useMemo 缓存过滤结果
  const mainImages = useMemo(
    () => images.filter(img => img.type === "main"),
    [images]
  );
  
  const detailImages = useMemo(
    () => images.filter(img => img.type === "detail"),
    [images]
  );
  
  // 使用 useCallback 缓存函数
  const handleRegenerateImage = useCallback(async (imageId: string) => {
    // ... 现有逻辑
  }, [images, imagePrompt, generatedContent]);
  
  // ... 其他优化
});
```

#### 3. API 错误处理改进
**文件**: `src/lib/api.ts`

```typescript
import { APIError, handleError } from '@/lib/error-handler';

class NanoBananaAPI {
  async requestGemini<T>(...): Promise<T> {
    try {
      const response = await fetch(/* ... */);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new APIError(
          `API 请求失败: ${response.statusText}`,
          response.status,
          errorText
        );
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        handleError(error, 'Gemini API'),
        0,
        error
      );
    }
  }
}
```

### 中优先级（建议短期实施）

#### 4. 添加请求超时和取消
**文件**: `src/lib/api.ts`

```typescript
async requestGemini<T>(
  model: string,
  contents: any[],
  config?: any,
  timeout: number = 30000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      // ... 其他配置
    });
    
    clearTimeout(timeoutId);
    // ... 处理响应
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new APIError('请求超时，请稍后重试', 408);
    }
    throw error;
  }
}
```

#### 5. 添加请求缓存（可选）
**文件**: `src/lib/api.ts`

```typescript
private cache = new Map<string, { data: any; timestamp: number }>();
private readonly CACHE_TTL = 5 * 60 * 1000; // 5分钟

async requestGemini<T>(...): Promise<T> {
  // 对于 GET 请求或幂等操作可以缓存
  const cacheKey = JSON.stringify({ model, contents });
  const cached = this.cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
    return cached.data;
  }
  
  const result = await fetch(/* ... */);
  this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}
```

### 低优先级（长期规划）

#### 6. 添加 Toast 通知库
替换简单的 `alert`，提供更好的用户体验。

```bash
npm install react-hot-toast
```

```typescript
// src/main.tsx
import { Toaster } from 'react-hot-toast';

// 在 App 组件中添加
<Toaster position="top-right" />

// 在 error-handler.ts 中使用
import toast from 'react-hot-toast';

export function showError(message: string) {
  toast.error(message);
}

export function showSuccess(message: string) {
  toast.success(message);
}
```

#### 7. 代码分割和懒加载
**文件**: `src/App.tsx`

```typescript
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const UploadPage = lazy(() => import('@/pages/UploadPage'));
const ConfigPage = lazy(() => import('@/pages/ConfigPage'));
const GeneratingPage = lazy(() => import('@/pages/GeneratingPage'));
const EditorPage = lazy(() => import('@/pages/EditorPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const HistoryPage = lazy(() => import('@/pages/HistoryPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

// 在 renderPage 中使用
<Suspense fallback={<LoadingFallback />}>
  {renderPage()}
</Suspense>
```

## 📊 性能监控建议

### 添加性能测量
在关键操作中添加性能监控：

```typescript
// src/lib/performance.ts
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  const start = performance.now();
  const result = fn();
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const duration = performance.now() - start;
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    });
  } else {
    const duration = performance.now() - start;
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    return result;
  }
}

// 使用示例
await measurePerformance('图片生成', async () => {
  await api.generateImage(/* ... */);
});
```

## 🔍 代码质量检查

### 运行 lint 检查
```bash
npm run lint  # 如果配置了的话
# 或者
npx eslint src --ext .ts,.tsx
```

### 检查未使用的代码
```bash
npx depcheck  # 检查未使用的依赖
```

## 📝 总结

**已完成的优化**:
- ✅ 错误边界组件
- ✅ 统一错误处理工具
- ✅ 图片工具函数

**建议下一步**:
1. 在 UploadPage 中集成图片验证和压缩
2. 在 EditorPage 中使用 React.memo 和 useMemo
3. 改进 API 错误处理
4. 添加请求超时处理

**参考文档**:
- 详细的优化建议请查看 `OPTIMIZATION_SUGGESTIONS.md`
- 所有建议都包含代码示例和优先级说明

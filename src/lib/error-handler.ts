/**
 * 统一的错误处理工具
 */

// V8 引擎特有 API 類型聲明
declare global {
  interface ErrorConstructor {
    captureStackTrace?(targetObject: object, constructorOpt?: Function): void;
  }
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "AppError";
    // 保持正确的堆栈跟踪 (V8 引擎特有 API)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export class APIError extends AppError {
  constructor(
    message: string,
    statusCode?: number,
    public response?: any
  ) {
    super(message, "API_ERROR", statusCode);
    this.name = "APIError";
  }
}

/**
 * 处理错误并返回用户友好的错误消息
 */
export function handleError(error: unknown, context?: string): string {
  // 记录错误（开发环境详细日志，生产环境简洁日志）
  if (import.meta.env.DEV) {
    console.error(`[${context || "Error"}]`, error);
  } else {
    console.error(`[${context || "Error"}]`, error instanceof Error ? error.message : String(error));
  }

  // 返回用户友好的错误消息
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    // 处理常见的错误类型
    if (error.message.includes("API Key")) {
      return "API Key 未配置或无效，请在设置中配置";
    }
    if (error.message.includes("network") || error.message.includes("fetch")) {
      return "网络连接失败，请检查网络设置";
    }
    if (error.message.includes("timeout")) {
      return "请求超时，请稍后重试";
    }
    return error.message || "发生未知错误";
  }

  if (typeof error === "string") {
    return error;
  }

  return "发生未知错误，请稍后重试";
}

/**
 * 错误提示（可以集成 toast 库）
 */
export function showError(message: string, context?: string): void {
  // 简单的 alert，可以替换为 toast 通知
  if (import.meta.env.DEV) {
    console.error(`[${context || "Error"}]`, message);
  }
  alert(message);
}

/**
 * 成功提示
 */
export function showSuccess(message: string): void {
  // 可以替换为 toast 通知
  if (import.meta.env.DEV) {
    console.log("[Success]", message);
  }
  // alert(message); // 如果需要立即反馈，可以取消注释
}

/**
 * 包装异步函数，自动处理错误
 */
export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string
): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      const message = handleError(error, context);
      showError(message, context);
      throw error; // 重新抛出，让调用者决定如何处理
    }
  }) as T;
}

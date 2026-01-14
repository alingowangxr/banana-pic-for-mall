/**
 * 图片工具函数
 */

/**
 * 压缩图片
 * @param file 原始图片文件
 * @param maxSizeMB 最大文件大小（MB）
 * @param maxDimension 最大尺寸（像素）
 * @param quality 压缩质量 (0-1)
 */
export async function compressImage(
  file: File,
  maxSizeMB: number = 2,
  maxDimension: number = 2048,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // 计算压缩比例
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
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("无法创建 canvas 上下文"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("图片压缩失败"));
              return;
            }

            // 如果压缩后仍然超过限制，进一步降低质量
            if (blob.size > maxSizeMB * 1024 * 1024 && quality > 0.5) {
              compressImage(file, maxSizeMB, maxDimension, quality - 0.1)
                .then(resolve)
                .catch(reject);
              return;
            }

            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => reject(new Error("图片加载失败"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsDataURL(file);
  });
}

/**
 * 验证图片文件
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "不支持的文件类型，请上传 JPEG、PNG 或 WebP 格式",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `文件大小超过限制（最大 ${maxSize / 1024 / 1024}MB）`,
    };
  }

  return { valid: true };
}

/**
 * 将 File 转换为 base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // 移除 data URL 前缀，只返回 base64 字符串
      const base64 = result.split(",")[1];
      if (base64) {
        resolve(base64);
      } else {
        reject(new Error("Base64 转换失败"));
      }
    };
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsDataURL(file);
  });
}

/**
 * 创建图片预览 URL
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 清理预览 URL
 */
export function revokePreviewUrl(url: string): void {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

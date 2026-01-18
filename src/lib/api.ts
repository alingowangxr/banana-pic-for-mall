import { useAppStore } from "@/stores/useAppStore";
import type { ProductAnalysis, Platform, Style, Language } from "@/stores/useAppStore";
import { mockAPI } from "./api-mock";

export interface GenerateTextParams {
  product: {
    category: string;
    tags: string[];
    analysis: ProductAnalysis;
  };
  platform: Platform;
  style: Style;
  language: Language;
  brandName?: string;
  extraInfo?: string;
}

export interface GenerateImageParams {
  prompt: string;
  style: Style;
  platform: Platform;
  type?: "main" | "detail" | "scene";
}

export interface EditImageParams {
  image: string; // base64 string (without data URL prefix)
  imageMimeType: string; // image mime type (e.g., 'image/jpeg', 'image/png')
  prompt: string;
  mask?: string; // optional mask for inpainting
}

// Default URLs for each provider
const PROVIDER_URLS = {
  google: "https://generativelanguage.googleapis.com",
  zeabur: "https://hnd1.aihub.zeabur.ai/gemini",
};

class NanoBananaAPI {
  private getApiProvider(): "google" | "zeabur" {
    const { settings } = useAppStore.getState();
    return settings.apiProvider || "google";
  }

  private getBaseURL(): string {
    const { settings } = useAppStore.getState();
    const provider = this.getApiProvider();
    // Use custom baseURL if provided, otherwise use default for the provider
    if (settings.baseURL && settings.baseURL.trim() !== "") {
      return settings.baseURL;
    }
    return PROVIDER_URLS[provider];
  }

  private getApiKey(): string {
    const { settings } = useAppStore.getState();
    return settings.apiKey;
  }

  /**
   * Get authentication headers based on the API provider
   * - Google: uses x-goog-api-key header
   * - Zeabur: uses both Authorization and x-goog-api-key headers
   */
  private getAuthHeaders(): Record<string, string> {
    const apiKey = this.getApiKey();
    const provider = this.getApiProvider();

    if (provider === "zeabur") {
      return {
        "Authorization": `Bearer ${apiKey}`,
        "x-goog-api-key": apiKey,
      };
    }
    // Default: Google direct API
    return {
      "x-goog-api-key": apiKey,
    };
  }

  /**
   * Get Gemini API endpoint
   * Uses direct Google Generative Language API or Zeabur AI Hub
   */
  private getGeminiURL(): string {
    return this.getBaseURL();
  }

  /**
   * Make request to Gemini API
   * Supports both Google direct API and Zeabur AI Hub
   * Made public for use in api-detail.ts
   */
  async requestGemini<T>(
    model: string,
    contents: any[],
    config?: any
  ): Promise<T> {
    const geminiURL = this.getGeminiURL();
    const apiKey = this.getApiKey();

    if (!apiKey) {
      throw new Error("API Key is required");
    }

    const response = await fetch(
      `${geminiURL}/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({
          contents,
          ...config,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API Error: ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Analyze product image using Gemini vision
   */
  async analyzeProduct(imageFile: File): Promise<ProductAnalysis> {
    const apiKey = this.getApiKey();
    const { settings } = useAppStore.getState();
    const platform = settings.defaultPlatform || "amazon";

    // Use mock API if no API key is configured
    if (!apiKey) {
      console.warn("No API key configured, using mock API");
      return mockAPI.analyzeProduct(imageFile);
    }

    try {
      // Convert file to base64
      const base64 = await this.fileToBase64(imageFile);
      const mimeType = imageFile.type || "image/jpeg";

      // Use Gemini 2.5 Flash for fast analysis
      // Choose prompt language based on platform:
      // Amazon → English, Taobao/JD → Simplified Chinese, Shopee → Traditional Chinese
      const prompt = platform === "amazon"
        ? `Please analyze this product image and provide the following information (in English):
1. Product category (one word or phrase)
2. Product description (2-3 sentences)
3. Listing suggestions (3-4 items, one sentence each)
4. Product specifications (5 items, format: attribute: value)

Please return in JSON format as follows:
{
  "category": "Product Category",
  "description": "Product Description",
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"],
  "specifications": ["Spec 1", "Spec 2", "Spec 3", "Spec 4", "Spec 5"]
}`
        : platform === "shopee"
        ? `請分析這張產品圖片，提供以下資訊（用繁體中文回答）：
1. 產品類別（一個詞或短語）
2. 產品描述（2-3句話）
3. 上架建議（3-4條，每條一句話）
4. 產品規格（5條，格式：屬性名：屬性值）

請以JSON格式返回，格式如下：
{
  "category": "產品類別",
  "description": "產品描述",
  "suggestions": ["建議1", "建議2", "建議3"],
  "specifications": ["規格1", "規格2", "規格3", "規格4", "規格5"]
}`
        : `请分析这张产品图片，提供以下信息（用简体中文回答）：
1. 产品类别（一个词或短语）
2. 产品描述（2-3句话）
3. 上架建议（3-4条，每条一句话）
4. 产品规格（5条，格式：属性名：属性值）

请以JSON格式返回，格式如下：
{
  "category": "产品类别",
  "description": "产品描述",
  "suggestions": ["建议1", "建议2", "建议3"],
  "specifications": ["规格1", "规格2", "规格3", "规格4", "规格5"]
}`;

      const response = await this.requestGemini<{
        candidates: Array<{
          content: {
            parts: Array<{ text: string }>;
          };
        }>;
      }>("gemini-2.5-flash", [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64,
              },
            },
            { text: prompt },
          ],
        },
      ]);

      // Extract text response
      const textResponse = response.candidates[0]?.content?.parts[0]?.text;
      if (!textResponse) {
        throw new Error("No response from Gemini");
      }

      // Parse JSON from response (might be wrapped in markdown code blocks)
      let jsonText = textResponse.trim();
      if (jsonText.includes("```json")) {
        jsonText = jsonText.split("```json")[1].split("```")[0].trim();
      } else if (jsonText.includes("```")) {
        jsonText = jsonText.split("```")[1].split("```")[0].trim();
      }

      const analysis = JSON.parse(jsonText) as ProductAnalysis;
      return analysis;
    } catch (error) {
      console.error("Gemini analysis error:", error);
      console.warn("Falling back to mock API");
      return mockAPI.analyzeProduct(imageFile);
    }
  }

  /**
   * Generate product text content using Gemini
   */
  async generateText(params: GenerateTextParams): Promise<{
    title: string;
    description: string;
    specifications: string[];
  }> {
    const apiKey = this.getApiKey();

    if (!apiKey) {
      return mockAPI.generateText(params);
    }

    try {
      const platformNames = {
        amazon: "Amazon",
        taobao: "淘宝",
        jd: "京东",
        shopee: "蝦皮購物",
      };

      const styleNames = {
        minimal: "极简",
        cyber: "赛博",
        chinese: "国潮",
        japanese: "日系清新",
        luxury: "轻奢高端",
        natural: "自然有机",
        cute: "可爱萌系",
        apple: "Apple 科技风",
      };

      const isChinese = params.language.startsWith("zh");
      const brandLine = params.brandName
        ? isChinese
          ? `品牌名：${params.brandName}\n`
          : `Brand Name: ${params.brandName}\n`
        : "";
      const extraInfoLine =
        params.extraInfo && params.extraInfo.trim().length > 0
          ? isChinese
            ? `补充信息：${params.extraInfo.trim()}\n`
            : `Additional Info: ${params.extraInfo.trim()}\n`
          : "";

      const prompt = isChinese
        ? `基于以下产品信息，生成${
            platformNames[params.platform]
          }平台的商品文案（${styleNames[params.style]}风格）：

${brandLine}${extraInfoLine}产品类别：${params.product.category}
产品描述：${params.product.analysis.description}
产品规格：${params.product.analysis.specifications.join("、")}

请生成：
1. 商品标题（吸引人，包含关键词）
2. 商品描述（详细，突出卖点，适合${platformNames[params.platform]}平台）
3. 商品规格列表（5条）

以JSON格式返回：
{
  "title": "商品标题",
  "description": "商品描述",
  "specifications": ["规格1", "规格2", "规格3", "规格4", "规格5"]
}`
      : `Generate product copy for ${
            platformNames[params.platform]
          } platform (${styleNames[params.style]} style) based on:

${brandLine}${extraInfoLine}Category: ${params.product.category}
Description: ${params.product.analysis.description}
Specifications: ${params.product.analysis.specifications.join(", ")}

Generate:
1. Product title (attractive, includes keywords)
2. Product description (detailed, highlights selling points, suitable for ${
            platformNames[params.platform]
          })
3. Specification list (5 items)

Return in JSON format:
{
  "title": "Product Title",
  "description": "Product Description",
  "specifications": ["Spec1", "Spec2", "Spec3", "Spec4", "Spec5"]
}`;

      const response = await this.requestGemini<{
        candidates: Array<{
          content: {
            parts: Array<{ text: string }>;
          };
        }>;
      }>("gemini-2.5-flash", [{ parts: [{ text: prompt }] }]);

      const textResponse = response.candidates[0]?.content?.parts[0]?.text;
      if (!textResponse) {
        throw new Error("No response from Gemini");
      }

      let jsonText = textResponse.trim();
      if (jsonText.includes("```json")) {
        jsonText = jsonText.split("```json")[1].split("```")[0].trim();
      } else if (jsonText.includes("```")) {
        jsonText = jsonText.split("```")[1].split("```")[0].trim();
      }

      const parsed = JSON.parse(jsonText);

      // Normalize the response - ensure title and description are strings
      // The API might return objects with productName/description keys instead of flat strings
      const normalizeToString = (value: unknown): string => {
        if (typeof value === 'string') return value;
        if (value && typeof value === 'object') {
          // Try common keys that might contain the actual string
          const obj = value as Record<string, unknown>;
          if (typeof obj.productName === 'string') return obj.productName;
          if (typeof obj.name === 'string') return obj.name;
          if (typeof obj.text === 'string') return obj.text;
          if (typeof obj.value === 'string') return obj.value;
          // Fallback: stringify the object
          return JSON.stringify(value);
        }
        return String(value || '');
      };

      return {
        title: normalizeToString(parsed.title || parsed.productName || parsed.name || ''),
        description: normalizeToString(parsed.description || parsed.productDescription || ''),
        specifications: Array.isArray(parsed.specifications)
          ? parsed.specifications.map((spec: unknown) => normalizeToString(spec))
          : [],
      };
    } catch (error) {
      console.error("Gemini text generation error:", error);
      console.warn("Falling back to mock API");
      return mockAPI.generateText(params);
    }
  }

  /**
   * Generate product image using Gemini Image Generation (Nano Banana)
   */
  async generateImage(params: GenerateImageParams): Promise<string> {
    const apiKey = this.getApiKey();
    const { settings } = useAppStore.getState();

    if (!apiKey) {
      return mockAPI.generateImage(params);
    }

    try {
      // Choose model based on selected NanoBanana variant
      const model =
        settings.selectedModel === "nanabanana"
          ? "gemini-3-pro-image-preview"
          : "gemini-2.5-flash-image";

      // Build prompt with style and platform context
      const stylePrompts = {
        minimal: "极简风格，简洁现代，突出产品本身，干净背景",
        cyber: "赛博风格，科技感强，未来感，炫酷",
        chinese: "国潮风格，传统与现代结合，文化元素",
        japanese: "日系清新风格，柔和淡雅，文艺气息，清新自然",
        luxury: "轻奢高端风格，精致优雅，高级质感，奢华氛围",
        natural: "自然有机风格，清新自然，绿色环保，原生态感",
        cute: "可爱萌系风格，活泼可爱，粉嫩色调，童趣元素",
        apple: "Apple科技风格，极简纯净，大量留白，高级灰白配色，产品悬浮展示",
      };

      const platformPrompts = {
        amazon: "适合Amazon平台，专业产品摄影风格",
        taobao: "适合淘宝平台，营销感强，吸引眼球",
        jd: "适合京东平台，高端品质展示",
        shopee: "适合蝦皮平台，乾淨白底，可加小促銷標，行動端優先",
      };

      const fullPrompt = `${params.prompt}，${stylePrompts[params.style]}，${
        platformPrompts[params.platform]
      }，高质量产品图片`;

      const response = await this.requestGemini<{
        candidates: Array<{
          content: {
            parts: Array<{
              inlineData?: {
                mimeType: string;
                data: string;
              };
              text?: string;
            }>;
          };
        }>;
      }>(model, [{ parts: [{ text: fullPrompt }] }], {
        generationConfig: {
          responseModalities: ["IMAGE"],
          imageConfig: {
            aspectRatio: params.type === "detail" ? "3:4" : "1:1",
          },
        },
      });

      // Extract image from response
      const parts = response.candidates[0]?.content?.parts;
      if (!parts || parts.length === 0) {
        throw new Error("No image generated");
      }

      // Find image part
      const imagePart = parts.find((part) => part.inlineData);
      if (!imagePart?.inlineData) {
        throw new Error("No image data in response");
      }

      // Convert base64 to data URL
      const imageData = imagePart.inlineData.data;
      const mimeType = imagePart.inlineData.mimeType || "image/png";
      return `data:${mimeType};base64,${imageData}`;
    } catch (error) {
      console.error("Gemini image generation error:", error);
      console.warn("Falling back to mock API");
      return mockAPI.generateImage(params);
    }
  }

  /**
   * Edit existing image with prompt using Gemini Image Generation
   * Directly passes base64 image to Google API
   */
  async editImage(params: EditImageParams): Promise<string> {
    const apiKey = this.getApiKey();
    const { settings } = useAppStore.getState();

    if (!apiKey) {
      console.warn("No API key, using mock API");
      return mockAPI.editImage({
        image: params.image,
        prompt: params.prompt,
      });
    }

    try {
      // Use raw base64 string directly (already extracted)
      const base64Image = params.image;
      const mimeType = params.imageMimeType || "image/jpeg";

      const model =
        settings.selectedModel === "nanabanana"
          ? "gemini-3-pro-image-preview"
          : "gemini-2.5-flash-image";

      const geminiURL = this.getGeminiURL();

      // Direct API call to Gemini (supports both Google and Zeabur)
      const response = await fetch(
        `${geminiURL}/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...this.getAuthHeaders(),
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: mimeType,
                      data: base64Image, // Direct base64 string
                    },
                  },
                  { text: params.prompt },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ["IMAGE"],
              imageConfig: {
                aspectRatio: params.prompt.includes("3:4") ? "3:4" : "1:1",
              },
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Gemini API Error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const result = await response.json();
      const parts = result.candidates?.[0]?.content?.parts;
      if (!parts || parts.length === 0) {
        throw new Error("No image generated - empty response");
      }

      // Find image part in response
      const imagePart = parts.find((part: any) => part.inlineData);
      if (!imagePart?.inlineData) {
        throw new Error("No image data in response");
      }

      const imageData = imagePart.inlineData.data;
      const responseMimeType = imagePart.inlineData.mimeType || "image/png";

      return `data:${responseMimeType};base64,${imageData}`;
    } catch (error) {
      console.error("Gemini image edit error:", error);
      console.warn("Falling back to mock API");
      return mockAPI.editImage({
        image: params.image,
        prompt: params.prompt,
      });
    }
  }

  /**
   * Convert File to base64 string
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const api = new NanoBananaAPI();

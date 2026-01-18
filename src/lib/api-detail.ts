import type {
  Product,
  Platform,
  Style,
  Language,
  Model,
} from "@/stores/useAppStore";
import { api } from "./api";

export interface DetailPageContent {
  buyBox: {
    title: string;
    price: string;
    originalPrice?: string;
    cta: string;
  };
  valueProposition: {
    painPoints: string[];
    solutions: string[];
    visualizations: string[];
  };
  socialProof: {
    reviews: Array<{ text: string; rating: number }>;
    salesData: string;
    certifications: string[];
  };
  serviceGuarantee: {
    shipping: string;
    returnPolicy: string;
    faq: Array<{ question: string; answer: string }>;
  };
  crossSell: {
    recommendations: string[];
  };
}

/**
 * Generate detail page content with 5 core modules using AI
 */
export async function generateDetailPage(
  product: Product,
  platform: Platform,
  style: Style,
  language: Language,
  model: Model,
  brandName?: string,
  extraInfo?: string
): Promise<DetailPageContent> {
  const isTraditionalChinese = language === "zh-TW";
  const isSimplifiedChinese = language === "zh-CN";

  // Check if API key is available
  const { useAppStore } = await import("@/stores/useAppStore");
  const apiKey = useAppStore.getState().settings.apiKey;

  if (!apiKey) {
    // Fallback to mock data if no API key
    console.warn("No API key, using mock detail page content");
    return getMockDetailPage(product, style, language, brandName);
  }

  try {
    // Use Gemini API to generate detail page content
    const brandLine = brandName
      ? isTraditionalChinese
        ? `品牌名：${brandName}\n`
        : isSimplifiedChinese
        ? `品牌名：${brandName}\n`
        : `Brand Name: ${brandName}\n`
      : "";
    const extraInfoLine =
      extraInfo && extraInfo.trim().length > 0
        ? isTraditionalChinese
          ? `補充資訊：${extraInfo.trim()}\n`
          : isSimplifiedChinese
          ? `补充信息：${extraInfo.trim()}\n`
          : `Additional Info: ${extraInfo.trim()}\n`
        : "";

    const prompt = isTraditionalChinese
      ? `請為以下產品生成完整的電商詳情頁內容（5大核心模組），所有文字請使用繁體中文：

${brandLine}${extraInfoLine}產品類別：${product.category}
產品描述：${product.analysis?.description || ""}
產品規格：${product.analysis?.specifications?.join(", ") || ""}

目標平台：${
          platform === "amazon"
            ? "Amazon（跨境電商）"
            : platform === "taobao"
            ? "淘寶（國內電商）"
            : platform === "shopee"
            ? "蝦皮購物（台灣及東南亞市場，行動端優先）"
            : "京東（高端電商）"
        }
風格：${
          style === "minimal"
            ? "極簡風格"
            : style === "cyber"
            ? "賽博風格"
            : style === "chinese"
            ? "國潮風格"
            : style === "japanese"
            ? "日系清新風格"
            : style === "luxury"
            ? "輕奢高端風格"
            : style === "natural"
            ? "自然有機風格"
            : style === "cute"
            ? "可愛萌系風格"
            : "Apple 科技風格"
        }

請生成以下5大核心模組的詳細內容，以JSON格式返回，所有文字必須使用繁體中文：

1. 首屏決策區（Buy Box）：
   - title: 商品標題（包含品牌、核心關鍵詞、屬性、場景）
   - price: 當前價格
   - originalPrice: 原價（可選）
   - cta: 行動按鈕文字

2. 賣點展示區（Value Proposition）：
   - painPoints: 用戶痛點陣列（3-5條）
   - solutions: 產品解決方案陣列（3-5條）
   - visualizations: 視覺化展示建議陣列（3條）

3. 信任背書區（Social Proof）：
   - reviews: 用戶評價陣列，每個包含text（評價內容）和rating（評分1-5）
   - salesData: 銷量數據描述
   - certifications: 認證證書陣列

4. 服務保障區（Service & Guarantee）：
   - shipping: 物流政策描述
   - returnPolicy: 退換貨政策描述
   - faq: 常見問題陣列，每個包含question和answer

5. 關聯推薦區（Cross-sell）：
   - recommendations: 推薦商品陣列（3-5條）

請確保內容真實、吸引人，符合${
          platform === "amazon"
            ? "Amazon"
            : platform === "taobao"
            ? "淘寶"
            : platform === "shopee"
            ? "蝦皮購物"
            : "京東"
        }平台的風格特點。返回純JSON格式，不要包含markdown程式碼區塊。所有生成的文字內容必須使用繁體中文。`
      : isSimplifiedChinese
      ? `请为以下产品生成完整的电商详情页内容（5大核心模块），所有文字请使用简体中文：

${brandLine}${extraInfoLine}产品类别：${product.category}
产品描述：${product.analysis?.description || ""}
产品规格：${product.analysis?.specifications?.join(", ") || ""}

目标平台：${
          platform === "amazon"
            ? "Amazon（跨境电商）"
            : platform === "taobao"
            ? "淘宝（国内电商）"
            : platform === "shopee"
            ? "虾皮购物（台湾及东南亚市场，移动端优先）"
            : "京东（高端电商）"
        }
风格：${
          style === "minimal"
            ? "极简风格"
            : style === "cyber"
            ? "赛博风格"
            : style === "chinese"
            ? "国潮风格"
            : style === "japanese"
            ? "日系清新风格"
            : style === "luxury"
            ? "轻奢高端风格"
            : style === "natural"
            ? "自然有机风格"
            : style === "cute"
            ? "可爱萌系风格"
            : "Apple 科技风格"
        }

请生成以下5大核心模块的详细内容，以JSON格式返回，所有文字必须使用简体中文：

1. 首屏决策区（Buy Box）：
   - title: 商品标题（包含品牌、核心关键词、属性、场景）
   - price: 当前价格
   - originalPrice: 原价（可选）
   - cta: 行动按钮文字

2. 卖点展示区（Value Proposition）：
   - painPoints: 用户痛点数组（3-5条）
   - solutions: 产品解决方案数组（3-5条）
   - visualizations: 可视化展示建议数组（3条）

3. 信任背书区（Social Proof）：
   - reviews: 用户评价数组，每个包含text（评价内容）和rating（评分1-5）
   - salesData: 销量数据描述
   - certifications: 认证证书数组

4. 服务保障区（Service & Guarantee）：
   - shipping: 物流政策描述
   - returnPolicy: 退换货政策描述
   - faq: 常见问题数组，每个包含question和answer

5. 关联推荐区（Cross-sell）：
   - recommendations: 推荐商品数组（3-5条）

请确保内容真实、吸引人，符合${
          platform === "amazon"
            ? "Amazon"
            : platform === "taobao"
            ? "淘宝"
            : platform === "shopee"
            ? "虾皮购物"
            : "京东"
        }平台的风格特点。返回纯JSON格式，不要包含markdown代码块。所有生成的文字内容必须使用简体中文。`
      : `Please generate complete e-commerce detail page content (5 core modules) for the following product:

${brandLine}${extraInfoLine}Product Category: ${product.category}
Product Description: ${product.analysis?.description || ""}
Product Specifications: ${product.analysis?.specifications?.join(", ") || ""}

Target Platform: ${
          platform === "amazon"
            ? "Amazon (Cross-border)"
            : platform === "taobao"
            ? "Taobao (Domestic)"
            : platform === "shopee"
            ? "Shopee (Taiwan & Southeast Asia, Mobile-first)"
            : "JD (Premium)"
        }
Style: ${
          style === "minimal"
            ? "Minimal"
            : style === "cyber"
            ? "Cyber"
            : style === "chinese"
            ? "Chinese Traditional"
            : style === "japanese"
            ? "Japanese Fresh"
            : style === "luxury"
            ? "Luxury Premium"
            : style === "natural"
            ? "Natural Organic"
            : style === "cute"
            ? "Cute & Adorable"
            : "Apple Tech Style"
        }

Please generate detailed content for the following 5 core modules, return in JSON format:

1. Buy Box:
   - title: Product title (include brand, core keywords, attributes, scene)
   - price: Current price
   - originalPrice: Original price (optional)
   - cta: Call-to-action button text

2. Value Proposition:
   - painPoints: Array of user pain points (3-5 items)
   - solutions: Array of product solutions (3-5 items)
   - visualizations: Array of visualization suggestions (3 items)

3. Social Proof:
   - reviews: Array of user reviews, each with text (review content) and rating (1-5)
   - salesData: Sales data description
   - certifications: Array of certifications

4. Service & Guarantee:
   - shipping: Shipping policy description
   - returnPolicy: Return policy description
   - faq: Array of FAQs, each with question and answer

5. Cross-sell:
   - recommendations: Array of recommended products (3-5 items)

Ensure content is authentic, attractive, and matches the style of ${
          platform === "amazon"
            ? "Amazon"
            : platform === "taobao"
            ? "Taobao"
            : "JD"
        } platform. Return pure JSON format, do not include markdown code blocks.`;

    // Call Gemini API
    const response = await (api as any).requestGemini(
      model === "nanobanana"
        ? "gemini-2.5-flash"
        : "gemini-3-pro-image-preview",
      [
        {
          parts: [{ text: prompt }],
        },
      ],
      {
        generationConfig: {
          responseMimeType: "application/json",
        },
      }
    );

    // Parse JSON response
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No response from API");
    }

    // Clean JSON string (remove markdown code blocks if any)
    let jsonText = text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    const generatedContent = JSON.parse(jsonText);

    // Helper to normalize any value to string
    const normalizeToString = (value: unknown): string => {
      if (typeof value === 'string') return value;
      if (value && typeof value === 'object') {
        const obj = value as Record<string, unknown>;
        // Try common keys
        if (typeof obj.text === 'string') return obj.text;
        if (typeof obj.name === 'string') return obj.name;
        if (typeof obj.productName === 'string') return obj.productName;
        if (typeof obj.title === 'string') return obj.title;
        if (typeof obj.value === 'string') return obj.value;
        if (typeof obj.content === 'string') return obj.content;
        if (typeof obj.question === 'string' && typeof obj.answer === 'string') {
          return `${obj.question}: ${obj.answer}`;
        }
        // Fallback: stringify
        return JSON.stringify(value);
      }
      return String(value || '');
    };

    // Helper to normalize string arrays
    const normalizeStringArray = (arr: unknown): string[] => {
      if (!Array.isArray(arr)) return [];
      return arr.map(item => normalizeToString(item));
    };

    // Helper to normalize review objects
    const normalizeReviews = (arr: unknown): Array<{ text: string; rating: number }> => {
      if (!Array.isArray(arr)) return [];
      return arr.map(item => {
        if (typeof item === 'string') {
          return { text: item, rating: 5 };
        }
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          return {
            text: normalizeToString(obj.text || obj.content || obj.review || item),
            rating: typeof obj.rating === 'number' ? obj.rating : 5,
          };
        }
        return { text: String(item), rating: 5 };
      });
    };

    // Helper to normalize FAQ objects
    const normalizeFaq = (arr: unknown): Array<{ question: string; answer: string }> => {
      if (!Array.isArray(arr)) return [];
      return arr.map(item => {
        if (typeof item === 'string') {
          return { question: item, answer: '' };
        }
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          return {
            question: normalizeToString(obj.question || obj.q || ''),
            answer: normalizeToString(obj.answer || obj.a || ''),
          };
        }
        return { question: String(item), answer: '' };
      });
    };

    const mockData = getMockDetailPage(product, style, language, brandName);

    // Validate and normalize the response
    return {
      buyBox: {
        title: normalizeToString(generatedContent.buyBox?.title) || mockData.buyBox.title,
        price: normalizeToString(generatedContent.buyBox?.price) || mockData.buyBox.price,
        originalPrice: generatedContent.buyBox?.originalPrice
          ? normalizeToString(generatedContent.buyBox.originalPrice)
          : mockData.buyBox.originalPrice,
        cta: normalizeToString(generatedContent.buyBox?.cta) || mockData.buyBox.cta,
      },
      valueProposition: {
        painPoints: normalizeStringArray(generatedContent.valueProposition?.painPoints).length > 0
          ? normalizeStringArray(generatedContent.valueProposition.painPoints)
          : mockData.valueProposition.painPoints,
        solutions: normalizeStringArray(generatedContent.valueProposition?.solutions).length > 0
          ? normalizeStringArray(generatedContent.valueProposition.solutions)
          : mockData.valueProposition.solutions,
        visualizations: normalizeStringArray(generatedContent.valueProposition?.visualizations).length > 0
          ? normalizeStringArray(generatedContent.valueProposition.visualizations)
          : mockData.valueProposition.visualizations,
      },
      socialProof: {
        reviews: normalizeReviews(generatedContent.socialProof?.reviews).length > 0
          ? normalizeReviews(generatedContent.socialProof.reviews)
          : mockData.socialProof.reviews,
        salesData: normalizeToString(generatedContent.socialProof?.salesData) || mockData.socialProof.salesData,
        certifications: normalizeStringArray(generatedContent.socialProof?.certifications).length > 0
          ? normalizeStringArray(generatedContent.socialProof.certifications)
          : mockData.socialProof.certifications,
      },
      serviceGuarantee: {
        shipping: normalizeToString(generatedContent.serviceGuarantee?.shipping) || mockData.serviceGuarantee.shipping,
        returnPolicy: normalizeToString(generatedContent.serviceGuarantee?.returnPolicy) || mockData.serviceGuarantee.returnPolicy,
        faq: normalizeFaq(generatedContent.serviceGuarantee?.faq).length > 0
          ? normalizeFaq(generatedContent.serviceGuarantee.faq)
          : mockData.serviceGuarantee.faq,
      },
      crossSell: {
        recommendations: normalizeStringArray(generatedContent.crossSell?.recommendations).length > 0
          ? normalizeStringArray(generatedContent.crossSell.recommendations)
          : mockData.crossSell.recommendations,
      },
    };
  } catch (error) {
    console.error("Error generating detail page content:", error);
    console.warn("Falling back to mock data");
    return getMockDetailPage(product, style, language, brandName);
  }
}

/**
 * Get mock detail page content as fallback
 */
function getMockDetailPage(
  product: Product,
  style: Style,
  language: Language,
  brandName?: string
): DetailPageContent {
  const isTraditionalChinese = language === "zh-TW";
  const isSimplifiedChinese = language === "zh-CN";

  // Style names for different languages
  const getStyleName = () => {
    const styleNames: Record<string, { tw: string; cn: string; en: string }> = {
      minimal: { tw: "極簡", cn: "极简", en: "Minimal" },
      cyber: { tw: "賽博", cn: "赛博", en: "Cyber" },
      chinese: { tw: "國潮", cn: "国潮", en: "Chinese Traditional" },
      japanese: { tw: "日系清新", cn: "日系清新", en: "Japanese Fresh" },
      luxury: { tw: "輕奢高端", cn: "轻奢高端", en: "Luxury Premium" },
      natural: { tw: "自然有機", cn: "自然有机", en: "Natural Organic" },
      cute: { tw: "可愛萌系", cn: "可爱萌系", en: "Cute & Adorable" },
      apple: { tw: "Apple 科技風", cn: "Apple 科技风", en: "Apple Tech Style" },
    };
    const s = styleNames[style] || styleNames.minimal;
    if (isTraditionalChinese) return s.tw;
    if (isSimplifiedChinese) return s.cn;
    return s.en;
  };

  return {
    buyBox: {
      title: isTraditionalChinese
        ? `${brandName ? brandName + " " : ""}${product.category} - 高品質${getStyleName()}風格`
        : isSimplifiedChinese
        ? `${brandName ? brandName + " " : ""}${product.category} - 高品质${getStyleName()}风格`
        : `${brandName ? brandName + " " : ""}${product.category} - High Quality ${getStyleName()} Style`,
      price: isTraditionalChinese || isSimplifiedChinese ? "¥299" : "$29.99",
      originalPrice: isTraditionalChinese || isSimplifiedChinese ? "¥399" : "$39.99",
      cta: isTraditionalChinese ? "立即購買" : isSimplifiedChinese ? "立即购买" : "Buy Now",
    },
    valueProposition: {
      painPoints: isTraditionalChinese
        ? ["痛點1", "痛點2", "痛點3"]
        : isSimplifiedChinese
        ? ["痛点1", "痛点2", "痛点3"]
        : ["Pain Point 1", "Pain Point 2", "Pain Point 3"],
      solutions: isTraditionalChinese
        ? ["解決方案1", "解決方案2", "解決方案3"]
        : isSimplifiedChinese
        ? ["解决方案1", "解决方案2", "解决方案3"]
        : ["Solution 1", "Solution 2", "Solution 3"],
      visualizations: isTraditionalChinese
        ? ["視覺化1", "視覺化2", "視覺化3"]
        : isSimplifiedChinese
        ? ["可视化1", "可视化2", "可视化3"]
        : ["Visualization 1", "Visualization 2", "Visualization 3"],
    },
    socialProof: {
      reviews: isTraditionalChinese
        ? [
            { text: "很好用！", rating: 5 },
            { text: "品質不錯", rating: 4 },
            { text: "值得推薦", rating: 5 },
          ]
        : isSimplifiedChinese
        ? [
            { text: "很好用！", rating: 5 },
            { text: "质量不错", rating: 4 },
            { text: "值得推荐", rating: 5 },
          ]
        : [
            { text: "Great product!", rating: 5 },
            { text: "Good quality", rating: 4 },
            { text: "Worth recommending", rating: 5 },
          ],
      salesData: isTraditionalChinese
        ? "月銷1000+"
        : isSimplifiedChinese
        ? "月销1000+"
        : "1000+ sold this month",
      certifications: isTraditionalChinese
        ? ["品質認證", "專利證書"]
        : isSimplifiedChinese
        ? ["质检认证", "专利证书"]
        : ["Quality Certification", "Patent Certificate"],
    },
    serviceGuarantee: {
      shipping: isTraditionalChinese
        ? "全台免運，3-5天送達"
        : isSimplifiedChinese
        ? "全国包邮，3-5天送达"
        : "Free shipping, 3-5 days delivery",
      returnPolicy: isTraditionalChinese
        ? "7天無理由退換貨"
        : isSimplifiedChinese
        ? "7天无理由退换货"
        : "7-day return policy",
      faq: isTraditionalChinese
        ? [
            { question: "如何清洗？", answer: "可用清水清洗" },
            { question: "是否免運？", answer: "是的，全台免運" },
            { question: "保固多久？", answer: "1年保固" },
          ]
        : isSimplifiedChinese
        ? [
            { question: "如何清洗？", answer: "可用清水清洗" },
            { question: "是否包邮？", answer: "是的，全国包邮" },
            { question: "质保多久？", answer: "1年质保" },
          ]
        : [
            { question: "How to clean?", answer: "Can be cleaned with water" },
            { question: "Is shipping free?", answer: "Yes, free shipping nationwide" },
            { question: "Warranty period?", answer: "1 year warranty" },
          ],
    },
    crossSell: {
      recommendations: isTraditionalChinese
        ? ["推薦商品1", "推薦商品2", "推薦商品3"]
        : isSimplifiedChinese
        ? ["推荐商品1", "推荐商品2", "推荐商品3"]
        : ["Recommended Product 1", "Recommended Product 2", "Recommended Product 3"],
    },
  };
}

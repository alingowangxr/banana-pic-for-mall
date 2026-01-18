/**
 * Mock API for development/testing
 * Replace api calls with this when NanoBanana API is not available
 */

import type { ProductAnalysis, Platform, Style, Language } from "@/stores/useAppStore";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data for different languages
const mockData = {
  'zh-TW': {
    categories: ["電子產品", "服裝", "家居用品", "美妝", "食品"],
    suggestions: [
      "建議突出產品的主要功能特點",
      "使用高品質的產品圖片",
      "添加詳細的產品規格說明",
      "包含用戶評價和使用場景",
    ],
    descriptions: [
      "這是一款高品質的產品，採用先進技術製造，具有出色的性能和耐用性。",
      "精心設計的產品，注重細節和用戶體驗，適合日常使用。",
      "專業級產品，滿足高標準要求，是您理想的選擇。",
    ],
    specifications: [
      "材質：優質材料",
      "尺寸：標準規格",
      "重量：輕便設計",
      "顏色：多種可選",
      "包裝：精美包裝",
    ],
    styleNames: {
      minimal: "極簡",
      cyber: "賽博",
      chinese: "國潮",
      japanese: "日系清新",
      luxury: "輕奢高端",
      natural: "自然有機",
      cute: "可愛萌系",
      apple: "Apple 科技風",
    },
    platformNames: {
      amazon: "Amazon",
      taobao: "淘寶",
      jd: "京東",
      shopee: "蝦皮",
    },
    styleSuffix: "風格",
    platformSuffix: "專供",
  },
  'zh-CN': {
    categories: ["电子产品", "服装", "家居用品", "美妆", "食品"],
    suggestions: [
      "建议突出产品的主要功能特点",
      "使用高质量的产品图片",
      "添加详细的产品规格说明",
      "包含用户评价和使用场景",
    ],
    descriptions: [
      "这是一款高品质的产品，采用先进技术制造，具有出色的性能和耐用性。",
      "精心设计的产品，注重细节和用户体验，适合日常使用。",
      "专业级产品，满足高标准要求，是您理想的选择。",
    ],
    specifications: [
      "材质：优质材料",
      "尺寸：标准规格",
      "重量：轻便设计",
      "颜色：多种可选",
      "包装：精美包装",
    ],
    styleNames: {
      minimal: "极简",
      cyber: "赛博",
      chinese: "国潮",
      japanese: "日系清新",
      luxury: "轻奢高端",
      natural: "自然有机",
      cute: "可爱萌系",
      apple: "Apple 科技风",
    },
    platformNames: {
      amazon: "Amazon",
      taobao: "淘宝",
      jd: "京东",
      shopee: "虾皮",
    },
    styleSuffix: "风格",
    platformSuffix: "专供",
  },
  'en': {
    categories: ["Electronics", "Clothing", "Home Goods", "Beauty", "Food"],
    suggestions: [
      "Highlight the main features of the product",
      "Use high-quality product images",
      "Add detailed product specifications",
      "Include user reviews and usage scenarios",
    ],
    descriptions: [
      "This is a high-quality product manufactured with advanced technology, featuring excellent performance and durability.",
      "A carefully designed product with attention to detail and user experience, suitable for daily use.",
      "Professional-grade product that meets high standards, an ideal choice for you.",
    ],
    specifications: [
      "Material: Premium quality",
      "Size: Standard dimensions",
      "Weight: Lightweight design",
      "Color: Multiple options",
      "Packaging: Premium packaging",
    ],
    styleNames: {
      minimal: "Minimal",
      cyber: "Cyber",
      chinese: "Chinese Traditional",
      japanese: "Japanese Fresh",
      luxury: "Luxury Premium",
      natural: "Natural Organic",
      cute: "Cute & Adorable",
      apple: "Apple Tech Style",
    },
    platformNames: {
      amazon: "Amazon",
      taobao: "Taobao",
      jd: "JD",
      shopee: "Shopee",
    },
    styleSuffix: "Style",
    platformSuffix: "Exclusive",
  },
};

export const mockAPI = {
  async analyzeProduct(_file: File, language: Language = 'zh-CN'): Promise<ProductAnalysis> {
    await delay(1500);

    const data = mockData[language] || mockData['zh-CN'];

    return {
      category: data.categories[Math.floor(Math.random() * data.categories.length)],
      suggestions: data.suggestions,
      description: data.descriptions[Math.floor(Math.random() * data.descriptions.length)],
      specifications: data.specifications,
    };
  },

  async generateText(params: {
    product: {
      category: string;
      tags: string[];
      analysis: ProductAnalysis;
    };
    platform: Platform;
    style: Style;
    language?: Language;
  }): Promise<{
    title: string;
    description: string;
    specifications: string[];
  }> {
    await delay(2000);

    const language = params.language || 'zh-CN';
    const data = mockData[language] || mockData['zh-CN'];

    return {
      title: `${params.product.analysis.category} - ${data.styleNames[params.style]}${data.styleSuffix} ${data.platformNames[params.platform]}${data.platformSuffix}`,
      description: `${params.product.analysis.description}\n\n${params.product.analysis.suggestions.join("\n")}`,
      specifications: params.product.analysis.specifications,
    };
  },

  async generateImage(params: {
    prompt: string;
    style: Style;
    platform: Platform;
    type?: "main" | "detail" | "scene";
  }): Promise<string> {
    await delay(3000);

    // Return a placeholder image URL
    // In production, this would be the actual generated image URL
    const width = params.type === "detail" ? 800 : 600;
    const height = params.type === "detail" ? 1200 : 600;
    
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(
      params.prompt.substring(0, 20)
    )}`;
  },

  async editImage(params: {
    image: string;
    prompt?: string;
    imageMimeType?: string;
    mask?: string;
  }): Promise<string> {
    await delay(3000);

    // Return a modified placeholder
    const promptText = params.prompt || 'Edited image';
    return `https://via.placeholder.com/600x600?text=${encodeURIComponent(
      `Edited: ${promptText.substring(0, 15)}`
    )}`;
  },
};

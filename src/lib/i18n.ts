export type Language = 'zh-CN' | 'zh-TW' | 'en';

export interface Translations {
  // Common
  common: {
    save: string;
    cancel: string;
    back: string;
    next: string;
    confirm: string;
    loading: string;
    error: string;
    success: string;
  };

  // Upload Page
  upload: {
    title: string;
    description: string;
    dragDrop: string;
    clickUpload: string;
    fileFormat: string;
    analyzing: string;
    uploadError: string;
  };

  // Config Page
  config: {
    title: string;
    description: string;
    platform: string;
    platformDesc: string;
    style: string;
    styleDesc: string;
    model: string;
    modelDesc: string;
    language: string;
    languageDesc: string;
    brand: string;
    brandDesc: string;
    brandPlaceholder: string;
    extraInfo: string;
    extraInfoDesc: string;
    extraInfoPlaceholder: string;
    productAnalysis: string;
    category: string;
    suggestions: string;
    startGenerate: string;
    imageCount: string;
    imageCountDesc: string;
    mainImageCount: string;
    mainImageCountDesc: string;
    detailImageCount: string;
    detailImageCountDesc: string;
  };

  // Generating Page
  generating: {
    title: string;
    initializing: string;
    generatingText: string;
    generatingImages: string;
    generatingDetail: string;
    generatingDetailImages: string;
    complete: string;
    cancel: string;
  };

  // Editor Page
  editor: {
    title: string;
    export: string;
    mainImages: string;
    detailPage: string;
    detailPageDesc: string;
    specifications: string;
    textEdit: string;
    imageEdit: string;
    productTitle: string;
    productDescription: string;
    productSpecs: string;
    imageRedraw: string;
    imageRedrawDesc: string;
    prompt: string;
    regenerate: string;
    regenerating: string;
    clickToEdit: string;
    buyBox: string;
    valueProposition: string;
    socialProof: string;
    serviceGuarantee: string;
    crossSell: string;
    painPoints: string;
    solutions: string;
    reviews: string;
    shipping: string;
    returnPolicy: string;
    faq: string;
    recommendations: string;
    detailImages: string;
    exportFailed: string;
  };

  // Settings Page
  settings: {
    title: string;
    description: string;
    apiConfig: string;
    apiConfigDesc: string;
    apiProvider: string;
    apiProviderDesc: string;
    apiKey: string;
    baseURL: string;
    baseURLDesc: string;
    preferences: string;
    preferencesDesc: string;
    defaultPlatform: string;
    defaultStyle: string;
    uiLanguage: string;
    uiLanguageDesc: string;
    theme: string;
    themeDesc: string;
    light: string;
    dark: string;
    system: string;
    saveSettings: string;
    saving: string;
    reset: string;
    saved: string;
    saveFailed: string;
  };

  // Platforms
  platforms: {
    amazon: string;
    amazonDesc: string;
    taobao: string;
    taobaoDesc: string;
    jd: string;
    jdDesc: string;
    shopee: string;
    shopeeDesc: string;
  };

  // Styles
  styles: {
    minimal: string;
    minimalDesc: string;
    cyber: string;
    cyberDesc: string;
    chinese: string;
    chineseDesc: string;
  };

  // Models
  models: {
    nanobanana: string;
    nanobananaDesc: string;
    nanabanana: string;
    nanabananaDesc: string;
  };

  // API Providers
  providers: {
    google: string;
    googleDesc: string;
    zeabur: string;
    zeaburDesc: string;
  };

  // Languages
  languages: {
    'zh-CN': string;
    'zh-TW': string;
    en: string;
  };
}

const translations: Record<Language, Translations> = {
  // 简体中文
  'zh-CN': {
    common: {
      save: '保存',
      cancel: '取消',
      back: '返回',
      next: '下一步',
      confirm: '确认',
      loading: '加载中...',
      error: '错误',
      success: '成功',
    },
    upload: {
      title: '上传产品图片',
      description: '上传一张产品白底图，AI 将自动分析产品信息',
      dragDrop: '拖拽图片到这里，或点击上传',
      clickUpload: '选择文件',
      fileFormat: '支持 JPG、PNG 格式，建议使用白底图',
      analyzing: '正在分析产品...',
      uploadError: '请上传图片文件',
    },
    config: {
      title: '选择配置',
      description: '选择目标平台和详情页风格',
      platform: '目标平台',
      platformDesc: '选择产品要上架的平台',
      style: '详情页风格',
      styleDesc: '选择你喜欢的详情页风格模板',
      model: 'AI 模型',
      modelDesc: '选择使用的图片生成模型',
      language: '语言',
      languageDesc: '选择生成内容的语言',
      brand: '品牌名称（可选）',
      brandDesc: '如果有自己的品牌，可以在这里填写，AI 会在文案和部分图片中适当加入品牌信息',
      brandPlaceholder: '例如：灵矩绘境 / MatrixInspire',
      extraInfo: '产品补充信息 / 规格说明',
      extraInfoDesc: '可填写材质、适用人群、使用场景、卖点补充等信息，AI 会在文案和图片风格中参考这些内容',
      extraInfoPlaceholder: '例如：食品级硅胶；适合婴幼儿使用；适合夏季户外露营；主打轻便和高颜值设计',
      productAnalysis: '产品分析结果',
      category: '产品类别',
      suggestions: '上架建议',
      startGenerate: '开始生成',
      imageCount: '图片数量设置',
      imageCountDesc: '设置生成的主图和详情页图片数量',
      mainImageCount: '主图数量',
      mainImageCountDesc: '生成的主图数量（1-10张）',
      detailImageCount: '详情页图片数量',
      detailImageCountDesc: '生成的详情页图片数量（1-5张）',
    },
    generating: {
      title: '正在生成详情页',
      initializing: '正在初始化...',
      generatingText: '正在生成商品文案...',
      generatingImages: '正在生成主图（基于上传图片）...',
      generatingDetail: '正在生成详情页内容...',
      generatingDetailImages: '正在生成详情页图片（3:4比例）...',
      complete: '生成完成！',
      cancel: '取消生成',
    },
    editor: {
      title: '编辑详情页',
      export: '导出',
      mainImages: '主图',
      detailPage: '详情页 - 5大核心模块',
      detailPageDesc: '3:4比例，移动端优化',
      specifications: '商品规格',
      textEdit: '文本编辑',
      imageEdit: '图片编辑',
      productTitle: '商品标题',
      productDescription: '商品描述',
      productSpecs: '商品规格',
      imageRedraw: '图片重绘',
      imageRedrawDesc: '通过提示词调整图片效果',
      prompt: '提示词',
      regenerate: '重新生成',
      regenerating: '生成中...',
      clickToEdit: '点击预览区域的图片开始编辑',
      exportFailed: '导出失败，请重试',
      buyBox: '1. 首屏决策区',
      valueProposition: '2. 卖点展示区',
      socialProof: '3. 信任背书区',
      serviceGuarantee: '4. 服务保障区',
      crossSell: '5. 关联推荐区',
      painPoints: '痛点：',
      solutions: '解决方案：',
      reviews: '用户评价：',
      shipping: '物流：',
      returnPolicy: '退换货：',
      faq: '常见问题：',
      recommendations: '推荐商品',
      detailImages: '详情页图片（3:4比例）',
    },
    settings: {
      title: '设置',
      description: '配置 API 和偏好设置',
      apiConfig: 'API 配置',
      apiConfigDesc: '配置 Gemini API 供应商和密钥',
      apiProvider: 'API 供应商',
      apiProviderDesc: '选择 API 服务供应商',
      apiKey: 'API Key',
      baseURL: 'Base URL（可选）',
      baseURLDesc: '自定义 API 地址，留空使用默认地址',
      preferences: '偏好设置',
      preferencesDesc: '设置默认平台和风格',
      defaultPlatform: '默认平台',
      defaultStyle: '默认风格',
      uiLanguage: '介面语言',
      uiLanguageDesc: '选择应用介面显示语言',
      theme: '主题',
      themeDesc: '选择应用主题',
      light: '浅色',
      dark: '深色',
      system: '跟随系统',
      saveSettings: '保存设置',
      saving: '保存中...',
      reset: '重置',
      saved: '设置已保存',
      saveFailed: '保存失败，请重试',
    },
    platforms: {
      amazon: 'Amazon',
      amazonDesc: '适合跨境电商，注重产品细节',
      taobao: '淘宝',
      taobaoDesc: '适合国内电商，注重营销文案',
      jd: '京东',
      jdDesc: '适合高端产品，注重品质展示',
      shopee: '虾皮购物',
      shopeeDesc: '适合东南亚及台湾市场，行动端优先',
    },
    styles: {
      minimal: '极简风格',
      minimalDesc: '简洁现代，突出产品本身',
      cyber: '赛博风格',
      cyberDesc: '科技感强，适合电子产品',
      chinese: '国潮风格',
      chineseDesc: '传统与现代结合，适合国货',
    },
    models: {
      nanobanana: 'NanoBanana',
      nanobananaDesc: 'Gemini 2.5 Flash Image - 快速生成',
      nanabanana: 'NanaBanana',
      nanabananaDesc: 'Gemini 3 Pro Image - 高质量生成',
    },
    providers: {
      google: 'Google 直连',
      googleDesc: '直接调用 Google Gemini API',
      zeabur: 'Zeabur AI Hub',
      zeaburDesc: '通过 Zeabur 代理调用，适合网络受限地区',
    },
    languages: {
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      en: 'English',
    },
  },

  // 繁體中文
  'zh-TW': {
    common: {
      save: '儲存',
      cancel: '取消',
      back: '返回',
      next: '下一步',
      confirm: '確認',
      loading: '載入中...',
      error: '錯誤',
      success: '成功',
    },
    upload: {
      title: '上傳產品圖片',
      description: '上傳一張產品白底圖，AI 將自動分析產品資訊',
      dragDrop: '拖曳圖片到這裡，或點擊上傳',
      clickUpload: '選擇檔案',
      fileFormat: '支援 JPG、PNG 格式，建議使用白底圖',
      analyzing: '正在分析產品...',
      uploadError: '請上傳圖片檔案',
    },
    config: {
      title: '選擇配置',
      description: '選擇目標平台和詳情頁風格',
      platform: '目標平台',
      platformDesc: '選擇產品要上架的平台',
      style: '詳情頁風格',
      styleDesc: '選擇你喜歡的詳情頁風格模板',
      model: 'AI 模型',
      modelDesc: '選擇使用的圖片生成模型',
      language: '語言',
      languageDesc: '選擇生成內容的語言',
      brand: '品牌名稱（可選）',
      brandDesc: '如果有自己的品牌，可以在這裡填寫，AI 會在文案和部分圖片中適當加入品牌資訊',
      brandPlaceholder: '例如：靈矩繪境 / MatrixInspire',
      extraInfo: '產品補充資訊 / 規格說明',
      extraInfoDesc: '可填寫材質、適用人群、使用場景、賣點補充等資訊，AI 會在文案和圖片風格中參考這些內容',
      extraInfoPlaceholder: '例如：食品級矽膠；適合嬰幼兒使用；適合夏季戶外露營；主打輕便和高顏值設計',
      productAnalysis: '產品分析結果',
      category: '產品類別',
      suggestions: '上架建議',
      startGenerate: '開始生成',
      imageCount: '圖片數量設定',
      imageCountDesc: '設定生成的主圖和詳情頁圖片數量',
      mainImageCount: '主圖數量',
      mainImageCountDesc: '生成的主圖數量（1-10張）',
      detailImageCount: '詳情頁圖片數量',
      detailImageCountDesc: '生成的詳情頁圖片數量（1-5張）',
    },
    generating: {
      title: '正在生成詳情頁',
      initializing: '正在初始化...',
      generatingText: '正在生成商品文案...',
      generatingImages: '正在生成主圖（基於上傳圖片）...',
      generatingDetail: '正在生成詳情頁內容...',
      generatingDetailImages: '正在生成詳情頁圖片（3:4比例）...',
      complete: '生成完成！',
      cancel: '取消生成',
    },
    editor: {
      title: '編輯詳情頁',
      export: '匯出',
      mainImages: '主圖',
      detailPage: '詳情頁 - 5大核心模組',
      detailPageDesc: '3:4比例，行動端優化',
      specifications: '商品規格',
      textEdit: '文字編輯',
      imageEdit: '圖片編輯',
      productTitle: '商品標題',
      productDescription: '商品描述',
      productSpecs: '商品規格',
      imageRedraw: '圖片重繪',
      imageRedrawDesc: '透過提示詞調整圖片效果',
      prompt: '提示詞',
      regenerate: '重新生成',
      regenerating: '生成中...',
      clickToEdit: '點擊預覽區域的圖片開始編輯',
      exportFailed: '匯出失敗，請重試',
      buyBox: '1. 首屏決策區',
      valueProposition: '2. 賣點展示區',
      socialProof: '3. 信任背書區',
      serviceGuarantee: '4. 服務保障區',
      crossSell: '5. 關聯推薦區',
      painPoints: '痛點：',
      solutions: '解決方案：',
      reviews: '用戶評價：',
      shipping: '物流：',
      returnPolicy: '退換貨：',
      faq: '常見問題：',
      recommendations: '推薦商品',
      detailImages: '詳情頁圖片（3:4比例）',
    },
    settings: {
      title: '設定',
      description: '配置 API 和偏好設定',
      apiConfig: 'API 配置',
      apiConfigDesc: '配置 Gemini API 供應商和金鑰',
      apiProvider: 'API 供應商',
      apiProviderDesc: '選擇 API 服務供應商',
      apiKey: 'API Key',
      baseURL: 'Base URL（可選）',
      baseURLDesc: '自訂 API 位址，留空使用預設位址',
      preferences: '偏好設定',
      preferencesDesc: '設定預設平台和風格',
      defaultPlatform: '預設平台',
      defaultStyle: '預設風格',
      uiLanguage: '介面語言',
      uiLanguageDesc: '選擇應用程式介面顯示語言',
      theme: '主題',
      themeDesc: '選擇應用程式主題',
      light: '淺色',
      dark: '深色',
      system: '跟隨系統',
      saveSettings: '儲存設定',
      saving: '儲存中...',
      reset: '重設',
      saved: '設定已儲存',
      saveFailed: '儲存失敗，請重試',
    },
    platforms: {
      amazon: 'Amazon',
      amazonDesc: '適合跨境電商，注重產品細節',
      taobao: '淘寶',
      taobaoDesc: '適合國內電商，注重行銷文案',
      jd: '京東',
      jdDesc: '適合高端產品，注重品質展示',
      shopee: '蝦皮購物',
      shopeeDesc: '適合東南亞及台灣市場，行動端優先',
    },
    styles: {
      minimal: '極簡風格',
      minimalDesc: '簡潔現代，突出產品本身',
      cyber: '賽博風格',
      cyberDesc: '科技感強，適合電子產品',
      chinese: '國潮風格',
      chineseDesc: '傳統與現代結合，適合國貨',
    },
    models: {
      nanobanana: 'NanoBanana',
      nanobananaDesc: 'Gemini 2.5 Flash Image - 快速生成',
      nanabanana: 'NanaBanana',
      nanabananaDesc: 'Gemini 3 Pro Image - 高品質生成',
    },
    providers: {
      google: 'Google 直連',
      googleDesc: '直接呼叫 Google Gemini API',
      zeabur: 'Zeabur AI Hub',
      zeaburDesc: '透過 Zeabur 代理呼叫，適合網路受限地區',
    },
    languages: {
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      en: 'English',
    },
  },

  // English
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    upload: {
      title: 'Upload Product Image',
      description: 'Upload a white background product image, AI will automatically analyze product information',
      dragDrop: 'Drag and drop image here, or click to upload',
      clickUpload: 'Select File',
      fileFormat: 'Supports JPG, PNG format, white background recommended',
      analyzing: 'Analyzing product...',
      uploadError: 'Please upload an image file',
    },
    config: {
      title: 'Select Configuration',
      description: 'Select target platform and detail page style',
      platform: 'Target Platform',
      platformDesc: 'Select the platform for your product',
      style: 'Detail Page Style',
      styleDesc: 'Select your preferred detail page style template',
      model: 'AI Model',
      modelDesc: 'Select the image generation model to use',
      language: 'Language',
      languageDesc: 'Select the language for generated content',
      brand: 'Brand Name (Optional)',
      brandDesc: 'If you have your own brand, fill it here and AI will insert it into copy and some images when appropriate',
      brandPlaceholder: 'e.g. MatrixInspire',
      extraInfo: 'Additional Product Info / Specs',
      extraInfoDesc: 'You can add material, target audience, usage scenarios, extra selling points, etc. AI will reference this when generating copy and image styles',
      extraInfoPlaceholder: 'e.g. Food-grade silicone; suitable for babies; ideal for summer outdoor camping; focuses on lightweight and stylish design',
      productAnalysis: 'Product Analysis Result',
      category: 'Product Category',
      suggestions: 'Listing Suggestions',
      startGenerate: 'Start Generation',
      imageCount: 'Image Count Settings',
      imageCountDesc: 'Set the number of main images and detail page images to generate',
      mainImageCount: 'Main Image Count',
      mainImageCountDesc: 'Number of main images to generate (1-10)',
      detailImageCount: 'Detail Image Count',
      detailImageCountDesc: 'Number of detail page images to generate (1-5)',
    },
    generating: {
      title: 'Generating Detail Page',
      initializing: 'Initializing...',
      generatingText: 'Generating product copy...',
      generatingImages: 'Generating main images (based on uploaded image)...',
      generatingDetail: 'Generating detail page content...',
      generatingDetailImages: 'Generating detail page images (3:4 ratio)...',
      complete: 'Generation complete!',
      cancel: 'Cancel Generation',
    },
    editor: {
      title: 'Edit Detail Page',
      export: 'Export',
      mainImages: 'Main Images',
      detailPage: 'Detail Page - 5 Core Modules',
      detailPageDesc: '3:4 ratio, mobile optimized',
      specifications: 'Product Specifications',
      textEdit: 'Text Edit',
      imageEdit: 'Image Edit',
      productTitle: 'Product Title',
      productDescription: 'Product Description',
      productSpecs: 'Product Specifications',
      imageRedraw: 'Image Redraw',
      imageRedrawDesc: 'Adjust image effect through prompts',
      prompt: 'Prompt',
      regenerate: 'Regenerate',
      regenerating: 'Generating...',
      clickToEdit: 'Click on images in preview area to start editing',
      exportFailed: 'Export failed, please try again',
      buyBox: '1. Buy Box',
      valueProposition: '2. Value Proposition',
      socialProof: '3. Social Proof',
      serviceGuarantee: '4. Service & Guarantee',
      crossSell: '5. Cross-sell',
      painPoints: 'Pain Points:',
      solutions: 'Solutions:',
      reviews: 'Reviews:',
      shipping: 'Shipping:',
      returnPolicy: 'Return Policy:',
      faq: 'FAQ:',
      recommendations: 'Recommendations',
      detailImages: 'Detail Page Images (3:4 Ratio)',
    },
    settings: {
      title: 'Settings',
      description: 'Configure API and preferences',
      apiConfig: 'API Configuration',
      apiConfigDesc: 'Configure Gemini API provider and key',
      apiProvider: 'API Provider',
      apiProviderDesc: 'Select the API service provider',
      apiKey: 'API Key',
      baseURL: 'Base URL (Optional)',
      baseURLDesc: 'Custom API address, leave empty to use default',
      preferences: 'Preferences',
      preferencesDesc: 'Set default platform and style',
      defaultPlatform: 'Default Platform',
      defaultStyle: 'Default Style',
      uiLanguage: 'UI Language',
      uiLanguageDesc: 'Select application interface language',
      theme: 'Theme',
      themeDesc: 'Select application theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      saveSettings: 'Save Settings',
      saving: 'Saving...',
      reset: 'Reset',
      saved: 'Settings saved',
      saveFailed: 'Save failed, please try again',
    },
    platforms: {
      amazon: 'Amazon',
      amazonDesc: 'Suitable for cross-border e-commerce, focus on product details',
      taobao: 'Taobao',
      taobaoDesc: 'Suitable for domestic e-commerce, focus on marketing copy',
      jd: 'JD',
      jdDesc: 'Suitable for high-end products, focus on quality display',
      shopee: 'Shopee',
      shopeeDesc: 'Suitable for Southeast Asia and Taiwan, mobile-first',
    },
    styles: {
      minimal: 'Minimal Style',
      minimalDesc: 'Simple and modern, highlight the product itself',
      cyber: 'Cyber Style',
      cyberDesc: 'Strong tech feel, suitable for electronic products',
      chinese: 'Chinese Traditional Style',
      chineseDesc: 'Combination of traditional and modern, suitable for Chinese products',
    },
    models: {
      nanobanana: 'NanoBanana',
      nanobananaDesc: 'Gemini 2.5 Flash Image - Fast generation',
      nanabanana: 'NanaBanana',
      nanabananaDesc: 'Gemini 3 Pro Image - High quality generation',
    },
    providers: {
      google: 'Google Direct',
      googleDesc: 'Direct call to Google Gemini API',
      zeabur: 'Zeabur AI Hub',
      zeaburDesc: 'Call via Zeabur proxy, suitable for restricted regions',
    },
    languages: {
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      en: 'English',
    },
  },
};

let currentLanguage: Language = 'zh-TW';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  // Update document language attribute
  document.documentElement.lang = lang;
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function t(): Translations {
  return translations[currentLanguage];
}

// Helper function for easy access
export const useTranslation = () => {
  return t();
};

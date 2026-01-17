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
    exporting: string;
    mobile: string;
    desktop: string;
    mainImages: string;
    detailPage: string;
    detailPageDesc: string;
    specifications: string;
    textEdit: string;
    imageEdit: string;
    productTitle: string;
    productTitlePlaceholder: string;
    productDescription: string;
    productDescriptionPlaceholder: string;
    productSpecs: string;
    spec: string;
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
    // Preview labels
    imageLoadFailed: string;
    retry: string;
    buyNow: string;
    productSellingPoints: string;
    painPointsTitle: string;
    solutionsTitle: string;
    userReviews: string;
    shippingLabel: string;
    returnPolicyLabel: string;
    faqTitle: string;
    relatedRecommendations: string;
    mainImageAlt: string;
    detailImageAlt: string;
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
    footerBranding: string;
    footerBrandingDesc: string;
    footerBrandName: string;
    footerBrandNameEn: string;
    footerSlogan: string;
    footerCode: string;
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

  // Templates
  templates: {
    title: string;
    description: string;
    empty: string;
    emptyDesc: string;
    create: string;
    createTitle: string;
    createDesc: string;
    name: string;
    namePlaceholder: string;
    templateDescription: string;
    templateDescriptionPlaceholder: string;
    apply: string;
    edit: string;
    delete: string;
    deleteConfirm: string;
    favorite: string;
    unfavorite: string;
    applied: string;
    saved: string;
    deleted: string;
    saveAsTemplate: string;
    loadFromTemplate: string;
    usageCount: string;
    createdAt: string;
    updatedAt: string;
  };

  // History Page
  history: {
    title: string;
    empty: string;
    startCreate: string;
    platform: string;
    style: string;
    images: string;
    viewDetails: string;
  };
}

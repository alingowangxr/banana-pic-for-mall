import { zhCN } from './locales/zh-CN';
import { zhTW } from './locales/zh-TW';
import { en } from './locales/en';
import type { Language, Translations } from './locales/types';

// Re-export types for convenience
export type { Language, Translations } from './locales/types';

// All translations
const translations: Record<Language, Translations> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
};

let currentLanguage: Language = 'zh-TW';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  // Update document language attribute
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
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

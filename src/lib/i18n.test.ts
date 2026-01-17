import { describe, it, expect, beforeEach } from "vitest";
import { setLanguage, getLanguage, useTranslation } from "./i18n";

describe("i18n", () => {
  beforeEach(() => {
    setLanguage("zh-TW");
  });

  describe("setLanguage", () => {
    it("should set language to zh-CN", () => {
      setLanguage("zh-CN");
      expect(getLanguage()).toBe("zh-CN");
    });

    it("should set language to zh-TW", () => {
      setLanguage("zh-TW");
      expect(getLanguage()).toBe("zh-TW");
    });

    it("should set language to en", () => {
      setLanguage("en");
      expect(getLanguage()).toBe("en");
    });
  });

  describe("useTranslation", () => {
    it("should return zh-TW translations by default", () => {
      setLanguage("zh-TW");
      const t = useTranslation();
      expect(t.common.back).toBe("返回");
      expect(t.settings.title).toBe("設定");
    });

    it("should return zh-CN translations", () => {
      setLanguage("zh-CN");
      const t = useTranslation();
      expect(t.common.back).toBe("返回");
      expect(t.settings.title).toBe("设置");
    });

    it("should return English translations", () => {
      setLanguage("en");
      const t = useTranslation();
      expect(t.common.back).toBe("Back");
      expect(t.settings.title).toBe("Settings");
    });
  });

  describe("platform translations", () => {
    it("should have Shopee translation in zh-TW", () => {
      setLanguage("zh-TW");
      const t = useTranslation();
      expect(t.platforms.shopee).toBe("蝦皮購物");
    });

    it("should have Shopee translation in zh-CN", () => {
      setLanguage("zh-CN");
      const t = useTranslation();
      expect(t.platforms.shopee).toBe("虾皮购物");
    });

    it("should have Shopee translation in English", () => {
      setLanguage("en");
      const t = useTranslation();
      expect(t.platforms.shopee).toBe("Shopee");
    });
  });

  describe("style translations", () => {
    it("should have all style translations", () => {
      const t = useTranslation();
      expect(t.styles.minimal).toBeDefined();
      expect(t.styles.cyber).toBeDefined();
      expect(t.styles.chinese).toBeDefined();
    });
  });
});

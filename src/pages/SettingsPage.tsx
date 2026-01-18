import { useState } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Save, ArrowLeft } from "lucide-react";
import { Platform, Style, ApiProvider, Language } from "@/stores/useAppStore";
import { useTranslation, setLanguage } from "@/lib/i18n";
import { toast } from "sonner";

export function SettingsPage() {
  const { settings, updateSettings, setCurrentStep } = useAppStore();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const t = useTranslation();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(formData);
      toast.success(t.settings.saved);
    } catch (err) {
      console.error("Save error:", err);
      toast.error(t.settings.saveFailed);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle provider change - clear baseURL to use default
  const handleProviderChange = (provider: ApiProvider) => {
    setFormData({
      ...formData,
      apiProvider: provider,
      baseURL: "", // Clear baseURL to use default for the provider
    });
  };

  return (
    <div className="h-full bg-background p-8 overflow-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep("upload")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.common.back}
          </Button>
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <Settings className="h-6 w-6" />
              {t.settings.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.settings.description}
            </p>
          </div>
        </div>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.apiConfig}</CardTitle>
            <CardDescription>
              {t.settings.apiConfigDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiProvider">{t.settings.apiProvider}</Label>
              <Select
                value={formData.apiProvider || "google"}
                onValueChange={(value) => handleProviderChange(value as ApiProvider)}
              >
                <SelectTrigger id="apiProvider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">
                    <div className="flex flex-col items-start">
                      <span>{t.providers.google}</span>
                      <span className="text-xs text-muted-foreground">{t.providers.googleDesc}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="zeabur">
                    <div className="flex flex-col items-start">
                      <span>{t.providers.zeabur}</span>
                      <span className="text-xs text-muted-foreground">{t.providers.zeaburDesc}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {t.settings.apiProviderDesc}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">{t.settings.apiKey}</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) =>
                  setFormData({ ...formData, apiKey: e.target.value })
                }
                placeholder={formData.apiProvider === "zeabur" ? "sk-xxxxxxxxxxxxxxxx" : "AIza..."}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseURL">{t.settings.baseURL}</Label>
              <Input
                id="baseURL"
                value={formData.baseURL}
                onChange={(e) =>
                  setFormData({ ...formData, baseURL: e.target.value })
                }
                placeholder={
                  formData.apiProvider === "zeabur"
                    ? "https://hnd1.aihub.zeabur.ai/gemini"
                    : "https://generativelanguage.googleapis.com"
                }
              />
              <p className="text-xs text-muted-foreground">
                {t.settings.baseURLDesc}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.preferences}</CardTitle>
            <CardDescription>
              {t.settings.preferencesDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultPlatform">{t.settings.defaultPlatform}</Label>
              <Select
                value={formData.defaultPlatform}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    defaultPlatform: value as Platform,
                  })
                }
              >
                <SelectTrigger id="defaultPlatform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amazon">{t.platforms.amazon}</SelectItem>
                  <SelectItem value="taobao">{t.platforms.taobao}</SelectItem>
                  <SelectItem value="jd">{t.platforms.jd}</SelectItem>
                  <SelectItem value="shopee">{t.platforms.shopee}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultStyle">{t.settings.defaultStyle}</Label>
              <Select
                value={formData.defaultStyle}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    defaultStyle: value as Style,
                  })
                }
              >
                <SelectTrigger id="defaultStyle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">{t.styles.minimal}</SelectItem>
                  <SelectItem value="cyber">{t.styles.cyber}</SelectItem>
                  <SelectItem value="chinese">{t.styles.chinese}</SelectItem>
                  <SelectItem value="japanese">{t.styles.japanese}</SelectItem>
                  <SelectItem value="luxury">{t.styles.luxury}</SelectItem>
                  <SelectItem value="natural">{t.styles.natural}</SelectItem>
                  <SelectItem value="cute">{t.styles.cute}</SelectItem>
                  <SelectItem value="apple">{t.styles.apple}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="uiLanguage">{t.settings.uiLanguage}</Label>
              <Select
                value={formData.uiLanguage || "zh-TW"}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    uiLanguage: value as Language,
                  });
                  setLanguage(value as Language);
                }}
              >
                <SelectTrigger id="uiLanguage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh-CN">{t.languages["zh-CN"]}</SelectItem>
                  <SelectItem value="zh-TW">{t.languages["zh-TW"]}</SelectItem>
                  <SelectItem value="en">{t.languages.en}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {t.settings.uiLanguageDesc}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Branding */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.footerBranding}</CardTitle>
            <CardDescription>
              {t.settings.footerBrandingDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="footerBrandName">{t.settings.footerBrandName}</Label>
                <Input
                  id="footerBrandName"
                  value={formData.footerBrandName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, footerBrandName: e.target.value })
                  }
                  placeholder="灵矩绘境"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="footerBrandNameEn">{t.settings.footerBrandNameEn}</Label>
                <Input
                  id="footerBrandNameEn"
                  value={formData.footerBrandNameEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, footerBrandNameEn: e.target.value })
                  }
                  placeholder="MatrixInspire"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="footerSlogan">{t.settings.footerSlogan}</Label>
              <Input
                id="footerSlogan"
                value={formData.footerSlogan || ""}
                onChange={(e) =>
                  setFormData({ ...formData, footerSlogan: e.target.value })
                }
                placeholder="让灵感落地，让回忆有形"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="footerCode">{t.settings.footerCode}</Label>
              <Input
                id="footerCode"
                value={formData.footerCode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, footerCode: e.target.value })
                }
                placeholder="mxinspire"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setFormData(settings)}>
            {t.settings.reset}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? t.settings.saving : t.settings.saveSettings}
          </Button>
        </div>
      </div>
    </div>
  );
}

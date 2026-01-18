import { useState, useEffect } from "react";
import {
  useAppStore,
  Template,
  Platform,
  Style,
  Model,
  Language,
} from "@/stores/useAppStore";
import { useTranslation } from "@/lib/i18n";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTemplate?: Template | null;
}

export function CreateTemplateDialog({
  open,
  onOpenChange,
  editingTemplate,
}: CreateTemplateDialogProps) {
  const { settings, addTemplate, updateTemplate } = useAppStore();
  const t = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>(settings.defaultPlatform);
  const [style, setStyle] = useState<Style>(settings.defaultStyle);
  const [model, setModel] = useState<Model>(settings.selectedModel);
  const [language, setLanguage] = useState<Language>(settings.selectedLanguage);
  const [brandName, setBrandName] = useState(settings.brandName);
  const [mainImageCount, setMainImageCount] = useState(settings.mainImageCount);
  const [detailImageCount, setDetailImageCount] = useState(settings.detailImageCount);
  const [extraInfo, setExtraInfo] = useState(settings.extraInfo);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      if (editingTemplate) {
        // Editing existing template
        setName(editingTemplate.name);
        setDescription(editingTemplate.description || "");
        setPlatform(editingTemplate.platform);
        setStyle(editingTemplate.style);
        setModel(editingTemplate.model);
        setLanguage(editingTemplate.language);
        setBrandName(editingTemplate.brandName || "");
        setMainImageCount(editingTemplate.mainImageCount || 5);
        setDetailImageCount(editingTemplate.detailImageCount || 2);
        setExtraInfo(editingTemplate.extraInfo || "");
      } else {
        // Creating new template - use current settings
        setName("");
        setDescription("");
        setPlatform(settings.defaultPlatform);
        setStyle(settings.defaultStyle);
        setModel(settings.selectedModel);
        setLanguage(settings.selectedLanguage);
        setBrandName(settings.brandName);
        setMainImageCount(settings.mainImageCount);
        setDetailImageCount(settings.detailImageCount);
        setExtraInfo(settings.extraInfo);
      }
    }
  }, [open, editingTemplate, settings]);

  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }

    const templateData = {
      name: name.trim(),
      description: description.trim() || undefined,
      platform,
      style,
      model,
      language,
      brandName: brandName.trim() || undefined,
      mainImageCount,
      detailImageCount,
      extraInfo: extraInfo.trim() || undefined,
    };

    if (editingTemplate) {
      await updateTemplate(editingTemplate.id, templateData);
    } else {
      await addTemplate(templateData);
    }

    toast.success(t.templates.saved);
    onOpenChange(false);
  };

  const PLATFORMS: { value: Platform; label: string }[] = [
    { value: "amazon", label: t.platforms.amazon },
    { value: "taobao", label: t.platforms.taobao },
    { value: "jd", label: t.platforms.jd },
    { value: "shopee", label: t.platforms.shopee },
  ];

  const STYLES: { value: Style; label: string }[] = [
    { value: "minimal", label: t.styles.minimal },
    { value: "cyber", label: t.styles.cyber },
    { value: "chinese", label: t.styles.chinese },
    { value: "japanese", label: t.styles.japanese },
    { value: "luxury", label: t.styles.luxury },
    { value: "natural", label: t.styles.natural },
    { value: "cute", label: t.styles.cute },
    { value: "apple", label: t.styles.apple },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingTemplate ? t.templates.edit : t.templates.createTitle}
          </DialogTitle>
          <DialogDescription>{t.templates.createDesc}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Template Name */}
          <div className="space-y-2">
            <Label htmlFor="template-name">{t.templates.name} *</Label>
            <Input
              id="template-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.templates.namePlaceholder}
              maxLength={50}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="template-description">
              {t.templates.templateDescription}
            </Label>
            <Input
              id="template-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.templates.templateDescriptionPlaceholder}
              maxLength={100}
            />
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <Label>{t.config.platform}</Label>
            <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Style */}
          <div className="space-y-2">
            <Label>{t.config.style}</Label>
            <Select value={style} onValueChange={(v) => setStyle(v as Style)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STYLES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model */}
          <div className="space-y-2">
            <Label>{t.config.model}</Label>
            <Select value={model} onValueChange={(v) => setModel(v as Model)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nanobanana">{t.models.nanobanana}</SelectItem>
                <SelectItem value="nanabanana">{t.models.nanabanana}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label>{t.config.language}</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh-CN">{t.languages["zh-CN"]}</SelectItem>
                <SelectItem value="zh-TW">{t.languages["zh-TW"]}</SelectItem>
                <SelectItem value="en">{t.languages.en}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Brand Name */}
          <div className="space-y-2">
            <Label>{t.config.brand}</Label>
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder={t.config.brandPlaceholder}
              maxLength={50}
            />
          </div>

          {/* Image Counts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.config.mainImageCount}</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={mainImageCount}
                onChange={(e) =>
                  setMainImageCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 5)))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{t.config.detailImageCount}</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={detailImageCount}
                onChange={(e) =>
                  setDetailImageCount(Math.max(1, Math.min(5, parseInt(e.target.value) || 2)))
                }
              />
            </div>
          </div>

          {/* Extra Info */}
          <div className="space-y-2">
            <Label>{t.config.extraInfo}</Label>
            <textarea
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder={t.config.extraInfoPlaceholder}
              maxLength={400}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.common.cancel}
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {t.common.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

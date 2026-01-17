import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { useTranslation } from "@/lib/i18n";
import { api } from "@/lib/api";
import { exportContent } from "@/lib/export";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditorHeader,
  TextEditPanel,
  ImageEditPanel,
  MobilePreview,
  DesktopPreview,
} from "@/components/editor";

const isTauri = () =>
  typeof window !== "undefined" && "__TAURI_IPC__" in window;

export function EditorPage() {
  const { generatedContent, setGeneratedContent, setCurrentStep, settings } =
    useAppStore();
  const t = useTranslation();
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(
    new Set()
  );
  const [imageLoadStates, setImageLoadStates] = useState<Map<string, boolean>>(
    new Map()
  );

  if (!generatedContent) {
    return (
      <div className="h-full bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">未找到生成内容</p>
            <Button
              onClick={() => setCurrentStep("upload")}
              className="mt-4"
              variant="outline"
            >
              重新开始
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { images, texts } = generatedContent;
  const mainImages = images.filter((img) => img.type === "main");
  const detailImages = images.filter((img) => img.type === "detail");

  // Auto-scroll carousel
  useEffect(() => {
    if (carouselRef.current && mainImages.length > 0) {
      const scrollWidth = carouselRef.current.scrollWidth / mainImages.length;
      carouselRef.current.scrollTo({
        left: scrollWidth * currentImageIndex,
        behavior: "smooth",
      });
    }
  }, [currentImageIndex, mainImages.length]);

  const handleTextChange = (field: "title" | "description", value: string) => {
    setGeneratedContent({
      ...generatedContent,
      texts: {
        ...texts,
        [field]: value,
      },
    });
  };

  const handleSpecChange = (index: number, value: string) => {
    const newSpecs = [...texts.specifications];
    newSpecs[index] = value;
    setGeneratedContent({
      ...generatedContent,
      texts: {
        ...texts,
        specifications: newSpecs,
      },
    });
  };

  /**
   * 提取当前显示的图片数据用于重绘
   */
  const getImageDataForEdit = async (
    imageUrl: string
  ): Promise<{ base64: string; mimeType: string }> => {
    if (imageUrl.startsWith("data:image/")) {
      const [prefix, base64] = imageUrl.split(",");
      const mimeMatch = prefix.match(/data:(.*);base64/);
      return {
        base64: base64 || "",
        mimeType: mimeMatch?.[1] || "image/png",
      };
    }

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const mimeType = blob.type || "image/png";

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve({
          base64: result.split(",")[1] || "",
          mimeType,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  /**
   * 将 base64 图片保存到本地
   */
  const saveImageLocally = async (opts: {
    base64: string;
    mimeType: string;
    filenameHint: string;
  }) => {
    const { base64, mimeType, filenameHint } = opts;
    const ext = mimeType.split("/")[1] || "png";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${filenameHint}-${timestamp}.${ext}`;

    if (isTauri()) {
      const { writeFile, mkdir } = await import("@tauri-apps/plugin-fs");
      const { open } = await import("@tauri-apps/plugin-dialog");

      let targetDir = settings.exportPath;
      if (!targetDir) {
        const selected = await open({
          directory: true,
          title: "选择图片保存目录",
        });
        if (!selected || Array.isArray(selected)) {
          throw new Error("未选择保存目录");
        }
        targetDir = selected;
      }

      await mkdir(targetDir, { recursive: true });

      const binary = Uint8Array.from(atob(base64), (char) =>
        char.charCodeAt(0)
      );
      const targetPath = `${targetDir}/${filename}`;
      await writeFile(targetPath, binary);
      toast.success(`已保存到：${targetPath}`);
      return;
    }

    // Web: trigger browser download
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegenerateImage = async () => {
    if (!editingImageId || !imagePrompt.trim()) return;

    const image = images.find((img) => img.id === editingImageId);
    if (!image) return;

    setIsRegenerating(true);
    try {
      const { base64, mimeType } = await getImageDataForEdit(image.url);
      const newImageUrl = await api.editImage({
        image: base64,
        imageMimeType: mimeType,
        prompt: imagePrompt,
      });

      // Auto-save regenerated image
      const { base64: newBase64, mimeType: newMime } =
        await getImageDataForEdit(newImageUrl);
      await saveImageLocally({
        base64: newBase64,
        mimeType: newMime,
        filenameHint: `${image.id}-regenerated`,
      });

      const updatedImages = images.map((img) =>
        img.id === editingImageId
          ? { ...img, url: newImageUrl, prompt: imagePrompt }
          : img
      );

      setGeneratedContent({
        ...generatedContent,
        images: updatedImages,
      });

      setEditingImageId(null);
      setImagePrompt("");
    } catch (err) {
      console.error("Image regeneration error:", err);
      toast.error("图片重绘失败，请重试");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveImage = async () => {
    if (!editingImageId) return;

    const image = images.find((img) => img.id === editingImageId);
    if (!image || !image.url) return;

    try {
      setIsSavingImage(true);
      const { base64, mimeType } = await getImageDataForEdit(image.url);
      await saveImageLocally({
        base64,
        mimeType,
        filenameHint: image.id,
      });
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportContent(generatedContent, settings.exportPath);
    } catch (err) {
      console.error("Export error:", err);
      toast.error(err instanceof Error ? err.message : "导出失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mainImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + mainImages.length) % mainImages.length
    );
  };

  const handleImageLoad = (imageId: string) => {
    setImageLoadStates((prev) => {
      const next = new Map(prev);
      next.set(imageId, false);
      return next;
    });
    setImageLoadErrors((prev) => {
      const next = new Set(prev);
      next.delete(imageId);
      return next;
    });
  };

  const handleImageError = (imageId: string) => {
    setImageLoadErrors((prev) => {
      const next = new Set(prev);
      next.add(imageId);
      return next;
    });
    setImageLoadStates((prev) => {
      const next = new Map(prev);
      next.set(imageId, false);
      return next;
    });
  };

  const handleRetryImage = (imageId: string) => {
    setImageLoadErrors((prev) => {
      const next = new Set(prev);
      next.delete(imageId);
      return next;
    });
    setImageLoadStates((prev) => {
      const next = new Map(prev);
      next.set(imageId, true);
      return next;
    });
  };

  const handleEditImage = (imageId: string, prompt: string) => {
    setEditingImageId(imageId);
    setImagePrompt(prompt);
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      <EditorHeader
        isMobileView={isMobileView}
        setIsMobileView={setIsMobileView}
        onBack={() => setCurrentStep("upload")}
        onExport={handleExport}
        isExporting={isExporting}
      />

      <div className="flex-1 overflow-auto container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Preview Panel */}
          <div
            className={`lg:col-span-2 space-y-0 ${
              isMobileView ? "flex justify-center" : ""
            }`}
          >
            {isMobileView ? (
              <MobilePreview
                content={generatedContent}
                mainImages={mainImages}
                detailImages={detailImages}
                currentImageIndex={currentImageIndex}
                carouselRef={carouselRef}
                imageLoadErrors={imageLoadErrors}
                imageLoadStates={imageLoadStates}
                onPrevImage={prevImage}
                onNextImage={nextImage}
                onImageLoad={handleImageLoad}
                onImageError={handleImageError}
                onRetryImage={handleRetryImage}
              />
            ) : (
              <DesktopPreview
                content={generatedContent}
                mainImages={mainImages}
                detailImages={detailImages}
                currentImageIndex={currentImageIndex}
                carouselRef={carouselRef}
                onPrevImage={prevImage}
                onNextImage={nextImage}
                onSetImageIndex={setCurrentImageIndex}
                onEditImage={handleEditImage}
              />
            )}
          </div>

          {/* Right: Edit Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">{t.editor.textEdit}</TabsTrigger>
                <TabsTrigger value="image">{t.editor.imageEdit}</TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <TextEditPanel
                  title={texts.title}
                  description={texts.description}
                  specifications={texts.specifications}
                  onTitleChange={(value) => handleTextChange("title", value)}
                  onDescriptionChange={(value) =>
                    handleTextChange("description", value)
                  }
                  onSpecChange={handleSpecChange}
                />
              </TabsContent>

              <TabsContent value="image">
                <ImageEditPanel
                  editingImageId={editingImageId}
                  imagePrompt={imagePrompt}
                  isRegenerating={isRegenerating}
                  isSavingImage={isSavingImage}
                  onPromptChange={setImagePrompt}
                  onRegenerate={handleRegenerateImage}
                  onSave={handleSaveImage}
                  onCancel={() => {
                    setEditingImageId(null);
                    setImagePrompt("");
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

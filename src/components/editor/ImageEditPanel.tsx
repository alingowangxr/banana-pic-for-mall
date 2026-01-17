import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, RefreshCw, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageEditPanelProps {
  editingImageId: string | null;
  imagePrompt: string;
  isRegenerating: boolean;
  isSavingImage: boolean;
  onPromptChange: (value: string) => void;
  onRegenerate: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ImageEditPanel({
  editingImageId,
  imagePrompt,
  isRegenerating,
  isSavingImage,
  onPromptChange,
  onRegenerate,
  onSave,
  onCancel,
}: ImageEditPanelProps) {
  if (!editingImageId) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>点击预览区域的图片开始编辑</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>图片重绘</CardTitle>
        <CardDescription>通过提示词调整图片效果</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>提示词</Label>
          <Textarea
            value={imagePrompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="描述你想要的图片效果..."
            rows={4}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onRegenerate}
            disabled={isRegenerating || !imagePrompt.trim()}
            className="flex-1"
          >
            {isRegenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                重新生成
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSave}
            disabled={isSavingImage}
          >
            {isSavingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                保存图片
              </>
            )}
          </Button>
        </div>
        <Button variant="outline" onClick={onCancel} className="w-full">
          取消
        </Button>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, Download, RefreshCw } from "lucide-react";

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    prompt: string;
    type: "main" | "detail" | "scene";
  };
  index: number;
  onRegenerate?: (id: string) => void;
  onSave?: (id: string) => void;
  isRegenerating?: boolean;
  isSaving?: boolean;
  showActions?: boolean;
  aspectRatio?: "square" | "portrait";
}

export function ImageCard({
  image,
  index,
  onRegenerate,
  onSave,
  isRegenerating = false,
  isSaving = false,
  showActions = true,
  aspectRatio = "square",
}: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectClass = aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square";
  const typeLabel = image.type === "main" ? "主图" : "详情图";

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  if (hasError) {
    return (
      <div className={`w-full ${aspectClass} bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg`}>
        <div className="text-center p-4">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-1">图片加载失败</p>
          <p className="text-xs text-gray-400 mb-2">{typeLabel} {index + 1}</p>
          <Button size="sm" variant="outline" onClick={handleRetry}>
            重试
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg ${aspectClass}`}>
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}
      <img
        src={image.url}
        alt={`${typeLabel} ${index + 1}`}
        className={`w-full ${aspectClass} object-cover rounded-lg ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Action buttons overlay */}
      {showActions && !isLoading && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          {onRegenerate && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onRegenerate(image.id)}
              disabled={isRegenerating}
              className="h-8 px-2"
            >
              {isRegenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          )}
          {onSave && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onSave(image.id)}
              disabled={isSaving}
              className="h-8 px-2"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

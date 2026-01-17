import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import type { GeneratedContent } from "@/stores/useAppStore";

interface DesktopPreviewProps {
  content: GeneratedContent;
  mainImages: GeneratedContent["images"];
  detailImages: GeneratedContent["images"];
  currentImageIndex: number;
  carouselRef: RefObject<HTMLDivElement>;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSetImageIndex: (index: number) => void;
  onEditImage: (imageId: string, prompt: string) => void;
}

export function DesktopPreview({
  content,
  mainImages,
  detailImages,
  currentImageIndex,
  carouselRef,
  onPrevImage,
  onNextImage,
  onSetImageIndex,
  onEditImage,
}: DesktopPreviewProps) {
  const { texts } = content;

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{texts.title}</CardTitle>
          <CardDescription>{texts.description}</CardDescription>
        </CardHeader>
      </Card>

      {/* Main Images Carousel */}
      <Card>
        <CardHeader>
          <CardTitle>主图</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden scroll-smooth rounded-lg"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {mainImages.map((image, idx) => (
                <div
                  key={image.id}
                  className="w-full flex-shrink-0 relative group"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src={image.url}
                    alt={`主图 ${idx + 1}`}
                    className="w-full rounded-lg border"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onEditImage(image.id, image.prompt)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {mainImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={onPrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={onNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {mainImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSetImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Images */}
      <Card>
        <CardHeader>
          <CardTitle>详情页</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {detailImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt="Detail"
                className="w-full rounded-lg border"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEditImage(image.id, image.prompt)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>商品规格</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {texts.specifications.map((spec, idx) => (
              <li key={idx} className="text-sm text-muted-foreground">
                • {spec}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

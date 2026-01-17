import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from "lucide-react";
import type { GeneratedContent } from "@/stores/useAppStore";
import { useTranslation } from "@/lib/i18n";

interface MobilePreviewProps {
  content: GeneratedContent;
  mainImages: GeneratedContent["images"];
  detailImages: GeneratedContent["images"];
  currentImageIndex: number;
  carouselRef: RefObject<HTMLDivElement>;
  imageLoadErrors: Set<string>;
  imageLoadStates: Map<string, boolean>;
  onPrevImage: () => void;
  onNextImage: () => void;
  onImageLoad: (imageId: string) => void;
  onImageError: (imageId: string) => void;
  onRetryImage: (imageId: string) => void;
}

export function MobilePreview({
  content,
  mainImages,
  detailImages,
  currentImageIndex,
  carouselRef,
  imageLoadErrors,
  imageLoadStates,
  onPrevImage,
  onNextImage,
  onImageLoad,
  onImageError,
  onRetryImage,
}: MobilePreviewProps) {
  const t = useTranslation();
  const { texts, detailPage } = content;

  return (
    <div className="w-[375px] bg-gray-100 rounded-lg shadow-2xl overflow-hidden">
      <div className="bg-white min-h-full">
        {/* Product Title */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold leading-tight">{texts.title}</h1>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {texts.description}
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative bg-white">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {mainImages.map((image, idx) => {
              const hasError = imageLoadErrors.has(image.id);
              const isLoading = imageLoadStates.get(image.id) !== false;

              return (
                <div
                  key={image.id}
                  className="w-full flex-shrink-0 relative"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {hasError ? (
                    <div className="w-full aspect-square bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center p-4">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-1">{t.editor.imageLoadFailed}</p>
                        <p className="text-xs text-gray-400 mb-2">{t.editor.mainImageAlt} {idx + 1}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRetryImage(image.id)}
                        >
                          {t.editor.retry}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                      )}
                      <img
                        src={image.url}
                        alt={`${t.editor.mainImageAlt} ${idx + 1}`}
                        className="w-full aspect-square object-cover"
                        onLoad={() => onImageLoad(image.id)}
                        onError={() => onImageError(image.id)}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {mainImages.length > 1 && (
            <>
              <button
                onClick={onPrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={onNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {mainImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Price Section */}
        {detailPage?.buyBox && (
          <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-b">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">
                {detailPage.buyBox.price}
              </span>
              {detailPage.buyBox.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {detailPage.buyBox.originalPrice}
                </span>
              )}
            </div>
            <Button className="w-full mt-3 bg-red-600 hover:bg-red-700">
              {detailPage.buyBox.cta || t.editor.buyNow}
            </Button>
          </div>
        )}

        {/* Specifications */}
        {texts.specifications && texts.specifications.length > 0 && (
          <div className="p-4 border-b bg-white">
            <h2 className="text-base font-semibold mb-3">{t.editor.specifications}</h2>
            <div className="space-y-2">
              {texts.specifications.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Value Proposition */}
        {detailPage?.valueProposition && (
          <div className="p-4 border-b bg-white">
            <h2 className="text-base font-semibold mb-3">{t.editor.productSellingPoints}</h2>
            {detailPage.valueProposition.painPoints && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t.editor.painPointsTitle}</h3>
                <div className="space-y-2">
                  {detailPage.valueProposition.painPoints.map(
                    (point: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500">⚠</span>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {detailPage.valueProposition.solutions && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t.editor.solutionsTitle}</h3>
                <div className="space-y-2">
                  {detailPage.valueProposition.solutions.map(
                    (solution: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">{solution}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Social Proof */}
        {detailPage?.socialProof && (
          <div className="p-4 border-b bg-white">
            <h2 className="text-base font-semibold mb-3">{t.editor.userReviews}</h2>
            {detailPage.socialProof.salesData && (
              <div className="text-sm text-gray-600 mb-3">
                {detailPage.socialProof.salesData}
              </div>
            )}
            {detailPage.socialProof.reviews && (
              <div className="space-y-3">
                {detailPage.socialProof.reviews.map(
                  (review: { text: string; rating: number }, idx: number) => (
                    <div key={idx} className="border-l-2 border-gray-200 pl-3">
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{review.text}</p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Service Guarantee */}
        {detailPage?.serviceGuarantee && (
          <div className="p-4 border-b bg-white">
            <h2 className="text-base font-semibold mb-3">{t.editor.serviceGuarantee}</h2>
            {detailPage.serviceGuarantee.shipping && (
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-medium">{t.editor.shippingLabel}</span>
                {detailPage.serviceGuarantee.shipping}
              </div>
            )}
            {detailPage.serviceGuarantee.returnPolicy && (
              <div className="mb-3 text-sm text-gray-700">
                <span className="font-medium">{t.editor.returnPolicyLabel}</span>
                {detailPage.serviceGuarantee.returnPolicy}
              </div>
            )}
            {detailPage.serviceGuarantee.faq && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-600">{t.editor.faqTitle}</h3>
                {detailPage.serviceGuarantee.faq.map(
                  (faq: { question: string; answer: string }, idx: number) => (
                    <div key={idx} className="text-sm">
                      <div className="font-medium text-gray-700 mb-1">
                        Q: {faq.question}
                      </div>
                      <div className="text-gray-600">A: {faq.answer}</div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Detail Images */}
        {detailImages.length > 0 && (
          <div className="bg-white">
            {detailImages.map((image, idx) => (
              <div key={image.id} className="w-full">
                <img
                  src={image.url}
                  alt={`${t.editor.detailImageAlt} ${idx + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Cross-sell */}
        {detailPage?.crossSell?.recommendations && (
          <div className="p-4 bg-gray-50 border-t">
            <h2 className="text-base font-semibold mb-3">{t.editor.relatedRecommendations}</h2>
            <div className="space-y-2">
              {detailPage.crossSell.recommendations.map(
                (rec: string, idx: number) => (
                  <div key={idx} className="text-sm text-gray-700">
                    • {rec}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

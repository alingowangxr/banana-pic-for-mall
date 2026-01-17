import { Button } from "@/components/ui/button";
import {
  Download,
  ArrowLeft,
  Smartphone,
  Monitor,
  Loader2,
} from "lucide-react";

interface EditorHeaderProps {
  isMobileView: boolean;
  setIsMobileView: (value: boolean) => void;
  onBack: () => void;
  onExport: () => void;
  isExporting: boolean;
}

export function EditorHeader({
  isMobileView,
  setIsMobileView,
  onBack,
  onExport,
  isExporting,
}: EditorHeaderProps) {
  return (
    <div className="flex-shrink-0 border-b bg-card">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <h1 className="text-xl font-semibold">编辑详情页</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isMobileView ? "default" : "outline"}
            size="sm"
            onClick={() => setIsMobileView(true)}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            手机
          </Button>
          <Button
            variant={!isMobileView ? "default" : "outline"}
            size="sm"
            onClick={() => setIsMobileView(false)}
          >
            <Monitor className="h-4 w-4 mr-2" />
            桌面
          </Button>
          <Button onClick={onExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                导出中...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                导出
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

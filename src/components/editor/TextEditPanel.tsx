import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TextEditPanelProps {
  title: string;
  description: string;
  specifications: string[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSpecChange: (index: number, value: string) => void;
}

export function TextEditPanel({
  title,
  description,
  specifications,
  onTitleChange,
  onDescriptionChange,
  onSpecChange,
}: TextEditPanelProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>商品标题</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="输入商品标题"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>商品描述</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="输入商品描述"
            rows={6}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>商品规格</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {specifications.map((spec, idx) => (
            <Input
              key={idx}
              value={spec}
              onChange={(e) => onSpecChange(idx, e.target.value)}
              placeholder={`规格 ${idx + 1}`}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

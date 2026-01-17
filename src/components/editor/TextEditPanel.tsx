import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/lib/i18n";

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
  const t = useTranslation();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t.editor.productTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={t.editor.productTitlePlaceholder}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.editor.productDescription}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder={t.editor.productDescriptionPlaceholder}
            rows={6}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.editor.productSpecs}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {specifications.map((spec, idx) => (
            <Input
              key={idx}
              value={spec}
              onChange={(e) => onSpecChange(idx, e.target.value)}
              placeholder={`${t.editor.spec} ${idx + 1}`}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DetailModuleCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DetailModuleCard({
  title,
  icon,
  children,
  className = "",
}: DetailModuleCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

export function EditableField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: EditableFieldProps) {
  const baseClasses =
    "w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={baseClasses + " resize-none"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}

interface EditableListProps {
  label: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  placeholder?: string;
}

export function EditableList({
  label,
  items,
  onChange,
  placeholder,
}: EditableListProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="space-y-1">
        {items.map((item, idx) => (
          <input
            key={idx}
            type="text"
            value={item}
            onChange={(e) => onChange(idx, e.target.value)}
            placeholder={placeholder || `${label} ${idx + 1}`}
            className="w-full px-3 py-1.5 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>
    </div>
  );
}

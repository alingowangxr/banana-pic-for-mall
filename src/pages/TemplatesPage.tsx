import { useState } from "react";
import { useAppStore, Template } from "@/stores/useAppStore";
import { useTranslation } from "@/lib/i18n";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Plus,
  Play,
  Pencil,
  Trash2,
  Star,
  StarOff,
  Layers,
} from "lucide-react";
import { CreateTemplateDialog } from "@/components/templates/CreateTemplateDialog";

export function TemplatesPage() {
  const { templates, setCurrentStep, updateSettings, updateTemplate, deleteTemplate } =
    useAppStore();
  const t = useTranslation();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);

  const handleApplyTemplate = async (template: Template) => {
    await updateSettings({
      defaultPlatform: template.platform,
      defaultStyle: template.style,
      selectedModel: template.model,
      selectedLanguage: template.language,
      brandName: template.brandName || "",
      mainImageCount: template.mainImageCount || 5,
      detailImageCount: template.detailImageCount || 2,
      extraInfo: template.extraInfo || "",
    });

    // Increment usage count
    await updateTemplate(template.id, {
      usageCount: (template.usageCount || 0) + 1,
    });

    toast.success(t.templates.applied);
    setCurrentStep("config");
  };

  const handleToggleFavorite = async (template: Template) => {
    await updateTemplate(template.id, {
      isFavorite: !template.isFavorite,
    });
  };

  const handleDeleteClick = (template: Template) => {
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (templateToDelete) {
      await deleteTemplate(templateToDelete.id);
      toast.success(t.templates.deleted);
      setTemplateToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleEditClick = (template: Template) => {
    setEditingTemplate(template);
    setCreateDialogOpen(true);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Sort templates: favorites first, then by updatedAt
  const sortedTemplates = [...templates].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return b.updatedAt - a.updatedAt;
  });

  return (
    <div className="h-full bg-background p-8 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentStep("upload")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold">{t.templates.title}</h1>
              <p className="text-muted-foreground">{t.templates.description}</p>
            </div>
          </div>
          <Button onClick={() => {
            setEditingTemplate(null);
            setCreateDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            {t.templates.create}
          </Button>
        </div>

        {/* Templates Grid or Empty State */}
        {sortedTemplates.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <Layers className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">{t.templates.empty}</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {t.templates.emptyDesc}
              </p>
              <Button onClick={() => {
                setEditingTemplate(null);
                setCreateDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                {t.templates.create}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTemplates.map((template) => (
              <Card key={template.id} className="relative group">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate flex items-center gap-2">
                        {template.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        )}
                        {template.name}
                      </CardTitle>
                      {template.description && (
                        <CardDescription className="line-clamp-2 mt-1">
                          {template.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{t.platforms[template.platform]}</Badge>
                    <Badge variant="outline">{t.styles[template.style]}</Badge>
                    <Badge variant="outline">{t.languages[template.language]}</Badge>
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-muted-foreground">
                    {t.templates.createdAt}: {formatDate(template.createdAt)}
                    {template.usageCount ? (
                      <span className="ml-2">
                        {t.templates.usageCount}: {template.usageCount}
                      </span>
                    ) : null}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleApplyTemplate(template)}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {t.templates.apply}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFavorite(template)}
                      title={template.isFavorite ? t.templates.unfavorite : t.templates.favorite}
                    >
                      {template.isFavorite ? (
                        <StarOff className="h-3 w-3" />
                      ) : (
                        <Star className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(template)}
                      title={t.templates.edit}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(template)}
                      title={t.templates.delete}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Template Dialog */}
      <CreateTemplateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        editingTemplate={editingTemplate}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.templates.delete}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.templates.deleteConfirm}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              {t.templates.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

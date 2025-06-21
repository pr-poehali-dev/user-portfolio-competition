import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { useContestForm } from "@/hooks/useContestForm";
import FileUploadSection from "./contest/FileUploadSection";
import JurySection from "./contest/JurySection";
import { ContestData } from "@/types/contest";

const CreateContest = () => {
  const { getJuryUsers } = useAuth();
  const {
    formData,
    updateFormData,
    selectedFiles,
    setSelectedFiles,
    juryEmails,
    setJuryEmails,
    selectedJury,
    setSelectedJury,
    jurySelectionMode,
    setJurySelectionMode,
    validateForm,
  } = useContestForm();

  const handleFilesSelect = (newFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addJuryEmail = () => {
    if (juryEmails.length < 10) {
      setJuryEmails([...juryEmails, ""]);
    }
  };

  const removeJuryEmail = (index: number) => {
    if (juryEmails.length > 3) {
      setJuryEmails(juryEmails.filter((_, i) => i !== index));
    }
  };

  const updateJuryEmail = (index: number, email: string) => {
    const newEmails = [...juryEmails];
    newEmails[index] = email;
    setJuryEmails(newEmails);
  };

  const toggleJurySelection = (juryId: string) => {
    setSelectedJury((prev) =>
      prev.includes(juryId)
        ? prev.filter((id) => id !== juryId)
        : [...prev, juryId],
    );
  };

  const handleSubmit = (isDraft = false) => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Дополнительная проверка файлов
    if (
      selectedFiles.some(
        (file) => file.size > formData.maxFileSize * 1024 * 1024,
      )
    ) {
      alert(
        `Один или несколько файлов превышают максимальный размер ${formData.maxFileSize}MB`,
      );
      return;
    }

    const contestData: ContestData = {
      ...formData,
      regulations: selectedFiles,
      jury:
        jurySelectionMode === "select"
          ? selectedJury
          : juryEmails.filter((email) => email.trim() && email.includes("@")),
      status: isDraft ? "draft" : "published",
      createdAt: new Date().toISOString(),
    };

    console.log("Создание конкурса:", contestData);

    // Имитация успешной отправки
    setTimeout(() => {
      alert(
        isDraft
          ? "Конкурс сохранен как черновик"
          : "Конкурс успешно создан и опубликован!",
      );
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Plus" />
            <span>Создание нового конкурса</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contestName">Название конкурса *</Label>
              <Input
                id="contestName"
                placeholder="Введите название конкурса"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="targetAudience">Целевая аудитория</Label>
              <select
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) =>
                  updateFormData({ targetAudience: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Все категории</option>
                <option value="preschool">Дошкольники</option>
                <option value="school">Школьники</option>
                <option value="adults">Взрослые</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание конкурса *</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание конкурса, его целей и требований..."
              rows={4}
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
            />
          </div>

          {/* Даты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Дата начала *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => updateFormData({ startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Дата окончания *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => updateFormData({ endDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="evaluationDeadline">Дедлайн оценки жюри *</Label>
              <Input
                id="evaluationDeadline"
                type="datetime-local"
                value={formData.evaluationDeadline}
                onChange={(e) =>
                  updateFormData({ evaluationDeadline: e.target.value })
                }
              />
            </div>
          </div>

          {/* Файлы */}
          <FileUploadSection
            allowedFormats={formData.allowedFormats}
            maxFileSize={formData.maxFileSize}
            selectedFiles={selectedFiles}
            onFilesSelect={handleFilesSelect}
            onFileRemove={removeFile}
          />

          {/* Настройки файлов */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxFileSize">
                Максимальный размер файла (MB)
              </Label>
              <Input
                id="maxFileSize"
                type="number"
                min="1"
                max="100"
                value={formData.maxFileSize}
                onChange={(e) =>
                  updateFormData({ maxFileSize: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="allowedFormats">Разрешенные форматы</Label>
              <Input
                id="allowedFormats"
                value={formData.allowedFormats.join(", ")}
                onChange={(e) =>
                  updateFormData({
                    allowedFormats: e.target.value
                      .split(", ")
                      .map((f) => f.trim().toUpperCase()),
                  })
                }
              />
            </div>
          </div>

          {/* Дополнительные настройки */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="videoLinkAllowed"
                checked={formData.videoLinkAllowed}
                onCheckedChange={(checked) =>
                  updateFormData({ videoLinkAllowed: !!checked })
                }
              />
              <Label htmlFor="videoLinkAllowed">
                Разрешить ссылки на видео
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paymentReceiptRequired"
                checked={formData.paymentReceiptRequired}
                onCheckedChange={(checked) =>
                  updateFormData({ paymentReceiptRequired: !!checked })
                }
              />
              <Label htmlFor="paymentReceiptRequired">
                Требовать чек об оплате
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  updateFormData({ isPublic: !!checked })
                }
              />
              <Label htmlFor="isPublic">
                Публичный конкурс (видимость без регистрации)
              </Label>
            </div>
          </div>

          {/* Жюри */}
          <JurySection
            jurySelectionMode={jurySelectionMode}
            onModeChange={setJurySelectionMode}
            selectedJury={selectedJury}
            onJuryToggle={toggleJurySelection}
            juryEmails={juryEmails}
            onEmailUpdate={updateJuryEmail}
            onEmailAdd={addJuryEmail}
            onEmailRemove={removeJuryEmail}
            juryUsers={getJuryUsers()}
          />

          {/* Действия */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={() => handleSubmit(true)}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить как черновик
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleSubmit(false)}
            >
              <Icon name="Rocket" size={16} className="mr-2" />
              Создать и опубликовать конкурс
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContest;

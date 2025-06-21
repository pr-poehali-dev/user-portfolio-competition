import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

const CreateContest = () => {
  const { getJuryUsers } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [juryEmails, setJuryEmails] = useState<string[]>([""]);
  const [selectedJury, setSelectedJury] = useState<string[]>([]);
  const [jurySelectionMode, setJurySelectionMode] = useState<
    "select" | "manual"
  >("select");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    evaluationDeadline: "",
    maxFileSize: 10,
    allowedFormats: ["JPG", "PNG", "PDF", "DOC", "DOCX", "PPTX"],
    videoLinkAllowed: true,
    paymentReceiptRequired: true,
    isPublic: true,
    targetAudience: "all", // all, preschool, school, adults
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      validateAndSetFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      validateAndSetFiles(files);
    }
  };

  const validateAndSetFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const fileExtension = file.name.split(".").pop()?.toUpperCase();
      const isValidFormat = formData.allowedFormats.includes(
        fileExtension || "",
      );
      const isValidSize = file.size <= formData.maxFileSize * 1024 * 1024;

      if (!isValidFormat) {
        alert(`Файл ${file.name} имеет недопустимый формат`);
        return false;
      }
      if (!isValidSize) {
        alert(
          `Файл ${file.name} превышает максимальный размер ${formData.maxFileSize}MB`,
        );
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
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
    // Валидация формы
    if (!formData.name.trim()) {
      alert("Введите название конкурса");
      return;
    }
    if (!formData.description.trim()) {
      alert("Введите описание конкурса");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      alert("Укажите даты начала и окончания конкурса");
      return;
    }
    if (!formData.evaluationDeadline) {
      alert("Укажите дедлайн оценки для жюри");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("Загрузите положение о конкурсе");
      return;
    }

    // Проверка жюри
    if (jurySelectionMode === "select") {
      if (selectedJury.length < 3) {
        alert("Выберите минимум 3 членов жюри");
        return;
      }
    } else {
      const validJuryEmails = juryEmails.filter(
        (email) => email.trim() && email.includes("@"),
      );
      if (validJuryEmails.length < 3) {
        alert("Добавьте минимум 3 email адреса жюри");
        return;
      }
    }

    // Отправка формы
    const contestData = {
      ...formData,
      regulations: selectedFiles,
      jury:
        jurySelectionMode === "select"
          ? selectedJury
          : juryEmails.filter((email) => email.trim()),
      status: isDraft ? "draft" : "published",
      createdAt: new Date().toISOString(),
    };

    console.log("Создание конкурса:", contestData);
    alert(
      isDraft
        ? "Конкурс сохранен как черновик"
        : "Конкурс успешно создан и опубликован!",
    );
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="targetAudience">Целевая аудитория</Label>
              <select
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="endDate">Дата окончания *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="evaluationDeadline">Дедлайн оценки жюри *</Label>
              <Input
                id="evaluationDeadline"
                type="datetime-local"
                value={formData.evaluationDeadline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    evaluationDeadline: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Положение о конкурсе */}
          <div>
            <Label>Положение о конкурсе *</Label>
            <div
              className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon
                name="Upload"
                className="mx-auto h-10 w-10 text-gray-400 mb-3"
              />
              <p className="text-gray-600 mb-2">
                Перетащите файлы сюда или
                <label className="text-purple-600 hover:text-purple-700 ml-1 cursor-pointer">
                  выберите файлы
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.pptx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">
                Поддерживаются: {formData.allowedFormats.join(", ")} (до{" "}
                {formData.maxFileSize}MB)
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        name="FileText"
                        size={16}
                        className="text-gray-500"
                      />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
                  setFormData({
                    ...formData,
                    maxFileSize: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="allowedFormats">Разрешенные форматы</Label>
              <Input
                id="allowedFormats"
                value={formData.allowedFormats.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                  setFormData({ ...formData, videoLinkAllowed: !!checked })
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
                  setFormData({
                    ...formData,
                    paymentReceiptRequired: !!checked,
                  })
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
                  setFormData({ ...formData, isPublic: !!checked })
                }
              />
              <Label htmlFor="isPublic">
                Публичный конкурс (видимость без регистрации)
              </Label>
            </div>
          </div>

          {/* Назначение жюри */}
          <div>
            <Label>Назначение жюри (минимум 3 человека) *</Label>

            <div className="flex space-x-4 mt-2 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="juryMode"
                  checked={jurySelectionMode === "select"}
                  onChange={() => setJurySelectionMode("select")}
                />
                <span>Выбрать из пользователей</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="juryMode"
                  checked={jurySelectionMode === "manual"}
                  onChange={() => setJurySelectionMode("manual")}
                />
                <span>Ввести вручную</span>
              </label>
            </div>

            {jurySelectionMode === "select" ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {getJuryUsers().map((juryUser) => (
                    <div
                      key={juryUser.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedJury.includes(juryUser.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleJurySelection(juryUser.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedJury.includes(juryUser.id)}
                          onChange={() => toggleJurySelection(juryUser.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{juryUser.fullName}</p>
                          <p className="text-sm text-gray-600">
                            {juryUser.email}
                          </p>
                          {juryUser.institution && (
                            <p className="text-xs text-gray-500">
                              {juryUser.institution}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Выбрано: {selectedJury.length} из {getJuryUsers().length}{" "}
                  доступных
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {juryEmails.map((email, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => updateJuryEmail(index, e.target.value)}
                      className="flex-1"
                    />
                    {juryEmails.length > 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeJuryEmail(index)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                {juryEmails.length < 10 && (
                  <Button variant="outline" size="sm" onClick={addJuryEmail}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить члена жюри
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Кнопки действий */}
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

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const UploadWork = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const contests = [
    { id: 1, name: "Конкурс дизайна 2024", deadline: "15 марта 2024" },
    { id: 2, name: "Архитектурный конкурс", deadline: "20 марта 2024" },
    { id: 3, name: "Конкурс инноваций", deadline: "25 марта 2024" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Upload" />
            <span>Загрузка работы</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="contest">Конкурс</Label>
            <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Выберите конкурс</option>
              {contests.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="title">Название работы</Label>
            <Input id="title" placeholder="Введите название работы" />
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Опишите вашу работу..."
              rows={4}
            />
          </div>

          <div>
            <Label>Файлы работы</Label>
            <div
              className={`mt-1 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
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
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
              />
              <p className="text-gray-600 mb-2">
                Перетащите файлы сюда или
                <button className="text-purple-600 hover:text-purple-700 ml-1">
                  выберите файлы
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Поддерживаются: JPG, PNG, PDF, DOC, DOCX (до 10MB)
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{file.name}</span>
                    <Button variant="ghost" size="sm">
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить работу
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Calendar" />
            <span>Активные конкурсы</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900">{contest.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Крайний срок: {contest.deadline}
                </p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <Icon name="Clock" size={14} className="mr-1" />
                  Активен
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadWork;

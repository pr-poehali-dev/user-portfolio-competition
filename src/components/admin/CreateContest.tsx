import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const CreateContest = () => {
  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Plus" />
            <span>Создание нового конкурса</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contestName">Название конкурса</Label>
              <Input id="contestName" placeholder="Введите название конкурса" />
            </div>
            <div>
              <Label htmlFor="contestCode">Код конкурса</Label>
              <Input id="contestCode" placeholder="Уникальный код" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание конкурса</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание конкурса, его целей и требований..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Дата начала</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">Дата окончания</Label>
              <Input id="endDate" type="date" />
            </div>
            <div>
              <Label htmlFor="evaluationDeadline">Дедлайн оценки</Label>
              <Input id="evaluationDeadline" type="date" />
            </div>
          </div>

          <div>
            <Label htmlFor="categories">Категории конкурса</Label>
            <Input
              id="categories"
              placeholder="Введите категории через запятую"
              defaultValue="Дизайн, Архитектура, Инновации"
            />
          </div>

          <div>
            <Label htmlFor="maxFileSize">Максимальный размер файла (MB)</Label>
            <Input id="maxFileSize" type="number" defaultValue="10" />
          </div>

          <div>
            <Label htmlFor="allowedFormats">Разрешенные форматы файлов</Label>
            <Input
              id="allowedFormats"
              placeholder="Введите форматы через запятую"
              defaultValue="JPG, PNG, PDF, DOC, DOCX"
            />
          </div>

          <div>
            <Label>Критерии оценки</Label>
            <div className="space-y-3 mt-2">
              {[
                { name: "Креативность", weight: 25 },
                { name: "Техническое исполнение", weight: 25 },
                { name: "Презентация", weight: 25 },
                { name: "Соответствие теме", weight: 25 },
              ].map((criterion, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 border rounded-lg"
                >
                  <Input
                    defaultValue={criterion.name}
                    className="flex-1"
                    placeholder="Название критерия"
                  />
                  <div className="flex items-center space-x-2">
                    <Label>Вес:</Label>
                    <Input
                      type="number"
                      defaultValue={criterion.weight}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить критерий
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="juryEmails">Email адреса жюри</Label>
            <Textarea
              id="juryEmails"
              placeholder="Введите email адреса жюри, каждый с новой строки"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isPublic" className="rounded" />
            <Label htmlFor="isPublic">
              Публичный конкурс (виден всем пользователям)
            </Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Сохранить как черновик</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Rocket" size={16} className="mr-2" />
              Создать конкурс
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContest;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const EvaluationPanel = () => {
  const [selectedWork, setSelectedWork] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const works = [
    {
      id: 1,
      title: "Дизайн мобильного приложения",
      author: "Анна Иванова",
      contest: "Конкурс дизайна 2024",
      description:
        "Современный дизайн приложения для заказа еды с интуитивным интерфейсом",
      files: ["design-preview.jpg", "ui-components.pdf"],
      evaluated: false,
    },
    {
      id: 2,
      title: "Архитектурный проект",
      author: "Петр Сидоров",
      contest: "Архитектурный конкурс",
      description:
        "Проект современного жилого комплекса с учетом экологических требований",
      files: ["architecture-plan.pdf", "render.jpg"],
      evaluated: true,
      score: 78,
    },
  ];

  const criteria = [
    { id: "creativity", name: "Креативность", weight: 25 },
    { id: "technical", name: "Техническое исполнение", weight: 25 },
    { id: "presentation", name: "Презентация", weight: 25 },
    { id: "relevance", name: "Соответствие теме", weight: 25 },
  ];

  const handleScoreChange = (criteriaId: string, score: number) => {
    setScores({
      ...scores,
      [`${selectedWork}-${criteriaId}`]: score,
    });
  };

  const getTotalScore = () => {
    return criteria.reduce((total, criterion) => {
      const score = scores[`${selectedWork}-${criterion.id}`] || 0;
      return total + (score * criterion.weight) / 100;
    }, 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="List" />
            <span>Работы на оценку</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {works.map((work, index) => (
              <div
                key={work.id}
                onClick={() => setSelectedWork(index)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedWork === index
                    ? "bg-purple-50 border border-purple-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{work.title}</h3>
                  {work.evaluated ? (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Оценена
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Ожидает
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600">{work.author}</p>
                <p className="text-xs text-gray-500">{work.contest}</p>
                {work.evaluated && work.score && (
                  <p className="text-xs font-medium text-purple-600 mt-1">
                    Оценка: {work.score}/100
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="FileText" />
            <span>{works[selectedWork]?.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {works[selectedWork] && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Информация о работе</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Автор:</span>
                    <p className="font-medium">{works[selectedWork].author}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Конкурс:</span>
                    <p className="font-medium">{works[selectedWork].contest}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  {works[selectedWork].description}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Файлы работы</h3>
                <div className="flex space-x-2">
                  {works[selectedWork].files.map((file, index) => (
                    <Button key={index} variant="outline" size="sm">
                      <Icon name="Download" size={14} className="mr-1" />
                      {file}
                    </Button>
                  ))}
                </div>
              </div>

              {!works[selectedWork].evaluated && (
                <div>
                  <h3 className="font-medium mb-4">Критерии оценки</h3>
                  <div className="space-y-4">
                    {criteria.map((criterion) => (
                      <div key={criterion.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <Label className="font-medium">
                            {criterion.name}
                          </Label>
                          <span className="text-sm text-gray-500">
                            Вес: {criterion.weight}%
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <Button
                              key={score}
                              variant={
                                scores[`${selectedWork}-${criterion.id}`] ===
                                score
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleScoreChange(criterion.id, score)
                              }
                              className="w-12 h-12"
                            >
                              {score}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Общая оценка:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {getTotalScore().toFixed(1)}/5.0
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${(getTotalScore() / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="comments">Комментарии жюри</Label>
                    <Textarea
                      id="comments"
                      placeholder="Оставьте комментарий для участника..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    <Icon name="Check" size={16} className="mr-2" />
                    Сохранить оценку
                  </Button>
                </div>
              )}

              {works[selectedWork].evaluated && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name="CheckCircle"
                      className="text-green-600"
                      size={20}
                    />
                    <span className="font-medium text-green-800">
                      Работа уже оценена
                    </span>
                  </div>
                  <p className="text-green-700">
                    Итоговая оценка: {works[selectedWork].score}/100 баллов
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationPanel;

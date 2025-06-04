import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const GenerateDiplomas = () => {
  const [selectedContest, setSelectedContest] = useState("");

  const contests = [
    {
      id: 1,
      name: "Конкурс дизайна 2024",
      status: "completed",
      participants: [
        {
          id: 1,
          name: "Анна Иванова",
          work: "Дизайн мобильного приложения",
          place: 1,
          score: 95,
        },
        {
          id: 2,
          name: "Петр Сидоров",
          work: "UI-система для веб-сайта",
          place: 2,
          score: 87,
        },
        {
          id: 3,
          name: "Мария Петрова",
          work: "Брендинг для стартапа",
          place: 3,
          score: 82,
        },
      ],
    },
    {
      id: 2,
      name: "Архитектурный конкурс",
      status: "completed",
      participants: [
        {
          id: 4,
          name: "Алексей Козлов",
          work: "Жилой комплекс",
          place: 1,
          score: 92,
        },
        {
          id: 5,
          name: "Елена Смирнова",
          work: "Офисное здание",
          place: 2,
          score: 88,
        },
      ],
    },
  ];

  const selectedContestData = contests.find(
    (c) => c.id.toString() === selectedContest,
  );

  const getPlaceBadge = (place: number) => {
    const colors = {
      1: "bg-yellow-100 text-yellow-800",
      2: "bg-gray-100 text-gray-800",
      3: "bg-orange-100 text-orange-800",
    };
    return (
      <Badge
        className={
          colors[place as keyof typeof colors] || "bg-blue-100 text-blue-800"
        }
      >
        {place}-е место
      </Badge>
    );
  };

  const generateDiploma = (participantId: number, format: "pdf" | "jpeg") => {
    console.log(
      `Генерируем диплом в формате ${format} для участника ${participantId}`,
    );
    // Здесь будет логика генерации диплома
  };

  const generateAllDiplomas = (format: "pdf" | "jpeg") => {
    console.log(`Генерируем все дипломы в формате ${format}`);
    // Здесь будет логика массовой генерации дипломов
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Award" />
            <span>Генерация дипломов</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contestSelect">
                Выберите завершенный конкурс
              </Label>
              <select
                id="contestSelect"
                value={selectedContest}
                onChange={(e) => setSelectedContest(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Выберите конкурс</option>
                {contests
                  .filter((c) => c.status === "completed")
                  .map((contest) => (
                    <option key={contest.id} value={contest.id}>
                      {contest.name}
                    </option>
                  ))}
              </select>
            </div>

            {selectedContestData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Результаты конкурса</h3>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => generateAllDiplomas("pdf")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="FileText" size={16} className="mr-2" />
                      Все дипломы PDF
                    </Button>
                    <Button
                      onClick={() => generateAllDiplomas("jpeg")}
                      variant="outline"
                    >
                      <Icon name="Image" size={16} className="mr-2" />
                      Все дипломы JPEG
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedContestData.participants
                    .sort((a, b) => a.place - b.place)
                    .map((participant) => (
                      <div
                        key={participant.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{participant.name}</h4>
                            <p className="text-sm text-gray-600">
                              {participant.work}
                            </p>
                            <p className="text-sm text-purple-600 mt-1">
                              Оценка: {participant.score}/100 баллов
                            </p>
                          </div>
                          {getPlaceBadge(participant.place)}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              generateDiploma(participant.id, "pdf")
                            }
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Icon name="FileText" size={14} className="mr-1" />
                            Диплом PDF
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              generateDiploma(participant.id, "jpeg")
                            }
                          >
                            <Icon name="Image" size={14} className="mr-1" />
                            Диплом JPEG
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Eye" size={14} className="mr-1" />
                            Предварительный просмотр
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Send" size={14} className="mr-1" />
                            Отправить участнику
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Settings" />
            <span>Настройки шаблона диплома</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="diplomaTitle">Заголовок диплома</Label>
                <Input id="diplomaTitle" defaultValue="ДИПЛОМ УЧАСТНИКА" />
              </div>

              <div>
                <Label htmlFor="organizationName">Организация</Label>
                <Input
                  id="organizationName"
                  defaultValue="Конкурсная комиссия"
                />
              </div>

              <div>
                <Label htmlFor="signatoryName">ФИО подписанта</Label>
                <Input id="signatoryName" placeholder="Председатель жюри" />
              </div>

              <div>
                <Label htmlFor="signatoryTitle">Должность подписанта</Label>
                <Input
                  id="signatoryTitle"
                  placeholder="Председатель конкурсной комиссии"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Предварительный просмотр</Label>
                <div className="mt-2 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                  <Icon
                    name="Image"
                    className="mx-auto h-12 w-12 text-gray-400 mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    Здесь будет отображаться предварительный просмотр диплома
                  </p>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить шаблон диплома
              </Button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить настройки
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateDiplomas;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const MyWorks = () => {
  const works = [
    {
      id: 1,
      title: "Дизайн мобильного приложения",
      contest: "Конкурс дизайна 2024",
      status: "evaluated",
      score: 85,
      place: 2,
      diploma: true,
      submittedAt: "2024-03-10",
    },
    {
      id: 2,
      title: "Архитектурный проект",
      contest: "Архитектурный конкурс",
      status: "pending",
      submittedAt: "2024-03-12",
    },
    {
      id: 3,
      title: "Инновационное решение",
      contest: "Конкурс инноваций",
      status: "draft",
      submittedAt: "2024-03-14",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "evaluated":
        return <Badge className="bg-green-100 text-green-800">Оценена</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">На оценке</Badge>
        );
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Черновик</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  const downloadDiploma = (format: "pdf" | "jpeg", workId: number) => {
    // Здесь будет логика скачивания диплома
    console.log(`Скачиваем диплом в формате ${format} для работы ${workId}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <Card key={work.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{work.title}</CardTitle>
                {getStatusBadge(work.status)}
              </div>
              <p className="text-sm text-gray-600">{work.contest}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  Отправлена: {work.submittedAt}
                </div>

                {work.status === "evaluated" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Оценка:</span>
                      <span className="text-lg font-bold text-purple-600">
                        {work.score}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Место:</span>
                      <span className="text-lg font-bold text-gold-600">
                        {work.place}-е место
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Просмотр
                  </Button>

                  {work.status === "draft" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Редактировать
                    </Button>
                  )}
                </div>

                {work.diploma && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2 text-purple-600">
                      <Icon name="Award" size={14} className="inline mr-1" />
                      Диплом доступен для скачивания:
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDiploma("pdf", work.id)}
                        className="flex-1"
                      >
                        <Icon name="FileText" size={14} className="mr-1" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDiploma("jpeg", work.id)}
                        className="flex-1"
                      >
                        <Icon name="Image" size={14} className="mr-1" />
                        JPEG
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {works.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Icon
              name="FolderOpen"
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет загруженных работ
            </h3>
            <p className="text-gray-600 mb-4">
              Начните с загрузки своей первой конкурсной работы
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Plus" size={16} className="mr-2" />
              Загрузить работу
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyWorks;

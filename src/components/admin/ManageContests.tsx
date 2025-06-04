import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const ManageContests = () => {
  const contests = [
    {
      id: 1,
      name: "Конкурс дизайна 2024",
      participants: 15,
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-03-20",
      totalWorks: 15,
      evaluatedWorks: 8,
    },
    {
      id: 2,
      name: "Архитектурный конкурс",
      participants: 12,
      status: "evaluation",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      totalWorks: 12,
      evaluatedWorks: 12,
    },
    {
      id: 3,
      name: "Конкурс инноваций",
      participants: 20,
      status: "completed",
      startDate: "2024-02-01",
      endDate: "2024-03-10",
      totalWorks: 20,
      evaluatedWorks: 20,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Активный</Badge>;
      case "evaluation":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Оценивание</Badge>
        );
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Завершен</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Всего конкурсов
                </p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <Icon name="Trophy" className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Активных</p>
                <p className="text-3xl font-bold text-blue-600">3</p>
              </div>
              <Icon name="Play" className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Участников</p>
                <p className="text-3xl font-bold text-green-600">47</p>
              </div>
              <Icon name="Users" className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Работ</p>
                <p className="text-3xl font-bold text-orange-600">128</p>
              </div>
              <Icon name="FileText" className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Icon name="Settings" />
              <span>Управление конкурсами</span>
            </span>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать конкурс
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{contest.name}</h3>
                    <p className="text-sm text-gray-600">
                      {contest.startDate} — {contest.endDate}
                    </p>
                  </div>
                  {getStatusBadge(contest.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Участников:</span>
                    <p className="font-medium">{contest.participants}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Работ:</span>
                    <p className="font-medium">{contest.totalWorks}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Оценено:</span>
                    <p className="font-medium">
                      {contest.evaluatedWorks}/{contest.totalWorks}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Прогресс:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(contest.evaluatedWorks / contest.totalWorks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Просмотр
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={14} className="mr-1" />
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Users" size={14} className="mr-1" />
                    Участники
                  </Button>
                  {contest.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Icon name="Award" size={14} className="mr-1" />
                      Результаты
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Icon name="Trash2" size={14} className="mr-1" />
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageContests;

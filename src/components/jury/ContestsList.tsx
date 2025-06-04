import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ContestsList = () => {
  const contests = [
    {
      id: 1,
      name: "Конкурс дизайна 2024",
      description: "Конкурс на лучший дизайн мобильного приложения",
      status: "active",
      totalWorks: 15,
      evaluatedWorks: 8,
      deadline: "2024-03-20",
      categories: ["UI/UX", "Мобильный дизайн"],
    },
    {
      id: 2,
      name: "Архитектурный конкурс",
      description: "Проектирование современных жилых комплексов",
      status: "evaluation",
      totalWorks: 12,
      evaluatedWorks: 12,
      deadline: "2024-03-15",
      categories: ["Архитектура", "Градостроительство"],
    },
    {
      id: 3,
      name: "Конкурс инноваций",
      description: "Инновационные решения для устойчивого развития",
      status: "completed",
      totalWorks: 20,
      evaluatedWorks: 20,
      deadline: "2024-03-10",
      categories: ["Инновации", "Экология"],
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

  const getProgressPercentage = (evaluated: number, total: number) => {
    return total > 0 ? (evaluated / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <Card key={contest.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{contest.name}</CardTitle>
                {getStatusBadge(contest.status)}
              </div>
              <p className="text-sm text-gray-600">{contest.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {contest.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Прогресс оценивания</span>
                    <span>
                      {contest.evaluatedWorks}/{contest.totalWorks}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${getProgressPercentage(contest.evaluatedWorks, contest.totalWorks)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <Icon name="Calendar" size={14} className="inline mr-1" />
                  Дедлайн: {contest.deadline}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Просмотр
                  </Button>

                  {contest.status !== "completed" && (
                    <Button
                      size="sm"
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="Star" size={14} className="mr-1" />
                      Оценить
                    </Button>
                  )}
                </div>

                {contest.status === "completed" && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Award" size={14} className="mr-1" />
                    Посмотреть результаты
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContestsList;

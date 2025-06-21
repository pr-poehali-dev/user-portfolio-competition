import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const PublicContests = () => {
  // Мок данные конкурсов
  const contests = [
    {
      id: "1",
      title: "Конкурс детского творчества",
      description: "Творческий конкурс для детей дошкольного возраста",
      status: "active",
      category: "Творчество",
      deadline: "2024-12-31",
      participants: 15,
      works: [
        {
          id: "1",
          title: "Весенний пейзаж",
          author: "Мария К.",
          category: "Рисунок",
        },
        { id: "2", title: "Мой дом", author: "Иван П.", category: "Рисунок" },
        {
          id: "3",
          title: "Животные леса",
          author: "Анна С.",
          category: "Поделка",
        },
      ],
    },
    {
      id: "2",
      title: "Олимпиада по математике",
      description: "Математическая олимпиада для учащихся 5-11 классов",
      status: "active",
      category: "Образование",
      deadline: "2024-11-30",
      participants: 28,
      works: [
        {
          id: "4",
          title: "Решение задач по алгебре",
          author: "Петр И.",
          category: "Математика",
        },
        {
          id: "5",
          title: "Геометрические построения",
          author: "Ольга Д.",
          category: "Математика",
        },
      ],
    },
    {
      id: "3",
      title: "Конкурс эссе",
      description: "Литературный конкурс для старшеклассников",
      status: "completed",
      category: "Литература",
      deadline: "2024-10-15",
      participants: 12,
      works: [
        {
          id: "6",
          title: "Мой родной город",
          author: "Елена М.",
          category: "Эссе",
        },
        {
          id: "7",
          title: "Будущее планеты",
          author: "Дмитрий К.",
          category: "Эссе",
        },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Активный", color: "bg-green-100 text-green-800" },
      completed: { label: "Завершен", color: "bg-blue-100 text-blue-800" },
      upcoming: { label: "Скоро", color: "bg-yellow-100 text-yellow-800" },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Конкурсы и олимпиады
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Участвуйте в конкурсах, олимпиадах и творческих мероприятиях. Покажите
          свои таланты и получите признание!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Icon
              name="Trophy"
              className="h-12 w-12 text-blue-600 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              {contests.length}
            </h3>
            <p className="text-blue-700">Всего конкурсов</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Icon
              name="Users"
              className="h-12 w-12 text-green-600 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              {contests.reduce((sum, contest) => sum + contest.participants, 0)}
            </h3>
            <p className="text-green-700">Участников</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <Icon
              name="FileText"
              className="h-12 w-12 text-purple-600 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-purple-900 mb-2">
              {contests.reduce((sum, contest) => sum + contest.works.length, 0)}
            </h3>
            <p className="text-purple-700">Работ подано</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {contests.map((contest) => (
          <Card key={contest.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">
                    {contest.title}
                  </CardTitle>
                  <p className="text-gray-600">{contest.description}</p>
                </div>
                {getStatusBadge(contest.status)}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>До {contest.deadline}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span>{contest.participants} участников</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={16} />
                  <span>{contest.category}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Поданные работы ({contest.works.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contest.works.map((work) => (
                    <div
                      key={work.id}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <h5 className="font-medium text-sm">{work.title}</h5>
                      <p className="text-xs text-gray-600">
                        Автор: {work.author} • {work.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PublicContests;

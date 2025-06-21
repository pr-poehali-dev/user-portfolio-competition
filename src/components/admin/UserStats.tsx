import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { User } from "@/types/user";

interface UserStatsProps {
  allUsers: User[];
  approvedUsers: User[];
  juryUsers: User[];
  pendingUsers: User[];
}

const UserStats = ({
  allUsers,
  approvedUsers,
  juryUsers,
  pendingUsers,
}: UserStatsProps) => {
  const stats = [
    {
      label: "Всего пользователей",
      value: allUsers.length,
      icon: "Users",
      color: "blue",
    },
    {
      label: "Участники",
      value: approvedUsers.length,
      icon: "UserCheck",
      color: "green",
    },
    {
      label: "Жюри",
      value: juryUsers.length,
      icon: "Award",
      color: "red",
    },
    {
      label: "Ожидают",
      value: pendingUsers.length,
      icon: "Clock",
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </p>
              </div>
              <Icon
                name={stat.icon as any}
                className={`h-8 w-8 text-${stat.color}-600`}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;

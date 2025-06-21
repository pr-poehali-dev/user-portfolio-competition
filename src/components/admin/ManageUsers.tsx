import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const ManageUsers = () => {
  const { getPendingUsers, approveUser, rejectUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState(getPendingUsers());
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleApprove = async (userId: string) => {
    setIsLoading(userId);
    try {
      const success = await approveUser(userId);
      if (success) {
        setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
        toast({
          title: "Пользователь одобрен",
          description: "Пользователь может теперь войти в систему",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить пользователя",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleReject = async (userId: string) => {
    setIsLoading(userId);
    try {
      const success = await rejectUser(userId);
      if (success) {
        setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
        toast({
          title: "Пользователь отклонен",
          description: "Заявка пользователя была отклонена",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить пользователя",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleMap = {
      educator: { label: "Воспитатель", color: "bg-blue-100 text-blue-800" },
      teacher: { label: "Учитель", color: "bg-green-100 text-green-800" },
      student: { label: "Ученик", color: "bg-purple-100 text-purple-800" },
      parent: { label: "Родитель", color: "bg-orange-100 text-orange-800" },
      jury: { label: "Жюри", color: "bg-red-100 text-red-800" },
    };

    const roleInfo = roleMap[role as keyof typeof roleMap] || {
      label: role,
      color: "bg-gray-100 text-gray-800",
    };
    return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Ожидают подтверждения
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {pendingUsers.length}
                </p>
              </div>
              <Icon name="Clock" className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Всего пользователей
                </p>
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
                <p className="text-sm font-medium text-gray-600">
                  Активных сегодня
                </p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <Icon name="Activity" className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="UserCheck" />
            <span>Подтверждение участников</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8">
              <Icon
                name="CheckCircle"
                className="h-12 w-12 text-green-500 mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Все заявки обработаны
              </h3>
              <p className="text-gray-600">
                Нет пользователей, ожидающих подтверждения
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-lg">{user.fullName}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    {getRoleBadge(user.role)}
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Icon
                      name={user.emailConfirmed ? "CheckCircle" : "Clock"}
                      size={16}
                      className={
                        user.emailConfirmed
                          ? "text-green-500"
                          : "text-orange-500"
                      }
                    />
                    <span className="text-sm text-gray-600">
                      Email{" "}
                      {user.emailConfirmed ? "подтвержден" : "не подтвержден"}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleApprove(user.id)}
                      disabled={isLoading === user.id}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      {isLoading === user.id ? (
                        <Icon
                          name="Loader2"
                          size={14}
                          className="mr-1 animate-spin"
                        />
                      ) : (
                        <Icon name="Check" size={14} className="mr-1" />
                      )}
                      Одобрить
                    </Button>
                    <Button
                      onClick={() => handleReject(user.id)}
                      disabled={isLoading === user.id}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      {isLoading === user.id ? (
                        <Icon
                          name="Loader2"
                          size={14}
                          className="mr-1 animate-spin"
                        />
                      ) : (
                        <Icon name="X" size={14} className="mr-1" />
                      )}
                      Отклонить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Mail" size={14} className="mr-1" />
                      Написать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;

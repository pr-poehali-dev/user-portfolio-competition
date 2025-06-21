import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ParticipantsList = () => {
  const { getAllParticipants, deleteUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const participants = getAllParticipants();

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (participant.institution &&
        participant.institution
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));
    const matchesRole =
      selectedRole === "all" || participant.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const roleMap = {
      educator: { label: "Воспитатель", color: "bg-blue-100 text-blue-800" },
      teacher: { label: "Учитель", color: "bg-green-100 text-green-800" },
      student: { label: "Ученик", color: "bg-purple-100 text-purple-800" },
      parent: { label: "Родитель", color: "bg-orange-100 text-orange-800" },
      jury: { label: "Жюри", color: "bg-red-100 text-red-800" },
      admin: { label: "Администратор", color: "bg-gray-100 text-gray-800" },
    };

    const roleInfo = roleMap[role as keyof typeof roleMap] || {
      label: role,
      color: "bg-gray-100 text-gray-800",
    };
    return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>;
  };

  const getStatusBadge = (participant: any) => {
    if (participant.role === "admin") {
      return <Badge className="bg-green-100 text-green-800">Активен</Badge>;
    }

    const isActive = participant.emailConfirmed && participant.adminApproved;
    return (
      <Badge
        className={
          isActive
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }
      >
        {isActive ? "Активен" : "Ожидает активации"}
      </Badge>
    );
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    deleteUser(userId);
    alert(`Пользователь "${userName}" удален`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Все участники системы</h3>
          <p className="text-sm text-gray-600">
            Общее количество: {participants.length}
          </p>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Поиск по имени, email или учреждению..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">Все роли</option>
          <option value="educator">Воспитатель</option>
          <option value="teacher">Учитель</option>
          <option value="student">Ученик</option>
          <option value="parent">Родитель</option>
          <option value="jury">Жюри</option>
          <option value="admin">Администратор</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Users" />
            <span>Участники ({filteredParticipants.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">
                      {participant.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {participant.email}
                    </p>
                    {participant.institution && (
                      <p className="text-sm text-gray-600">
                        <Icon
                          name="Building"
                          size={14}
                          className="inline mr-1"
                        />
                        {participant.institution}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    {getRoleBadge(participant.role)}
                    {getStatusBadge(participant)}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={14} className="mr-1" />
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Удаление пользователя
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы уверены, что хотите удалить пользователя "
                            {participant.fullName}"? Это действие нельзя
                            отменить.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDeleteUser(
                                participant.id,
                                participant.fullName,
                              )
                            }
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Icon
                      name={
                        participant.emailConfirmed ? "CheckCircle" : "Clock"
                      }
                      size={14}
                    />
                    <span>
                      Email{" "}
                      {participant.emailConfirmed
                        ? "подтвержден"
                        : "не подтвержден"}
                    </span>
                  </div>
                  {participant.role !== "admin" && (
                    <div className="flex items-center space-x-1">
                      <Icon
                        name={
                          participant.adminApproved ? "Shield" : "ShieldAlert"
                        }
                        size={14}
                      />
                      <span>
                        Админ{" "}
                        {participant.adminApproved ? "одобрил" : "не одобрил"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantsList;

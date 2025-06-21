import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  emailConfirmed?: boolean;
  adminApproved?: boolean;
  position?: string;
  institution?: string;
  ageOrGrade?: string;
}

const ManageUsers = () => {
  const {
    getAllUsers,
    getPendingUsers,
    approveUser,
    rejectUser,
    toggleJuryStatus,
    updateUserProfile,
  } = useAuth();

  const [allUsers, setAllUsers] = useState(getAllUsers());
  const [pendingUsers, setPendingUsers] = useState(getPendingUsers());
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    institution: "",
    position: "",
    ageOrGrade: "",
  });

  const handleApprove = async (userId: string) => {
    setIsLoading(userId);
    try {
      const success = await approveUser(userId);
      if (success) {
        setPendingUsers(getPendingUsers());
        setAllUsers(getAllUsers());
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
        setPendingUsers(getPendingUsers());
        setAllUsers(getAllUsers());
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

  const handleToggleJury = async (userId: string) => {
    setIsLoading(userId);
    try {
      const success = await toggleJuryStatus(userId);
      if (success) {
        setAllUsers(getAllUsers());
        const user = allUsers.find((u) => u.id === userId);
        const isNowJury = user?.role === "jury";
        toast({
          title: isNowJury ? "Назначен в жюри" : "Убран из жюри",
          description: isNowJury
            ? "Пользователь назначен членом жюри"
            : "Пользователь убран из состава жюри",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус жюри",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      institution: user.institution || "",
      position: user.position || "",
      ageOrGrade: user.ageOrGrade || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    setIsLoading(editingUser.id);
    try {
      const success = await updateUserProfile(editingUser.id, editForm);
      if (success) {
        setAllUsers(getAllUsers());
        setPendingUsers(getPendingUsers());
        setEditingUser(null);
        toast({
          title: "Профиль обновлен",
          description: "Данные пользователя успешно изменены",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
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
      admin: { label: "Администратор", color: "bg-gray-900 text-white" },
    };

    const roleInfo = roleMap[role as keyof typeof roleMap] || {
      label: role,
      color: "bg-gray-100 text-gray-800",
    };
    return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>;
  };

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const approvedUsers = filteredUsers.filter((u) => u.adminApproved);
  const juryUsers = approvedUsers.filter((u) => u.role === "jury");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Всего пользователей
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {allUsers.length}
                </p>
              </div>
              <Icon name="Users" className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Участники</p>
                <p className="text-3xl font-bold text-green-600">
                  {approvedUsers.length}
                </p>
              </div>
              <Icon name="UserCheck" className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Жюри</p>
                <p className="text-3xl font-bold text-red-600">
                  {juryUsers.length}
                </p>
              </div>
              <Icon name="Award" className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ожидают</p>
                <p className="text-3xl font-bold text-orange-600">
                  {pendingUsers.length}
                </p>
              </div>
              <Icon name="Clock" className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Поиск пользователей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Все ({allUsers.length})</TabsTrigger>
              <TabsTrigger value="approved">
                Участники ({approvedUsers.length})
              </TabsTrigger>
              <TabsTrigger value="jury">Жюри ({juryUsers.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Ожидающие ({pendingUsers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <UserTable
                users={filteredUsers}
                onToggleJury={handleToggleJury}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              <UserTable
                users={approvedUsers}
                onToggleJury={handleToggleJury}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>

            <TabsContent value="jury" className="mt-6">
              <UserTable
                users={juryUsers}
                onToggleJury={handleToggleJury}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <PendingUsersList
                users={pendingUsers}
                onApprove={handleApprove}
                onReject={handleReject}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Диалог редактирования пользователя */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать пользователя</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Имя
              </Label>
              <Input
                id="fullName"
                value={editForm.fullName}
                onChange={(e) =>
                  setEditForm({ ...editForm, fullName: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">
                Учреждение
              </Label>
              <Input
                id="institution"
                value={editForm.institution}
                onChange={(e) =>
                  setEditForm({ ...editForm, institution: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Должность
              </Label>
              <Input
                id="position"
                value={editForm.position}
                onChange={(e) =>
                  setEditForm({ ...editForm, position: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Отмена
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isLoading === editingUser?.id}
            >
              {isLoading === editingUser?.id ? (
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
              ) : null}
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Компонент таблицы пользователей
const UserTable = ({
  users,
  onToggleJury,
  onEdit,
  isLoading,
  getRoleBadge,
}: any) => {
  return (
    <div className="space-y-4">
      {users.map((user: User) => (
        <div
          key={user.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-medium text-lg">{user.fullName}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.institution && (
                <p className="text-sm text-gray-500">{user.institution}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {getRoleBadge(user.role)}
              {user.adminApproved && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Активен
                </Badge>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => onToggleJury(user.id)}
              disabled={isLoading === user.id || user.role === "admin"}
              variant={user.role === "jury" ? "default" : "outline"}
              size="sm"
              className={
                user.role === "jury" ? "bg-red-600 hover:bg-red-700" : ""
              }
            >
              {isLoading === user.id ? (
                <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
              ) : (
                <Icon name="Award" size={14} className="mr-1" />
              )}
              {user.role === "jury" ? "Убрать из жюри" : "Назначить жюри"}
            </Button>

            <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
              <Icon name="Edit" size={14} className="mr-1" />
              Редактировать
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Компонент списка ожидающих пользователей
const PendingUsersList = ({
  users,
  onApprove,
  onReject,
  onEdit,
  isLoading,
  getRoleBadge,
}: any) => {
  if (users.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user: User) => (
        <div
          key={user.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-lg">{user.fullName}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.institution && (
                <p className="text-sm text-gray-500">{user.institution}</p>
              )}
            </div>
            {getRoleBadge(user.role)}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Icon
              name={user.emailConfirmed ? "CheckCircle" : "Clock"}
              size={16}
              className={
                user.emailConfirmed ? "text-green-500" : "text-orange-500"
              }
            />
            <span className="text-sm text-gray-600">
              Email {user.emailConfirmed ? "подтвержден" : "не подтвержден"}
            </span>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => onApprove(user.id)}
              disabled={isLoading === user.id}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              {isLoading === user.id ? (
                <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
              ) : (
                <Icon name="Check" size={14} className="mr-1" />
              )}
              Одобрить
            </Button>

            <Button
              onClick={() => onReject(user.id)}
              disabled={isLoading === user.id}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              {isLoading === user.id ? (
                <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
              ) : (
                <Icon name="X" size={14} className="mr-1" />
              )}
              Отклонить
            </Button>

            <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
              <Icon name="Edit" size={14} className="mr-1" />
              Редактировать
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;

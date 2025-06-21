import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { User, UserEditForm } from "@/types/user";
import UserStats from "./UserStats";
import UserFilters from "./UserFilters";
import UserList from "./UserList";
import UserEditDialog from "./UserEditDialog";

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
  const [editForm, setEditForm] = useState<UserEditForm>({
    fullName: "",
    email: "",
    institution: "",
    position: "",
    ageOrGrade: "",
  });

  const refreshData = () => {
    setAllUsers(getAllUsers());
    setPendingUsers(getPendingUsers());
  };

  const handleApprove = async (userId: string) => {
    setIsLoading(userId);
    try {
      const success = await approveUser(userId);
      if (success) {
        refreshData();
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
        refreshData();
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
        refreshData();
        const user = allUsers.find((u) => u.id === userId);
        const isNowJury = user?.role !== "jury";
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
        refreshData();
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
      <UserStats
        allUsers={allUsers}
        approvedUsers={approvedUsers}
        juryUsers={juryUsers}
        pendingUsers={pendingUsers}
      />

      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
          <UserFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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
              <UserList
                users={filteredUsers}
                onToggleJury={handleToggleJury}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              <UserList
                users={approvedUsers}
                onToggleJury={handleToggleJury}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>

            <TabsContent value="jury" className="mt-6">
              <UserList
                users={juryUsers}
                onToggleJury={handleToggleJury}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
              />
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <UserList
                users={pendingUsers}
                onApprove={handleApprove}
                onReject={handleReject}
                onEdit={handleEditUser}
                isLoading={isLoading}
                getRoleBadge={getRoleBadge}
                showApprovalActions={true}
                emptyMessage="Все заявки обработаны"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <UserEditDialog
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveEdit}
        editForm={editForm}
        onFormChange={setEditForm}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ManageUsers;

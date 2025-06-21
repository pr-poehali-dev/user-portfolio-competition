import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

const ProfileSettings = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    role: user?.role || "",
    position: user?.position || "",
    institution: user?.institution || "",
    ageOrGrade: user?.ageOrGrade || "",
    phone: "",
    bio: "",
  });

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      educator: "Воспитатель",
      teacher: "Учитель",
      student: "Ученик",
      parent: "Родитель",
      jury: "Жюри",
      admin: "Администратор",
    };
    return roleLabels[role as keyof typeof roleLabels] || role;
  };

  const getAgeOrGradeLabel = () => {
    if (user?.role === "student") return "Класс";
    return "Возраст";
  };

  const handleSave = () => {
    // В реальном проекте здесь будет API запрос
    console.log("Сохранение профиля:", profileData);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="User" />
            <span>Личная информация</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">ФИО *</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData({ ...profileData, fullName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Роль</Label>
            <Input
              id="role"
              value={getRoleLabel(profileData.role)}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              placeholder="+7 (999) 123-45-67"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Building" />
            <span>Дополнительная информация</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="position">Должность</Label>
            <Input
              id="position"
              value={profileData.position}
              onChange={(e) =>
                setProfileData({ ...profileData, position: e.target.value })
              }
              placeholder="Например: Старший воспитатель"
            />
          </div>

          <div>
            <Label htmlFor="institution">
              Название образовательного учреждения
            </Label>
            <Input
              id="institution"
              value={profileData.institution}
              onChange={(e) =>
                setProfileData({ ...profileData, institution: e.target.value })
              }
              placeholder="Например: МБОУ СОШ №1"
            />
          </div>

          <div>
            <Label htmlFor="ageOrGrade">{getAgeOrGradeLabel()}</Label>
            <Input
              id="ageOrGrade"
              value={profileData.ageOrGrade}
              onChange={(e) =>
                setProfileData({ ...profileData, ageOrGrade: e.target.value })
              }
              placeholder={
                user?.role === "student"
                  ? "Например: 5 класс"
                  : "Например: 25 лет"
              }
            />
          </div>

          <div>
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              placeholder="Расскажите о себе..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Отменить</Button>
        <Button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;

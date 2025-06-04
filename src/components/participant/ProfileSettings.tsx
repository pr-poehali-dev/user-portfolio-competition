import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const ProfileSettings = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Имя</Label>
              <Input id="firstName" defaultValue="Анна" />
            </div>
            <div>
              <Label htmlFor="lastName">Фамилия</Label>
              <Input id="lastName" defaultValue="Иванова" />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="anna.ivanova@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" defaultValue="+7 (999) 123-45-67" />
          </div>

          <div>
            <Label htmlFor="organization">Организация/Учебное заведение</Label>
            <Input id="organization" defaultValue="МГУ им. М.В. Ломоносова" />
          </div>

          <div>
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              placeholder="Расскажите о себе..."
              defaultValue="Студентка 4 курса факультета дизайна, специализируюсь на UX/UI дизайне мобильных приложений."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Award" />
            <span>Данные для диплома</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="diplomaName">ФИО для диплома</Label>
            <Input id="diplomaName" defaultValue="Иванова Анна Сергеевна" />
            <p className="text-sm text-gray-500 mt-1">
              Указывайте точно так, как должно быть написано в дипломе
            </p>
          </div>

          <div>
            <Label htmlFor="diplomaTitle">Должность/Статус</Label>
            <Input id="diplomaTitle" defaultValue="Студент" />
          </div>

          <div>
            <Label htmlFor="diplomaOrg">Организация для диплома</Label>
            <Input
              id="diplomaOrg"
              defaultValue="Московский государственный университет им. М.В. Ломоносова"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Отменить</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;

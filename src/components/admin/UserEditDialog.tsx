import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { User, UserEditForm } from "@/types/user";

interface UserEditDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editForm: UserEditForm;
  onFormChange: (form: UserEditForm) => void;
  isLoading: string | null;
}

const UserEditDialog = ({
  user,
  isOpen,
  onClose,
  onSave,
  editForm,
  onFormChange,
  isLoading,
}: UserEditDialogProps) => {
  const handleInputChange = (field: keyof UserEditForm, value: string) => {
    onFormChange({ ...editForm, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onChange={(e) => handleInputChange("fullName", e.target.value)}
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
              onChange={(e) => handleInputChange("email", e.target.value)}
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
              onChange={(e) => handleInputChange("institution", e.target.value)}
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
              onChange={(e) => handleInputChange("position", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave} disabled={isLoading === user?.id}>
            {isLoading === user?.id ? (
              <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
            ) : null}
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;

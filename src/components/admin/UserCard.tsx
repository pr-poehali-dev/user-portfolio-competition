import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  onToggleJury?: (userId: string) => void;
  onEdit: (user: User) => void;
  onApprove?: (userId: string) => void;
  onReject?: (userId: string) => void;
  isLoading: string | null;
  getRoleBadge: (role: string) => JSX.Element;
  showApprovalActions?: boolean;
}

const UserCard = ({
  user,
  onToggleJury,
  onEdit,
  onApprove,
  onReject,
  isLoading,
  getRoleBadge,
  showApprovalActions = false,
}: UserCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
          {user.adminApproved && !showApprovalActions && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Активен
            </Badge>
          )}
        </div>
      </div>

      {showApprovalActions && (
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
      )}

      <div className="flex space-x-2">
        {showApprovalActions ? (
          <>
            <Button
              onClick={() => onApprove?.(user.id)}
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
              onClick={() => onReject?.(user.id)}
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
          </>
        ) : (
          onToggleJury && (
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
          )
        )}

        <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
          <Icon name="Edit" size={14} className="mr-1" />
          Редактировать
        </Button>
      </div>
    </div>
  );
};

export default UserCard;

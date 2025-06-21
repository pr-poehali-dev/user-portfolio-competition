import UserCard from "./UserCard";
import Icon from "@/components/ui/icon";
import { User } from "@/types/user";

interface UserListProps {
  users: User[];
  onToggleJury?: (userId: string) => void;
  onEdit: (user: User) => void;
  onApprove?: (userId: string) => void;
  onReject?: (userId: string) => void;
  isLoading: string | null;
  getRoleBadge: (role: string) => JSX.Element;
  showApprovalActions?: boolean;
  emptyMessage?: string;
}

const UserList = ({
  users,
  onToggleJury,
  onEdit,
  onApprove,
  onReject,
  isLoading,
  getRoleBadge,
  showApprovalActions = false,
  emptyMessage,
}: UserListProps) => {
  if (users.length === 0 && emptyMessage) {
    return (
      <div className="text-center py-8">
        <Icon
          name="CheckCircle"
          className="h-12 w-12 text-green-500 mx-auto mb-4"
        />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600">
          Нет пользователей, ожидающих подтверждения
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onToggleJury={onToggleJury}
          onEdit={onEdit}
          onApprove={onApprove}
          onReject={onReject}
          isLoading={isLoading}
          getRoleBadge={getRoleBadge}
          showApprovalActions={showApprovalActions}
        />
      ))}
    </div>
  );
};

export default UserList;

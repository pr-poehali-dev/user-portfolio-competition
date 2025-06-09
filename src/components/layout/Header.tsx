import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  const roleLabels = {
    participant: "Участник",
    jury: "Жюри",
    admin: "Администратор",
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Icon name="Trophy" className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">
              Конкурсная система
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.role && roleLabels[user.role]}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-1"
              >
                <Icon name="LogOut" size={16} />
                <span>Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

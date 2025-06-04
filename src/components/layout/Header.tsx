import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  currentRole: "participant" | "jury" | "admin";
  onRoleChange: (role: "participant" | "jury" | "admin") => void;
}

const Header = ({ currentRole, onRoleChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2"
              >
                <Icon name="User" size={16} />
                <span>{roleLabels[currentRole]}</span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                  <div className="py-1">
                    {(
                      Object.keys(roleLabels) as Array<keyof typeof roleLabels>
                    ).map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          onRoleChange(role);
                          setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          currentRole === role
                            ? "bg-purple-50 text-purple-600"
                            : "text-gray-700"
                        }`}
                      >
                        {roleLabels[role]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

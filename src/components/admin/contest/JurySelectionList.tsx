import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  institution?: string;
  position?: string;
}

interface JurySelectionListProps {
  selectedJury: string[];
  onJurySelect: (jury: string[]) => void;
}

const JurySelectionList = ({
  selectedJury,
  onJurySelect,
}: JurySelectionListProps) => {
  const { getJuryUsers } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const juryUsers = getJuryUsers();

  const filteredJury = juryUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.institution &&
        user.institution.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleJuryToggle = (userId: string) => {
    if (selectedJury.includes(userId)) {
      onJurySelect(selectedJury.filter((id) => id !== userId));
    } else {
      onJurySelect([...selectedJury, userId]);
    }
  };

  const selectAll = () => {
    onJurySelect(filteredJury.map((user) => user.id));
  };

  const clearAll = () => {
    onJurySelect([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Поиск по имени, email или учреждению..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={selectAll}
          disabled={filteredJury.length === 0}
        >
          Выбрать всех
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearAll}
          disabled={selectedJury.length === 0}
        >
          Очистить
        </Button>
      </div>

      {filteredJury.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Icon
              name="Users"
              size={48}
              className="mx-auto mb-4 text-muted-foreground"
            />
            <h3 className="text-lg font-medium mb-2">Нет доступного жюри</h3>
            <p className="text-muted-foreground mb-4">
              {juryUsers.length === 0
                ? "В системе пока нет пользователей с ролью жюри"
                : "Никто не найден по вашему запросу"}
            </p>
            <p className="text-sm text-muted-foreground">
              Назначьте роль жюри пользователям в разделе "Управление
              пользователями"
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredJury.map((user) => (
            <Card
              key={user.id}
              className="hover:bg-accent/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedJury.includes(user.id)}
                    onCheckedChange={() => handleJuryToggle(user.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{user.fullName}</h4>
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Gavel" size={12} className="mr-1" />
                        Жюри
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    {user.institution && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Icon
                          name="Building"
                          size={12}
                          className="inline mr-1"
                        />
                        {user.institution}
                      </p>
                    )}
                    {user.position && (
                      <p className="text-xs text-muted-foreground">
                        <Icon
                          name="Briefcase"
                          size={12}
                          className="inline mr-1"
                        />
                        {user.position}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedJury.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
          <Icon name="Check" size={16} className="text-primary" />
          <span className="text-sm font-medium">
            Выбрано жюри: {selectedJury.length} из {filteredJury.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default JurySelectionList;

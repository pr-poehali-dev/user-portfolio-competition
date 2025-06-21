import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contest {
  id: number;
  name: string;
  status: string;
}

const ManageJury = ({ contestId }: { contestId?: number }) => {
  const {
    getJuryUsers,
    assignJuryToContest,
    removeJuryFromContest,
    getContestJury,
  } = useAuth();
  const [selectedContestId, setSelectedContestId] = useState<number>(
    contestId || 0,
  );
  const [selectedJuryIds, setSelectedJuryIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const contests: Contest[] = [
    { id: 1, name: "Конкурс дизайна 2024", status: "active" },
    { id: 2, name: "Архитектурный конкурс", status: "evaluation" },
    { id: 3, name: "Конкурс инноваций", status: "completed" },
  ];

  const juryUsers = getJuryUsers();
  const currentContestJury = selectedContestId
    ? getContestJury(selectedContestId)
    : [];

  useEffect(() => {
    if (selectedContestId) {
      const currentJuryIds = getContestJury(selectedContestId).map(
        (user) => user.id,
      );
      setSelectedJuryIds(currentJuryIds);
    }
  }, [selectedContestId]);

  const handleJuryToggle = (juryId: string, checked: boolean) => {
    if (checked) {
      setSelectedJuryIds([...selectedJuryIds, juryId]);
    } else {
      setSelectedJuryIds(selectedJuryIds.filter((id) => id !== juryId));
    }
  };

  const handleAssignJury = async () => {
    if (!selectedContestId) return;

    setIsLoading(true);
    const success = await assignJuryToContest(
      selectedContestId,
      selectedJuryIds,
    );
    setIsLoading(false);

    if (success) {
      alert("Жюри успешно назначено!");
    } else {
      alert("Ошибка при назначении жюри");
    }
  };

  const handleRemoveJury = async (juryId: string) => {
    if (!selectedContestId) return;

    const success = await removeJuryFromContest(selectedContestId, juryId);
    if (success) {
      setSelectedJuryIds(selectedJuryIds.filter((id) => id !== juryId));
      alert("Жюри удалено из конкурса");
    } else {
      alert("Ошибка при удалении жюри");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="UserCheck" />
            <span>Управление жюри</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Выберите конкурс
              </label>
              <Select
                value={selectedContestId.toString()}
                onValueChange={(value) => setSelectedContestId(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите конкурс" />
                </SelectTrigger>
                <SelectContent>
                  {contests.map((contest) => (
                    <SelectItem key={contest.id} value={contest.id.toString()}>
                      {contest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedContestId > 0 && (
              <>
                <div>
                  <h3 className="text-lg font-medium mb-4">Назначенное жюри</h3>
                  {currentContestJury.length > 0 ? (
                    <div className="space-y-2">
                      {currentContestJury.map((jury) => (
                        <div
                          key={jury.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{jury.fullName}</p>
                            <p className="text-sm text-gray-600">
                              {jury.email}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveJury(jury.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Icon name="X" size={14} className="mr-1" />
                            Убрать
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Жюри не назначено</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Доступное жюри</h3>
                  {juryUsers.length > 0 ? (
                    <div className="space-y-3">
                      {juryUsers.map((jury) => (
                        <div
                          key={jury.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg"
                        >
                          <Checkbox
                            id={jury.id}
                            checked={selectedJuryIds.includes(jury.id)}
                            onCheckedChange={(checked) =>
                              handleJuryToggle(jury.id, checked === true)
                            }
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={jury.id}
                              className="font-medium cursor-pointer"
                            >
                              {jury.fullName}
                            </label>
                            <p className="text-sm text-gray-600">
                              {jury.email}
                            </p>
                            {jury.institution && (
                              <p className="text-sm text-gray-500">
                                {jury.institution}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline">Жюри</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Нет доступных пользователей с ролью жюри
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleAssignJury}
                  disabled={isLoading || selectedJuryIds.length === 0}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Icon
                        name="Loader2"
                        size={16}
                        className="mr-2 animate-spin"
                      />
                      Назначение...
                    </>
                  ) : (
                    <>
                      <Icon name="UserCheck" size={16} className="mr-2" />
                      Назначить жюри
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageJury;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { JurySelectionMode, JuryUser } from "@/types/contest";

interface JurySectionProps {
  jurySelectionMode: JurySelectionMode;
  onModeChange: (mode: JurySelectionMode) => void;
  selectedJury: string[];
  onJuryToggle: (juryId: string) => void;
  juryEmails: string[];
  onEmailUpdate: (index: number, email: string) => void;
  onEmailAdd: () => void;
  onEmailRemove: (index: number) => void;
  juryUsers: JuryUser[];
}

const JurySection = ({
  jurySelectionMode,
  onModeChange,
  selectedJury,
  onJuryToggle,
  juryEmails,
  onEmailUpdate,
  onEmailAdd,
  onEmailRemove,
  juryUsers,
}: JurySectionProps) => {
  return (
    <div>
      <Label>Назначение жюри (минимум 3 человека) *</Label>

      <div className="flex space-x-4 mt-2 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="juryMode"
            checked={jurySelectionMode === "select"}
            onChange={() => onModeChange("select")}
          />
          <span>Выбрать из пользователей</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="juryMode"
            checked={jurySelectionMode === "manual"}
            onChange={() => onModeChange("manual")}
          />
          <span>Ввести вручную</span>
        </label>
      </div>

      {jurySelectionMode === "select" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
            {juryUsers.map((juryUser) => (
              <div
                key={juryUser.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedJury.includes(juryUser.id)
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onJuryToggle(juryUser.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedJury.includes(juryUser.id)}
                    onCheckedChange={() => onJuryToggle(juryUser.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{juryUser.fullName}</p>
                    <p className="text-sm text-gray-600">{juryUser.email}</p>
                    {juryUser.institution && (
                      <p className="text-xs text-gray-500">
                        {juryUser.institution}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Выбрано: {selectedJury.length} из {juryUsers.length} доступных
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {juryEmails.map((email, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => onEmailUpdate(index, e.target.value)}
                className="flex-1"
              />
              {juryEmails.length > 3 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEmailRemove(index)}
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
          ))}
          {juryEmails.length < 10 && (
            <Button variant="outline" size="sm" onClick={onEmailAdd}>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить члена жюри
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default JurySection;

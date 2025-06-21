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

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={jurySelectionMode === "select" ? "default" : "outline"}
            onClick={() => setJurySelectionMode("select")}
            size="sm"
          >
            <Icon name="Users" size={16} className="mr-2" />
            Выбор из жюри
          </Button>
          <Button
            type="button"
            variant={jurySelectionMode === "invite" ? "default" : "outline"}
            onClick={() => setJurySelectionMode("invite")}
            size="sm"
          >
            <Icon name="Mail" size={16} className="mr-2" />
            Пригласить по email
          </Button>
        </div>

        {jurySelectionMode === "select" && (
          <JurySelectionList
            selectedJury={selectedJury}
            onJurySelect={setSelectedJury}
          />
        )}

        {jurySelectionMode === "invite" && (
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
    </div>
  );
};

export default JurySection;

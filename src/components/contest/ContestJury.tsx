import { User } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface ContestJuryProps {
  jury: string[] | User[];
  juryUsers?: User[];
}

const ContestJury = ({ jury, juryUsers = [] }: ContestJuryProps) => {
  // Если жюри - массив ID, найти соответствующих пользователей
  const displayJury =
    Array.isArray(jury) && jury.length > 0
      ? jury.map((item) => {
          if (typeof item === "string") {
            // Если это email
            if (item.includes("@")) {
              return {
                id: item,
                fullName: item.split("@")[0],
                email: item,
                role: "jury" as const,
                emailConfirmed: true,
                adminApproved: true,
              };
            }
            // Если это ID пользователя
            return (
              juryUsers.find((user) => user.id === item) || {
                id: item,
                fullName: "Член жюри",
                email: "",
                role: "jury" as const,
                emailConfirmed: true,
                adminApproved: true,
              }
            );
          }
          return item;
        })
      : [];

  if (displayJury.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Users" size={20} />
          Жюри конкурса
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {displayJury.map((member, index) => (
            <div
              key={member.id || index}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              <Avatar>
                <AvatarFallback>
                  {member.fullName?.charAt(0) || member.email?.charAt(0) || "Ж"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{member.fullName || member.email}</p>
                {member.email && member.email !== member.fullName && (
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                )}
                {member.institution && (
                  <p className="text-xs text-muted-foreground">
                    {member.institution}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContestJury;

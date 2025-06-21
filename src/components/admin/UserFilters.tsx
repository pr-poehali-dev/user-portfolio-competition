import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const UserFilters = ({ searchTerm, onSearchChange }: UserFiltersProps) => {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <div className="relative flex-1 max-w-sm">
        <Icon
          name="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
        <Input
          placeholder="Поиск пользователей..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default UserFilters;

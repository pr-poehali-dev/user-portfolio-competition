import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <Icon
          name="AlertTriangle"
          className="h-16 w-16 text-red-500 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Нет доступа</h1>
        <p className="text-gray-600 mb-6">
          У вас нет прав для просмотра этой страницы
        </p>
        <Link to="/login">
          <Button>Вернуться к входу</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;

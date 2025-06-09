import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Icon
            name="Trophy"
            className="h-12 w-12 text-purple-600 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            Конкурсная система
          </h1>
          <p className="text-gray-600 mt-2">Выберите тип входа</p>
        </div>

        <div className="space-y-4">
          <Link to="/login/participant">
            <Button
              className="w-full h-14 text-left justify-start"
              variant="outline"
            >
              <Icon name="User" className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">Участник</div>
                <div className="text-sm text-gray-500">
                  Подача работ и просмотр результатов
                </div>
              </div>
            </Button>
          </Link>

          <Link to="/login/jury">
            <Button
              className="w-full h-14 text-left justify-start"
              variant="outline"
            >
              <Icon name="Eye" className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">Жюри</div>
                <div className="text-sm text-gray-500">
                  Оценка работ участников
                </div>
              </div>
            </Button>
          </Link>

          <Link to="/login/admin">
            <Button
              className="w-full h-14 text-left justify-start"
              variant="outline"
            >
              <Icon name="Settings" className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">Администратор</div>
                <div className="text-sm text-gray-500">Управление системой</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

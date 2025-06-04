import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import CreateContest from "./CreateContest";
import ManageContests from "./ManageContests";
import GenerateDiplomas from "./GenerateDiplomas";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"manage" | "create" | "diplomas">(
    "manage",
  );

  const tabs = [
    { id: "manage" as const, label: "Управление конкурсами", icon: "Settings" },
    { id: "create" as const, label: "Создать конкурс", icon: "Plus" },
    { id: "diplomas" as const, label: "Дипломы", icon: "Award" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Панель администратора
        </h2>
        <p className="text-gray-600">
          Управление конкурсами и генерация дипломов
        </p>
      </div>

      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2"
          >
            <Icon name={tab.icon as any} size={16} />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      <div className="animate-fade-in">
        {activeTab === "manage" && <ManageContests />}
        {activeTab === "create" && <CreateContest />}
        {activeTab === "diplomas" && <GenerateDiplomas />}
      </div>
    </div>
  );
};

export default AdminDashboard;

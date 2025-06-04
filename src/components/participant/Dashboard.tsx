import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import UploadWork from "./UploadWork";
import MyWorks from "./MyWorks";
import ProfileSettings from "./ProfileSettings";

const ParticipantDashboard = () => {
  const [activeTab, setActiveTab] = useState<"works" | "upload" | "profile">(
    "works",
  );

  const tabs = [
    { id: "works" as const, label: "Мои работы", icon: "FolderOpen" },
    { id: "upload" as const, label: "Загрузить работу", icon: "Upload" },
    { id: "profile" as const, label: "Профиль", icon: "User" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Личный кабинет участника
        </h2>
        <p className="text-gray-600">Управляйте своими конкурсными работами</p>
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
        {activeTab === "works" && <MyWorks />}
        {activeTab === "upload" && <UploadWork />}
        {activeTab === "profile" && <ProfileSettings />}
      </div>
    </div>
  );
};

export default ParticipantDashboard;

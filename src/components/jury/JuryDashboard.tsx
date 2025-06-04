import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import EvaluationPanel from "./EvaluationPanel";
import ContestsList from "./ContestsList";

const JuryDashboard = () => {
  const [activeTab, setActiveTab] = useState<"contests" | "evaluate">(
    "contests",
  );

  const tabs = [
    { id: "contests" as const, label: "Конкурсы", icon: "Trophy" },
    { id: "evaluate" as const, label: "Оценивание", icon: "Star" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Панель жюри</h2>
        <p className="text-gray-600">
          Оценивайте конкурсные работы и определяйте победителей
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
        {activeTab === "contests" && <ContestsList />}
        {activeTab === "evaluate" && <EvaluationPanel />}
      </div>
    </div>
  );
};

export default JuryDashboard;

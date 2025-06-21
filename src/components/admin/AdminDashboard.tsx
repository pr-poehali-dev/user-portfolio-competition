import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import CreateContest from "./CreateContest";
import ManageContests from "./ManageContests";
import GenerateDiplomas from "./GenerateDiplomas";
import ManageUsers from "./ManageUsers";
import ParticipantsList from "./ParticipantsList";
import ManageJury from "./ManageJury";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    | "manage"
    | "create"
    | "edit"
    | "diplomas"
    | "users"
    | "participants"
    | "jury"
  >("manage");
  const [editingContestId, setEditingContestId] = useState<number | null>(null);
  const [juryContestId, setJuryContestId] = useState<number | null>(null);

  // Обработка хеша URL для навигации
  useState(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#admin/create") {
        setActiveTab("create");
      } else if (hash.startsWith("#admin/edit/")) {
        const contestId = parseInt(hash.split("/")[2]);
        setEditingContestId(contestId);
        setActiveTab("edit");
      } else if (hash.startsWith("#admin/jury/")) {
        const contestId = parseInt(hash.split("/")[2]);
        setJuryContestId(contestId);
        setActiveTab("jury");
      } else {
        setActiveTab("manage");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Проверить текущий хеш при загрузке

    return () => window.removeEventListener("hashchange", handleHashChange);
  });

  const tabs = [
    { id: "manage" as const, label: "Управление конкурсами", icon: "Settings" },
    { id: "create" as const, label: "Создать конкурс", icon: "Plus" },
    { id: "diplomas" as const, label: "Дипломы", icon: "Award" },
    {
      id: "users" as const,
      label: "Подтверждение участников",
      icon: "UserCheck",
    },
    {
      id: "participants" as const,
      label: "Участники",
      icon: "Users",
    },
    {
      id: "jury" as const,
      label: "Управление жюри",
      icon: "UserCheck",
    },
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
        {activeTab === "edit" && <CreateContest contestId={editingContestId} />}
        {activeTab === "diplomas" && <GenerateDiplomas />}
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "participants" && <ParticipantsList />}
        {activeTab === "jury" && <ManageJury contestId={juryContestId} />}
      </div>
    </div>
  );
};

export default AdminDashboard;

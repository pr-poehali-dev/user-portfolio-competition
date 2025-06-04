import { useState } from "react";
import Header from "@/components/layout/Header";
import ParticipantDashboard from "@/components/participant/Dashboard";
import JuryDashboard from "@/components/jury/JuryDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<
    "participant" | "jury" | "admin"
  >("participant");

  const renderDashboard = () => {
    switch (currentRole) {
      case "participant":
        return <ParticipantDashboard />;
      case "jury":
        return <JuryDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <ParticipantDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      {renderDashboard()}
    </div>
  );
};

export default Index;

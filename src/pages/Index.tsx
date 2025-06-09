import Header from "@/components/layout/Header";
import ParticipantDashboard from "@/components/participant/Dashboard";
import JuryDashboard from "@/components/jury/JuryDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
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
      <Header />
      {renderDashboard()}
    </div>
  );
};

export default Index;

import Header from "@/components/layout/Header";
import ParticipantDashboard from "@/components/participant/Dashboard";
import JuryDashboard from "@/components/jury/JuryDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PublicContests from "@/components/public/PublicContests";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    if (!user) {
      return <PublicContests />;
    }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Index;

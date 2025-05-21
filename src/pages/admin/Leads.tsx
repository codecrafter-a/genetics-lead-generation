
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import LeadsTable from '@/components/LeadsTable';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const AdminLeads = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Sidebar and Main Content */}
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 min-h-screen px-4 py-6 relative bg-white overflow-hidden border-r border-r-[#e2e8f0]">
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_left,_rgba(224,229,180,0.7)_0%,_white_80%)]" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center space-x-6 px-3 mb-10">
              <h1 className="font-bold text-2xl">almă</h1>
            </div>

            <div className="space-y-1">
              <div className="font-semibold px-3 py-2 hover:bg-white hover:shadow-sm rounded-md">Leads</div>
              <div className="px-3 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-md cursor-pointer">
                Settings
              </div>
            </div>

            <div className="flex items-center justify-between px-3 mt-auto">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">A</div>
                <span className="text-sm font-semibold">Admin</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-xl font-bold mb-6">Leads</h1>
          <LeadsTable />
        </main>
      </div>

    </div>
  );
};

export default AdminLeads;

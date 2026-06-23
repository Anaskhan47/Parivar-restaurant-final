import { createFileRoute, Outlet, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/hooks/useWebSocket";
import { LayoutDashboard, Users, Utensils, Receipt, CalendarDays, Settings, LogOut, Grid3X3, PlusCircle, Sparkles, FolderOpen } from "lucide-react";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import logo from "@/assets/parivar-logo.png";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    // We check auth inside the component to use hooks properly, 
    // but typically you'd check auth state here. 
    // For simplicity with Context, we redirect in the component.
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  useWebSocket(); // Initialize websocket connection
  const billingBadgeCount = useNotificationStore((state) => state.billingBadgeCount);

  const isLoginPage = typeof window !== "undefined" && window.location.pathname === "/admin/login";

  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [user, isLoading, isLoginPage, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user && !isLoginPage) {
    return null;
  }

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="flex flex-col items-center justify-center py-6 border-b border-gray-200 gap-2">
          <img src={logo} alt="Parivar Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
          <span className="font-display font-bold text-xl text-[#0B5D3B]">Parivar OS</span>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem to="/admin/floor" icon={<Grid3X3 size={20} />} label="Floor View" />
            <NavItem to="/admin/kitchen" icon={<Utensils size={20} />} label="Kitchen Command" />
            <NavItem to="/admin/billing" icon={<Receipt size={20} />} label="Billing & Payments" badgeCount={billingBadgeCount} />
            <NavItem to="/admin/catering" icon={<CalendarDays size={20} />} label="Catering" />
            {user?.role === "SUPER_ADMIN" && (
              <>
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Management</p>
                </div>
                <NavItem to="/admin/addons" icon={<PlusCircle size={20} />} label="Add-ons" />
                <NavItem to="/admin/specials" icon={<Sparkles size={20} />} label="Today's Special" />
                <NavItem to="/admin/categories" icon={<FolderOpen size={20} />} label="Categories" />
                <NavItem to="/admin/menu" icon={<Utensils size={20} />} label="Menu" />
                <NavItem to="/admin/users" icon={<Users size={20} />} label="Staff" />
                <NavItem to="/admin/settings" icon={<Settings size={20} />} label="Settings" />
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center font-bold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
            <button onClick={() => { logout(); navigate({ to: "/admin/login" }); }} className="text-gray-400 hover:text-red-600 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Parivar Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
              <span className="font-display font-bold text-xl text-[#0B5D3B]">Parivar OS</span>
            </div>
            <button onClick={() => { logout(); navigate({ to: "/admin/login" }); }} className="text-gray-400 hover:text-red-600">
              <LogOut size={20} />
            </button>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label, badgeCount }: { to: string; icon: React.ReactNode; label: string; badgeCount?: number }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-[#0B5D3B]/10 text-[#0B5D3B]" }}
      inactiveProps={{ className: "text-gray-600 hover:bg-gray-50" }}
      className="flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-colors"
      activeOptions={{ exact: to === "/admin" }}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
          {badgeCount}
        </span>
      )}
    </Link>
  );
}

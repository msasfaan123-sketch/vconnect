import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  GitCompare, 
  RefreshCw, 
  BarChart3, 
  Leaf, 
  Calculator,
  Brain,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminNavbarProps {
  onLogout: () => void;
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: GitCompare, label: "Compare Villages", path: "/compare" },
  { icon: RefreshCw, label: "Update Status", path: "/update-status" },
  { icon: BarChart3, label: "AI Analytics", path: "/analytics" },
  { icon: Leaf, label: "Crop Advisor", path: "/crop-advisor" },
  { icon: Calculator, label: "Cost Estimator", path: "/cost-estimator" },
  { icon: Brain, label: "SoulScan Insights", path: "/soulscan-insights" },
];

export default function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass-nav sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="glass-card p-2 rounded-lg">
            <Home className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">V-Connect Admin</h1>
            <p className="text-xs text-muted-foreground">Village Integration Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-2 transition-all ${
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground shadow-card" 
                  : "hover:bg-white/10 text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast({
                title: "Logged out successfully",
                description: "You have been logged out of the admin panel.",
              });
              onLogout();
            }}
            className="hover:bg-white/10 text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Logout</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden hover:bg-white/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 glass-card rounded-lg p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full justify-start space-x-3 ${
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
}
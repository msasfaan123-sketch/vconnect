import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Bot, 
  AlertCircle, 
  BarChart3, 
  Sprout, 
  GraduationCap, 
  TrendingUp,
  Brain,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface UserNavbarProps {
  onLogout: () => void;
}

export default function UserNavbar({ onLogout }: UserNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/user', icon: Home, label: 'Home' },
    { path: '/user/chatbot', icon: Bot, label: 'Chatbot' },
    { path: '/user/report', icon: AlertCircle, label: 'Report Issue' },
    { path: '/user/status', icon: BarChart3, label: 'Status' },
    { path: '/user/crop-advisor', icon: Sprout, label: 'Crop Advisor' },
    { path: '/user/edupath', icon: GraduationCap, label: 'EduPath' },
    { path: '/user/insights', icon: TrendingUp, label: 'AI Insights' },
    { path: '/user/soulscan', icon: Brain, label: 'SoulScan' },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              V-Connect User
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`glass-button-sm ${isActive ? 'bg-primary/20' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="glass-button-sm text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-button-sm"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10 animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start glass-button-sm ${isActive ? 'bg-primary/20' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start glass-button-sm text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
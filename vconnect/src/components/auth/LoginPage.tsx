import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLogin: (userType: 'admin' | 'user') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'admin' && password === 'admin123') {
      toast({
        title: "Welcome Admin!",
        description: "Redirecting to admin dashboard...",
      });
      onLogin('admin');
    } else if (username === 'user' && password === 'user123') {
      toast({
        title: "Welcome User!",
        description: "Redirecting to user dashboard...",
      });
      onLogin('user');
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center opacity-20"></div>
      
      <Card className="w-full max-w-md glass-card relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            V-Connect
          </CardTitle>
          <p className="text-muted-foreground">Village Integration Platform</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full glass-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="text-sm text-muted-foreground text-center space-y-1">
              <p>Demo Credentials:</p>
              <p>Admin: admin / admin123</p>
              <p>User: user / user123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
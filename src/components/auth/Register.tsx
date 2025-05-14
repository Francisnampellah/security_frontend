import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Shield, Zap, BarChart3, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.register(
        formData.email,
        formData.password
      );
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Register Form */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SecureShield</h1>
            </div>
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join our security platform and start protecting your applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <div className="text-center text-sm">
                <a href="/login" className="text-primary hover:underline">
                  Already have an account? Sign in
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="hidden md:block space-y-8">
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="text-2xl font-bold">Platform Features</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Comprehensive Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced vulnerability scanning and real-time threat detection for your applications.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Quick Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Get started in minutes with our intuitive interface and automated scanning tools.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Detailed Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Access comprehensive security reports and actionable insights for your team.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Enterprise Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security features with role-based access control and audit logs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg border p-6">
            <h3 className="font-semibold mb-2">Why Choose Us?</h3>
            <p className="text-sm text-muted-foreground">
              Join thousands of organizations that trust our platform for their security needs. Get started with a free trial and experience the power of advanced vulnerability testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

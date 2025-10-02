import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { apiService } from "@/services/api";

/**
 * Main authentication component for SaaS MVP
 * Handles user registration and login with JWT token management
 */
const Auth = () => {
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Check for existing token on component mount
   * If token exists, user is already authenticated
   */
  useEffect(() => {
    const isAuth = apiService.isAuthenticated();
    if (isAuth) {
      setToken("authenticated");
    }
  }, []);

  /**
   * Handle user registration
   * Uses API service to register user and store JWT token
   */
  const handleRegister = async () => {
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await apiService.register(email, password);
      setToken("authenticated");
      toast.success("Registration successful!");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user login
   * Uses API service to login user and store JWT token
   */
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await apiService.login(email, password);
      setToken("authenticated");
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user logout
   * Uses API service to logout user
   */
  const handleLogout = () => {
    apiService.logout();
    setToken(null);
    toast.success("Logged out successfully");
  };

  /**
   * Handle Enter key press for form submission
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="min-h-screen flex items-center justify-center p-4 pt-32">
        {/* Background gradient overlay */}
        <div
          className="fixed inset-0 -z-10 opacity-50"
          style={{
            background: "var(--gradient-bg)",
          }}
        />

        {/* Accent glow effect */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] -z-10 opacity-20 blur-3xl rounded-full"
          style={{
            background: "var(--gradient-accent)",
          }}
        />

        {token ? (
          // Authenticated state - show token info
          <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <span className="text-2xl">✅</span>
              </div>
              <CardTitle className="text-2xl font-bold">Logged In!</CardTitle>
              <CardDescription>
                You are successfully authenticated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <Label className="text-sm text-muted-foreground">
                  Token Preview:
                </Label>
                <p className="mt-2 font-mono text-sm break-all text-foreground">
                  {token.substring(0, 10)}...
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="flex-1"
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Unauthenticated state - show login form
          <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email input field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="bg-background/50"
                />
              </div>

              {/* Password input field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="bg-background/50"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleRegister}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1"
                >
                  Register
                </Button>
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </div>

              {/* Info text for beginners */}
              <p className="text-xs text-center text-muted-foreground pt-4">
                Backend API should be running at localhost:5000
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;

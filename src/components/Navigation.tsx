import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

/**
 * Main navigation component
 * Displays logo, navigation links, and sign up button
 */
const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--nav-bg))] border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Sparkles className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="text-xl font-bold text-white">Lynko</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/prompt-builder"
              className="text-white/90 hover:text-white transition-colors"
              data-testid="link-prompt-builder"
            >
              Prompt Builder
            </Link>
            <Link
              to="/chatbot-test"
              className="text-white/90 hover:text-white transition-colors"
              data-testid="link-chatbot-test"
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="text-white/90 hover:text-white transition-colors"
              data-testid="link-resources"
            >
              Resources
            </Link>
          </div>

          {/* Sign up button */}
          <Link to="/auth">
            <Button className="bg-white text-foreground hover:bg-white/90">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

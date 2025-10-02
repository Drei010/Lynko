import Navigation from "@/components/Navigation";
import HeroVisual from "@/components/HeroVisual";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Landing page component
 * Showcases the product value proposition with hero section
 */
const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <Badge
                variant="secondary"
                className="bg-[hsl(var(--badge-bg))] text-white hover:bg-[hsl(var(--badge-bg))]/90 inline-flex items-center gap-2 py-2 px-4 text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Empowering SDRs to close more deals
              </Badge>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  AI Conversations,
                  <br />
                  Human Conversions
                </h1>

                <p className="text-lg text-muted-foreground max-w-xl">
                  Lynko autonomously handles entire personalised LinkedIn
                  conversations at scale, qualifying prospects and booking
                  meetings all by itself.
                </p>
              </div>

              {/* CTA button */}
              <div className="space-y-3">
                <Link to="/auth">
                  <Button
                    size="lg"
                    className="bg-[hsl(var(--badge-bg))] hover:bg-[hsl(var(--badge-bg))]/90 text-white px-8 py-6 text-base group"
                  >
                    Get started now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-sm text-muted-foreground">
                  Start instantly • Cancel anytime
                </p>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative h-[500px] lg:h-[600px]">
              <HeroVisual />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;

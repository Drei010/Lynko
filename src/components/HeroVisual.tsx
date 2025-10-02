import { Linkedin, Mail, Code, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";

/**
 * Hero visual component showing connected nodes and activity feed
 * Represents the automation and integration features
 */
const HeroVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <line 
          x1="30%" y1="30%" x2="50%" y2="50%" 
          stroke="hsl(var(--border))" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <line 
          x1="50%" y1="50%" x2="70%" y2="30%" 
          stroke="hsl(var(--border))" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <line 
          x1="50%" y1="50%" x2="30%" y2="70%" 
          stroke="hsl(var(--border))" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
      </svg>

      {/* Icon nodes */}
      <div className="absolute top-[20%] left-[25%] animate-float">
        <div className="bg-white rounded-full p-4 shadow-lg border border-border">
          <Mail className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="absolute top-[25%] left-[20%] animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="bg-white rounded-full p-4 shadow-lg border border-border">
          <Linkedin className="h-6 w-6 text-[#0077b5]" />
        </div>
      </div>

      <div className="absolute bottom-[35%] left-[20%] animate-float" style={{ animationDelay: "1s" }}>
        <div className="bg-white rounded-full p-4 shadow-lg border border-border">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* Center node */}
      <div className="relative z-10 bg-white rounded-full p-6 shadow-xl border-2 border-primary/20">
        <Code className="h-8 w-8 text-foreground" />
      </div>

      {/* Activity feed */}
      <div className="absolute top-[15%] right-[10%] space-y-3 animate-fade-in">
        <div className="bg-white rounded-lg p-3 shadow-lg border border-border max-w-[250px]">
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 rounded-full p-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Lead Matching Process</p>
              <p className="text-xs text-muted-foreground">Carla Marka matched with ICP criteria</p>
              <p className="text-xs text-muted-foreground mt-1">10m ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-lg border border-border max-w-[250px]">
          <div className="flex items-start gap-3">
            <div className="bg-pink-100 rounded-full p-2">
              <div className="w-4 h-4 bg-pink-500 rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Lead Scoring</p>
              <p className="text-xs text-muted-foreground">Carla Marka scored 87/100</p>
              <p className="text-xs text-muted-foreground mt-1">7m ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;

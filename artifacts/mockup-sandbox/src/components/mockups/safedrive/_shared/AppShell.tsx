import React from "react";
import { 
  LayoutDashboard, 
  Camera, 
  Bell, 
  MapPin, 
  ShieldCheck, 
  User, 
  LogOut,
  Search
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import "./tokens.css";

interface AppShellProps {
  active: "dashboard" | "cameras" | "alerts" | "gps" | "security" | "profile";
  children: React.ReactNode;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "cameras", label: "Câmeras", icon: Camera },
  { id: "alerts", label: "Alertas", icon: Bell },
  { id: "gps", label: "GPS", icon: MapPin },
  { id: "security", label: "Segurança", icon: ShieldCheck },
  { id: "profile", label: "Perfil", icon: User },
];

export function AppShell({ active, children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <ShieldCheck className="w-6 h-6 text-primary mr-3" />
          <span className="font-bold text-xl tracking-tight">SafeDrive</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center px-3 py-2.5 rounded-md transition-colors ${
                  isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-primary" : "opacity-70"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-border">
          <button className="w-full flex items-center px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
            <LogOut className="w-5 h-5 mr-3 opacity-70" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-8">
          <div className="flex items-center w-96 relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input 
              placeholder="Buscar veículos, alertas..." 
              className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-secondary"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background"></span>
            </button>
            <div className="h-8 w-px bg-border mx-2"></div>
            <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium leading-none">Carlos Mendes</p>
                <p className="text-xs text-muted-foreground mt-1">Plano Premium</p>
              </div>
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary font-medium">CM</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

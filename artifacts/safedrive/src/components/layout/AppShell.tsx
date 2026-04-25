import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Camera,
  Bell,
  MapPin,
  ShieldCheck,
  User,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AppShellProps {
  active:
    | "dashboard"
    | "cameras"
    | "alerts"
    | "gps"
    | "security"
    | "profile";
  children: React.ReactNode;
}

interface NavItem {
  id: AppShellProps["active"];
  label: string;
  icon: typeof LayoutDashboard;
  href?: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "cameras", label: "Câmeras", icon: Camera, href: "/dashboard/cameras" },
  { id: "alerts", label: "Alertas", icon: Bell, href: "/dashboard/alerts" },
  { id: "gps", label: "GPS", icon: MapPin, href: "/dashboard/gps" },
  { id: "security", label: "Segurança", icon: ShieldCheck, href: "/dashboard/security" },
  { id: "profile", label: "Perfil", icon: User, href: "/dashboard/profile" },
];

export function AppShell({ active, children }: AppShellProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function handleSignOut() {
    toast({
      title: "Sessão terminada",
      description: "Até breve.",
    });
    setLocation("/");
  }

  function handleComingSoon(label: string) {
    toast({
      title: `${label} em breve`,
      description: "Esta secção está em desenvolvimento.",
    });
  }

  function renderNavLink(item: NavItem, onClick?: () => void) {
    const isActive = active === item.id;
    const baseClass = `w-full flex items-center px-3 py-2.5 rounded-md transition-colors ${
      isActive
        ? "bg-secondary text-foreground font-medium"
        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
    }`;
    const iconClass = `w-5 h-5 mr-3 ${isActive ? "text-primary" : "opacity-70"}`;

    if (item.href) {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={baseClass}
          onClick={onClick}
          data-testid={`nav-${item.id}`}
        >
          <item.icon className={iconClass} />
          {item.label}
        </Link>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        className={baseClass}
        onClick={() => {
          handleComingSoon(item.label);
          onClick?.();
        }}
        data-testid={`nav-${item.id}`}
      >
        <item.icon className={iconClass} />
        {item.label}
      </button>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 border-r border-border bg-card flex-col">
        <Link
          href="/"
          className="h-16 flex items-center px-6 border-b border-border hover:opacity-80 transition-opacity"
        >
          <ShieldCheck className="w-6 h-6 text-primary mr-3" />
          <span className="font-bold text-xl tracking-tight">SafeDrive</span>
        </Link>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => renderNavLink(item))}
        </nav>
        <div className="p-4 mt-auto border-t border-border">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            data-testid="button-signout"
          >
            <LogOut className="w-5 h-5 mr-3 opacity-70" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileNavOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMobileNavOpen(false)}
              >
                <ShieldCheck className="w-6 h-6 text-primary mr-3" />
                <span className="font-bold text-xl tracking-tight">SafeDrive</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1 rounded-md hover:bg-secondary text-muted-foreground"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1">
              {navItems.map((item) =>
                renderNavLink(item, () => setMobileNavOpen(false))
              )}
            </nav>
            <div className="p-4 mt-auto border-t border-border">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              >
                <LogOut className="w-5 h-5 mr-3 opacity-70" />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-secondary text-muted-foreground"
              aria-label="Abrir menu"
              data-testid="button-mobile-menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center w-full max-w-md relative">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar veículos, alertas..."
                className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-secondary"
                data-testid="input-search"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              type="button"
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Notificações"
              data-testid="button-notifications"
              onClick={() => handleComingSoon("Notificações")}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background"></span>
            </button>
            <div className="hidden sm:block h-8 w-px bg-border mx-1"></div>
            <button
              type="button"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              aria-label="Conta"
              data-testid="button-account"
              onClick={() => handleComingSoon("Perfil")}
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium leading-none">Carlos Mendes</p>
                <p className="text-xs text-muted-foreground mt-1">Plano Premium</p>
              </div>
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-primary/20 text-primary font-medium">
                  CM
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}

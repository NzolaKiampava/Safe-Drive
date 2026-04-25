import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  MoreVertical,
  Filter as FilterIcon,
  MapPin,
  Clock,
  Camera as CameraIcon,
  Lock,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AlertType = "critical" | "warning" | "info";
type AlertStatus = "new" | "viewed" | "resolved";

interface AlertItem {
  id: number;
  type: AlertType;
  title: string;
  vehicle: string;
  location: string;
  time: string;
  status: AlertStatus;
  score: number | null;
}

const INITIAL_ALERTS: AlertItem[] = [
  { id: 1, type: "critical", title: "Possível colisão detectada", vehicle: "Tesla Model 3", location: "Rua Garrett, Lisboa", time: "Hoje, 14:32", status: "new", score: 98 },
  { id: 2, type: "warning", title: "Movimento suspeito", vehicle: "Tesla Model 3", location: "Rua Garrett, Lisboa", time: "Hoje, 14:28", status: "viewed", score: 65 },
  { id: 3, type: "info", title: "Geofence: Saída de zona segura", vehicle: "BMW i4", location: "A5, Cascais", time: "Hoje, 09:15", status: "resolved", score: null },
  { id: 4, type: "warning", title: "Bateria do sistema baixa (15%)", vehicle: "Mercedes X5", location: "Parque das Nações", time: "Ontem, 22:10", status: "new", score: null },
  { id: 5, type: "critical", title: "Desconexão forçada de câmera", vehicle: "Tesla Model 3", location: "Rua Garrett, Lisboa", time: "Ontem, 18:45", status: "resolved", score: 100 },
];

type TabId = "all" | "critical" | "new";

const typeConfig: Record<
  AlertType,
  {
    color: string;
    bg: string;
    bgSoft: string;
    border: string;
    icon: typeof AlertTriangle;
    badge: string;
  }
> = {
  critical: {
    color: "text-destructive",
    bg: "bg-destructive",
    bgSoft: "bg-destructive/10",
    border: "border-destructive",
    icon: AlertTriangle,
    badge: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-0 px-3 py-1",
  },
  warning: {
    color: "text-warning",
    bg: "bg-warning",
    bgSoft: "bg-warning/10",
    border: "border-warning",
    icon: Info,
    badge: "bg-warning/10 text-warning hover:bg-warning/20 border-0 px-3 py-1",
  },
  info: {
    color: "text-info",
    bg: "bg-info",
    bgSoft: "bg-info/10",
    border: "border-info",
    icon: Info,
    badge: "bg-info/10 text-info hover:bg-info/20 border-0 px-3 py-1",
  },
};

export default function Alerts() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [selectedId, setSelectedId] = useState<number>(INITIAL_ALERTS[0].id);
  const [tab, setTab] = useState<TabId>("all");

  const counts = useMemo(
    () => ({
      all: alerts.length,
      critical: alerts.filter((a) => a.type === "critical").length,
      new: alerts.filter((a) => a.status === "new").length,
      resolvedToday: alerts.filter((a) => a.status === "resolved").length,
      warning: alerts.filter((a) => a.type === "warning").length,
    }),
    [alerts],
  );

  const visibleAlerts = useMemo(() => {
    if (tab === "critical") return alerts.filter((a) => a.type === "critical");
    if (tab === "new") return alerts.filter((a) => a.status === "new");
    return alerts;
  }, [alerts, tab]);

  const selectedAlert =
    alerts.find((a) => a.id === selectedId) ?? alerts[0];
  const selectedConfig = typeConfig[selectedAlert.type];

  function handleSelect(alert: AlertItem) {
    setSelectedId(alert.id);
    if (alert.status === "new") {
      setAlerts((prev) =>
        prev.map((a) => (a.id === alert.id ? { ...a, status: "viewed" } : a)),
      );
    }
  }

  function handleResolve() {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === selectedAlert.id ? { ...a, status: "resolved" } : a,
      ),
    );
    toast({
      title: "Alerta marcado como resolvido",
      description: selectedAlert.title,
    });
  }

  function handleLockVehicle() {
    toast({
      title: "Veículo bloqueado",
      description: `${selectedAlert.vehicle} bloqueado remotamente.`,
    });
  }

  function handleViewCameras() {
    toast({
      title: "A abrir câmeras",
      description: `Câmeras de ${selectedAlert.vehicle}.`,
    });
  }

  function handleExport() {
    toast({
      title: "Relatório em preparação",
      description: "Receberá uma notificação quando estiver disponível.",
    });
  }

  function handleFilter() {
    toast({
      title: "Filtros avançados em breve",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  return (
    <AppShell active="alerts">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              data-testid="text-alerts-title"
            >
              Alertas de Segurança
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestão de incidentes e notificações do sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-border bg-card"
              onClick={handleFilter}
              data-testid="button-filter"
            >
              <FilterIcon className="w-4 h-4 mr-2" /> Filtrar
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleExport}
              data-testid="button-export"
            >
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <Card className="bg-destructive border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <CardContent className="p-6 relative z-10 text-white">
              <p className="text-sm font-medium text-white/80 mb-2">Críticos</p>
              <div className="flex items-end justify-between">
                <p
                  className="text-4xl font-bold font-mono"
                  data-testid="stat-critical"
                >
                  {counts.critical.toString().padStart(2, "0")}
                </p>
                <div className="flex items-center text-xs font-medium bg-black/20 px-2 py-1 rounded">
                  <span className="text-white">↑ 1 desde ontem</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-warning border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Info className="w-16 h-16 text-white" />
            </div>
            <CardContent className="p-6 relative z-10 text-white">
              <p className="text-sm font-medium text-white/80 mb-2">Avisos</p>
              <div className="flex items-end justify-between">
                <p
                  className="text-4xl font-bold font-mono"
                  data-testid="stat-warning"
                >
                  {counts.warning.toString().padStart(2, "0")}
                </p>
                <div className="flex items-center text-xs font-medium bg-black/20 px-2 py-1 rounded">
                  <span className="text-white">↓ 2 desde ontem</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-success border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <CardContent className="p-6 relative z-10 text-white">
              <p className="text-sm font-medium text-white/80 mb-2">
                Resolvidos Hoje
              </p>
              <div className="flex items-end justify-between">
                <p
                  className="text-4xl font-bold font-mono"
                  data-testid="stat-resolved"
                >
                  {counts.resolvedToday.toString().padStart(2, "0")}
                </p>
                <div className="flex items-center text-xs font-medium bg-black/20 px-2 py-1 rounded">
                  <span className="text-white">↑ 4 desde ontem</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 min-h-0">
          {/* List Column */}
          <div className="lg:col-span-2 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-2 border-b border-border bg-secondary/30">
              <div className="bg-background border border-border p-1 inline-flex rounded-lg">
                <button
                  type="button"
                  onClick={() => setTab("all")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center transition-colors ${
                    tab === "all"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="tab-all"
                >
                  Todos
                  <Badge
                    className={`ml-2 font-mono border-none ${tab === "all" ? "bg-white/20 text-white hover:bg-white/20" : "bg-secondary text-muted-foreground hover:bg-secondary"}`}
                  >
                    {counts.all}
                  </Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setTab("critical")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center transition-colors ${
                    tab === "critical"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="tab-critical"
                >
                  Críticos
                  <Badge
                    variant="outline"
                    className={`ml-2 font-mono ${tab === "critical" ? "bg-white/20 text-white border-white/30" : "bg-destructive/10 text-destructive border-destructive/20"}`}
                  >
                    {counts.critical}
                  </Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setTab("new")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center transition-colors ${
                    tab === "new"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="tab-new"
                >
                  Novos
                  <Badge
                    variant="outline"
                    className={`ml-2 font-mono ${tab === "new" ? "bg-white/20 text-white border-white/30" : "bg-primary/10 text-primary border-primary/20"}`}
                  >
                    {counts.new}
                  </Badge>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
              {visibleAlerts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Nenhum alerta nesta categoria.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {visibleAlerts.map((alert) => {
                    const isSelected = selectedAlert.id === alert.id;
                    const config = typeConfig[alert.type];
                    const Icon = config.icon;

                    return (
                      <button
                        key={alert.id}
                        type="button"
                        onClick={() => handleSelect(alert)}
                        className={`w-full text-left p-4 cursor-pointer transition-colors relative flex gap-4 ${
                          isSelected
                            ? "bg-secondary/50"
                            : "hover:bg-secondary/20"
                        }`}
                        data-testid={`alert-row-${alert.id}`}
                      >
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.bg}`}
                        />

                        <div
                          className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgSoft} ${config.color} border border-border`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1 gap-3">
                            <h3
                              className={`font-semibold truncate ${alert.status === "new" ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {alert.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {alert.score !== null && (
                                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                                  IA {alert.score}%
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {alert.time}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground/80">
                              {alert.vehicle}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />{" "}
                              {alert.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-center ml-2">
                          {alert.status === "new" && (
                            <span
                              className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"
                              style={{
                                boxShadow: "0 0 8px hsl(var(--primary))",
                              }}
                            />
                          )}
                          {alert.status === "resolved" && (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Details Panel */}
          <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start mb-4">
                <Badge className={selectedConfig.badge}>
                  {selectedAlert.type.toUpperCase()}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2"
                  aria-label="Mais opções"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <h2
                className="text-xl font-bold mb-2 leading-tight"
                data-testid="text-selected-title"
              >
                {selectedAlert.title}
              </h2>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> {selectedAlert.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {selectedAlert.location}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-6">
              {selectedAlert.score !== null && (
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Índice de Confiança IA
                    </span>
                    <span className="font-bold font-mono text-destructive">
                      {selectedAlert.score}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive transition-all"
                      style={{ width: `${selectedAlert.score}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Event Timeline */}
              <div>
                <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">
                  Linha do Tempo
                </h4>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
                  <div className="relative flex items-start pl-6">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-background border-2 border-destructive flex items-center justify-center mt-0.5 z-10">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Evento Detectado (IA)
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Sensores de impacto traseiro ativados.
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        14:32:05
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-start pl-6">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center mt-0.5 z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Gravação Iniciada
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Câmera traseira e lateral direita.
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        14:32:06
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-start pl-6">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-background border-2 border-border flex items-center justify-center mt-0.5 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Alerta Enviado
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Notificação Push enviada para Carlos Mendes.
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        14:32:08
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Snippet */}
              <div className="w-full h-32 bg-[#0a0f1a] rounded-lg border border-border relative overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <svg
                  className="absolute inset-0 w-full h-full z-0 opacity-40 text-secondary"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,60 Q 150,40 300,100"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center animate-ping absolute" />
                  <div className="w-6 h-6 bg-card rounded-full border-2 border-destructive flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="w-3 h-3 text-destructive" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">
                  Ações Sugeridas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full bg-destructive/5 border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive flex-col h-auto py-3 gap-2"
                    onClick={handleLockVehicle}
                    data-testid="button-lock-vehicle"
                  >
                    <Lock className="w-5 h-5" /> Bloquear Veículo
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-secondary/50 border-border hover:bg-secondary flex-col h-auto py-3 gap-2 text-foreground"
                    onClick={handleViewCameras}
                    data-testid="button-view-cameras"
                  >
                    <CameraIcon className="w-5 h-5" /> Ver Câmeras
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-secondary/30 flex gap-2">
              <Button
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground disabled:opacity-60"
                onClick={handleResolve}
                disabled={selectedAlert.status === "resolved"}
                data-testid="button-resolve"
              >
                {selectedAlert.status === "resolved"
                  ? "Já Resolvido"
                  : "Marcar Resolvido"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

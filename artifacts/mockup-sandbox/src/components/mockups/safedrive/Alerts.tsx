import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Info, MoreVertical, Filter, MapPin, Clock, ArrowRight, Camera, Lock } from "lucide-react";
import { AppShell } from "./_shared/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "./_shared/tokens.css";

const MOCK_ALERTS = [
  { id: 1, type: "critical", title: "Possível colisão detectada", vehicle: "Tesla Model 3", location: "Rua Garrett, Lisboa", time: "Hoje, 14:32", status: "new", score: 98 },
  { id: 2, type: "warning", title: "Movimento suspeito", vehicle: "Tesla Model 3", location: "Rua Garrett, Lisboa", time: "Hoje, 14:28", status: "viewed", score: 65 },
  { id: 3, type: "info", title: "Geofence: Saída de zona segura", vehicle: "BMW i4", location: "A5, Cascais", time: "Hoje, 09:15", status: "resolved", score: null },
  { id: 4, type: "warning", title: "Bateria do sistema baixa (15%)", vehicle: "Mercedes X5", location: "Parque das Nações", time: "Ontem, 22:10", status: "new", score: null },
  { id: 5, type: "critical", title: "Desconexão forçada de câmera", vehicle: "Tesla Model 3", location: "Rua Garrett, Lisboa", time: "Ontem, 18:45", status: "resolved", score: 100 },
];

export function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState(MOCK_ALERTS[0]);

  return (
    <AppShell active="alerts">
      <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Alertas de Segurança</h1>
            <p className="text-muted-foreground mt-1">Gestão de incidentes e notificações do sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border bg-card">
              <Filter className="w-4 h-4 mr-2" /> Filtrar
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-danger border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <CardContent className="p-6 relative z-10 text-white">
              <p className="text-sm font-medium text-white/80 mb-2">Críticos</p>
              <div className="flex items-end justify-between">
                <p className="text-4xl font-bold font-mono">02</p>
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
                <p className="text-4xl font-bold font-mono">05</p>
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
              <p className="text-sm font-medium text-white/80 mb-2">Resolvidos Hoje</p>
              <div className="flex items-end justify-between">
                <p className="text-4xl font-bold font-mono">12</p>
                <div className="flex items-center text-xs font-medium bg-black/20 px-2 py-1 rounded">
                  <span className="text-white">↑ 4 desde ontem</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
          
          {/* List Column */}
          <div className="lg:col-span-2 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-2 border-b border-border bg-secondary/30">
              <div className="bg-background border border-border p-1 inline-flex rounded-lg">
                <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-white shadow-sm flex items-center">
                  Todos <Badge className="ml-2 bg-white/20 text-white hover:bg-white/20 border-none font-mono">15</Badge>
                </button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  Críticos <Badge variant="outline" className="ml-2 bg-danger/10 text-danger border-danger/20 font-mono">2</Badge>
                </button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  Novos <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20 font-mono">5</Badge>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-0">
              <div className="divide-y divide-border">
                {MOCK_ALERTS.map((alert) => {
                  const isSelected = selectedAlert.id === alert.id;
                  const config = {
                    critical: { color: "text-danger", bg: "bg-danger", bgSoft: "bg-danger/10", border: "border-danger", icon: AlertTriangle },
                    warning: { color: "text-warning", bg: "bg-warning", bgSoft: "bg-warning/10", border: "border-warning", icon: Info },
                    info: { color: "text-info", bg: "bg-info", bgSoft: "bg-info/10", border: "border-info", icon: Info },
                  }[alert.type];

                  return (
                    <div 
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className={`p-4 cursor-pointer transition-colors relative flex gap-4 ${isSelected ? 'bg-secondary/50' : 'hover:bg-secondary/20'}`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.bg}`}></div>
                      
                      <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgSoft} ${config.color} border border-border`}>
                        <config.icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-semibold truncate ${alert.status === 'new' ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {alert.title}
                          </h3>
                          <div className="flex items-center gap-2 ml-4">
                            {alert.score && (
                              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border">IA {alert.score}%</span>
                            )}
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground/80">{alert.vehicle}</span>
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {alert.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end justify-center ml-2">
                        {alert.status === 'new' && <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--sd-accent)]"></span>}
                        {alert.status === 'resolved' && <CheckCircle2 className="w-5 h-5 text-success" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start mb-4">
                <Badge className={
                  selectedAlert.type === 'critical' ? 'bg-danger/10 text-danger hover:bg-danger/20 border-0 px-3 py-1' :
                  selectedAlert.type === 'warning' ? 'bg-warning/10 text-warning hover:bg-warning/20 border-0 px-3 py-1' :
                  'bg-info/10 text-info hover:bg-info/20 border-0 px-3 py-1'
                }>
                  {selectedAlert.type.toUpperCase()}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2"><MoreVertical className="w-4 h-4" /></Button>
              </div>
              <h2 className="text-xl font-bold mb-2 leading-tight">{selectedAlert.title}</h2>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {selectedAlert.time}</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {selectedAlert.location}</div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-6">
              {selectedAlert.score && (
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Índice de Confiança IA</span>
                    <span className="font-bold font-mono text-danger">{selectedAlert.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-danger" style={{ width: `${selectedAlert.score}%` }}></div>
                  </div>
                </div>
              )}

              {/* Event Timeline */}
              <div>
                <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Linha do Tempo</h4>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
                  <div className="relative flex items-start pl-6">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-background border-2 border-danger flex items-center justify-center mt-0.5 z-10"><div className="w-2 h-2 rounded-full bg-danger"></div></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Evento Detectado (IA)</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Sensores de impacto traseiro ativados.</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">14:32:05</p>
                    </div>
                  </div>
                  <div className="relative flex items-start pl-6">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center mt-0.5 z-10"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Gravação Iniciada</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Câmera traseira e lateral direita.</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">14:32:06</p>
                    </div>
                  </div>
                  <div className="relative flex items-start pl-6">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-background border-2 border-border flex items-center justify-center mt-0.5 z-10"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Alerta Enviado</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Notificação Push enviada para Carlos Mendes.</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">14:32:08</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Snippet Mock */}
              <div className="w-full h-32 bg-[#0a0f1a] rounded-lg border border-border relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                <svg className="absolute inset-0 w-full h-full z-0 opacity-40" preserveAspectRatio="none">
                  <path d="M 0,60 Q 150,40 300,100" stroke="currentColor" strokeWidth="8" fill="none" className="text-secondary" />
                </svg>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 bg-danger/20 rounded-full flex items-center justify-center animate-ping absolute"></div>
                  <div className="w-6 h-6 bg-card rounded-full border-2 border-danger flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="w-3 h-3 text-danger" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Ações Sugeridas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full bg-danger/5 border-danger/30 hover:bg-danger/10 text-danger hover:text-danger flex-col h-auto py-3 gap-2">
                    <Lock className="w-5 h-5" /> Bloquear Veículo
                  </Button>
                  <Button variant="outline" className="w-full bg-secondary/50 border-border hover:bg-secondary flex-col h-auto py-3 gap-2 text-foreground">
                    <Camera className="w-5 h-5" /> Ver Câmeras
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-secondary/30 flex gap-2">
              <Button className="flex-1 bg-success hover:bg-success/90 text-white">
                Marcar Resolvido
              </Button>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}

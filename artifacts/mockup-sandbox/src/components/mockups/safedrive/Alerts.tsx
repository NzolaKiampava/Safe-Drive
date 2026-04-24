import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Info, MoreVertical, Filter, MapPin, Clock, ArrowRight } from "lucide-react";
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
          <Card className="bg-danger/5 border-danger/20 shadow-none">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-danger">Críticos</p>
                <p className="text-2xl font-bold text-danger">02</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-danger opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-warning/5 border-warning/20 shadow-none">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning">Avisos</p>
                <p className="text-2xl font-bold text-warning">05</p>
              </div>
              <Info className="w-8 h-8 text-warning opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20 shadow-none">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success">Resolvidos Hoje</p>
                <p className="text-2xl font-bold text-success">12</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success opacity-50" />
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
          
          {/* List Column */}
          <div className="lg:col-span-2 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-background cursor-pointer">Todos</Badge>
                <Badge variant="outline" className="bg-danger/10 text-danger border-danger/20 cursor-pointer">Críticos (2)</Badge>
                <Badge variant="outline" className="bg-background text-muted-foreground border-border cursor-pointer">Novos</Badge>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-0">
              <div className="divide-y divide-border">
                {MOCK_ALERTS.map((alert) => {
                  const isSelected = selectedAlert.id === alert.id;
                  const config = {
                    critical: { color: "text-danger", bg: "bg-danger/10", border: "border-danger", icon: AlertTriangle },
                    warning: { color: "text-warning", bg: "bg-warning/10", border: "border-warning", icon: Info },
                    info: { color: "text-info", bg: "bg-info/10", border: "border-info", icon: Info },
                  }[alert.type];

                  return (
                    <div 
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className={`p-4 cursor-pointer transition-colors relative flex gap-4 ${isSelected ? 'bg-secondary/50' : 'hover:bg-secondary/20'}`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bg}`}></div>
                      
                      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
                        <config.icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-semibold truncate ${alert.status === 'new' ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {alert.title}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{alert.time}</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground/80">{alert.vehicle}</span>
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {alert.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between">
                        {alert.status === 'new' && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                        {alert.status === 'resolved' && <CheckCircle2 className="w-4 h-4 text-success" />}
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
                  selectedAlert.type === 'critical' ? 'bg-danger/10 text-danger hover:bg-danger/20 border-0' :
                  selectedAlert.type === 'warning' ? 'bg-warning/10 text-warning hover:bg-warning/20 border-0' :
                  'bg-info/10 text-info hover:bg-info/20 border-0'
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

              {/* Map Snippet Mock */}
              <div className="w-full h-32 bg-secondary/30 rounded-lg border border-border relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--sd-border) 1px, transparent 1px), linear-gradient(90deg, var(--sd-border) 1px, transparent 1px)", backgroundSize: "10px 10px" }}></div>
                <div className="w-8 h-8 bg-danger/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-danger rounded-full"></div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm">Ações Sugeridas</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between border-danger/30 hover:bg-danger/10 text-danger hover:text-danger">
                    Bloquear Motor <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between border-border hover:bg-secondary">
                    Ver Câmera Frontal <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between border-border hover:bg-secondary">
                    Acionar Sirene <ArrowRight className="w-4 h-4" />
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

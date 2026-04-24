import React from "react";
import { ShieldCheck, Camera, Bell, MapPin, Activity, Zap, Lock, Unlock, Volume2, EyeOff, MoreHorizontal } from "lucide-react";
import { AppShell } from "./_shared/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "./_shared/tokens.css";

export function Dashboard() {
  return (
    <AppShell active="dashboard">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Olá, Carlos — tudo seguro</h1>
            <p className="text-muted-foreground mt-1">Última sincronização há 2 minutos</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-success/10 text-success border-success/20 font-medium">
              <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></span>
              Sistema Online
            </Badge>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Veículos protegidos</p>
                  <p className="text-3xl font-bold font-mono tracking-tight">02</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Alertas hoje</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold font-mono tracking-tight">03</p>
                    <span className="text-xs font-medium text-warning">-2 que ontem</span>
                  </div>
                </div>
                <div className="p-2 bg-warning/10 rounded-md text-warning">
                  <Bell className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Câmeras ativas</p>
                  <p className="text-3xl font-bold font-mono tracking-tight">08</p>
                </div>
                <div className="p-2 bg-info/10 rounded-md text-info">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status da Bateria</p>
                  <p className="text-3xl font-bold font-mono tracking-tight">94<span className="text-xl">%</span></p>
                </div>
                <div className="p-2 bg-success/10 rounded-md text-success">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full bg-secondary h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-success h-full w-[94%]"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Vehicles & Actions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions */}
            <Card className="bg-card border-border shadow-none overflow-hidden">
              <div className="flex p-1">
                <button className="flex-1 flex flex-col items-center justify-center p-4 hover:bg-secondary rounded-lg transition-colors text-foreground">
                  <Lock className="w-6 h-6 mb-2 text-danger" />
                  <span className="text-sm font-medium">Bloquear</span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center p-4 hover:bg-secondary rounded-lg transition-colors text-foreground">
                  <Volume2 className="w-6 h-6 mb-2 text-warning" />
                  <span className="text-sm font-medium">Sirene</span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center p-4 hover:bg-secondary rounded-lg transition-colors text-foreground">
                  <Camera className="w-6 h-6 mb-2 text-info" />
                  <span className="text-sm font-medium">Câmeras</span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center p-4 hover:bg-secondary rounded-lg transition-colors text-foreground">
                  <EyeOff className="w-6 h-6 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Modo Discreto</span>
                </button>
              </div>
            </Card>

            {/* Vehicle Status */}
            <Card className="bg-card border-border shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Frota Principal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Car 1 */}
                <div className="flex flex-col md:flex-row border border-border rounded-lg overflow-hidden bg-background">
                  <div className="md:w-48 bg-secondary/30 relative min-h-[120px] flex items-center justify-center border-b md:border-b-0 md:border-r border-border p-4">
                    {/* SVG Map mock */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--sd-border) 1px, transparent 1px), linear-gradient(90deg, var(--sd-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-card rounded-full border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-background rounded border border-border">Chiado, Lisboa</span>
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Tesla Model 3</h3>
                        <p className="text-sm text-muted-foreground font-mono">AA-11-BB</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">Estacionado</Badge>
                    </div>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center"><Zap className="w-4 h-4 mr-1 text-success" /> 88%</div>
                      <div className="flex items-center"><Activity className="w-4 h-4 mr-1 text-info" /> Sinal Forte</div>
                      <div className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-success" /> Armado</div>
                    </div>
                  </div>
                </div>

                {/* Car 2 */}
                <div className="flex flex-col md:flex-row border border-border rounded-lg overflow-hidden bg-background">
                  <div className="md:w-48 bg-secondary/30 relative min-h-[120px] flex items-center justify-center border-b md:border-b-0 md:border-r border-border p-4">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--sd-border) 1px, transparent 1px), linear-gradient(90deg, var(--sd-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-card rounded-full border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-background rounded border border-border">Av. Liberdade</span>
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">BMW i4</h3>
                        <p className="text-sm text-muted-foreground font-mono">CC-22-DD</p>
                      </div>
                      <Badge variant="outline" className="bg-info/10 text-info border-info/20">Em Movimento (45 km/h)</Badge>
                    </div>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center"><Zap className="w-4 h-4 mr-1 text-warning" /> 32%</div>
                      <div className="flex items-center"><Activity className="w-4 h-4 mr-1 text-info" /> Sinal Forte</div>
                      <div className="flex items-center"><Unlock className="w-4 h-4 mr-1 text-warning" /> Desarmado</div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Column - Feed & Charts */}
          <div className="space-y-8">
            
            {/* Alerts Chart Mini */}
            <Card className="bg-card border-border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Atividade nos últimos 7 dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-end justify-between space-x-2 pt-4">
                  {[2, 5, 1, 4, 8, 3, 2].map((val, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary/20 rounded-t-sm relative group hover:bg-primary/40 transition-colors"
                        style={{ height: `${(val / 8) * 100}%` }}
                      >
                        {val > 4 && (
                          <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-t-sm"></div>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-card border-border shadow-none flex-1">
              <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-border">
                <CardTitle className="text-lg">Feed de Eventos</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    { type: "warning", title: "Movimento suspeito", time: "Hoje, 14:32", vehicle: "Tesla Model 3", icon: Camera },
                    { type: "info", title: "Geofence: Entrada", time: "Hoje, 12:15", vehicle: "BMW i4", icon: MapPin },
                    { type: "danger", title: "Alarme acionado", time: "Ontem, 23:45", vehicle: "Tesla Model 3", icon: Bell },
                    { type: "success", title: "Sistema armado", time: "Ontem, 20:00", vehicle: "Ambos", icon: ShieldCheck },
                  ].map((event, i) => {
                    const colors = {
                      warning: "text-warning bg-warning/10 border-warning/20",
                      info: "text-info bg-info/10 border-info/20",
                      danger: "text-danger bg-danger/10 border-danger/20",
                      success: "text-success bg-success/10 border-success/20",
                    }[event.type];
                    
                    return (
                      <div key={i} className="p-4 hover:bg-secondary/50 transition-colors flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${colors}`}>
                          <event.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{event.vehicle}</p>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 text-center border-t border-border">
                  <Button variant="link" className="text-primary h-auto p-0 text-sm">Ver todo o histórico</Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </AppShell>
  );
}

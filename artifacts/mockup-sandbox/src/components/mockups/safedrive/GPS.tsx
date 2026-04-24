import React, { useState } from "react";
import { MapPin, Navigation, History, Battery, Activity, Crosshair, ChevronRight } from "lucide-react";
import { AppShell } from "./_shared/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./_shared/tokens.css";

export function GPS() {
  const [activeVehicle, setActiveVehicle] = useState(1);

  return (
    <AppShell active="gps">
      <div className="h-full flex flex-col md:flex-row">
        
        {/* Map Area */}
        <div className="flex-1 bg-[#0a0f1a] relative overflow-hidden flex flex-col">
          {/* Controls Bar Overlay */}
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
            <div className="bg-card/90 backdrop-blur-md border border-border p-1 rounded-lg flex shadow-lg">
              <Button variant="ghost" size="sm" className="h-8 bg-secondary/50">Tempo Real</Button>
              <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">Últimas 24h</Button>
            </div>
            <div className="bg-card/90 backdrop-blur-md border border-border p-1 rounded-lg flex shadow-lg ml-auto">
              <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">Geofences</Button>
              <Button variant="ghost" size="sm" className="h-8 bg-secondary/50">Tráfego</Button>
            </div>
          </div>

          {/* Map Grid Pattern Mock */}
          <div className="absolute inset-0 z-0" 
            style={{ 
              backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)", 
              backgroundSize: "60px 60px",
              opacity: 0.5
            }}>
          </div>
          
          {/* Geography Mock (SVG) */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20" preserveAspectRatio="none">
            <path d="M 0,200 Q 300,150 500,400 T 1000,500" stroke="currentColor" strokeWidth="20" fill="none" className="text-secondary" />
            <path d="M 200,0 Q 250,300 400,600 T 800,1000" stroke="currentColor" strokeWidth="15" fill="none" className="text-secondary" />
          </svg>

          {/* Route Trail */}
          <svg className="absolute inset-0 w-full h-full z-0" preserveAspectRatio="none">
            <path d="M 250,250 L 350,300 L 400,200 L 500,250" stroke="var(--sd-accent)" strokeWidth="3" strokeDasharray="6 6" fill="none" className="opacity-50" />
          </svg>

          {/* Car Marker */}
          <div className="absolute top-[250px] left-[500px] z-10 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-primary/20 rounded-full animate-ping absolute -top-4 -left-4"></div>
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_20px_var(--sd-accent)] relative z-10">
                <Navigation className="w-4 h-4 transform rotate-45" />
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border border-border px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-lg">
                Model 3 • 45 km/h
              </div>
            </div>
          </div>
          
          {/* Geofence Mock */}
          <div className="absolute top-[100px] left-[100px] w-64 h-64 border-2 border-info/30 bg-info/5 rounded-full z-0 pointer-events-none flex items-center justify-center">
            <span className="text-info/40 text-xs font-medium">Zona Segura: Casa</span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-96 bg-card border-l border-border flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold mb-4">Rastreamento</h2>
            <Input placeholder="Buscar veículo..." className="bg-secondary/50 border-transparent mb-4" />
            
            {/* Vehicle List */}
            <div className="space-y-3">
              {[
                { id: 1, name: "Tesla Model 3", plate: "AA-11-BB", status: "Em movimento", speed: "45 km/h" },
                { id: 2, name: "BMW i4", plate: "CC-22-DD", status: "Estacionado", speed: "0 km/h" }
              ].map(v => (
                <div 
                  key={v.id} 
                  onClick={() => setActiveVehicle(v.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${activeVehicle === v.id ? 'bg-primary/10 border-primary/30' : 'bg-background border-border hover:border-primary/20'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{v.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{v.plate}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium ${v.status === 'Em movimento' ? 'text-info' : 'text-muted-foreground'}`}>{v.status}</p>
                      <p className="text-xs font-mono mt-1">{v.speed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center"><Activity className="w-4 h-4 mr-2" /> Telemetria Atual</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background border border-border p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Velocidade Média</p>
                  <p className="text-lg font-bold font-mono">32 <span className="text-xs font-normal">km/h</span></p>
                </div>
                <div className="bg-background border border-border p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Distância Hoje</p>
                  <p className="text-lg font-bold font-mono">14.5 <span className="text-xs font-normal">km</span></p>
                </div>
                <div className="bg-background border border-border p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Bateria</p>
                  <p className="text-lg font-bold font-mono text-success">88%</p>
                </div>
                <div className="bg-background border border-border p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Sinal GPS</p>
                  <p className="text-lg font-bold font-mono text-success">Forte</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center"><History className="w-4 h-4 mr-2" /> Histórico de Paragens</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
                {[
                  { time: "14:15", place: "Av. da Liberdade, Lisboa", duration: "Em curso" },
                  { time: "10:30", place: "Sede Empresa, Taguspark", duration: "3h 45m" },
                  { time: "08:15", place: "Residência", duration: "12h 30m" },
                ].map((stop, i) => (
                  <div key={i} className="relative flex items-start pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{stop.place}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span className="font-mono">{stop.time}</span>
                        <span className="mx-2">•</span>
                        <span>Paragem: {stop.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import React, { useState } from "react";
import { Camera as CameraIcon, Play, Square, Mic, Maximize2, Search, Video, Clock, AlertTriangle, AlertCircle, Circle, MapPin } from "lucide-react";
import { AppShell } from "./_shared/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "./_shared/tokens.css";

export function Cameras() {
  const [activeFilter, setActiveFilter] = useState("Todas");

  return (
    <AppShell active="cameras">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Câmeras</h1>
            <p className="text-muted-foreground mt-1">Monitoramento de vídeo em tempo real</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar câmera ou veículo..." 
                className="pl-9 bg-card border-border"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["Todas", "Online", "Offline", "Movimento detectado", "Com gravação"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f 
                  ? "bg-primary text-white" 
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Feed (Featured) */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-card border-border shadow-none overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-gradient-to-b from-[#0a1128] to-black group border-b border-border overflow-hidden">
                {/* Simulated video feed with grid lines */}
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                <div className="absolute inset-0 opacity-5" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)" }}></div>
                
                {/* Silhouette SVG */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50,150 L80,80 L320,80 L350,150 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary/50" />
                    <path d="M120,80 L150,40 L250,40 L280,80 Z" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                    <rect x="70" y="120" width="40" height="20" fill="currentColor" className="text-primary/20" />
                    <rect x="290" y="120" width="40" height="20" fill="currentColor" className="text-primary/20" />
                    <path d="M150,120 L250,120" stroke="currentColor" strokeWidth="2" className="text-primary/40" />
                  </svg>
                </div>

                {/* Viewfinder brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-sm pointer-events-none"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-sm pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-sm pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-sm pointer-events-none"></div>

                {/* HUD Elements */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="flex items-center space-x-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
                    REC
                  </div>
                  <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs font-mono">
                    CH: Frontal (Tesla M3)
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                  <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs font-mono flex items-center">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {new Date().toLocaleTimeString('pt-PT')}
                  </div>
                  <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white/80 text-[10px] font-mono">
                    00:04:12
                  </div>
                </div>

                <div className="absolute bottom-16 left-6 bg-black/50 backdrop-blur px-2 py-1 rounded text-white/80 text-[10px] font-mono flex items-center">
                  <MapPin className="w-3 h-3 mr-1.5" />
                  38.7116° N, 9.1411° W
                </div>

                <div className="absolute bottom-16 right-6 flex flex-col items-center gap-1 bg-black/50 backdrop-blur p-1 rounded">
                  <div className="w-1.5 h-6 bg-white/20 rounded-full flex items-end">
                    <div className="w-full h-[80%] bg-success rounded-full"></div>
                  </div>
                  <div className="w-1.5 h-6 bg-white/20 rounded-full flex items-end">
                    <div className="w-full h-[60%] bg-info rounded-full"></div>
                  </div>
                </div>

                {/* Tracking Box Mock */}
                <div className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-warning/80 rounded-sm bg-warning/5 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <div className="absolute -top-7 left-[-2px] bg-warning text-warning-foreground text-[11px] px-2 py-0.5 font-bold shadow-md flex items-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping"></span> Movimento 89%
                  </div>
                  <div className="absolute top-1/2 -right-12 w-12 border-t-2 border-warning/50 border-dashed"></div>
                  <div className="absolute top-1/2 -right-14 w-2 h-2 rounded-full bg-warning/80"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8"><Square className="w-4 h-4 fill-current" /></Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8"><Mic className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8"><CameraIcon className="w-4 h-4" /></Button>
                  </div>
                  <div className="text-xs text-white/70 font-mono">
                    1080p • 30fps • 2.4 Mbps
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8"><Maximize2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Tesla Model 3 — Frontal</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">Online</Badge>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> Timeline de Eventos
                  </h4>
                  <div className="relative pl-6 space-y-4 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    <div className="relative flex items-center">
                      <div className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-danger ring-4 ring-background"></div>
                      <div className="text-xs text-muted-foreground w-16">14:32</div>
                      <div className="flex-1 bg-secondary rounded px-3 py-2 text-sm ml-2">Movimento detectado na frente do veículo</div>
                    </div>
                    <div className="relative flex items-center opacity-70">
                      <div className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-info ring-4 ring-background"></div>
                      <div className="text-xs text-muted-foreground w-16">12:15</div>
                      <div className="flex-1 bg-secondary rounded px-3 py-2 text-sm ml-2">Veículo estacionado</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid Feed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Outras Câmeras</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              
              {[
                { name: "Cabine", vehicle: "Tesla Model 3", status: "online", motion: null },
                { name: "Traseira", vehicle: "Tesla Model 3", status: "online", motion: "Há 5 min" },
                { name: "Frontal", vehicle: "BMW i4", status: "online", motion: null },
                { name: "Cabine", vehicle: "BMW i4", status: "offline", motion: null },
              ].map((cam, i) => (
                <div key={i} className="group relative rounded-lg border border-border bg-card overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="aspect-video bg-gradient-to-b from-[#0a1128] to-black relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20"></div>

                    {cam.status === "online" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                        <span className="text-xs text-muted-foreground font-mono">OFFLINE</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 right-2 flex justify-between">
                      <div className="flex items-center space-x-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                        <Circle className={`w-2 h-2 fill-current ${cam.status === 'online' ? 'text-success' : 'text-muted-foreground'}`} />
                        <span>{cam.name}</span>
                      </div>
                      {cam.motion && (
                        <div className="bg-warning/20 text-warning border border-warning/50 px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {cam.motion}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium">{cam.vehicle}</p>
                    <p className="text-xs text-muted-foreground">{cam.name}</p>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
          
        </div>
      </div>
    </AppShell>
  );
}

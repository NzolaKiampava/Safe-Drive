import React from "react";
import { ShieldCheck, ShieldAlert, Shield, ToggleLeft, Activity, Lock, EyeOff, Radio, Smartphone, Car, Settings2 } from "lucide-react";
import { AppShell } from "./_shared/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "./_shared/tokens.css";

export function Security() {
  return (
    <AppShell active="security">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Centro de Segurança</h1>
          <p className="text-muted-foreground mt-1">Configurações de proteção ativa e modos de sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Health Score & Modes */}
          <div className="space-y-8">
            
            {/* Score Card */}
            <Card className="bg-card border-border overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success to-primary"></div>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="relative w-40 h-40 mb-6">
                  {/* Gauge Mock */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--sd-border)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--sd-success)" strokeWidth="10" strokeDasharray="283" strokeDashoffset="28" className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold font-mono text-foreground">92</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Score</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-success mb-2">Excelente</h3>
                <p className="text-sm text-muted-foreground">Todos os sistemas de segurança estão operacionais. O seu veículo está protegido.</p>
                <Button variant="outline" className="mt-6 border-border w-full">Executar Diagnóstico</Button>
              </CardContent>
            </Card>

            {/* Security Modes */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Modos de Operação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Modo Normal", desc: "Proteção padrão. Alertas ativados.", icon: ShieldCheck, active: true },
                  { name: "Modo Discreto", desc: "Alarmes silenciosos. Apenas notificações push.", icon: EyeOff, active: false },
                  { name: "Modo Viagem", desc: "Geofencing expandido. Sensibilidade reduzida.", icon: Car, active: false }
                ].map((mode, i) => (
                  <div key={i} className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center space-x-4 ${mode.active ? 'bg-primary/10 border-primary/30' : 'bg-background border-border hover:border-primary/20'}`}>
                    <div className={`p-2 rounded-full ${mode.active ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                      <mode.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${mode.active ? 'text-primary' : 'text-foreground'}`}>{mode.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{mode.desc}</p>
                    </div>
                    {mode.active && <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>}
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* Main Toggles & Devices */}
          <div className="lg:col-span-2 space-y-8">
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Proteções Ativas</CardTitle>
                <CardDescription>Ative ou desative os módulos de segurança do hardware.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {[
                  { title: "Imobilizador do Motor", desc: "Impede o arranque do veículo sem autorização via app.", icon: Lock, checked: true },
                  { title: "Sensor de Impacto & Inclinação", desc: "Detecta toques, choques ou tentativas de reboque.", icon: Activity, checked: true },
                  { title: "Detecção de Bloqueador de Sinal (Jammer)", desc: "Alerta imediato se tentar bloquear o sinal GPS/GSM.", icon: Radio, checked: true },
                  { title: "Câmeras - Gravação em Cloud", desc: "Faz upload automático de eventos suspeitos para a nuvem.", icon: Camera, checked: true },
                  { title: "Alarme Sonoro (Sirene)", desc: "Aciona uma sirene de 110dB em caso de intrusão.", icon: ShieldAlert, checked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 text-muted-foreground"><item.icon className="w-5 h-5" /></div>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch checked={item.checked} />
                  </div>
                ))}

              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
                <div>
                  <CardTitle className="text-lg">Dispositivos Conectados</CardTitle>
                </div>
                <Button variant="ghost" size="sm"><Settings2 className="w-4 h-4 mr-2" /> Gerir</Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-md border border-border">
                    <Smartphone className="w-6 h-6 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">iPhone 14 Pro</p>
                      <p className="text-xs text-success">Chave Digital Ativa</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-md border border-border">
                    <Car className="w-6 h-6 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Módulo OBD-II</p>
                      <p className="text-xs text-success">Firmware v2.4.1</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </AppShell>
  );
}

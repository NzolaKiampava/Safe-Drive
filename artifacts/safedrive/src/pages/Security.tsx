import { useMemo, useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Activity,
  Lock,
  EyeOff,
  Radio,
  Smartphone,
  Car,
  Settings2,
  Camera as CameraIcon,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type ModeId = "normal" | "discreto" | "viagem";

interface Mode {
  id: ModeId;
  name: string;
  desc: string;
  icon: typeof ShieldCheck;
}

const MODES: Mode[] = [
  { id: "normal", name: "Modo Normal", desc: "Proteção padrão. Alertas ativados.", icon: ShieldCheck },
  { id: "discreto", name: "Modo Discreto", desc: "Alarmes silenciosos. Apenas notificações push.", icon: EyeOff },
  { id: "viagem", name: "Modo Viagem", desc: "Geofencing expandido. Sensibilidade reduzida.", icon: Car },
];

interface Protection {
  id: string;
  title: string;
  desc: string;
  icon: typeof Lock;
}

const PROTECTIONS: Protection[] = [
  { id: "immobilizer", title: "Imobilizador do Motor", desc: "Impede o arranque do veículo sem autorização via app.", icon: Lock },
  { id: "impact", title: "Sensor de Impacto & Inclinação", desc: "Detecta toques, choques ou tentativas de reboque.", icon: Activity },
  { id: "jammer", title: "Detecção de Bloqueador de Sinal (Jammer)", desc: "Alerta imediato se tentar bloquear o sinal GPS/GSM.", icon: Radio },
  { id: "cloud", title: "Câmeras - Gravação em Cloud", desc: "Faz upload automático de eventos suspeitos para a nuvem.", icon: CameraIcon },
  { id: "siren", title: "Alarme Sonoro (Sirene)", desc: "Aciona uma sirene de 110dB em caso de intrusão.", icon: ShieldAlert },
];

export default function Security() {
  const { toast } = useToast();
  const [activeMode, setActiveMode] = useState<ModeId>("normal");
  const [protections, setProtections] = useState<Record<string, boolean>>({
    immobilizer: true,
    impact: true,
    jammer: true,
    cloud: true,
    siren: false,
  });
  const [lastCheck, setLastCheck] = useState("Há 2 minutos");

  const score = useMemo(() => {
    const enabled = Object.values(protections).filter(Boolean).length;
    const total = PROTECTIONS.length;
    return Math.round((enabled / total) * 100);
  }, [protections]);

  const scoreLabel =
    score >= 90 ? "Excelente" : score >= 70 ? "Bom" : score >= 50 ? "Razoável" : "Crítico";
  const scoreColor =
    score >= 90 ? "text-success" : score >= 70 ? "text-info" : score >= 50 ? "text-warning" : "text-destructive";

  // Circle math: r=45, circumference ≈ 283
  const dashOffset = 283 - (283 * score) / 100;

  function handleToggleProtection(id: string, value: boolean) {
    setProtections((prev) => ({ ...prev, [id]: value }));
    const item = PROTECTIONS.find((p) => p.id === id);
    if (item) {
      toast({
        title: value ? `${item.title} ativado` : `${item.title} desativado`,
      });
    }
  }

  function handleSelectMode(mode: Mode) {
    setActiveMode(mode.id);
    toast({ title: `${mode.name} ativado`, description: mode.desc });
  }

  function handleDiagnostic() {
    setLastCheck("Agora mesmo");
    toast({
      title: "Diagnóstico executado",
      description: "Todos os sistemas verificados com sucesso.",
    });
  }

  function handleManageDevices() {
    toast({
      title: "Gestão de dispositivos em breve",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  return (
    <AppShell active="security">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            data-testid="text-security-title"
          >
            Centro de Segurança
          </h1>
          <p className="text-muted-foreground mt-1">
            Configurações de proteção ativa e modos de sistema
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Health Score & Modes */}
          <div className="space-y-6 sm:space-y-8">
            {/* Score Card */}
            <Card className="bg-card border-border overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success to-primary" />
              <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="relative w-40 h-40 mb-6">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--success))"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-4xl font-bold font-mono text-foreground"
                      data-testid="text-score"
                    >
                      {score}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Score
                    </span>
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${scoreColor}`}>
                  {scoreLabel}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Todos os sistemas de segurança estão operacionais. O seu
                  veículo está protegido.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mt-4 pt-4 border-t border-border w-full justify-center">
                  <Clock className="w-3 h-3 mr-1" /> Última verificação:{" "}
                  {lastCheck}
                </div>
                <Button
                  variant="outline"
                  className="mt-4 border-border w-full"
                  onClick={handleDiagnostic}
                  data-testid="button-diagnostic"
                >
                  Executar Diagnóstico
                </Button>
              </CardContent>
            </Card>

            {/* Security Modes */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Modos de Operação</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  Proteção Ativa
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {MODES.map((mode) => {
                  const Icon = mode.icon;
                  const active = activeMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleSelectMode(mode)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-center space-x-4 ${
                        active
                          ? "bg-primary/10 border-primary/30"
                          : "bg-background border-border hover:border-primary/20"
                      }`}
                      data-testid={`mode-${mode.id}`}
                    >
                      <div
                        className={`p-2 rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold ${active ? "text-primary" : "text-foreground"}`}
                        >
                          {mode.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {mode.desc}
                        </p>
                      </div>
                      {active && (
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Toggles & Devices */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Proteções Ativas</CardTitle>
                <CardDescription>
                  Ative ou desative os módulos de segurança do hardware.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {PROTECTIONS.map((item) => {
                  const Icon = item.icon;
                  const checked = protections[item.id] ?? false;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg"
                    >
                      <div className="flex items-start space-x-4 min-w-0">
                        <div className="mt-1 text-muted-foreground flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={checked}
                        onCheckedChange={(value) =>
                          handleToggleProtection(item.id, value)
                        }
                        data-testid={`switch-${item.id}`}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
                <div>
                  <CardTitle className="text-lg">
                    Dispositivos Conectados
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleManageDevices}
                  data-testid="button-manage-devices"
                >
                  <Settings2 className="w-4 h-4 mr-2" /> Gerir
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-md border border-border">
                    <Smartphone className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">iPhone 14 Pro</p>
                      <p className="text-xs text-success">
                        Chave Digital Ativa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-md border border-border">
                    <Car className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
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

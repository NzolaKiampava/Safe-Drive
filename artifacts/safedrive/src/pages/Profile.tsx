import { useState } from "react";
import {
  CreditCard,
  Key,
  Smartphone,
  Car,
  CheckCircle2,
  MonitorSmartphone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const INITIAL_NOTIFICATIONS = {
  push: true,
  sms: true,
  weekly: true,
  battery: true,
};

export default function Profile() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [contact, setContact] = useState<ContactForm>({
    firstName: "Carlos",
    lastName: "Mendes",
    email: "carlos.mendes@exemplo.com",
    phone: "+351 912 345 678",
  });
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  function updateContact(field: keyof ContactForm, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }));
  }

  function updateNotification(field: keyof typeof notifications, value: boolean) {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  }

  function handleSaveContact(e: React.FormEvent) {
    e.preventDefault();
    toast({
      title: "Alterações guardadas",
      description: "Os seus dados foram atualizados com sucesso.",
    });
  }

  function handleEditProfile() {
    toast({
      title: "Edição de perfil",
      description: "Use o separador 'Dados Pessoais' para alterar os seus dados.",
    });
  }

  function handleAddVehicle() {
    toast({
      title: "Adicionar veículo em breve",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  function handleChangePassword() {
    toast({
      title: "Alteração de palavra-passe",
      description: "Receberá um e-mail com as instruções.",
    });
  }

  function handleConfigure2FA() {
    toast({
      title: "Configuração 2FA",
      description: "Já tem a autenticação em 2 passos ativa.",
    });
  }

  function handleEndSession() {
    toast({
      title: "Sessão terminada",
      description: "iPhone 14 Pro desconectado.",
    });
  }

  function handleChangePlan() {
    toast({
      title: "Mudança de plano em breve",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  function handleInvoices() {
    toast({
      title: "A abrir faturas",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  function handleChangeCard() {
    toast({
      title: "Alteração de cartão",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  function handleSupport(channel: "email" | "chat") {
    toast({
      title: channel === "email" ? "Suporte por e-mail" : "Chat de suporte",
      description: "Um agente entrará em contacto em breve.",
    });
  }

  function handleLogout() {
    toast({
      title: "Sessão encerrada",
      description: "Até breve, Carlos.",
    });
    setLocation("/");
  }

  return (
    <AppShell active="profile">
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 sm:p-8 bg-card border border-border rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-card via-[#0c152a] to-[#1a1208]" />

          <svg
            className="absolute right-0 top-0 h-full w-1/2 opacity-20 text-primary/30 pointer-events-none"
            viewBox="0 0 400 200"
            fill="none"
          >
            <circle
              cx="300"
              cy="100"
              r="150"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 12"
            />
            <circle
              cx="300"
              cy="100"
              r="100"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <circle
              cx="300"
              cy="100"
              r="50"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <path
              d="M 150 100 L 450 100"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <path
              d="M 300 -50 L 300 250"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          </svg>

          <div className="relative flex-shrink-0">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md" />
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-background shadow-2xl relative z-10">
              <AvatarFallback className="bg-gradient-to-br from-secondary to-primary/20 text-3xl sm:text-4xl font-bold text-foreground">
                CM
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 text-center md:text-left relative z-10 pt-2 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1
                className="text-2xl sm:text-3xl font-bold text-foreground"
                data-testid="text-profile-name"
              >
                Carlos Mendes
              </h1>
              <Badge className="bg-primary/20 text-primary border-primary/30 font-medium hover:bg-primary/30 w-max mx-auto md:mx-0 shadow-sm">
                Plano Premium
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4 break-words">
              carlos.mendes@exemplo.com • Membro desde Jan 2023
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <Button
                size="sm"
                className="bg-secondary text-foreground hover:bg-secondary/80"
                onClick={handleEditProfile}
                data-testid="button-edit-profile"
              >
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Area */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-12 p-0 space-x-6 overflow-x-auto">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground rounded-none px-0 pb-3 font-semibold whitespace-nowrap"
              data-testid="tab-personal"
            >
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger
              value="vehicles"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground rounded-none px-0 pb-3 font-semibold whitespace-nowrap"
              data-testid="tab-vehicles"
            >
              Veículos
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground rounded-none px-0 pb-3 font-semibold whitespace-nowrap"
              data-testid="tab-notifications"
            >
              Notificações
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground rounded-none px-0 pb-3 font-semibold whitespace-nowrap"
              data-testid="tab-security"
            >
              Segurança da Conta
            </TabsTrigger>
          </TabsList>

          <div className="py-6 mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <TabsContent value="personal" className="m-0 space-y-6">
                <Card className="bg-card border-border shadow-none">
                  <CardHeader>
                    <CardTitle>Informações de Contacto</CardTitle>
                    <CardDescription>
                      Atualize os seus dados básicos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSaveContact} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome Próprio</Label>
                          <Input
                            id="firstName"
                            value={contact.firstName}
                            onChange={(e) =>
                              updateContact("firstName", e.target.value)
                            }
                            className="bg-secondary/50 border-border"
                            data-testid="input-firstname"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apelido</Label>
                          <Input
                            id="lastName"
                            value={contact.lastName}
                            onChange={(e) =>
                              updateContact("lastName", e.target.value)
                            }
                            className="bg-secondary/50 border-border"
                            data-testid="input-lastname"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contact.email}
                          onChange={(e) =>
                            updateContact("email", e.target.value)
                          }
                          className="bg-secondary/50 border-border"
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Telemóvel (Usado para Alertas SMS)
                        </Label>
                        <Input
                          id="phone"
                          value={contact.phone}
                          onChange={(e) =>
                            updateContact("phone", e.target.value)
                          }
                          className="bg-secondary/50 border-border"
                          data-testid="input-phone"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                        data-testid="button-save-contact"
                      >
                        Guardar Alterações
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vehicles" className="m-0 space-y-6">
                <Card className="bg-card border-border shadow-none">
                  <CardHeader className="flex flex-row justify-between items-start pb-2 gap-4">
                    <div>
                      <CardTitle>Os meus veículos</CardTitle>
                      <CardDescription>
                        Veículos associados à sua conta.
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border flex-shrink-0"
                      onClick={handleAddVehicle}
                      data-testid="button-add-vehicle"
                    >
                      Adicionar
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {[
                      {
                        name: "Tesla Model 3",
                        meta: "AA-11-BB • Instalado em 12/05/2023",
                      },
                      {
                        name: "BMW i4",
                        meta: "CC-22-DD • Instalado em 08/11/2023",
                      },
                    ].map((v) => (
                      <div
                        key={v.name}
                        className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg bg-background"
                      >
                        <div className="flex items-center space-x-4 min-w-0">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                            <Car className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{v.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {v.meta}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/15 flex-shrink-0">
                          Ativo
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="m-0 space-y-6">
                <Card className="bg-card border-border shadow-none">
                  <CardHeader>
                    <CardTitle>Preferências de Alerta</CardTitle>
                    <CardDescription>
                      Escolha como e quando quer ser notificado.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Alertas Críticos
                      </h4>
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium">Notificações Push (App)</p>
                          <p className="text-sm text-muted-foreground">
                            Para todos os eventos críticos.
                          </p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(v) => updateNotification("push", v)}
                          data-testid="switch-push"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium">Mensagem SMS</p>
                          <p className="text-sm text-muted-foreground">
                            Útil se estiver sem internet.
                          </p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(v) => updateNotification("sms", v)}
                          data-testid="switch-sms"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Avisos e Rotina
                      </h4>
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium">Relatórios Semanais</p>
                          <p className="text-sm text-muted-foreground">
                            Resumo por e-mail.
                          </p>
                        </div>
                        <Switch
                          checked={notifications.weekly}
                          onCheckedChange={(v) =>
                            updateNotification("weekly", v)
                          }
                          data-testid="switch-weekly"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium">Bateria do Dispositivo</p>
                          <p className="text-sm text-muted-foreground">
                            Quando estiver abaixo de 20%.
                          </p>
                        </div>
                        <Switch
                          checked={notifications.battery}
                          onCheckedChange={(v) =>
                            updateNotification("battery", v)
                          }
                          data-testid="switch-battery"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="m-0 space-y-6">
                <Card className="bg-card border-border shadow-none">
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>
                      Proteja o acesso à sua conta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4 min-w-0">
                        <Key className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium">Palavra-passe</p>
                          <p className="text-sm text-muted-foreground">
                            Última alteração há 3 meses.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border flex-shrink-0"
                        onClick={handleChangePassword}
                        data-testid="button-change-password"
                      >
                        Alterar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4 min-w-0">
                        <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium">
                            Autenticação em 2 Passos (2FA)
                          </p>
                          <p className="text-sm text-success flex items-center mt-1">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Ativo
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border flex-shrink-0"
                        onClick={handleConfigure2FA}
                        data-testid="button-configure-2fa"
                      >
                        Configurar
                      </Button>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Sessões Ativas
                      </h4>
                      <div className="flex items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg">
                        <div className="flex items-center space-x-4 min-w-0">
                          <MonitorSmartphone className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm">
                              MacBook Pro (Chrome)
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Lisboa, PT • IP: 192.168.1.1
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-success/10 text-success border-success/20 flex-shrink-0"
                        >
                          Sessão Atual
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg">
                        <div className="flex items-center space-x-4 min-w-0">
                          <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm">
                              iPhone 14 Pro (App SafeDrive)
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Lisboa, PT • Há 2 horas
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={handleEndSession}
                          data-testid="button-end-session"
                        >
                          Terminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* Right Rail */}
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-none">
                <CardHeader className="pb-4 flex flex-row items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-base">Faturação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">
                      Plano Atual
                    </p>
                    <p className="font-semibold text-xl text-foreground">
                      Premium{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        / €14.99/mês
                      </span>
                    </p>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        Próxima renovação:{" "}
                        <span className="font-medium text-foreground">
                          15 Out 2026
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm p-3 bg-background border border-border rounded-md">
                    <div className="w-8 h-5 bg-foreground rounded flex items-center justify-center text-background font-bold text-[10px] italic">
                      VISA
                    </div>
                    <span className="flex-1 font-mono">**** 4242</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={handleChangeCard}
                      data-testid="button-change-card"
                    >
                      Mudar
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-primary/50 text-primary hover:bg-primary/10"
                      onClick={handleChangePlan}
                      data-testid="button-change-plan"
                    >
                      Mudar plano
                    </Button>
                    <Button
                      variant="link"
                      className="px-2 text-muted-foreground"
                      onClick={handleInvoices}
                      data-testid="button-invoices"
                    >
                      Faturas
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-card to-secondary/30 border-border shadow-none">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Suporte Prioritário</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A sua conta Premium inclui suporte 24/7 dedicado.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-border bg-background"
                      onClick={() => handleSupport("email")}
                      data-testid="button-support-email"
                    >
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Button>
                    <Button
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleSupport("chat")}
                      data-testid="button-support-chat"
                    >
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                Encerrar Sessão
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </AppShell>
  );
}

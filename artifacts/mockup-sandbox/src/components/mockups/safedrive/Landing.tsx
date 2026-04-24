import React from "react";
import { ShieldCheck, ArrowRight, Shield, Camera, Bell, MapPin, Activity, Cpu, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "./_shared/tokens.css";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-border/40 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">SafeDrive</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
            <a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
            <a href="#beneficios" className="hover:text-foreground transition-colors">Benefícios</a>
            <a href="#precos" className="hover:text-foreground transition-colors">Preços</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white border-0">Testar agora</Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  Monitoramento inteligente 24/7
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Tecnologia que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">protege</span> o seu veículo.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                  O sistema de segurança veicular mais avançado do mercado. Câmeras integradas, detecção de comportamento de risco e alertas em tempo real direto no seu telemóvel.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white h-12 px-8 text-base">
                    Começar agora <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-border hover:bg-secondary">
                    Ver demo
                  </Button>
                </div>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> Instalação grátis</div>
                  <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> Cancele quando quiser</div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-2xl lg:max-w-none relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl rounded-full opacity-50"></div>
                <img 
                  src="/__mockup/images/safedrive-hero.png" 
                  alt="SafeDrive Interface overlaying a modern car" 
                  className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="py-10 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-6">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">CONFIADO POR GESTORES DE FROTAS E SEGURADORAS</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale contrast-200">
              {["AllianzDrive", "AutoSeguro", "FleetManager", "ViaVerde+", "MapfreTech"].map((brand) => (
                <div key={brand} className="text-xl font-bold font-serif tracking-tighter">{brand}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Um centro de comando no seu bolso</h2>
              <p className="text-muted-foreground text-lg">Hardware de nível militar combinado com software intuitivo para lhe dar controlo total sobre o seu veículo.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Camera, title: "Câmeras inteligentes", desc: "Visão 360º com gravação na cloud e visão noturna avançada." },
                { icon: Activity, title: "Detecção de comportamento", desc: "IA que identifica tentativas de arrombamento antes de acontecerem." },
                { icon: Bell, title: "Alertas em tempo real", desc: "Notificações instantâneas no telemóvel para qualquer atividade suspeita." },
                { icon: MapPin, title: "Rastreamento GPS", desc: "Localização precisa ao centímetro com histórico de rotas de 30 dias." },
                { icon: Shield, title: "Segurança ativa", desc: "Bloqueio remoto do motor e acionamento de sirene via aplicação." },
                { icon: Cpu, title: "Centro de controlo", desc: "Dashboard intuitivo com métricas de saúde da bateria e do sistema." }
              ].map((feature, i) => (
                <Card key={i} className="bg-card border-border p-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" className="py-24 bg-secondary/20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simples de usar, impossível de invadir</h2>
              <p className="text-muted-foreground text-lg">Três passos para a tranquilidade total.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0" />
              
              {[
                { num: "01", title: "Instale o sistema", desc: "Os nossos técnicos certificados instalam o hardware de forma invisível em menos de 2 horas." },
                { num: "02", title: "Monitore pelo app", desc: "Ligue a ignição, aceda às câmeras e defina perímetros de segurança de forma intuitiva." },
                { num: "03", title: "Receba alertas", desc: "A IA do SafeDrive avisa-o apenas do que importa. Sem falsos alarmes, só proteção real." }
              ].map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-24 h-24 rounded-full bg-background border-2 border-border flex items-center justify-center text-3xl font-bold text-primary shadow-xl shadow-background mb-6">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview do Dashboard */}
        <section className="py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Visibilidade total, em qualquer lugar</h2>
              <p className="text-muted-foreground text-lg mb-8">Acompanhe todos os detalhes do seu veículo numa interface desenhada para a máxima clareza e rapidez de resposta.</p>
            </div>
            
            <div className="relative mx-auto max-w-6xl rounded-xl border border-border/50 bg-background/50 backdrop-blur shadow-2xl p-2 md:p-4 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              {/* Faux Dashboard UI */}
              <div className="rounded-lg overflow-hidden border border-border bg-card flex h-[500px]">
                {/* Sidebar mock */}
                <div className="w-48 bg-background border-r border-border p-4 hidden md:block">
                  <div className="flex items-center space-x-2 mb-8">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm">SafeDrive</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-accent/20 rounded border border-accent/30 w-full flex items-center px-2">
                      <div className="w-3 h-3 rounded bg-primary mr-2"></div>
                      <div className="h-2 bg-primary/40 rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-secondary rounded w-full"></div>
                    <div className="h-8 bg-secondary rounded w-full"></div>
                  </div>
                </div>
                {/* Main content mock */}
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-32 bg-secondary rounded"></div>
                    <div className="h-8 w-8 rounded-full bg-secondary"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-background border border-border rounded-lg p-4 flex flex-col justify-between">
                      <div className="h-3 w-20 bg-secondary rounded"></div>
                      <div className="h-6 w-12 bg-primary/20 rounded"></div>
                    </div>
                    <div className="h-24 bg-background border border-border rounded-lg p-4 flex flex-col justify-between">
                      <div className="h-3 w-24 bg-secondary rounded"></div>
                      <div className="h-6 w-16 bg-muted rounded"></div>
                    </div>
                    <div className="h-24 bg-background border border-border rounded-lg p-4 flex flex-col justify-between">
                      <div className="h-3 w-16 bg-secondary rounded"></div>
                      <div className="h-6 w-10 bg-green-500/20 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-background border border-border rounded-lg mt-2 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--sd-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 shadow-[0_0_15px_var(--sd-accent)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 bg-card border-t border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Pronto para assumir o controlo?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de condutores que já não se preocupam onde estacionam.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-lg">
              Criar conta gratuitamente
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">Não requer cartão de crédito. Teste de 14 dias grátis.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">SafeDrive</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Protegemos o que é seu através de inteligência artificial e hardware de ponta. O seu veículo, sempre seguro.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Dispositivos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">App Mobile</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Parceiros</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Centro de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Manuais de Instalação</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status do Sistema</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SafeDrive Technologies. Todos os direitos reservados.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-foreground transition-colors">Termos de Serviço</a>
              <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

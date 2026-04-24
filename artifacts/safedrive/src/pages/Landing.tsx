import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  ShieldCheck, ArrowRight, Shield, Camera, Bell, MapPin, 
  Activity, Cpu, CheckCircle2, Menu, X, BarChart3, Clock, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  const navLinks = [
    { id: "funcionalidades", label: "Funcionalidades" },
    { id: "como-funciona", label: "Como funciona" },
    { id: "beneficios", label: "Benefícios" },
    { id: "precos", label: "Preços" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 h-20 border-b transition-colors z-50 ${isScrolled ? 'border-border/40 bg-background/80 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">SafeDrive</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => scrollTo(link.id)} 
                className={`transition-colors ${activeSection === link.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 hover:bg-primary/90 border-0">
              Testar agora
            </Link>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-background border-b border-border shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map(link => (
                <button 
                  key={link.id}
                  onClick={() => scrollTo(link.id)} 
                  className={`text-left text-lg font-medium p-2 ${activeSection === link.id ? 'text-primary' : 'text-foreground'}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-border pt-4 mt-2 flex flex-col space-y-4">
                <Link href="/login" className="text-lg font-medium p-2 text-foreground" onClick={closeMenu}>
                  Login
                </Link>
                <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-10 px-8 py-2 w-full hover:bg-primary/90 border-0" onClick={closeMenu}>
                  Testar agora
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 text-center lg:text-left"
              >
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
                  <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-10 px-8 py-2 w-full sm:w-auto hover:bg-primary/90 h-12 text-base border-0">
                    Começar agora <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link href="/demo" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-10 px-8 py-2 w-full sm:w-auto h-12 text-base hover:bg-secondary">
                    Ver demo
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> Instalação grátis</div>
                  <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> Cancele quando quiser</div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 w-full max-w-2xl lg:max-w-none relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl rounded-full opacity-50"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}safedrive-hero.png`}
                  alt="SafeDrive Interface overlaying a modern car" 
                  className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 relative z-10"
                />
              </motion.div>
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
        <section id="funcionalidades" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Um centro de comando no seu bolso</h2>
              <p className="text-muted-foreground text-lg">Hardware de nível militar combinado com software intuitivo para lhe dar controlo total sobre o seu veículo.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Camera, title: "Câmeras inteligentes", desc: "Visão 360º com gravação na cloud e visão noturna avançada." },
                { icon: Activity, title: "Detecção de comportamento", desc: "IA que identifica tentativas de arrombamento antes de acontecerem." },
                { icon: Bell, title: "Alertas em tempo real", desc: "Notificações instantâneas no telemóvel para qualquer atividade suspeita." },
                { icon: MapPin, title: "Rastreamento GPS", desc: "Localização precisa ao centímetro com histórico de rotas de 30 dias." },
                { icon: Shield, title: "Segurança ativa", desc: "Bloqueio remoto do motor e acionamento de sirene via aplicação." },
                { icon: Cpu, title: "Centro de controlo", desc: "Dashboard intuitivo com métricas de saúde da bateria e do sistema." }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-card border-border p-6 hover:border-primary/50 transition-colors h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" className="py-24 bg-secondary/20 border-y border-border scroll-mt-20">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simples de usar, impossível de invadir</h2>
              <p className="text-muted-foreground text-lg">Três passos para a tranquilidade total.</p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0" />
              
              {[
                { num: "01", title: "Instale o sistema", desc: "Os nossos técnicos certificados instalam o hardware de forma invisível em menos de 2 horas." },
                { num: "02", title: "Monitore pelo app", desc: "Ligue a ignição, aceda às câmeras e defina perímetros de segurança de forma intuitiva." },
                { num: "03", title: "Receba alertas", desc: "A IA do SafeDrive avisa-o apenas do que importa. Sem falsos alarmes, só proteção real." }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex-1 flex flex-col items-center text-center relative z-10 w-full"
                >
                  <div className="w-24 h-24 rounded-full bg-background border-2 border-border flex items-center justify-center text-3xl font-bold text-primary shadow-xl shadow-background mb-6">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Porque escolher o SafeDrive?</h2>
              <p className="text-muted-foreground text-lg">Benefícios reais que impactam a sua tranquilidade e a sua carteira.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Shield, title: "Prevenção ativa", desc: "Não nos limitamos a gravar o que acontece. A nossa IA deteta intenções e atua de forma preventiva antes do dano ocorrer." },
                { icon: BarChart3, title: "Redução no seguro", desc: "A maioria das seguradoras oferece até 25% de desconto nas apólices de veículos equipados com o sistema SafeDrive." },
                { icon: Clock, title: "Resposta rápida", desc: "Acesso direto a uma central de monitorização 24/7 e contacto prioritário com as autoridades em caso de emergência." },
                { icon: Lock, title: "Privacidade garantida", desc: "Os seus dados e gravações são encriptados de ponta a ponta. Só você tem acesso às informações do seu veículo." }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Preços */}
        <section id="precos" className="py-24 bg-secondary/20 border-y border-border scroll-mt-20">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos simples e transparentes</h2>
              <p className="text-muted-foreground text-lg">Invista na segurança do seu veículo com os nossos planos flexíveis.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Básico", price: "€14.99", desc: "Perfeito para segurança diária", features: ["Rastreamento GPS", "Alertas básicos", "Histórico de 7 dias"] },
                { name: "Premium", price: "€29.99", desc: "O nível máximo de proteção", features: ["Tudo do Básico", "Câmeras 360º", "IA de prevenção", "Histórico de 30 dias"], popular: true },
                { name: "Frota", price: "Custom", desc: "Para múltiplas viaturas", features: ["Dashboard central", "Gestão de permissões", "API e integrações"] }
              ].map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`relative flex flex-col h-full bg-card border-border p-8 ${plan.popular ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        Mais Popular
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground">/mês</span>}
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mr-2 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup" className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2 min-h-9 px-4 py-2 w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-0' : 'border border-border hover:bg-secondary'}`}>
                      {plan.price === "Custom" ? "Falar com vendas" : "Começar agora"}
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview do Dashboard */}
        <section className="py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Visibilidade total, em qualquer lugar</h2>
              <p className="text-muted-foreground text-lg mb-8">Acompanhe todos os detalhes do seu veículo numa interface desenhada para a máxima clareza e rapidez de resposta.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto max-w-6xl rounded-xl border border-border/50 bg-background/50 backdrop-blur shadow-2xl p-2 md:p-4 overflow-hidden"
            >
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 shadow-[0_0_15px_var(--color-primary)]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
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
            <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2 bg-primary text-primary-foreground hover:bg-primary/90 border-0 min-h-10 px-10 h-14 text-lg">
              Criar conta gratuitamente
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">Não requer cartão de crédito. Teste de 14 dias grátis.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6 inline-flex">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">SafeDrive</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Protegemos o que é seu através de inteligência artificial e hardware de ponta. O seu veículo, sempre seguro.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollTo("funcionalidades")} className="hover:text-primary transition-colors">Funcionalidades</button></li>
                <li><button onClick={() => scrollTo("beneficios")} className="hover:text-primary transition-colors">Benefícios</button></li>
                <li><button onClick={() => scrollTo("precos")} className="hover:text-primary transition-colors">Preços</button></li>
                <li><Link href="/demo" className="hover:text-primary transition-colors">Pedir Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Conta</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/login" className="hover:text-primary transition-colors">Login</Link></li>
                <li><Link href="/signup" className="hover:text-primary transition-colors">Criar conta</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Recuperar senha</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Centro de Ajuda</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Manuais de Instalação</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contacto</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Status do Sistema</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SafeDrive Technologies. Todos os direitos reservados.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-foreground transition-colors">Termos de Serviço</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Política de Privacidade</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

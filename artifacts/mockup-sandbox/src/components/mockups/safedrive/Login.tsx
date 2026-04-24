import React from "react";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import "./_shared/tokens.css";

export function Login() {
  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Left Panel - Brand / Visual */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-card border-r border-border p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--sd-accent) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-primary/5 to-transparent rotate-45 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-12">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <span className="text-3xl font-bold tracking-tight text-foreground">SafeDrive</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              O seu veículo, <br />sob controlo absoluto.
            </h1>
            <p className="text-lg text-muted-foreground">
              Aceda à sua central de segurança. Monitore câmeras, rastreie via GPS e gira alertas em tempo real a partir de qualquer lugar.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                U{i}
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">+10k</span> veículos protegidos hoje
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">SafeDrive</span>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">Insira as suas credenciais para aceder ao painel.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="nome@exemplo.com" 
                    className="pl-10 h-12 bg-secondary/50 border-border focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Palavra-passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 bg-secondary/50 border-border focus-visible:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">Lembrar-me</Label>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white border-0">
              Entrar no sistema
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">ou</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 border-border bg-transparent hover:bg-secondary text-foreground">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Não tem conta? <a href="#" className="font-semibold text-foreground hover:text-primary transition-colors">Criar conta</a>
          </p>
        </div>
      </div>
    </div>
  );
}

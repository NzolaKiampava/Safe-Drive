import React from "react";
import { Link, useLocation } from "wouter";
import { ShieldCheck, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Insira o seu nome completo." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  phone: z.string().min(9, { message: "Insira um número de telemóvel válido." }),
  password: z.string().min(8, { message: "A palavra-passe deve ter pelo menos 8 caracteres." }),
  plan: z.string({ required_error: "Selecione um plano." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  function onSubmit(data: SignupFormValues) {
    toast({
      title: "Conta criada (demo)",
      description: "A sua conta SafeDrive foi criada com sucesso.",
    });
    setLocation("/login");
  }

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Left Panel - Brand / Visual */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-card border-r border-border p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-primary/5 to-transparent -rotate-45 pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center space-x-3 mb-12 inline-flex">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <span className="text-3xl font-bold tracking-tight text-foreground">SafeDrive</span>
          </Link>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              A segurança que o seu veículo merece.
            </h1>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div> Rastreamento em tempo real</li>
              <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div> Alertas preventivos via IA</li>
              <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div> Suporte de emergência 24/7</li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
          <p className="italic text-muted-foreground mb-4">"O SafeDrive evitou que o meu carro fosse roubado. A sirene e o bloqueio remoto funcionaram na perfeição."</p>
          <div className="font-semibold">— Miguel A., Lisboa</div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-8 left-8 lg:hidden flex items-center space-x-2">
          <Link href="/">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 my-auto py-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground mb-2">Criar conta</h2>
            <p className="text-muted-foreground">Preencha os dados abaixo para começar a proteger o seu veículo.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="João Silva" 
                          className="pl-10 h-12 bg-secondary/50 border-border focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="email"
                          placeholder="joao@exemplo.com" 
                          className="pl-10 h-12 bg-secondary/50 border-border focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telemóvel</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="tel"
                          placeholder="912 345 678" 
                          className="pl-10 h-12 bg-secondary/50 border-border focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-secondary/50 border-border focus:ring-primary">
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basico">Básico (€14.99/mês)</SelectItem>
                        <SelectItem value="premium">Premium (€29.99/mês)</SelectItem>
                        <SelectItem value="frota">Frota (Personalizado)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palavra-passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10 h-12 bg-secondary/50 border-border focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white border-0 mt-6">
                Criar conta gratuitamente
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta? <Link href="/login" className="font-semibold text-foreground hover:text-primary transition-colors">Iniciar sessão</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

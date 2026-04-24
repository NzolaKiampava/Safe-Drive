import React, { useState } from "react";
import { Link } from "wouter";
import { ShieldCheck, Mail, User, Phone, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const demoSchema = z.object({
  name: z.string().min(2, { message: "Insira o seu nome." }),
  company: z.string().min(2, { message: "Insira o nome da empresa." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  phone: z.string().min(9, { message: "Insira um número válido." }),
  fleetSize: z.string({ required_error: "Selecione o tamanho da frota." }),
  message: z.string().optional(),
});

type DemoFormValues = z.infer<typeof demoSchema>;

export default function Demo() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: DemoFormValues) {
    // Local-only submission
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Simple Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">SafeDrive</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            
            {/* Context Panel */}
            <div className="md:w-5/12 bg-secondary/30 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">Veja o SafeDrive em ação</h2>
                <p className="text-muted-foreground mb-8">
                  Agende uma demonstração de 30 minutos com os nossos especialistas e descubra como o SafeDrive pode proteger a sua frota e reduzir os custos de operação.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-3" />
                    <div>
                      <h4 className="font-semibold">Demonstração ao vivo</h4>
                      <p className="text-sm text-muted-foreground">Tour completo do dashboard e sistema de alertas.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-3" />
                    <div>
                      <h4 className="font-semibold">Perguntas & Respostas</h4>
                      <p className="text-sm text-muted-foreground">Tire as suas dúvidas técnicas diretamente com a equipa.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-3" />
                    <div>
                      <h4 className="font-semibold">Preços personalizados</h4>
                      <p className="text-sm text-muted-foreground">Orçamento à medida para o tamanho da sua operação.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Panel */}
            <div className="md:w-7/12 p-8 lg:p-10 bg-background">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Pedido enviado!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Obrigado pelo seu interesse. A nossa equipa entrará em contacto nas próximas 24 horas para agendar a demonstração.
                  </p>
                  <Button asChild className="mt-8 bg-primary hover:bg-primary/90 text-white border-0">
                    <Link href="/">Voltar à página inicial</Link>
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9 bg-secondary/50 border-border" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9 bg-secondary/50 border-border" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail profissional</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="email" className="pl-9 bg-secondary/50 border-border" {...field} />
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
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="tel" className="pl-9 bg-secondary/50 border-border" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="fleetSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tamanho da Frota</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary/50 border-border">
                                <SelectValue placeholder="Selecione o número de veículos" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-5">1 a 5 veículos</SelectItem>
                              <SelectItem value="6-20">6 a 20 veículos</SelectItem>
                              <SelectItem value="21-50">21 a 50 veículos</SelectItem>
                              <SelectItem value="51+">Mais de 50 veículos</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem (Opcional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Textarea 
                                placeholder="Quais são as suas principais preocupações com a frota?"
                                className="pl-9 min-h-[100px] bg-secondary/50 border-border resize-y"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white border-0 mt-6">
                      Pedir demonstração
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Ao submeter este formulário, concorda com a nossa Política de Privacidade.
                    </p>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

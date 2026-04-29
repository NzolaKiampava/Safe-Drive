import { useEffect, useState } from "react";
import {
  Camera as CameraIcon,
  Play,
  Square,
  Mic,
  Maximize2,
  Search,
  Clock,
  AlertCircle,
  Circle,
  MapPin,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type FilterId = "all" | "online" | "offline" | "motion" | "recording";

interface FilterOption {
  id: FilterId;
  label: string;
}

const filters: FilterOption[] = [
  { id: "all", label: "Todas" },
  { id: "online", label: "Online" },
  { id: "offline", label: "Offline" },
  { id: "motion", label: "Movimento detectado" },
  { id: "recording", label: "Com gravação" },
];

interface CameraItem {
  id: string;
  name: string;
  vehicle: string;
  status: "online" | "offline";
  motion: string | null;
  recording: boolean;
  videoSrc?: string;
}

const FEATURED_VIDEO_SRC =
  "https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4";
const FEATURED_VIDEO_POSTER =
  "https://images.pexels.com/videos/2103099/free-video-2103099.jpg?auto=compress&cs=tinysrgb&w=1280";

interface CameraItemWithMedia extends CameraItem {
  poster?: string;
}

const cameras: CameraItemWithMedia[] = [
  {
    id: "tesla-cabin",
    name: "Cabine",
    vehicle: "Tesla Model 3",
    status: "online",
    motion: null,
    recording: true,
    videoSrc:
      "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4",
    poster:
      "https://images.pexels.com/videos/3121459/free-video-3121459.jpg?auto=compress&cs=tinysrgb&w=640",
  },
  {
    id: "tesla-rear",
    name: "Traseira",
    vehicle: "Tesla Model 3",
    status: "online",
    motion: "Há 5 min",
    recording: true,
    videoSrc:
      "https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/2053100/free-video-2053100.jpg?auto=compress&cs=tinysrgb&w=640",
  },
  {
    id: "bmw-front",
    name: "Frontal",
    vehicle: "BMW i4",
    status: "online",
    motion: null,
    recording: false,
    videoSrc:
      "https://videos.pexels.com/video-files/1721308/1721308-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/1721308/free-video-1721308.jpg?auto=compress&cs=tinysrgb&w=640",
  },
  {
    id: "bmw-cabin",
    name: "Cabine",
    vehicle: "BMW i4",
    status: "offline",
    motion: null,
    recording: false,
  },
];

function matchesFilter(cam: CameraItem, filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "online") return cam.status === "online";
  if (filter === "offline") return cam.status === "offline";
  if (filter === "motion") return !!cam.motion;
  if (filter === "recording") return cam.recording;
  return true;
}

export default function Cameras() {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [recording, setRecording] = useState(true);
  const [micOn, setMicOn] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const filteredCameras = cameras.filter((cam) => {
    if (!matchesFilter(cam, activeFilter)) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      cam.name.toLowerCase().includes(q) ||
      cam.vehicle.toLowerCase().includes(q)
    );
  });

  function handleSnapshot() {
    toast({
      title: "Captura guardada",
      description: "Imagem da câmera frontal adicionada à galeria.",
    });
  }

  function handleFullscreen() {
    toast({
      title: "Ecrã completo em breve",
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  }

  function handleCameraClick(cam: CameraItem) {
    if (cam.status === "offline") {
      toast({
        title: "Câmera offline",
        description: `${cam.vehicle} — ${cam.name} não está acessível neste momento.`,
      });
      return;
    }
    toast({
      title: `${cam.vehicle} — ${cam.name}`,
      description: "A abrir transmissão ao vivo (em breve).",
    });
  }

  return (
    <AppShell active="cameras">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              data-testid="text-cameras-title"
            >
              Câmeras
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitoramento de vídeo em tempo real
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar câmera ou veículo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border"
                data-testid="input-camera-search"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
              data-testid={`filter-${f.id}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Feed (Featured) */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-card border-border shadow-none overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-gradient-to-b from-[#0a1128] to-black border-b border-border overflow-hidden">
                {/* Live video feed */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={FEATURED_VIDEO_SRC}
                  poster={FEATURED_VIDEO_POSTER}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  data-testid="video-featured-feed"
                />

                {/* Subtle CCTV scanline overlay on top of the video */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.25) 2px, rgba(255,255,255,0.25) 4px)",
                  }}
                />

                {/* Viewfinder brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-sm pointer-events-none" />

                {/* HUD top-left */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="flex items-center space-x-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs font-mono">
                    <div
                      className={`w-2 h-2 rounded-full ${recording ? "bg-destructive animate-pulse" : "bg-muted-foreground"}`}
                    />
                    {recording ? "REC" : "PAUSADO"}
                  </div>
                  <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs font-mono">
                    CH: Frontal (Tesla M3)
                  </div>
                </div>

                {/* HUD top-right */}
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                  <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs font-mono flex items-center">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {now.toLocaleTimeString("pt-PT")}
                  </div>
                  <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white/80 text-[10px] font-mono">
                    00:04:12
                  </div>
                </div>

                {/* GPS coords */}
                <div className="absolute bottom-16 left-6 bg-black/50 backdrop-blur px-2 py-1 rounded text-white/80 text-[10px] font-mono flex items-center">
                  <MapPin className="w-3 h-3 mr-1.5" />
                  38.7116° N, 9.1411° W
                </div>

                {/* Audio bars */}
                <div className="absolute bottom-16 right-6 flex flex-col items-center gap-1 bg-black/50 backdrop-blur p-1 rounded">
                  <div className="w-1.5 h-6 bg-white/20 rounded-full flex items-end">
                    <div className="w-full h-[80%] bg-success rounded-full" />
                  </div>
                  <div className="w-1.5 h-6 bg-white/20 rounded-full flex items-end">
                    <div className="w-full h-[60%] bg-info rounded-full" />
                  </div>
                </div>

                {/* Tracking Box */}
                <div
                  className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-warning/80 rounded-sm bg-warning/5 animate-pulse"
                  style={{ boxShadow: "0 0 15px rgba(245,158,11,0.2)" }}
                >
                  <div className="absolute -top-7 left-[-2px] bg-warning text-warning-foreground text-[11px] px-2 py-0.5 font-bold shadow-md flex items-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping" />
                    Movimento 89%
                  </div>
                  <div className="absolute top-1/2 -right-12 w-12 border-t-2 border-warning/50 border-dashed" />
                  <div className="absolute top-1/2 -right-14 w-2 h-2 rounded-full bg-warning/80" />
                </div>

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={() => {
                        const next = !recording;
                        setRecording(next);
                        toast({
                          title: next ? "Gravação retomada" : "Gravação pausada",
                        });
                      }}
                      aria-label={recording ? "Pausar gravação" : "Retomar gravação"}
                      data-testid="button-toggle-recording"
                    >
                      <Square
                        className={`w-4 h-4 ${recording ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white/20 h-8 w-8 ${micOn ? "bg-white/20" : ""}`}
                      onClick={() => {
                        const next = !micOn;
                        setMicOn(next);
                        toast({
                          title: next ? "Microfone ativado" : "Microfone silenciado",
                        });
                      }}
                      aria-label={micOn ? "Silenciar microfone" : "Ativar microfone"}
                      data-testid="button-toggle-mic"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={handleSnapshot}
                      aria-label="Capturar imagem"
                      data-testid="button-snapshot"
                    >
                      <CameraIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-white/70 font-mono hidden sm:block">
                    1080p • 30fps • 2.4 Mbps
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={handleFullscreen}
                    aria-label="Ecrã completo"
                    data-testid="button-fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
                  <h3 className="font-semibold text-lg">
                    Tesla Model 3 — Frontal
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success border-success/20"
                  >
                    Online
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> Timeline de Eventos
                  </h4>
                  <div className="relative pl-6 space-y-4 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    <div className="relative flex items-center">
                      <div className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-destructive ring-4 ring-background" />
                      <div className="text-xs text-muted-foreground w-16 font-mono">
                        14:32
                      </div>
                      <div className="flex-1 bg-secondary rounded px-3 py-2 text-sm ml-2">
                        Movimento detectado na frente do veículo
                      </div>
                    </div>
                    <div className="relative flex items-center opacity-70">
                      <div className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-info ring-4 ring-background" />
                      <div className="text-xs text-muted-foreground w-16 font-mono">
                        12:15
                      </div>
                      <div className="flex-1 bg-secondary rounded px-3 py-2 text-sm ml-2">
                        Veículo estacionado
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid Feed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Outras Câmeras</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {filteredCameras.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8 sm:col-span-2 xl:col-span-1">
                  Nenhuma câmera corresponde aos filtros.
                </p>
              )}
              {filteredCameras.map((cam) => (
                <button
                  key={cam.id}
                  type="button"
                  onClick={() => handleCameraClick(cam)}
                  className="group relative w-full text-left rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
                  data-testid={`camera-${cam.id}`}
                >
                  <div className="aspect-video bg-gradient-to-b from-[#0a1128] to-black relative overflow-hidden">
                    {cam.status === "online" && cam.videoSrc && (
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={cam.videoSrc}
                        poster={cam.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        data-testid={`video-${cam.id}`}
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)",
                      }}
                    />
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />

                    {cam.status === "online" ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                        <Play className="w-8 h-8 text-white/0 group-hover:text-white transition-colors" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary/70">
                        <span className="text-xs text-muted-foreground font-mono">
                          OFFLINE
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 right-2 flex justify-between gap-2">
                      <div className="flex items-center space-x-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                        <Circle
                          className={`w-2 h-2 fill-current ${cam.status === "online" ? "text-success" : "text-muted-foreground"}`}
                        />
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
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

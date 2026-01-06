import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Droplets, Flag, Mountain, Info, Map as MapIcon, Activity, ExternalLink, Timer } from "lucide-react";

// Datos de las rutas
const ROUTES_DATA = {
  "5k": {
    title: "Ruta 5K",
    subtitle: "Carrera Recreativa",
    googleMap: "https://www.google.com/maps/d/embed?mid=1CPVfK2iQFA3mtWhZdgpg_CkrssSuCzU&ehbc=2E312F",
    mapMyRun: "https://www.mapmyrun.com/routes/view/embedded/5556720070?width=600&height=376&elevation=true&info=true&line_color=E61900DC&rgbhex=DC0019&distance_markers=0&unit_type=imperial&map_mode=ROADMAP&show_marker_every=1&last_updated=2023-05-29T23:07:52+00:00",
    mmrId: "5556720070",
    stats: { dist: "5.0 km", hydro: "1 Punto", elev: "35 m", terrain: "Plano" }
  },
  "10k": {
    title: "Ruta 10K",
    subtitle: "Desafío Intermedio",
    googleMap: "https://www.google.com/maps/d/embed?mid=1lLFf3piNJOjpvSRpwIhcsYGo31sBBuo&ehbc=2E312F",
    mapMyRun: "https://www.mapmyrun.com/routes/view/embedded/5556729535?width=600&height=376&elevation=true&info=true&line_color=E61900DC&rgbhex=DC0019&distance_markers=0&unit_type=imperial&map_mode=ROADMAP&show_marker_every=1&last_updated=2023-08-13T01:43:32+00:00",
    mmrId: "5556729535",
    stats: { dist: "10.0 km", hydro: "2 Puntos", elev: "65 m", terrain: "Asfalto" }
  },
  "21k": {
    title: "Ruta 21K",
    subtitle: "Media Maratón",
    googleMap: "https://www.google.com/maps/d/embed?mid=196IIFNmk7r-yHTSRGxcXfX7DMyy3qLU&ehbc=2E312F",
    mapMyRun: "https://www.mapmyrun.com/routes/view/embedded/5556655513?width=600&height=376&elevation=true&info=true&line_color=E61900DC&rgbhex=DC0019&distance_markers=0&unit_type=imperial&map_mode=ROADMAP&show_marker_every=1&last_updated=2023-05-29T21:40:43+00:00",
    mmrId: "5556655513",
    stats: { dist: "21.097 km", hydro: "4 Puntos", elev: "120 m", terrain: "Mixto" }
  }
};

const RutaPage = () => {
  const [selectedDist, setSelectedDist] = useState<keyof typeof ROUTES_DATA>("21k");
  const [viewMode, setViewMode] = useState<"google" | "mapmyrun">("mapmyrun");

  const currentRoute = ROUTES_DATA[selectedDist];

  return (
    <>
      <Helmet>
        <title>Rutas Oficiales | Media Maratón de Quibdó</title>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <main className="pt-24 pb-20">
          {/* Header de Selección */}
          <section className="container mx-auto px-4 py-12 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display mb-8"
            >
              Elige tu <span className="text-gradient-emerald">Desafío</span>
            </motion.h1>

            {/* Selector de Distancia */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {(Object.keys(ROUTES_DATA) as Array<keyof typeof ROUTES_DATA>).map((dist) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDist(dist)}
                  className={`relative px-8 py-4 rounded-2xl font-bold text-xl transition-all overflow-hidden ${selectedDist === dist
                    ? "text-white scale-110 shadow-xl shadow-primary/20"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                    }`}
                >
                  {selectedDist === dist && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary z-0" />
                  )}
                  <span className="relative z-10 uppercase">{dist}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Área del Mapa */}
          <section className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Info de la Ruta Seleccionada */}
              <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-display text-primary uppercase tracking-tighter italic">
                    {currentRoute.title}
                  </h2>
                  <p className="text-muted-foreground">{currentRoute.subtitle}</p>
                </div>

                {/* Switch de tipo de mapa */}
                <div className="flex bg-card rounded-lg p-1 border border-border">
                  <button
                    onClick={() => setViewMode("mapmyrun")}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === "mapmyrun" ? "bg-primary text-white" : "text-muted-foreground"}`}
                  >
                    Detallado
                  </button>
                  <button
                    onClick={() => setViewMode("google")}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === "google" ? "bg-primary text-white" : "text-muted-foreground"}`}
                  >
                    Satélite
                  </button>
                </div>
              </div>

              {/* Contenedor del Mapa con Glow */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video md:h-[650px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedDist}-${viewMode}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <iframe
                      src={viewMode === "google" ? currentRoute.googleMap : currentRoute.mapMyRun}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer del Mapa */}
              {viewMode === "mapmyrun" && (
                <div className="mt-4 flex justify-between items-center px-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4 text-primary" />
                    <span>Datos técnicos de altimetría disponibles</span>
                  </div>
                  <a
                    href={`https://www.mapmyrun.com/routes/view/${currentRoute.mmrId}`}
                    target="_blank"
                    className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  >
                    Ver en pantalla completa <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Estadísticas Rápidas 
          <section className="container mx-auto px-4 mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <StatCard icon={<Flag />} label="Distancia" value={currentRoute.stats.dist} color="text-emerald-500" />
              <StatCard icon={<Droplets />} label="Hidratación" value={currentRoute.stats.hydro} color="text-blue-500" />
              <StatCard icon={<Mountain />} label="Elevación" value={currentRoute.stats.elev} color="text-amber-500" />
              <StatCard icon={<Timer />} label="Terreno" value={currentRoute.stats.terrain} color="text-purple-500" />
            </div>
          </section>*/}
        </main>

        <Footer />
      </div>
    </>
  );
};

// Componente pequeño para las cards de stats
{/*const StatCard = ({ icon, label, value, color }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center"
  >
    <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 ${color}`}>
      {icon}
    </div>
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </motion.div>
);
*/}

export default RutaPage;
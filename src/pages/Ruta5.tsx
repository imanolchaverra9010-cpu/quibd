import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Droplets, Flag, Mountain, Info, Map as MapIcon, Activity, ExternalLink } from "lucide-react";

const RutaPage = () => {
  const [activeMap, setActiveMap] = useState<"google" | "mapmyrun">("mapmyrun");

  return (
    <>
      <Helmet>
        <title>Ruta de la Carrera | Media Maratón de Quibdó</title>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <main className="pt-24 pb-20">
          {/* Hero Section con mejor estilo */}
          <section className="relative py-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-3xl rounded-full" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Activity className="w-4 h-4" /> Recorrido Oficial
              </motion.div>
              <motion.h1
                className="font-display text-5xl md:text-7xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Ruta de <span className="text-gradient-emerald">5 Kilómetros</span>
              </motion.h1>
            </div>
          </section>

          {/* Selector de Mapas Style Parche */}
          <section className="container mx-auto px-4 mb-8">
            <div className="flex justify-center gap-4 mb-8">
              {[
                { id: "mapmyrun", label: "Mapa Detallado", icon: Activity },
                { id: "google", label: "Vista Satélite", icon: MapIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMap(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeMap === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                    }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenedor del Mapa con Estilo Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl bg-black h-[600px]">
                <AnimatePresence mode="wait">
                  {activeMap === "mapmyrun" ? (
                    <motion.div
                      key="mmr"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col"
                    >
                      <iframe
                        id='mapmyfitness_route'
                        src='https://www.mapmyrun.com/routes/view/embedded/5556720070?width=600&height=376&elevation=true&info=true&line_color=E61900DC&rgbhex=DC0019&distance_markers=0&unit_type=imperial&map_mode=ROADMAP&show_marker_every=1&last_updated=2023-05-29T23:07:52+00:00'
                        className="w-full h-full border-0"
                      />
                      <div className="bg-card p-4 flex justify-between items-center border-t border-border">
                        <span className="text-sm font-medium text-muted-foreground">Datos provistos por MapMyRun</span>
                        <a href="https://www.mapmyrun.com/routes/view/5556720070" target="_blank" className="text-primary flex items-center gap-1 text-sm font-bold hover:underline">
                          Ver detalles <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="google"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <iframe
                        src="https://www.google.com/maps/d/embed?mid=1CPVfK2iQFA3mtWhZdgpg_CkrssSuCzU&ehbc=2E312F"
                        className="w-full h-full border-0"
                        allowFullScreen
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Stats Grid 
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Distancia", val: "21.097 km", icon: Flag, color: "text-primary" },
                { label: "Hidratación", val: "4 Puntos", icon: Droplets, color: "text-blue-500" },
                { label: "Elevación", val: "120 m", icon: Mountain, color: "text-secondary" },
                { label: "Terreno", val: "Asfalto", icon: Info, color: "text-purple-500" }
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
                  <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-2xl font-bold">{item.val}</p>
                </div>
              ))}
            </div>
          </section>*/}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RutaPage;
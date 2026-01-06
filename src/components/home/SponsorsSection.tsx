import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";
import { sponsorsAPI } from "@/services/api";
import { toast } from "sonner";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: "principal" | "oro" | "plata" | "colaborador";
}

export function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setLoading(true);
      const response = await sponsorsAPI.getAll();
      setSponsors(response.sponsors);
    } catch (error) {
      console.error("Error al cargar patrocinadores:", error);
    } finally {
      setLoading(false);
    }
  };

  const principalSponsors = sponsors.filter(s => s.tier === "principal");
  const goldSponsors = sponsors.filter(s => s.tier === "oro");
  const silverSponsors = sponsors.filter(s => s.tier === "plata");
  const collaborators = sponsors.filter(s => s.tier === "colaborador");

  if (loading) {
    return (
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Cargando patrocinadores...</p>
        </div>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return null; // No mostrar sección si no hay patrocinadores
  }

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Gracias a Quienes Nos Apoyan
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2">
            Nuestros <span className="text-gradient-gold">Patrocinadores</span>
          </h2>
        </motion.div>

        {/* Patrocinadores Principales */}
        {principalSponsors.length > 0 && (
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {principalSponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-2xl p-8 flex items-center justify-center h-48 group transition-all"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Oro y Plata */}
        {(goldSponsors.length > 0 || silverSponsors.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center mb-16">
            {[...goldSponsors, ...silverSponsors].map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-16 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Colaboradores */}
        {collaborators.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            {collaborators.map((sponsor) => (
              <span
                key={sponsor.id}
                className="text-sm font-medium grayscale hover:grayscale-0 cursor-default transition-all"
              >
                {sponsor.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
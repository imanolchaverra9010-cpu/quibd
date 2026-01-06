import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-marathon.mp4";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Próxima edición: Agosto 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl text-foreground hero-text-shadow mb-6"
          >
            Media Maratón
            <span className="block text-gradient-emerald">de Quibdó</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Más allá de la competencia, cultivamos la paz y el bienestar en nuestra comunidad
            a través del deporte y la vida activa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/inscribete">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Inscríbete Ahora
              </Button>
            </Link>
            <Link to="/ruta">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto gap-2">
                <MapPin className="w-5 h-5" />
                Ver Ruta
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="font-display text-3xl sm:text-4xl text-primary">21K</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Kilómetros</div>
            </div>
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="font-display text-3xl sm:text-4xl text-secondary">2000+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Participantes</div>
            </div>
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="font-display text-3xl sm:text-4xl text-accent">5</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Ediciones</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-wider">Descubre más</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

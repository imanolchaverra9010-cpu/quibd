import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react"; // Añadimos useMemo aquí
import { useAdmin } from "@/contexts/AdminContext";
import heroVideo from "@/assets/hero-marathon.mp4";
import logo from "@/assets/logo-mmq.png";

// Hook para el contador (Se mantiene igual, pero ahora recibirá una referencia estable)
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// --- Animaciones ---
const floatingAnimation = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
};

const floatingAnimationDelayed1 = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }
};

const floatingAnimationDelayed05 = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};


export function HeroSection() {
  const { state } = useAdmin(); // Extrae el estado del contexto que viene del backend

  // SOLUCIÓN AL BUCLE: Memorizamos la fecha para que la referencia sea estable
  const targetDate = useMemo(() => {
    return new Date(state.eventDate);
  }, [state.eventDate]);

  const timeLeft = useCountdown(targetDate);

  // Formatear fecha para mostrar
  const formattedDate = targetDate.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  });

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
          {/* Usa el video del backend si existe, sino usa el video estático */}
          <source src={state.heroVideo || heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
        <motion.div
          className="absolute inset-0 bg-gradient-primary opacity-20"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decoraciones Flotantes */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-accent blur-3xl opacity-30" animate={floatingAnimation} />
        <motion.div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-gradient-purple blur-3xl opacity-20" animate={floatingAnimationDelayed1} />
        <motion.div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-secondary blur-2xl opacity-25" animate={floatingAnimationDelayed05} />
      </div>

      {/* Contenido Principal */}
      <motion.div
        className="relative z-10 container mx-auto px-4 pt-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-6">
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-4 h-4" />
              <Calendar className="w-4 h-4" />
              Próxima edición: {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
            </motion.span>
          </motion.div>

          {/* Contador */}
          <motion.div variants={fadeInUp} className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto mb-8">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Seg" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="relative group"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                <div className="relative rounded-xl p-3 sm:p-4 bg-card/60 backdrop-blur-md border border-primary/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-15 transition-opacity duration-300" />
                  <div className="relative">
                    <motion.div
                      key={item.value}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-display text-2xl sm:text-4xl bg-gradient-primary bg-clip-text text-transparent"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {item.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Logo */}
          <motion.div variants={fadeInUp} className="mb-6">
            <motion.img
              src={logo}
              alt="Media Maratón de Quibdó"
              className="h-32 sm:h-44 lg:h-56 mx-auto drop-shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Más allá de la competencia, cultivamos la paz y el bienestar en nuestra comunidad a través del deporte y la vida activa.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="https://respira.run/media-maraton-quibdo">
              <Button variant="default" size="xl" className="w-full sm:w-auto shadow-xl shadow-primary/40">
                Inscríbete Ahora
              </Button>
            </Link>
            <Link to="/ruta">
              <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground">
                <MapPin className="w-5 h-5" />
                Ver Ruta
              </Button>
            </Link>
          </motion.div>

          {/* Estadísticas 
          <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <StatCard label="Kilómetros" value="21K" color="primary" />
            <StatCard label="Participantes" value="2000+" color="secondary" />
            <StatCard label="Ediciones" value="5" color="accent" />
          </motion.div>*/}
        </div>
      </motion.div>
    </section>
  );
}

// Componente auxiliar para las tarjetas de stats
function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`group relative rounded-2xl p-4 sm:p-6 bg-card/50 backdrop-blur-md border border-${color}/20 hover:border-${color}/50 transition-all duration-300 overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative">
        <div className={`font-display text-3xl sm:text-4xl bg-gradient-${color} bg-clip-text text-transparent`}>{value}</div>
        <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}
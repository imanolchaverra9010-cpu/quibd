import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Heart, Users, Award } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

export function AboutSection() {
  const features = [
    { icon: Target, title: "21 Kilómetros", description: "Recorrido oficial de media maratón" },
    { icon: Heart, title: "Paz y Bienestar", description: "Promovemos estilos de vida saludables" },
    { icon: Users, title: "Comunidad", description: "Unidos por el deporte" },
    { icon: Award, title: "Excelencia", description: "Evento certificado internacionalmente" },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Sobre Nosotros
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2 mb-6">
              Más que una <span className="text-gradient-gold">carrera</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              La Media Maratón de Quibdó es un evento deportivo urbano que, más allá de la competencia, 
              busca cultivar la paz y el bienestar en la comunidad del Chocó colombiano, fomentando 
              estilos de vida activos y saludables a través de la actividad física y la recreación.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/quienes-somos">
              <Button variant="outline" size="lg">Conoce Más</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden glow-emerald">
              <img src={aboutHero} alt="Corredores en la Media Maratón" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4">
              <div className="font-display text-3xl text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Años de historia</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

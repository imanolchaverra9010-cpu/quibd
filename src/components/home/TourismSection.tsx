import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Asegúrate de tener esto
import { Button } from "@/components/ui/button";
import { Palmtree, Fish, Bird, Mountain, Waves, Music } from "lucide-react";
import tourismChoco from "@/assets/tourism-choco.jpg";

const attractions = [
  { icon: Waves, title: "Río Atrato", description: "El río más caudaloso de Colombia, ideal para paseos en lancha." },
  { icon: Palmtree, title: "Selva Tropical", description: "Biodiversidad única con flora y fauna endémica." },
  { icon: Bird, title: "Avistamiento de Aves", description: "Más de 600 especies de aves en la región." },
  { icon: Fish, title: "Pesca Artesanal", description: "Experiencias de pesca con comunidades locales." },
  { icon: Music, title: "Cultura Afro", description: "Música, danza y gastronomía tradicional." },
  { icon: Mountain, title: "Senderismo", description: "Rutas ecológicas por la selva chocoana." },
];

export function TourismSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={tourismChoco} alt="Chocó Colombia" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Descubre el Chocó
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2 mb-6">
              Turismo en <span className="text-gradient-emerald">Quibdó</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Aprovecha tu visita a la Media Maratón para explorar la riqueza natural y cultural del Chocó.
              Conocido como una de las regiones más biodiversas del planeta, el Chocó te ofrece experiencias
              únicas que van desde la selva tropical hasta las tradiciones afrocolombianas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {attractions.map((attr, index) => (
                <motion.div
                  key={attr.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <attr.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground text-sm">{attr.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{attr.description}</p>
                </motion.div>
              ))}
            </div>

            {/* AQUÍ ESTÁ EL CAMBIO: Envolvemos el Button en un Link */}
            <Link to="/Turismo">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-white transition-all">
                Explorar Turismo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl overflow-hidden glow-emerald">
              <img src={tourismChoco} alt="Selva del Chocó" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4">
              <div className="font-display text-2xl text-secondary">10%</div>
              <div className="text-xs text-muted-foreground">de la biodiversidad mundial</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
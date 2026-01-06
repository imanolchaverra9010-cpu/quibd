import { motion } from "framer-motion";

const sponsors = [
  { name: "Gobernación del Chocó", tier: "principal" },
  { name: "Alcaldía de Quibdó", tier: "principal" },
  { name: "Coldeportes", tier: "principal" },
  { name: "Banco Agrario", tier: "oro" },
  { name: "EPM", tier: "oro" },
  { name: "Postobón", tier: "oro" },
  { name: "Nike Running", tier: "plata" },
  { name: "Gatorade", tier: "plata" },
  { name: "Claro", tier: "plata" },
  { name: "Avianca", tier: "plata" },
  { name: "Hotel Quibdó Plaza", tier: "colaborador" },
  { name: "Restaurante El Atrato", tier: "colaborador" },
];

export function SponsorsSection() {
  const principalSponsors = sponsors.filter(s => s.tier === "principal");
  const goldSponsors = sponsors.filter(s => s.tier === "oro");
  const silverSponsors = sponsors.filter(s => s.tier === "plata");
  const collaborators = sponsors.filter(s => s.tier === "colaborador");

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Gracias a Quienes Nos Apoyan
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2">
            Nuestros <span className="text-gradient-gold">Patrocinadores</span>
          </h2>
        </motion.div>

        {/* Principal Sponsors */}
        <div className="mb-12">
          <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Patrocinadores Principales
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {principalSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl px-8 py-6 flex items-center justify-center min-w-[200px] hover:border-secondary/50 transition-colors"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-gold-glow flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-xl text-secondary-foreground">
                      {sponsor.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">{sponsor.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Patrocinadores Oro
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {goldSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl px-6 py-4 flex items-center justify-center min-w-[160px] hover:border-primary/50 transition-colors"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <span className="font-display text-lg text-primary">
                      {sponsor.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{sponsor.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-12">
          <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Patrocinadores Plata
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {silverSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-lg px-4 py-3 hover:border-border transition-colors"
              >
                <span className="text-sm text-muted-foreground">{sponsor.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Collaborators */}
        <div>
          <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Colaboradores
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {collaborators.map((sponsor, index) => (
              <motion.span
                key={sponsor.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted/50"
              >
                {sponsor.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground mb-4">
            ¿Quieres ser parte de nuestros patrocinadores?
          </p>
          <a href="mailto:patrocinios@mediamaratondequibdo.com" className="text-primary font-medium hover:underline">
            patrocinios@mediamaratondequibdo.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}

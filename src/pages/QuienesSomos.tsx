import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Target, Heart, Users, Award, Globe, Leaf, Music, Trophy } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import tourismChoco from "@/assets/tourism-choco.jpg";

const QuienesSomosPage = () => {
  const values = [
    { icon: Heart, title: "Paz y Bienestar", description: "Fomentamos la reconciliación y la salud mental a través del deporte." },
    { icon: Users, title: "Comunidad", description: "Unidos por el amor al running y al Chocó, creamos lazos que trascienden la carrera." },
    { icon: Leaf, title: "Sostenibilidad", description: "Comprometidos con el medio ambiente y el desarrollo sostenible de nuestra región." },
    { icon: Globe, title: "Inclusión", description: "Un evento para todos, sin importar edad, género o condición física." },
  ];

  const timeline = [
    { year: 2020, title: "Primera Edición", description: "Nacimiento de la Media Maratón con 500 participantes." },
    { year: 2021, title: "Crecimiento", description: "Más de 800 corredores de 8 departamentos." },
    { year: 2022, title: "Consolidación", description: "1,500 participantes y reconocimiento nacional." },
    { year: 2023, title: "Expansión", description: "1,800 corredores y alianzas internacionales." },
    { year: 2024, title: "Récord Histórico", description: "2,247 participantes de 15 departamentos." },
  ];

  const team = [
    { name: "Carlos Mosquera", role: "Director General", description: "Atleta y promotor deportivo chocoano." },
    { name: "María Palacios", role: "Coordinadora Logística", description: "Experta en organización de eventos deportivos." },
    { name: "Andrés Rentería", role: "Director Técnico", description: "Entrenador certificado de atletismo." },
    { name: "Luz Marina Córdoba", role: "Relaciones Públicas", description: "Comunicadora social y gestora cultural." },
  ];

  return (
    <>
      <Helmet>
        <title>¿Quiénes Somos? | Media Maratón de Quibdó</title>
        <meta name="description" content="Conoce la historia, misión y valores de la Media Maratón de Quibdó, el evento deportivo más importante del Pacífico colombiano." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          {/* Hero */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src={aboutHero} alt="Media Maratón de Quibdó" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center"
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider">Nuestra Historia</span>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mt-2 mb-6">
                  ¿Quiénes <span className="text-gradient-emerald">Somos?</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  La Media Maratón de Quibdó es más que una carrera: es un movimiento que une a la comunidad del Chocó
                  en torno al deporte, la paz y el bienestar colectivo.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl text-foreground mb-4">Nuestra Misión</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Promover estilos de vida saludables y activos en la comunidad chocoana, utilizando el deporte
                    como herramienta de transformación social, paz y desarrollo regional, contribuyendo al bienestar
                    físico y mental de los participantes.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                    <Trophy className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="font-display text-3xl text-foreground mb-4">Nuestra Visión</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser reconocidos como el evento deportivo más importante del Pacífico colombiano, modelo de
                    organización, inclusión y sostenibilidad, posicionando a Quibdó como destino de turismo
                    deportivo a nivel nacional e internacional.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider">Lo que nos define</span>
                <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2">
                  Nuestros <span className="text-gradient-gold">Valores</span>
                </h2>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider">5 años de historia</span>
                <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2">
                  Nuestra <span className="text-gradient-emerald">Trayectoria</span>
                </h2>
              </motion.div>
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" />
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                        <div className="font-display text-3xl text-primary mb-1">{item.year}</div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      <div className="w-1/2" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Team 
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider">El corazón del evento</span>
                <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2">
                  Nuestro <span className="text-gradient-gold">Equipo</span>
                </h2>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-emerald-glow flex items-center justify-center mx-auto mb-4">
                      <span className="font-display text-2xl text-primary-foreground">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>*/}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default QuienesSomosPage;

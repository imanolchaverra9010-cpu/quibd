import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import eventsBg from "@/assets/events-bg.jpg";
import startLine from "@/assets/gallery/start-line.jpg";
import warmup from "@/assets/gallery/warmup.jpg";
import hydration from "@/assets/gallery/hydration.jpg";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "próximo" | "pasado";
  type: "evento" | "noticia";
  excerpt: string;
  content: string;
  image: string;
  attendees?: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "Media Maratón de Quibdó 2025",
    date: "10 de Agosto, 2025",
    time: "6:00 AM",
    location: "Parque Centenario, Quibdó",
    category: "próximo",
    type: "evento",
    excerpt: "La sexta edición de la carrera más importante del Pacífico colombiano.",
    content: "Prepárate para vivir la experiencia más emocionante del running en el Pacífico colombiano. La Media Maratón de Quibdó 2025 promete superar todas las expectativas con un recorrido de 21 kilómetros que atraviesa los lugares más emblemáticos de nuestra ciudad. Este año esperamos más de 2,500 participantes de todo el país. Las inscripciones ya están abiertas con precios especiales para los primeros 500 inscritos.",
    image: startLine,
    attendees: 2500,
  },
  {
    id: 2,
    title: "Expo Maratón 2025",
    date: "8-9 de Agosto, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Centro de Convenciones",
    category: "próximo",
    type: "evento",
    excerpt: "Recoge tu kit y disfruta de la feria deportiva más grande del Chocó.",
    content: "La Expo Maratón es el punto de encuentro previo a la carrera donde podrás recoger tu kit de corredor, asistir a charlas sobre running, nutrición y entrenamiento, conocer las últimas novedades en equipamiento deportivo y conectar con otros corredores. Habrá stands de patrocinadores, zona de fisioterapia, actividades para niños y mucho más.",
    image: warmup,
    attendees: 5000,
  },
  {
    id: 3,
    title: "Entrenamiento Grupal Pre-Maratón",
    date: "20 de Julio, 2025",
    time: "6:00 AM",
    location: "Malecón del Atrato",
    category: "próximo",
    type: "evento",
    excerpt: "Sesión de entrenamiento gratuita con corredores elite.",
    content: "Únete a nuestra sesión de entrenamiento grupal dirigida por corredores profesionales. Durante 3 horas trabajaremos técnicas de carrera, estrategias de hidratación y nutrición, y consejos para mantener el ritmo durante los 21 kilómetros. El entrenamiento es gratuito para todos los inscritos en la carrera.",
    image: hydration,
    attendees: 300,
  },
  {
    id: 4,
    title: "Apertura de Inscripciones 2025",
    date: "15 de Marzo, 2025",
    time: "8:00 AM",
    location: "Virtual",
    category: "próximo",
    type: "noticia",
    excerpt: "¡Las inscripciones para la Media Maratón 2025 ya están abiertas!",
    content: "Nos complace anunciar que las inscripciones para la sexta edición de la Media Maratón de Quibdó están oficialmente abiertas. Los primeros 500 inscritos recibirán un kit especial de bienvenida que incluye camiseta conmemorativa, gorra y morral deportivo. No pierdas esta oportunidad de ser parte de esta fiesta del deporte y la paz.",
    image: eventsBg,
  },
  {
    id: 5,
    title: "Récord de Participación en 2024",
    date: "10 de Septiembre, 2024",
    time: "",
    location: "Quibdó",
    category: "pasado",
    type: "noticia",
    excerpt: "La edición 2024 rompió todos los récords con más de 2,200 participantes.",
    content: "La quinta edición de la Media Maratón de Quibdó ha sido un éxito rotundo. Con más de 2,200 participantes de 15 departamentos diferentes, este evento se consolida como el más importante del Pacífico colombiano. Agradecemos a todos los patrocinadores, voluntarios y participantes.",
    image: startLine,
  },
];

const EventosPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<"todos" | "próximo" | "pasado">("todos");

  const filteredEvents = filter === "todos" 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <>
      <Helmet>
        <title>Eventos | Media Maratón de Quibdó</title>
        <meta name="description" content="Descubre todos los eventos y noticias de la Media Maratón de Quibdó." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          {/* Hero */}
          <section className="py-16 bg-gradient-to-b from-card to-background">
            <div className="container mx-auto px-4 text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary text-sm font-medium uppercase tracking-wider"
              >
                Mantente Informado
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-2"
              >
                Eventos y <span className="text-gradient-gold">Noticias</span>
              </motion.h1>
            </div>
          </section>

          {/* Filter */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex justify-center gap-3">
                {(["todos", "próximo", "pasado"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {f === "todos" ? "Todos" : f === "próximo" ? "Próximos" : "Pasados"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Events Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedEvent(event)}
                    className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          event.category === "próximo" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {event.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          event.type === "evento" 
                            ? "bg-secondary text-secondary-foreground" 
                            : "bg-accent text-accent-foreground"
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        {event.attendees && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendees.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {event.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        Ver detalles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />

        {/* Event Detail Modal */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            {selectedEvent && (
              <>
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <DialogHeader>
                  <div className="flex gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      selectedEvent.category === "próximo" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {selectedEvent.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      selectedEvent.type === "evento" 
                        ? "bg-secondary text-secondary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {selectedEvent.type}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-2xl text-foreground">
                    {selectedEvent.title}
                  </DialogTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedEvent.date}
                    </span>
                    {selectedEvent.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedEvent.time}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.location}
                    </span>
                  </div>
                </DialogHeader>
                <DialogDescription className="text-foreground/80 leading-relaxed text-base">
                  {selectedEvent.content}
                </DialogDescription>
                <div className="flex gap-3 pt-4">
                  {selectedEvent.type === "evento" && selectedEvent.category === "próximo" && (
                    <Button variant="hero" className="flex-1">
                      Inscribirme
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Cerrar
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EventosPage;

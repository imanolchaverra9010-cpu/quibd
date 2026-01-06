import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { eventsAPI } from "@/services/api";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: "evento" | "noticia";
  featured: boolean;
}

const EventosPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<"todos" | "evento" | "noticia">("todos");

  // Cargar eventos desde el backend
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.events);
    } catch (error) {
      toast.error("Error al cargar eventos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = filter === "todos"
    ? events
    : events.filter(e => e.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando eventos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                {(["todos", "evento", "noticia"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                  >
                    {f === "todos" ? "Todos" : f === "evento" ? "Eventos" : "Noticias"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Events Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay eventos disponibles</p>
                </div>
              ) : (
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
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <Calendar className="w-16 h-16 text-primary/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${event.featured
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                            }`}>
                            {event.featured ? "Destacado" : event.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${event.category === "evento"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-accent text-accent-foreground"
                            }`}>
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                        </div>
                        <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                          Ver detalles
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
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
                  {selectedEvent.image ? (
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Calendar className="w-24 h-24 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <DialogHeader>
                  <div className="flex gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${selectedEvent.featured
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}>
                      {selectedEvent.featured ? "Destacado" : selectedEvent.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${selectedEvent.category === "evento"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-accent text-accent-foreground"
                      }`}>
                      {selectedEvent.category}
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
                  </div>
                </DialogHeader>
                <DialogDescription className="text-foreground/80 leading-relaxed text-base">
                  {selectedEvent.description}
                </DialogDescription>
                <div className="flex gap-3 pt-4">
                  {selectedEvent.category === "evento" && selectedEvent.featured && (
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
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import eventsBg from "@/assets/events-bg.jpg";
import { useEffect } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "evento" | "noticia";
  excerpt: string;
  content: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Apertura de Inscripciones 2025",
    date: "15 de Marzo, 2025",
    time: "8:00 AM",
    location: "Virtual",
    category: "evento",
    excerpt: "¡Las inscripciones para la Media Maratón 2025 ya están abiertas!",
    content: "Nos complace anunciar que las inscripciones para la sexta edición de la Media Maratón de Quibdó están oficialmente abiertas. Este año esperamos superar los 2,500 participantes y hacer de este el evento deportivo más grande del Chocó. Los primeros 500 inscritos recibirán un kit especial de bienvenida que incluye camiseta conmemorativa, gorra y morral deportivo. No pierdas esta oportunidad de ser parte de esta fiesta del deporte y la paz.",
    image: eventsBg,
  },
  {
    id: 2,
    title: "Entrenamiento Grupal Pre-Maratón",
    date: "20 de Julio, 2025",
    time: "6:00 AM",
    location: "Parque Centenario",
    category: "evento",
    excerpt: "Únete a nuestra sesión de entrenamiento grupal con corredores elite.",
    content: "Prepárate para la Media Maratón con nuestra sesión de entrenamiento grupal dirigida por corredores profesionales. Durante 3 horas trabajaremos técnicas de carrera, estrategias de hidratación y nutrición, y consejos para mantener el ritmo durante los 21 kilómetros. El entrenamiento es gratuito para todos los inscritos en la carrera. ¡Te esperamos!",
    image: eventsBg,
  },
  {
    id: 3,
    title: "Récord de Participación en 2024",
    date: "10 de Septiembre, 2024",
    time: "",
    location: "Quibdó",
    category: "noticia",
    excerpt: "La edición 2024 rompió todos los récords con más de 2,200 participantes.",
    content: "La quinta edición de la Media Maratón de Quibdó ha sido un éxito rotundo. Con más de 2,200 participantes de 15 departamentos diferentes, este evento se consolida como el más importante del Pacífico colombiano. El ganador masculino, Juan Carlos Mena, completó el recorrido en un tiempo de 1:08:45, mientras que María del Carmen Palacios se coronó campeona femenina con un tiempo de 1:22:30. Agradecemos a todos los patrocinadores, voluntarios y participantes que hicieron posible esta fiesta del deporte.",
    image: eventsBg,
  },
  {
    id: 4,
    title: "Expo Maratón 2025",
    date: "8 de Agosto, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Centro de Convenciones",
    category: "evento",
    excerpt: "Recoge tu kit de corredor y disfruta de nuestra feria deportiva.",
    content: "El día previo a la carrera, te invitamos a la Expo Maratón donde podrás recoger tu kit de corredor, participar en charlas sobre running, conocer las últimas novedades en equipamiento deportivo y conectar con otros corredores. Habrá stands de nutrición deportiva, fisioterapia, tiendas de running y mucho más. La entrada es gratuita para participantes y acompañantes.",
    image: eventsBg,
  },
];
export function EventsSection() {
  // 2. Definimos los estados para los eventos y carga
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // 3. Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();
        if (data.status === "success") {
          // El backend usa 'description' pero tu interfaz usa 'content' y 'excerpt'
          // Mapeamos los datos para que encajen
          const mappedEvents = data.events.map((e: any) => ({
            id: e.id,
            title: e.title,
            date: e.date,
            time: "", // El backend actual no tiene campo 'time', podrías añadirlo después
            location: "Quibdó", // Valor por defecto o añadir al backend
            category: e.category,
            excerpt: e.description.substring(0, 100) + "...",
            content: e.description,
            image: e.image || eventsBg, // Usa la del backend o la de respaldo
          }));
          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Error cargando eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <div className="text-center py-20">Cargando eventos para el parche...</div>;


  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Mantente Informado
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-2">
            Eventos y <span className="text-gradient-gold">Noticias</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase ${event.category === "evento"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
                  }`}>
                  {event.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  {event.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                  Ver más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            Ver Todos los Eventos
          </Button>
        </motion.div>
      </div>

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
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase ${selectedEvent.category === "evento"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
                  }`}>
                  {selectedEvent.category}
                </span>
              </div>
              <DialogHeader>
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
                {selectedEvent.category === "evento" && (
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
    </section>
  );
}

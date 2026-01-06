import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

// Import gallery images
import startLine from "@/assets/gallery/start-line.jpg";
import aerialRace from "@/assets/gallery/aerial-race.jpg";
import hydration from "@/assets/gallery/hydration.jpg";
import finishMedals from "@/assets/gallery/finish-medals.jpg";
import warmup from "@/assets/gallery/warmup.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import resultsBg from "@/assets/results-bg.jpg";
import eventsBg from "@/assets/events-bg.jpg";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  event: string;
  year: number;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: startLine, title: "Salida de la carrera", event: "Media Maratón 2024", year: 2024 },
  { id: 2, src: aerialRace, title: "Vista aérea del recorrido", event: "Media Maratón 2024", year: 2024 },
  { id: 3, src: hydration, title: "Punto de hidratación", event: "Media Maratón 2024", year: 2024 },
  { id: 4, src: finishMedals, title: "Celebración en la meta", event: "Media Maratón 2024", year: 2024 },
  { id: 5, src: warmup, title: "Calentamiento previo", event: "Media Maratón 2023", year: 2023 },
  { id: 6, src: aboutHero, title: "Panorámica de corredores", event: "Media Maratón 2023", year: 2023 },
  { id: 7, src: resultsBg, title: "Cruzando la meta", event: "Media Maratón 2022", year: 2022 },
  { id: 8, src: eventsBg, title: "Corredores en acción", event: "Media Maratón 2022", year: 2022 },
];

const events = ["Todos", "Media Maratón 2024", "Media Maratón 2023", "Media Maratón 2022"];

const GaleriaPage = () => {
  const [selectedEvent, setSelectedEvent] = useState("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedEvent === "Todos" 
    ? galleryImages 
    : galleryImages.filter(img => img.event === selectedEvent);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <>
      <Helmet>
        <title>Galería | Media Maratón de Quibdó</title>
        <meta name="description" content="Explora las mejores fotos de las ediciones anteriores de la Media Maratón de Quibdó." />
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
                Momentos Inolvidables
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-2"
              >
                Galería <span className="text-gradient-gold">Fotográfica</span>
              </motion.h1>
            </div>
          </section>

          {/* Filter */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-3">
                {events.map((event) => (
                  <button
                    key={event}
                    onClick={() => setSelectedEvent(event)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedEvent === event
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(index)}
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-foreground font-semibold">{image.title}</h3>
                          <p className="text-sm text-muted-foreground">{image.event}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 p-2 text-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 p-2 text-foreground hover:text-primary transition-colors"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <h3 className="text-foreground font-display text-xl">{filteredImages[lightboxIndex].title}</h3>
                <p className="text-muted-foreground">{filteredImages[lightboxIndex].event}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GaleriaPage;

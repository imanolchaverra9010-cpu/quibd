import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { galleryAPI } from "@/services/api";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  event: string;
  year: number;
  type: 'image' | 'video';
}

const GaleriaPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Obtener eventos únicos para el filtro
  const events = ["Todos", ...Array.from(new Set(galleryImages.map(img => img.event)))];

  // Cargar galería desde el backend
  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      setGalleryImages(response.items);
    } catch (error) {
      toast.error("Error al cargar la galería");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando galería...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedEvent === event
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
              {filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay elementos en la galería</p>
                </div>
              ) : (
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
                        {image.type === 'image' ? (
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <video
                            src={image.src}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            muted
                            loop
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-foreground font-semibold">{image.alt}</h3>
                            <p className="text-sm text-muted-foreground">{image.event}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
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

              {filteredImages[lightboxIndex].type === 'image' ? (
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <motion.video
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={filteredImages[lightboxIndex].src}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  controls
                  autoPlay
                />
              )}

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 p-2 text-foreground hover:text-primary transition-colors"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <h3 className="text-foreground font-display text-xl">{filteredImages[lightboxIndex].alt}</h3>
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
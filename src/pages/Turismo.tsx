import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import {
    Camera, Map, Palmtree, Utensils, Waves, Music,
    X, Info, Clock, MapPin, Star, ChevronRight
} from "lucide-react";

// Datos extendidos para los modales
const touristDestinations = [
    {
        id: 1,
        title: "Malecón de Quibdó",
        category: "Cultura",
        image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&q=80",
        description: "El corazón de la ciudad a orillas del Río Atrato.",
        fullInfo: "El Malecón es el punto de encuentro por excelencia en Quibdó. Recientemente renovado, ofrece una vista espectacular del imponente Río Atrato. Es el lugar ideal para entender la importancia del río en la vida chocoana.",
        details: ["Abierto 24/7", "Zona gastronómica", "Ideal para atardeceres", "Artesanías locales"],
        icon: <Waves className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Catedral San Francisco",
        category: "Historia",
        image: "https://images.unsplash.com/photo-1548625361-195fe6144df8?auto=format&fit=crop&q=80",
        description: "Icono arquitectónico y centro de las Fiestas de San Pacho.",
        fullInfo: "Esta catedral es el centro espiritual de la ciudad. Su arquitectura destaca en el perfil de Quibdó. Durante las fiestas patronales (San Pacho), es el epicentro de las celebraciones religiosas y culturales.",
        details: ["Misas diarias", "Entrada libre", "Ubicación central", "Patrimonio histórico"],
        icon: <Camera className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Gastronomía Local",
        category: "Sabor",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80",
        description: "Prueba el arroz con coco, pescado frito y borojó.",
        fullInfo: "La cocina del Chocó es una explosión de sabores del pacífico. El uso de hierbas de azotea (como el cimarrón) le da un toque único. No puedes irte sin probar el 'Pescado en Salsa de Coco' o el refrescante jugo de Borojó.",
        details: ["Platos desde $25.000", "Mercado central", "Cocina tradicional", "Hierbas de azotea"],
        icon: <Utensils className="w-6 h-6" />
    },
    {
        id: 4,
        title: "Selva y Biodiversidad",
        category: "Naturaleza",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80",
        description: "Explora la flora y fauna única del Chocó.",
        fullInfo: "Quibdó está rodeado por una de las selvas más húmedas y biodiversas del planeta. Existen guías locales que ofrecen recorridos por senderos ecológicos y ríos cercanos para observar aves y plantas exóticas.",
        details: ["Requiere guía", "Caminatas ecológicas", "Avistamiento de aves", "Ropa cómoda"],
        icon: <Palmtree className="w-6 h-6" />
    }
];

const TurismoPage = () => {
    const [selectedPlace, setSelectedPlace] = useState<typeof touristDestinations[0] | null>(null);

    return (
        <>
            <Helmet>
                <title>Turismo en Quibdó | Media Maratón</title>
            </Helmet>

            <div className="min-h-screen bg-background text-foreground">
                <Header />

                <main className="pt-24 pb-20">
                    {/* Hero Section */}
                    <section className="relative py-20 text-center">
                        <div className="container mx-auto px-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-display mb-6"
                            >
                                Vive <span className="text-gradient-gold">Quibdó</span>
                            </motion.h1>
                            <p className="text-muted-foreground max-w-xl mx-auto">Haz clic en cada lugar para descubrir más detalles para tu visita.</p>
                        </div>
                    </section>

                    {/* Grid de Destinos */}
                    <section className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {touristDestinations.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={`card-${item.id}`}
                                    onClick={() => setSelectedPlace(item)}
                                    className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 h-[350px] cursor-pointer"
                                >
                                    <img src={item.image} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 p-8">
                                        <span className="text-xs font-bold uppercase text-primary mb-2 block tracking-widest">{item.category}</span>
                                        <h3 className="text-3xl font-display text-white">{item.title}</h3>
                                        <div className="flex items-center gap-2 text-white/70 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>Ver más información</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* MODAL CON MÁS INFORMACIÓN */}
                <AnimatePresence>
                    {selectedPlace && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedPlace(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />

                            <motion.div
                                layoutId={`card-${selectedPlace.id}`}
                                className="relative w-full max-w-4xl bg-card border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
                            >
                                <button
                                    onClick={() => setSelectedPlace(null)}
                                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex flex-col md:flex-row">
                                    {/* Lado imagen */}
                                    <div className="w-full md:w-1/2 h-[300px] md:h-auto">
                                        <img src={selectedPlace.image} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Lado contenido */}
                                    <div className="w-full md:w-1/2 p-8 md:p-12">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                {selectedPlace.icon}
                                            </div>
                                            <span className="text-sm font-bold text-primary uppercase">{selectedPlace.category}</span>
                                        </div>

                                        <h2 className="text-4xl font-display mb-4">{selectedPlace.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed mb-8">
                                            {selectedPlace.fullInfo}
                                        </p>

                                        <div className="space-y-4">
                                            <h4 className="font-bold flex items-center gap-2">
                                                <Info className="w-5 h-5 text-primary" /> Detalles clave
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {selectedPlace.details.map((detail, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm bg-muted p-3 rounded-xl border border-border">
                                                        <Star className="w-3 h-3 text-gold" />
                                                        {detail}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setSelectedPlace(null)}
                                            className="mt-10 w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                        >
                                            <MapPin className="w-5 h-5" /> Guardar en mis planes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <Footer />
            </div>
        </>
    );
};

export default TurismoPage;
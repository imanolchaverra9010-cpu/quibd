import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { TourismSection } from "@/components/home/TourismSection";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Media Maratón de Quibdó | Evento Deportivo del Pacífico Colombiano</title>
        <meta name="description" content="La Media Maratón de Quibdó es un evento deportivo urbano que cultiva la paz y el bienestar en la comunidad del Chocó, fomentando estilos de vida activos." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <EventsSection />
          <TourismSection />
          <SponsorsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

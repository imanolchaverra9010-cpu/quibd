import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import logoMMQ from "@/assets/logo-mmq.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoMMQ} 
                alt="Media Maratón de Quibdó" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Evento deportivo urbano que busca cultivar la paz y el bienestar en la comunidad, 
              fomentando estilos de vida activos y saludables.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-foreground">Enlaces Rápidos</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/quienes-somos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ¿Quiénes Somos?
              </Link>
              <Link to="/eventos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Eventos y Noticias
              </Link>
              <Link to="/resultados" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Resultados
              </Link>
              <Link to="/galeria" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Galería
              </Link>
              <Link to="/ruta" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mapa de la Ruta
              </Link>
            </nav>
          </div>

          {/* Participate */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-foreground">Participa</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/inscribete" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Inscripción
              </Link>
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mi Cuenta
              </Link>
              <Link to="/resultados" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mis Resultados
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Reglamento
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Preguntas Frecuentes
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-foreground">Contacto</h4>
            <div className="space-y-3">
              <a href="mailto:info@mediamaratondequibdo.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                info@mediamaratondequibdo.com
              </a>
              <a href="tel:+573001234567" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +57 300 123 4567
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Quibdó, Chocó, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Media Maratón de Quibdó. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

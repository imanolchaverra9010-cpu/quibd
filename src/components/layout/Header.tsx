import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Quiénes Somos", path: "/quienes-somos" },
  { name: "Eventos", path: "/eventos" },
  { name: "Resultados", path: "/resultados" },
  { name: "Galería", path: "/galeria" },
  { name: "Ruta", path: "/ruta" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="font-display text-xl text-primary-foreground">MMQ</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl text-foreground leading-tight">
              Media Maratón
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">de Quibdó</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/inscribete">
            <Button variant="gold" size="default">
              Inscríbete
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="w-4 h-4" />
                    Ingresar
                  </Button>
                </Link>
                <Link to="/inscribete" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="gold" className="w-full">
                    Inscríbete
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

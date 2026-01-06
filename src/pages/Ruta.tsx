import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Droplets, MapPin, Flag, Mountain, Info, AlertTriangle } from "lucide-react";

// Note: For Mapbox to work, you need to add your public token
const MAPBOX_TOKEN = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

// Route coordinates for Quibdó (approximate 21km route)
const routeCoordinates: [number, number][] = [
  [-76.6536, 5.6947], // Start - Parque Centenario
  [-76.6520, 5.6960],
  [-76.6490, 5.6980],
  [-76.6450, 5.7010],
  [-76.6400, 5.7050],
  [-76.6350, 5.7080],
  [-76.6300, 5.7100],
  [-76.6250, 5.7080],
  [-76.6200, 5.7050],
  [-76.6180, 5.7000],
  [-76.6200, 5.6950],
  [-76.6250, 5.6900],
  [-76.6300, 5.6850],
  [-76.6350, 5.6820],
  [-76.6400, 5.6800],
  [-76.6450, 5.6820],
  [-76.6500, 5.6860],
  [-76.6536, 5.6900],
  [-76.6536, 5.6947], // Finish
];

const hydrationPoints = [
  { km: 5, coords: [-76.6400, 5.7050] as [number, number], name: "Punto de Hidratación Km 5" },
  { km: 10, coords: [-76.6200, 5.7050] as [number, number], name: "Punto de Hidratación Km 10" },
  { km: 15, coords: [-76.6300, 5.6850] as [number, number], name: "Punto de Hidratación Km 15" },
  { km: 18, coords: [-76.6450, 5.6820] as [number, number], name: "Punto de Hidratación Km 18" },
];

const kmMarkers = [
  { km: 1, coords: [-76.6520, 5.6960] as [number, number] },
  { km: 3, coords: [-76.6450, 5.7010] as [number, number] },
  { km: 5, coords: [-76.6400, 5.7050] as [number, number] },
  { km: 7, coords: [-76.6300, 5.7100] as [number, number] },
  { km: 10, coords: [-76.6200, 5.7050] as [number, number] },
  { km: 12, coords: [-76.6200, 5.6950] as [number, number] },
  { km: 15, coords: [-76.6300, 5.6850] as [number, number] },
  { km: 18, coords: [-76.6450, 5.6820] as [number, number] },
  { km: 20, coords: [-76.6500, 5.6860] as [number, number] },
  { km: 21, coords: [-76.6536, 5.6947] as [number, number] },
];

const pointsOfInterest = [
  { name: "Parque Centenario (Salida/Meta)", coords: [-76.6536, 5.6947] as [number, number], type: "start" },
  { name: "Malecón del Atrato", coords: [-76.6350, 5.7080] as [number, number], type: "landmark" },
  { name: "Catedral San Francisco de Asís", coords: [-76.6520, 5.6930] as [number, number], type: "landmark" },
  { name: "Plaza César Conto", coords: [-76.6480, 5.6920] as [number, number], type: "landmark" },
];

const RutaPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [customToken, setCustomToken] = useState("");

  useEffect(() => {
    // Check if mapbox-gl is available
    const loadMap = async () => {
      try {
        const mapboxgl = await import("mapbox-gl");
        await import("mapbox-gl/dist/mapbox-gl.css");
        
        if (!mapContainer.current) return;

        const token = customToken || MAPBOX_TOKEN;
        mapboxgl.default.accessToken = token;

        const map = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [-76.6400, 5.6950],
          zoom: 13,
          pitch: 45,
        });

        map.addControl(new mapboxgl.default.NavigationControl(), "top-right");

        map.on("load", () => {
          setMapLoaded(true);

          // Add route line
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            },
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#22c55e",
              "line-width": 6,
              "line-opacity": 0.8,
            },
          });

          // Add hydration points
          hydrationPoints.forEach((point) => {
            const el = document.createElement("div");
            el.className = "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white cursor-pointer";
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
            
            new mapboxgl.default.Marker(el)
              .setLngLat(point.coords)
              .setPopup(new mapboxgl.default.Popup().setHTML(`<strong>${point.name}</strong><br/>Agua y bebidas isotónicas`))
              .addTo(map);
          });

          // Add km markers
          kmMarkers.forEach((marker) => {
            const el = document.createElement("div");
            el.className = "w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xs font-bold";
            el.innerHTML = `${marker.km}`;
            
            new mapboxgl.default.Marker(el)
              .setLngLat(marker.coords)
              .addTo(map);
          });

          // Add points of interest
          pointsOfInterest.forEach((poi) => {
            const el = document.createElement("div");
            el.className = poi.type === "start" 
              ? "w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white border-4 border-white shadow-lg"
              : "w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white border-2 border-white";
            el.innerHTML = poi.type === "start" 
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
            
            new mapboxgl.default.Marker(el)
              .setLngLat(poi.coords)
              .setPopup(new mapboxgl.default.Popup().setHTML(`<strong>${poi.name}</strong>`))
              .addTo(map);
          });
        });

        return () => map.remove();
      } catch (error) {
        console.error("Error loading map:", error);
        setShowTokenInput(true);
      }
    };

    loadMap();
  }, [customToken]);

  return (
    <>
      <Helmet>
        <title>Ruta de la Carrera | Media Maratón de Quibdó</title>
        <meta name="description" content="Explora la ruta completa de 21km de la Media Maratón de Quibdó con puntos de hidratación y lugares de interés." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          {/* Hero */}
          <section className="py-12 bg-gradient-to-b from-card to-background">
            <div className="container mx-auto px-4 text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary text-sm font-medium uppercase tracking-wider"
              >
                Conoce el Recorrido
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-2"
              >
                Ruta de <span className="text-gradient-emerald">21 Kilómetros</span>
              </motion.h1>
            </div>
          </section>

          {/* Legend */}
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Flag className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Salida/Meta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Droplets className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">Hidratación</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-black">
                    K
                  </div>
                  <span className="text-sm text-muted-foreground">Kilómetros</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">Punto de Interés</span>
                </div>
              </div>
            </div>
          </section>

          {/* Map */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="relative rounded-2xl overflow-hidden glass-card" style={{ height: "600px" }}>
                {showTokenInput ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <div className="text-center p-8 max-w-md">
                      <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="font-display text-xl text-foreground mb-2">Token de Mapbox Requerido</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Para ver el mapa interactivo, ingresa tu token público de Mapbox.
                      </p>
                      <input
                        type="text"
                        value={customToken}
                        onChange={(e) => setCustomToken(e.target.value)}
                        placeholder="pk.eyJ1..."
                        className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground mb-4"
                      />
                      <button
                        onClick={() => setShowTokenInput(false)}
                        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
                      >
                        Cargar Mapa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div ref={mapContainer} className="w-full h-full" />
                )}
              </div>
            </div>
          </section>

          {/* Route Info */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Flag className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-1">Distancia Total</h3>
                  <p className="text-2xl font-bold text-primary">21.097 km</p>
                </div>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-7 h-7 text-blue-500" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-1">Puntos de Hidratación</h3>
                  <p className="text-2xl font-bold text-blue-500">4 puntos</p>
                </div>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Mountain className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-1">Desnivel Acumulado</h3>
                  <p className="text-2xl font-bold text-secondary">120 m</p>
                </div>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Info className="w-7 h-7 text-purple-500" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-1">Tipo de Terreno</h3>
                  <p className="text-2xl font-bold text-purple-500">Asfalto</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hydration Points Details */}
          <section className="py-12 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl text-foreground text-center mb-8">
                Puntos de <span className="text-gradient-gold">Hidratación</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {hydrationPoints.map((point) => (
                  <div key={point.km} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {point.km}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Km {point.km}</div>
                        <div className="text-xs text-muted-foreground">Agua + Isotónico</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RutaPage;

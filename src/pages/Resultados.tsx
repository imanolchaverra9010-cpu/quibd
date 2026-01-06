import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Trophy, Medal, Clock, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import resultsBg from "@/assets/results-bg.jpg";

interface Runner {
  position: number;
  bib: string;
  name: string;
  time: string;
  pace: string;
  category: string;
  city: string;
}

interface Edition {
  year: number;
  date: string;
  participants: number;
  maleWinner: Runner;
  femaleWinner: Runner;
  allResults: Runner[];
}

const editions: Edition[] = [
  {
    year: 2024,
    date: "10 de Agosto, 2024",
    participants: 2247,
    maleWinner: { position: 1, bib: "001", name: "Juan Carlos Mena", time: "1:08:45", pace: "3:16/km", category: "Elite M", city: "Medellín" },
    femaleWinner: { position: 1, bib: "002", name: "María del Carmen Palacios", time: "1:22:30", pace: "3:55/km", category: "Elite F", city: "Quibdó" },
    allResults: [
      { position: 1, bib: "001", name: "Juan Carlos Mena", time: "1:08:45", pace: "3:16/km", category: "Elite M", city: "Medellín" },
      { position: 2, bib: "015", name: "Pedro Mosquera", time: "1:10:12", pace: "3:20/km", category: "Elite M", city: "Cali" },
      { position: 3, bib: "023", name: "Andrés Hinestroza", time: "1:11:33", pace: "3:23/km", category: "Elite M", city: "Quibdó" },
      { position: 4, bib: "002", name: "María del Carmen Palacios", time: "1:22:30", pace: "3:55/km", category: "Elite F", city: "Quibdó" },
      { position: 5, bib: "034", name: "Luis Perea", time: "1:12:45", pace: "3:26/km", category: "Elite M", city: "Buenaventura" },
      { position: 6, bib: "008", name: "Luz Marina Córdoba", time: "1:24:15", pace: "3:59/km", category: "Elite F", city: "Pereira" },
      { position: 7, bib: "045", name: "Carlos Rivas", time: "1:13:20", pace: "3:28/km", category: "Open M", city: "Bogotá" },
      { position: 8, bib: "012", name: "Sandra Rentería", time: "1:25:40", pace: "4:02/km", category: "Elite F", city: "Quibdó" },
      { position: 9, bib: "067", name: "Fernando Asprilla", time: "1:14:55", pace: "3:31/km", category: "Open M", city: "Quibdó" },
      { position: 10, bib: "019", name: "Diana Moreno", time: "1:26:55", pace: "4:05/km", category: "Open F", city: "Medellín" },
    ],
  },
  {
    year: 2023,
    date: "12 de Agosto, 2023",
    participants: 1856,
    maleWinner: { position: 1, bib: "001", name: "Esteban Córdoba", time: "1:09:30", pace: "3:18/km", category: "Elite M", city: "Cali" },
    femaleWinner: { position: 1, bib: "003", name: "Ana Lucía Rentería", time: "1:23:45", pace: "3:57/km", category: "Elite F", city: "Quibdó" },
    allResults: [
      { position: 1, bib: "001", name: "Esteban Córdoba", time: "1:09:30", pace: "3:18/km", category: "Elite M", city: "Cali" },
      { position: 2, bib: "007", name: "Juan Carlos Mena", time: "1:10:45", pace: "3:22/km", category: "Elite M", city: "Medellín" },
      { position: 3, bib: "003", name: "Ana Lucía Rentería", time: "1:23:45", pace: "3:57/km", category: "Elite F", city: "Quibdó" },
      { position: 4, bib: "018", name: "Diego Palacios", time: "1:11:20", pace: "3:24/km", category: "Elite M", city: "Quibdó" },
      { position: 5, bib: "009", name: "María del Carmen Palacios", time: "1:24:30", pace: "3:59/km", category: "Elite F", city: "Quibdó" },
    ],
  },
  {
    year: 2022,
    date: "14 de Agosto, 2022",
    participants: 1520,
    maleWinner: { position: 1, bib: "005", name: "Miguel Ángel Cuesta", time: "1:10:15", pace: "3:20/km", category: "Elite M", city: "Bogotá" },
    femaleWinner: { position: 1, bib: "011", name: "Carolina Mena", time: "1:24:20", pace: "3:59/km", category: "Elite F", city: "Medellín" },
    allResults: [
      { position: 1, bib: "005", name: "Miguel Ángel Cuesta", time: "1:10:15", pace: "3:20/km", category: "Elite M", city: "Bogotá" },
      { position: 2, bib: "011", name: "Carolina Mena", time: "1:24:20", pace: "3:59/km", category: "Elite F", city: "Medellín" },
      { position: 3, bib: "022", name: "Roberto Asprilla", time: "1:11:30", pace: "3:24/km", category: "Elite M", city: "Quibdó" },
    ],
  },
];

const ResultadosPage = () => {
  const [selectedYear, setSelectedYear] = useState(editions[0].year);
  const [searchTerm, setSearchTerm] = useState("");
  
  const edition = editions.find((e) => e.year === selectedYear) || editions[0];
  
  const filteredResults = edition.allResults.filter(
    (runner) =>
      runner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      runner.bib.includes(searchTerm) ||
      runner.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Resultados | Media Maratón de Quibdó</title>
        <meta name="description" content="Consulta los resultados y tiempos de todas las ediciones de la Media Maratón de Quibdó." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          {/* Hero */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src={resultsBg} alt="" className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary text-sm font-medium uppercase tracking-wider"
              >
                Historia de Campeones
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-2"
              >
                Resultados <span className="text-gradient-emerald">Oficiales</span>
              </motion.h1>
            </div>
          </section>

          {/* Year Selector */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-3">
                {editions.map((e) => (
                  <Button
                    key={e.year}
                    variant={selectedYear === e.year ? "gold" : "outline"}
                    size="lg"
                    onClick={() => setSelectedYear(e.year)}
                    className="font-display text-lg"
                  >
                    {e.year}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Edition Stats */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <motion.div
                key={edition.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div className="font-display text-3xl text-foreground">{edition.participants.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Participantes</div>
                </div>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="text-base text-foreground font-semibold">{edition.maleWinner.name}</div>
                  <div className="font-display text-2xl text-secondary">{edition.maleWinner.time}</div>
                  <div className="text-sm text-muted-foreground">Campeón Masculino</div>
                </div>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-7 h-7 text-accent" />
                  </div>
                  <div className="text-base text-foreground font-semibold">{edition.femaleWinner.name}</div>
                  <div className="font-display text-2xl text-accent">{edition.femaleWinner.time}</div>
                  <div className="text-sm text-muted-foreground">Campeona Femenina</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Search */}
          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, dorsal o ciudad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </section>

          {/* Results Table */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.div
                key={edition.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl overflow-hidden max-w-5xl mx-auto"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Pos</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Dorsal</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Corredor</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tiempo</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ritmo</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Categoría</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ciudad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((runner) => (
                        <tr key={`${runner.bib}-${runner.position}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            {runner.position <= 3 ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                runner.position === 1 ? "bg-yellow-500/20 text-yellow-500" :
                                runner.position === 2 ? "bg-gray-400/20 text-gray-400" :
                                "bg-amber-700/20 text-amber-700"
                              }`}>
                                <Medal className="w-4 h-4" />
                              </div>
                            ) : (
                              <span className="text-muted-foreground font-display text-lg">{runner.position}</span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-muted-foreground">{runner.bib}</td>
                          <td className="p-4 font-medium text-foreground">{runner.name}</td>
                          <td className="p-4">
                            <span className="flex items-center gap-1 text-primary font-mono">
                              <Clock className="w-4 h-4" />
                              {runner.time}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground font-mono">{runner.pace}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              runner.category.includes("F") ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                            }`}>
                              {runner.category}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">{runner.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredResults.length === 0 && (
                  <div className="p-12 text-center text-muted-foreground">
                    No se encontraron resultados para "{searchTerm}"
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResultadosPage;

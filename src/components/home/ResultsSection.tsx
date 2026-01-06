import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Clock, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import resultsBg from "@/assets/results-bg.jpg";

interface Runner {
  position: number;
  name: string;
  time: string;
  category: string;
  city: string;
}

interface Edition {
  year: number;
  date: string;
  participants: number;
  maleWinner: Runner;
  femaleWinner: Runner;
  topMale: Runner[];
  topFemale: Runner[];
}

const editions: Edition[] = [
  {
    year: 2024,
    date: "10 de Agosto, 2024",
    participants: 2247,
    maleWinner: { position: 1, name: "Juan Carlos Mena", time: "1:08:45", category: "Elite", city: "Medellín" },
    femaleWinner: { position: 1, name: "María del Carmen Palacios", time: "1:22:30", category: "Elite", city: "Quibdó" },
    topMale: [
      { position: 1, name: "Juan Carlos Mena", time: "1:08:45", category: "Elite", city: "Medellín" },
      { position: 2, name: "Pedro Mosquera", time: "1:10:12", category: "Elite", city: "Cali" },
      { position: 3, name: "Andrés Hinestroza", time: "1:11:33", category: "Elite", city: "Quibdó" },
      { position: 4, name: "Luis Perea", time: "1:12:45", category: "Elite", city: "Buenaventura" },
      { position: 5, name: "Carlos Rivas", time: "1:13:20", category: "Elite", city: "Bogotá" },
    ],
    topFemale: [
      { position: 1, name: "María del Carmen Palacios", time: "1:22:30", category: "Elite", city: "Quibdó" },
      { position: 2, name: "Luz Marina Córdoba", time: "1:24:15", category: "Elite", city: "Pereira" },
      { position: 3, name: "Sandra Rentería", time: "1:25:40", category: "Elite", city: "Quibdó" },
      { position: 4, name: "Diana Moreno", time: "1:26:55", category: "Elite", city: "Medellín" },
      { position: 5, name: "Paula Valencia", time: "1:28:10", category: "Elite", city: "Cali" },
    ],
  },
  {
    year: 2023,
    date: "12 de Agosto, 2023",
    participants: 1856,
    maleWinner: { position: 1, name: "Esteban Córdoba", time: "1:09:30", category: "Elite", city: "Cali" },
    femaleWinner: { position: 1, name: "Ana Lucía Rentería", time: "1:23:45", category: "Elite", city: "Quibdó" },
    topMale: [
      { position: 1, name: "Esteban Córdoba", time: "1:09:30", category: "Elite", city: "Cali" },
      { position: 2, name: "Juan Carlos Mena", time: "1:10:45", category: "Elite", city: "Medellín" },
      { position: 3, name: "Diego Palacios", time: "1:11:20", category: "Elite", city: "Quibdó" },
      { position: 4, name: "Fabián Murillo", time: "1:12:30", category: "Elite", city: "Tumaco" },
      { position: 5, name: "Hernán Mosquera", time: "1:13:45", category: "Elite", city: "Quibdó" },
    ],
    topFemale: [
      { position: 1, name: "Ana Lucía Rentería", time: "1:23:45", category: "Elite", city: "Quibdó" },
      { position: 2, name: "María del Carmen Palacios", time: "1:24:30", category: "Elite", city: "Quibdó" },
      { position: 3, name: "Juliana Castro", time: "1:26:15", category: "Elite", city: "Bogotá" },
      { position: 4, name: "Catalina Rojas", time: "1:27:40", category: "Elite", city: "Medellín" },
      { position: 5, name: "Elena Valencia", time: "1:28:55", category: "Elite", city: "Cali" },
    ],
  },
  {
    year: 2022,
    date: "14 de Agosto, 2022",
    participants: 1520,
    maleWinner: { position: 1, name: "Miguel Ángel Cuesta", time: "1:10:15", category: "Elite", city: "Bogotá" },
    femaleWinner: { position: 1, name: "Carolina Mena", time: "1:24:20", category: "Elite", city: "Medellín" },
    topMale: [
      { position: 1, name: "Miguel Ángel Cuesta", time: "1:10:15", category: "Elite", city: "Bogotá" },
      { position: 2, name: "Roberto Asprilla", time: "1:11:30", category: "Elite", city: "Quibdó" },
      { position: 3, name: "Felipe Moreno", time: "1:12:45", category: "Elite", city: "Cali" },
      { position: 4, name: "Daniel Perea", time: "1:13:55", category: "Elite", city: "Buenaventura" },
      { position: 5, name: "Sergio Hinestroza", time: "1:14:30", category: "Elite", city: "Quibdó" },
    ],
    topFemale: [
      { position: 1, name: "Carolina Mena", time: "1:24:20", category: "Elite", city: "Medellín" },
      { position: 2, name: "Valentina Córdoba", time: "1:25:45", category: "Elite", city: "Quibdó" },
      { position: 3, name: "Marcela Rivas", time: "1:27:10", category: "Elite", city: "Bogotá" },
      { position: 4, name: "Andrea Mosquera", time: "1:28:25", category: "Elite", city: "Quibdó" },
      { position: 5, name: "Natalia Palacios", time: "1:29:40", category: "Elite", city: "Cali" },
    ],
  },
];

export function ResultsSection() {
  const [selectedYear, setSelectedYear] = useState(editions[0].year);
  const edition = editions.find((e) => e.year === selectedYear) || editions[0];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={resultsBg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
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
            Historia de Campeones
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-2">
            Resultados <span className="text-gradient-emerald">Ediciones Anteriores</span>
          </h2>
        </motion.div>

        {/* Year Selector */}
        <div className="flex justify-center gap-3 mb-12">
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

        {/* Edition Stats */}
        <motion.div
          key={edition.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="font-display text-4xl text-foreground">{edition.participants.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Participantes</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-lg text-foreground font-semibold">{edition.maleWinner.name}</div>
            <div className="font-display text-2xl text-secondary">{edition.maleWinner.time}</div>
            <div className="text-sm text-muted-foreground">Campeón Masculino</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div className="text-lg text-foreground font-semibold">{edition.femaleWinner.name}</div>
            <div className="font-display text-2xl text-accent">{edition.femaleWinner.time}</div>
            <div className="text-sm text-muted-foreground">Campeona Femenina</div>
          </div>
        </motion.div>

        {/* Results Table */}
        <Tabs defaultValue="male" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="male" className="font-semibold">Top 5 Masculino</TabsTrigger>
            <TabsTrigger value="female" className="font-semibold">Top 5 Femenino</TabsTrigger>
          </TabsList>
          
          <TabsContent value="male">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Pos</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Corredor</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tiempo</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ciudad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {edition.topMale.map((runner, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
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
                        <td className="p-4 font-medium text-foreground">{runner.name}</td>
                        <td className="p-4">
                          <span className="flex items-center gap-1 text-primary font-mono">
                            <Clock className="w-4 h-4" />
                            {runner.time}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{runner.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="female">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Pos</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Corredora</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tiempo</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ciudad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {edition.topFemale.map((runner, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
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
                        <td className="p-4 font-medium text-foreground">{runner.name}</td>
                        <td className="p-4">
                          <span className="flex items-center gap-1 text-accent font-mono">
                            <Clock className="w-4 h-4" />
                            {runner.time}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{runner.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Ver Resultados Completos
          </Button>
        </div>
      </div>
    </section>
  );
}

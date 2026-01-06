import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus, LogOut, Video, Image, Calendar, Newspaper, Award, X } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { eventsAPI, galleryAPI, heroAPI, sponsorsAPI } from "@/services/api";

function LoginForm() {
  const [password, setPassword] = useState("");
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Bienvenido al panel de administración");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-heading text-primary">Panel de Administración</CardTitle>
          <p className="text-muted-foreground">Media Maratón de Quibdó</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
              />
            </div>
            <Button type="submit" className="w-full">Iniciar Sesión</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Demo: mmq2025admin
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    category: "evento" as "evento" | "noticia",
    featured: false,
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.events);
    } catch (error) {
      toast.error("Error al cargar eventos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", date: "", description: "", category: "evento", featured: false });
    setEditing(null);
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('date', form.date);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('featured', form.featured.toString());

      if (file) {
        formData.append('file', file);
      }

      if (editing) {
        await eventsAPI.update(editing, formData);
        toast.success("Evento actualizado");
      } else {
        await eventsAPI.create(formData);
        toast.success("Evento creado");
      }
      resetForm();
      loadEvents();
    } catch (error: any) {
      toast.error(error.message || "Error al guardar evento");
    }
  };

  const handleEdit = (event: any) => {
    setForm({
      title: event.title,
      date: event.date,
      description: event.description,
      category: event.category,
      featured: event.featured,
    });
    setEditing(event.id);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
      await eventsAPI.delete(eventId);
      toast.success("Evento eliminado");
      loadEvents();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar evento");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando eventos...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Editar" : "Nuevo"} Evento/Noticia</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <Label>Fecha</Label>
                <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div>
                <Label>Categoría</Label>
                <Select value={form.category} onValueChange={(v: "evento" | "noticia") => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="noticia">Noticia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Imagen/Video</Label>
                <Input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
              </div>
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.featured} onCheckedChange={v => setForm({ ...form, featured: v })} />
              <Label>Destacado</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
              {editing && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {events.map(event => (
          <Card key={event.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {event.category === 'evento' ? <Calendar className="w-5 h-5 text-primary" /> : <Newspaper className="w-5 h-5 text-secondary" />}
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.date} • {event.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleEdit(event)}><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryManager() {
  const [items, setItems] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    event_id: "",
    year: new Date().getFullYear(),
    type: "image" as "image" | "video",
  });

  useEffect(() => {
    loadGallery();
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.events);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      setItems(response.items);
    } catch (error) {
      toast.error("Error al cargar galería");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Debe seleccionar al menos un archivo");
      return;
    }

    if (!form.event_id) {
      toast.error("Debe seleccionar un evento");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();

      // Agregar todos los archivos
      files.forEach(file => {
        formData.append('files[]', file);
      });

      formData.append('event_id', form.event_id);
      formData.append('year', form.year.toString());
      formData.append('type', form.type);

      const response = await galleryAPI.createBulk(formData);

      // Mostrar resultados
      if (response.success_count > 0) {
        toast.success(`${response.success_count} archivo(s) subido(s) exitosamente`);
      }

      if (response.failed_count > 0) {
        toast.error(`${response.failed_count} archivo(s) fallaron`);
        response.failed.forEach((fail: any) => {
          toast.error(`${fail.filename}: ${fail.error}`);
        });
      }

      setFiles([]);
      setForm({ event_id: "", year: new Date().getFullYear(), type: "image" });
      loadGallery();
    } catch (error: any) {
      toast.error(error.message || "Error al añadir elementos");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("¿Estás seguro de eliminar este elemento?")) return;

    try {
      await galleryAPI.delete(itemId);
      toast.success("Elemento eliminado");
      loadGallery();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar elemento");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando galería...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Añadir a Galería (Carga Individual o Masiva)</CardTitle>
          <p className="text-sm text-muted-foreground">Selecciona uno o varios archivos para subir a la galería</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Evento *</Label>
                <Select value={form.event_id} onValueChange={v => setForm({ ...form, event_id: v })} required>
                  <SelectTrigger><SelectValue placeholder="Selecciona un evento" /></SelectTrigger>
                  <SelectContent>
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={form.type} onValueChange={(v: "image" | "video") => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Imagen</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Archivos * (Múltiples)</Label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  multiple
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Puedes seleccionar múltiples archivos manteniendo presionado Ctrl/Cmd
                </p>
              </div>
              <div>
                <Label>Año</Label>
                <Input type="number" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) })} required />
              </div>
            </div>

            {/* Preview de archivos seleccionados */}
            {files.length > 0 && (
              <div className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Archivos seleccionados ({files.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-background p-2 rounded">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <Video className="w-4 h-4 text-secondary flex-shrink-0" />
                        )}
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subiendo {files.length} archivo(s)...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Añadir {files.length > 0 ? `${files.length} archivo(s)` : ''}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              {item.type === 'image' ? (
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardContent className="p-2">
              <p className="text-xs truncate">{item.event}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HeroManager() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [eventDateValue, setEventDateValue] = useState("");
  const [eventTimeValue, setEventTimeValue] = useState("06:00");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await heroAPI.getSettings();
      setSettings(response.settings);

      if (response.settings.eventDate) {
        const [date, time] = response.settings.eventDate.split('T');
        setEventDateValue(date);
        setEventTimeValue(time?.slice(0, 5) || "06:00");
      }
    } catch (error) {
      toast.error("Error al cargar configuración");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVideo = async () => {
    if (!file) {
      toast.error("Debe seleccionar un archivo de video");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      await heroAPI.updateVideo(formData);
      toast.success("Video del hero actualizado");
      setFile(null);
      loadSettings();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar video");
    }
  };

  const handleSaveDate = async () => {
    try {
      const eventDate = `${eventDateValue}T${eventTimeValue}:00`;
      await heroAPI.updateEventDate(eventDate);
      toast.success("Fecha del evento actualizada");
      loadSettings();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar fecha");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando configuración...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Fecha del Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Fecha del Evento</Label>
              <Input type="date" value={eventDateValue} onChange={e => setEventDateValue(e.target.value)} />
            </div>
            <div>
              <Label>Hora de Inicio</Label>
              <Input type="time" value={eventTimeValue} onChange={e => setEventTimeValue(e.target.value)} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Esta fecha se usará para el contador regresivo en la página principal</p>
          <Button onClick={handleSaveDate}><Calendar className="w-4 h-4 mr-2" /> Guardar Fecha</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Video className="w-5 h-5" /> Video del Hero Principal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Archivo de Video</Label>
            <Input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
            <p className="text-xs text-muted-foreground mt-1">Sube un archivo MP4 para el hero de la página principal</p>
          </div>
          {settings?.heroVideo && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <video src={settings.heroVideo} className="w-full h-full object-cover" muted autoPlay loop />
            </div>
          )}
          <Button onClick={handleSaveVideo}><Video className="w-4 h-4 mr-2" /> Guardar Video</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SponsorsManager() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    tier: "colaborador" as "principal" | "oro" | "plata" | "colaborador",
  });

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setLoading(true);
      const response = await sponsorsAPI.getAll();
      setSponsors(response.sponsors);
    } catch (error) {
      toast.error("Error al cargar patrocinadores");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Debe seleccionar un logo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', form.name);
      formData.append('tier', form.tier);

      await sponsorsAPI.create(formData);
      toast.success("Patrocinador añadido");
      setForm({ name: "", tier: "colaborador" });
      setFile(null);
      loadSponsors();
    } catch (error: any) {
      toast.error(error.message || "Error al añadir patrocinador");
    }
  };

  const handleDelete = async (sponsorId: string) => {
    if (!confirm("¿Estás seguro de eliminar este patrocinador?")) return;

    try {
      await sponsorsAPI.delete(sponsorId);
      toast.success("Patrocinador eliminado");
      loadSponsors();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar patrocinador");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando patrocinadores...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Añadir Patrocinador</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nombre</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label>Categoría</Label>
                <Select value={form.tier} onValueChange={(v: any) => setForm({ ...form, tier: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="oro">Oro</SelectItem>
                    <SelectItem value="plata">Plata</SelectItem>
                    <SelectItem value="colaborador">Colaborador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required />
            </div>
            <Button type="submit"><Plus className="w-4 h-4 mr-2" /> Añadir</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.map(sponsor => (
          <Card key={sponsor.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative p-4 flex items-center justify-center">
              <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(sponsor.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardContent className="p-2">
              <p className="text-xs font-semibold truncate">{sponsor.name}</p>
              <p className="text-xs text-muted-foreground">{sponsor.tier}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAdmin, logout } = useAdmin();

  if (!isAdmin) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Panel de Administración</h1>
          <Button variant="outline" onClick={() => { logout(); toast.success("Sesión cerrada"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
          </Button>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
          <p className="text-green-600 dark:text-green-400 text-sm">
            <strong>✅ Conectado al Backend:</strong> Archivos se suben al servidor (localhost:5000/uploads)
          </p>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="events" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Eventos</TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2"><Image className="w-4 h-4" /> Galería</TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-2"><Video className="w-4 h-4" /> Hero</TabsTrigger>
            <TabsTrigger value="sponsors" className="flex items-center gap-2"><Award className="w-4 h-4" /> Patrocinadores</TabsTrigger>
          </TabsList>
          <TabsContent value="events"><EventsManager /></TabsContent>
          <TabsContent value="gallery"><GalleryManager /></TabsContent>
          <TabsContent value="hero"><HeroManager /></TabsContent>
          <TabsContent value="sponsors"><SponsorsManager /></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
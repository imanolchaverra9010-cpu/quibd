import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- INTERFACES ---
export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: 'evento' | 'noticia';
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  event: string;
  year: number;
  type: 'image' | 'video';
}

export interface AdminState {
  events: Event[];
  galleryItems: GalleryItem[];
  heroVideo: string;
  eventDate: string; // ISO date string for countdown
}

interface AdminContextType {
  state: AdminState;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  setHeroVideo: (url: string) => void;
  setEventDate: (date: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// --- CONFIGURACIÓN Y VALORES INICIALES ---
const STORAGE_KEY = 'mmq_admin_state';
const AUTH_KEY = 'mmq_admin_auth';
const ADMIN_PASSWORD = 'mmq2025admin';
const BACKEND_URL = 'http://localhost:5000/api/event-info';

const defaultState: AdminState = {
  events: [
    {
      id: '1',
      title: 'Media Maratón de Quibdó 2025',
      date: '2025-08-17',
      description: 'La 5ta edición de la Media Maratón de Quibdó se llevará a cabo el 17 de agosto.',
      image: '/placeholder.svg',
      category: 'evento',
      featured: true,
    },
  ],
  galleryItems: [],
  heroVideo: '',
  eventDate: '2025-08-17T06:00:00', // Fecha inicial de respaldo
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  // Inicializar estado desde LocalStorage o por defecto
  const [state, setState] = useState<AdminState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  // --- EFECTO: Sincronizar con el Backend (Python + MySQL) ---
  useEffect(() => {
    const fetchFromBackend = async () => {
      try {
        // Fetch event info
        const eventInfoResponse = await fetch(BACKEND_URL);
        if (eventInfoResponse.ok) {
          const eventData = await eventInfoResponse.json();
          if (eventData.status === "success" && eventData.eventDate) {
            setState(prev => ({
              ...prev,
              eventDate: eventData.eventDate
            }));
            console.log("¡Fecha sincronizada desde MySQL, parche!", eventData.eventDate);
          }
        }

        // Fetch hero settings (video)
        const heroResponse = await fetch('http://localhost:5000/api/hero-settings');
        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          if (heroData.status === "success" && heroData.settings) {
            setState(prev => ({
              ...prev,
              heroVideo: heroData.settings.heroVideo || '',
              eventDate: heroData.settings.eventDate || prev.eventDate
            }));
            console.log("¡Video del hero sincronizado desde MySQL!", heroData.settings.heroVideo);
          }
        }
      } catch (error) {
        console.error("No se pudo conectar con el backend de Python. Usando datos locales.", error);
      }
    };

    fetchFromBackend();
  }, []);

  // Persistencia local para cambios rápidos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // --- FUNCIONES DE AUTENTICACIÓN ---
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // --- CRUDS Y SETTERS ---
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: crypto.randomUUID() };
    setState(prev => ({ ...prev, events: [...prev.events, newEvent] }));
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, ...updates } : e),
    }));
  };

  const deleteEvent = (id: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id),
    }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    setState(prev => ({ ...prev, galleryItems: [...prev.galleryItems, newItem] }));
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setState(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.map(i => i.id === id ? { ...i, ...updates } : i),
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setState(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter(i => i.id !== id),
    }));
  };

  const setHeroVideo = (url: string) => {
    setState(prev => ({ ...prev, heroVideo: url }));
  };

  const setEventDate = (date: string) => {
    setState(prev => ({ ...prev, eventDate: date }));
  };

  return (
    <AdminContext.Provider value={{
      state,
      addEvent,
      updateEvent,
      deleteEvent,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      setHeroVideo,
      setEventDate,
      isAdmin,
      login,
      logout,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

// --- HOOK PERSONALIZADO ---
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
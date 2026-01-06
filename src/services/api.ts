const isProd = import.meta.env.PROD;
const API_BASE_URL = isProd ? '/api' : '/api';

// Utilidad centralizada para manejar respuestas y errores
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || `Error en la petición: ${response.status}`);
  }
  return response.json();
};

// ==================== EVENTOS ====================
export const eventsAPI = {
  getAll: () =>
    fetch(`${API_BASE_URL}/events`).then(handleResponse),

  create: (formData: FormData) =>
    fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      body: formData, // No lleva headers de Content-Type, el navegador lo pone solo con el boundary
    }).then(handleResponse),

  update: (eventId: string, formData: FormData) =>
    fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      body: formData,
    }).then(handleResponse),

  delete: (eventId: string) =>
    fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
    }).then(handleResponse),
};

// ==================== GALERÍA ====================
export const galleryAPI = {
  getAll: () =>
    fetch(`${API_BASE_URL}/gallery`).then(handleResponse),

  create: (formData: FormData) =>
    fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      body: formData,
    }).then(handleResponse),

  createBulk: (formData: FormData) =>
    fetch(`${API_BASE_URL}/gallery/bulk`, {
      method: 'POST',
      body: formData,
    }).then(handleResponse),

  delete: (itemId: string) =>
    fetch(`${API_BASE_URL}/gallery/${itemId}`, {
      method: 'DELETE',
    }).then(handleResponse),
};

// ==================== PATROCINADORES (Sponsors) ====================
export const sponsorsAPI = {
  getAll: () =>
    fetch(`${API_BASE_URL}/sponsors`).then(handleResponse),

  create: (formData: FormData) =>
    fetch(`${API_BASE_URL}/sponsors`, {
      method: 'POST',
      body: formData,
    }).then(handleResponse),

  delete: (sponsorId: string) =>
    fetch(`${API_BASE_URL}/sponsors/${sponsorId}`, {
      method: 'DELETE',
    }).then(handleResponse),
};

// ==================== CONFIGURACIÓN HERO ====================
export const heroAPI = {
  getSettings: () =>
    fetch(`${API_BASE_URL}/hero-settings`).then(handleResponse),

  updateVideo: (formData: FormData) =>
    fetch(`${API_BASE_URL}/hero-settings/video`, {
      method: 'PUT',
      body: formData,
    }).then(handleResponse),

  updateEventDate: (eventDate: string) =>
    fetch(`${API_BASE_URL}/hero-settings/event-date`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventDate }),
    }).then(handleResponse),
};

// ==================== OTROS (Admin, Stats, Info) ====================
export const eventInfoAPI = {
  get: () => fetch(`${API_BASE_URL}/event-info`).then(handleResponse),
};

export const adminAPI = {
  login: (password: string) =>
    fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then(handleResponse),
};

export const statsAPI = {
  get: () => fetch(`${API_BASE_URL}/stats`).then(handleResponse),

};

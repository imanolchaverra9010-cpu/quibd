# --- Estructura Multi-etapa ---

# Etapa 1: Construir el Frontend (React + Vite)
FROM node:18-slim AS build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Aplicación Flask Final
FROM python:3.9-slim
WORKDIR /app

# Instalar dependencias del sistema necesarias para psycopg2 y otros
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el backend
COPY . .

# Copiar el build del frontend desde la etapa anterior
COPY --from=build-frontend /app/dist /app/dist

# Exponer el puerto
EXPOSE 5000

# Comando para arrancar con Gunicorn usando el puerto de Render
CMD gunicorn --bind 0.0.0.0:$PORT app:app

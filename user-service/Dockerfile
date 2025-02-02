FROM node:20

WORKDIR /app

# Limpiar el caché de npm globalmente (solo si es necesario)
RUN npm cache clean --force

# Actualizar npm a la última versión estable
RUN npm install -g npm@latest

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Copiar el archivo .env
COPY .env .env

# Exponer el puerto necesario
EXPOSE 4001

# Comando para ejecutar el servicio
CMD ["node", "server.js"]

# Basisimage
FROM node:18-alpine

# Setze den Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json Dateien in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest der Anwendung in das Arbeitsverzeichnis
COPY . .

# Setze die Umgebungsvariable für die API-URL
ENV REACT_APP_API_URL=https://api.example.com
ENV REACT_APP_API_PORT=3001

# Baue die React-Anwendung
RUN npm run build

# Starte den Webserver
CMD ["npm", "start"]

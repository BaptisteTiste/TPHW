# Utilise une image officielle de Node.js
FROM node:16

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installe les dépendances Node.js
RUN npm install

# Copie le reste des fichiers dans le conteneur
COPY . .

# Expose le port sur lequel le backend écoute
EXPOSE 3000

# Commande par défaut pour démarrer le backend
CMD ["npm", "start"]

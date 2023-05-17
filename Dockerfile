# Pobierz oficjalny obraz Node.js z wersją, którą chcesz użyć jako podstawy
FROM node:18-alpine3.17

# Utwórz i przejdź do katalogu aplikacji w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY ["package.json", "./"]
# package*.json ./

# Zainstaluj zależności aplikacji
RUN npm install

# Skopiuj wszystkie pliki z bieżącego katalogu do katalogu aplikacji w kontenerze
COPY . .

# Wyeksponuj port, na którym działa aplikacja
EXPOSE 3000

# Uruchom aplikację po uruchomieniu kontenera
CMD [ "npm", "start" ]

FROM node:18

WORKDIR /app

# Menyalin hanya package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependensi
RUN npm install

# Menyalin sisa kode aplikasi setelah dependensi terinstal
COPY . .

# Menjalankan build (jika perlu, misalnya untuk proyek React atau Angular)
RUN npm run build

CMD [ "npm", "run", "dev" ]
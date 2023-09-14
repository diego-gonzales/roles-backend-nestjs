# Utiliza una imagen base de Node.js 14
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos del proyecto (package.json y package-lock.json) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación (ajusta el puerto según tu aplicación NestJS)
EXPOSE 3000

# Comando para iniciar la aplicación (ajusta el comando según tu aplicación NestJS)
CMD ["npm", "start"]
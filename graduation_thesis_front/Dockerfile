# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Установка сервера для обслуживания файлов сборки
RUN npm install -g serve

# Запуск сервера
CMD ["serve", "-s", "build"]
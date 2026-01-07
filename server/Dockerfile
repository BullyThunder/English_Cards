# ----------------------------------------------------
# 1. СТРОКА СБОРКИ (Build Stage): Компиляция TypeScript
# ----------------------------------------------------
# Используем Node.js с поддержкой Alpine (легковесный дистрибутив)
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
COPY nest-cli.json ./

# Устанавливаем зависимости (производственные и dev)
RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate
# Копируем исходный код
COPY . .

# Компилируем TypeScript в JavaScript (папка dist)
RUN npm run build


# ----------------------------------------------------
# 2. ПРОИЗВОДСТВЕННАЯ СТРОКА (Production Stage): Запуск
# ----------------------------------------------------
# Используем минимальный образ только с Node.js (для уменьшения размера)
FROM node:20-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только файлы, необходимые для запуска:
# 1. production-зависимости
COPY package*.json ./
# 2. Скомпилированный код
COPY --from=build /app/dist ./dist
# 3. Файлы Prisma (для доступа к БД)
COPY --from=build /app/prisma ./prisma
# 4. Файл .env (если вы используете его в production, хотя Render лучше)
# COPY .env ./.env

# Устанавливаем только производственные зависимости
RUN npm install --only=production

RUN npx prisma generate
# Открываем порт, который слушает NestJS (обычно 3000)
EXPOSE 3000

# Команда, которая запускается при старте контейнера
# Сначала выполняем миграцию, затем запускаем сервер
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
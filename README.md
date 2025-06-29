# Delivery App - Приложение для приемки заказов на доставку

Веб-приложение для создания и управления заказами на доставку грузов.

## Функциональность

- ✅ Создание нового заказа с обязательными полями
- ✅ Просмотр списка всех заказов
- ✅ Детальный просмотр заказа в режиме чтения
- ✅ Автоматическая генерация номера заказа
- ✅ Валидация данных на фронтенде и бэкенде

## Технологический стек

### Backend
- ASP.NET 9 Web API
- Entity Framework Core
- SQLite Database
- Clean Architecture

### Frontend
- React.js 18
- TypeScript
- Axios для HTTP запросов
- React Router для навигации

## Структура проекта

```
delivery-app/
├── src/
│   ├── DeliveryApp.API/          # ASP.NET 9 Web API
│   ├── DeliveryApp.Core/         # Domain entities и interfaces
│   ├── DeliveryApp.Infrastructure/ # EF Core и репозитории
│   └── client/                   # React.js frontend
├── docker-compose.yml            # Docker Compose конфигурация
├── README.md
└── .gitignore
```

## Быстрый запуск с Docker

### Требования
- Docker Desktop
- Docker Compose

### Запуск всего приложения одной командой

1. Клонируйте репозиторий:
```bash
git clone https://github.com/KruglovEgor/delivery-app
cd delivery-app
```

2. Запустите приложение:
```bash
docker-compose up --build
```

3. Откройте приложение:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5131
- Swagger UI: http://localhost:5131/swagger

**Примечание**: База данных SQLite создается автоматически при первом запуске API.

### Остановка приложения
```bash
docker-compose down
```

## Рунчой запуск

### Требования
- .NET 9 SDK
- Node.js 18+ и npm
- Visual Studio 2022 или VS Code

### Backend (ASP.NET 9 API)

1. Перейдите в папку API:
```bash
cd src/DeliveryApp.API
```

2. Восстановите зависимости:
```bash
dotnet restore
```

3. Примените миграции базы данных:
```bash
dotnet ef database update
```

4. Запустите API:
```bash
dotnet run
```

API будет доступен по адресу: `http://localhost:5131`

### Frontend (React.js)

1. Перейдите в папку клиента:
```bash
cd src/client
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение:
```bash
npm start
```

Frontend будет доступен по адресу: `http://localhost:3000`

## Запуск через Visual Studio

### Backend
1. Откройте файл `src/DeliveryApp.sln` в Visual Studio
2. Установите проект `DeliveryApp.API` как стартовый
3. Нажмите F5 или кнопку "Start" для запуска

### Frontend
1. Откройте терминал в Visual Studio (View -> Terminal)
2. Перейдите в папку `src/client`
3. Выполните команды:
```bash
npm install
npm start
```

## API Endpoints

- `GET /api/orders` - Получить список всех заказов
- `POST /api/orders` - Создать новый заказ
- `GET /api/orders/{id}` - Получить заказ по ID
- `GET /health` - Проверка состояния API

## База данных

Приложение использует SQLite для простоты развертывания. База данных создается автоматически при первом запуске.

## Тестирование API

После запуска API откройте Swagger UI по адресу: `http://localhost:5131/swagger`

## Возможные проблемы
### Проблемы с портами
Если порты 3000 или 5131 заняты, измените их в `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Вместо 5131:80
```

### Проблемы с базой данных
Данные SQLite сохраняются в папке `./data` на хосте. При необходимости очистки:
```bash
docker-compose down
rm -rf ./data
docker-compose up --build
```

### Проблемы с миграциями
Если возникают проблемы с базой данных в Docker:
1. Остановите контейнеры: `docker-compose down`
2. Удалите папку с данными: `rm -rf ./data`
3. Пересоберите и запустите: `docker-compose up --build`

## Дополнительная информация

База данных создается автоматически при запуске API благодаря коду в `Program.cs`.

По умолчанию стоит UTC+0, что на 3 часа меньше чем в Москве (UTC+3).
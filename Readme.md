# React Router Posts Application

[![CI](https://github.com/NMYurchenko-max/nmy-ra-posting-routing/actions/workflows/web.yml/badge.svg)](https://github.com/NMYurchenko-max/nmy-ra-posting-routing/actions/workflows/web.yml)

[🔗 Live Demo](https://nmyurchenko-max.github.io/nmy-ra-posting-routing/)

## 📋 Описание проекта

React-приложение для управления постами с использованием маршрутизации. 
Приложение реализует полный CRUD функционал для работы с постами, включая создание, просмотр, редактирование и удаление. 
Использует гибридную архитектуру с локальным и удаленным серверами.

### ✨ Основные возможности

- 📝 **Создание постов** - интуитивная форма для добавления новых постов для переиспользования заложено необязательные различные типы
- 👁️ **Просмотр постов** - детальное отображение содержимого поста
- ✏️ **Редактирование** - возможность изменения существующих постов
- ❌ **Удаление** - безопасное удаление постов
- 🔍 **Навигация** - маршрутизация между страницами
- 📱 **Адаптивный дизайн** - поддержка мобильных устройств
- 🎨 **Material-UI** - используются иконки React как компонентов (MuiTemplates)
- 🔄 **Гибридная работа** - поддержка локального и удаленного серверов, режим localPosts при их отключении (удобно в разработке при нестабильном   интернете)

## 🛠️ Технологии

- **Frontend**: React 19.*, TypeScript 5.*, React Router v7
- **UI Framework**: Material-UI (MUI)
- **HTTP Client**: Custom hooks для работы с API
- **Testing**: Cypress для E2E тестирования
- **Build Tool**: Vite
- **Backend**: Express.js REST API
- **Deployment**: GitHub Pages (frontend), Render (backend)

## 🚀 Установка и запуск

### Предварительные требования

- Node.js 16+
- npm или yarn

### Установка зависимостей

```bash
# Клонирование репозитория
git clone https://github.com/NMYurchenko-max/nmy-ra-posting-routing.git
cd nmy-ra-posting-routing

# Установка зависимостей
npm install
```

### Запуск приложения

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр продакшена
npm run preview
```

После запуска приложение будет доступно по адресу: `http://localhost:5173`

## 📁 Структура проекта

```
src/
├── App.tsx                          # Главный компонент с роутингом
├── main.tsx                         # Точка входа приложения
├── models/
│   ├── type.ts                      # TypeScript типы данных
│   └── errors.ts                    # Типы ошибок
├── hooks/
│   ├── useJsonFetch.ts              # Кастомный хук для HTTP запросов
│   └── usePosts.ts                  # Хуки для работы с постами
├── components/
│   ├── entities/
│   │   ├── PostCard.tsx             # Компонент карточки поста
│   │   └── PostForm.tsx             # Форма создания/редактирования поста
│   ├── layouts/
│   │   └── MainLayout.tsx           # Основной layout приложения
│   ├── pages/
│   │   ├── PostList.tsx             # Страница списка постов
│   │   ├── PostNew.tsx              # Страница создания поста
│   │   ├── PostView.tsx             # Страница просмотра поста
│   │   └── PostEdit.tsx             # Страница редактирования поста
│   └── shared/
│       ├── ErrorModal.tsx           # Модальное окно ошибок
│       └── MuiTemplates/            # Переиспользуемые MUI компоненты
├── theme.ts                         # Конфигурация Material-UI темы
└── dataSources/
    └── localData.ts                 # Локальные данные для тестирования

cypress/
├── e2e/posts.cy.ts                   # E2E тесты
├── cypress.config.ts                 # Конфигурация Cypress
└── README-CYPRESS.md                 # Документация тестирования
```

## 🔌 API документация

### Backend Server

Приложение работает с REST API сервером:
- **Local**:      `http://localhost:7070`
- **Production**: `https://nmy-ra-posting-routing-backend.onrender.com`

### Endpoints

| Method | Endpoint     | Description                  |
|--------|--------------|------------------------------|
| GET    | `/posts`     | Получение списка всех постов |
| GET    | `/posts/:id` | Получение поста по ID        |
| POST   | `/posts`     | Создание нового поста        |
| PUT    | `/posts/:id` | Обновление поста             |
| DELETE | `/posts/:id` | Удаление поста               |

### Формат данных поста (опционально)

```typescript
interface Post {
  id: number;
  content: string;
  created: string | number; 
  // Может быть ISO строкой или timestamp в миллисекундах
  // Расширяемые поля для будущих доработок
  title?: string;
  author?: string;
  updated?: string | number; 
  // Может быть ISO строкой или timestamp в миллисекундах
  tags?: string[];
  category?: string;
  published?: boolean;
}
```

## 🧪 Тестирование

### E2E тесты с Cypress

```bash
# Запуск тестов в интерактивном режиме
npm run cypress:open

# Запуск тестов в headless режиме
npm run cypress:run
```

### Покрытие тестами

- ✅ Загрузка главной страницы
- ✅ Отображение списка постов
- ✅ Навигация между страницами
- ✅ Создание нового поста
- ✅ Обработка ошибок
- ✅ Адаптивный дизайн
- ✅ Мокирование API ответов

## 🎯 Маршрутизация (целеполагание проекта)

| Путь              | Компонент | Описание                           |
|-------------------|-----------|------------------------------------|
| `/`               | PostList  | Главная страница со списком постов |
| `/posts`          | PostList  | Список всех постов                 |
| `/posts/new`      | PostNew   | Создание нового поста              |
| `/posts/:id`      | PostView  | Просмотр поста                     |
| `/posts/:id/edit` | PostEdit  | Редактирование поста               |

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта

### Настройки Cypress

Файл `cypress.config.ts` содержит конфигурацию для E2E тестирования 
с настройками для работы с моками API.

Автотестирование используется для удобства (быстрой проверки) и демонстрации работоспособности приложения:
<video controls src="cypress/videos/posts.cy.ts.mp4" title="Title" width="600" height="400"></video>

## 🚀 Деплой

### Frontend (GitHub Pages)

Автоматически деплоится при пуше в ветку `master`.

### Backend (Render)

Сервер развернут на Render и доступен по адресу:
`https://nmy-ra-posting-routing-backend.onrender.com`

## 👨 Автор

**N. Yurchenko**

[LICENSE](LICENSE)

- GitHub: [@NMYurchenko-max](https://github.com/NMYurchenko-max)
- Email: NMYurchenko@outlook.com, yurch-nina@yandex.ru

## 🙏 Благодарности

  [Netology](https://netology.ru/) за образовательную программу

---

⭐ Если проект вам понравился, поставьте звезду!

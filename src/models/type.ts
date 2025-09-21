/**
 * Базовые типы данных для приложения
 */

// Основной интерфейс поста (расширяемый)
export interface Post {
  id: number;
  content: string;
  created: string | number; // Может быть ISO строкой или timestamp в миллисекундах
  // Расширяемые поля для будущих доработок
  title?: string;
  author?: string;
  updated?: string | number; // Может быть ISO строкой или timestamp в миллисекундах
  tags?: string[];
  category?: string;
  published?: boolean;
}

// Интерфейс для создания нового поста
export interface CreatePostData {
  content: string;
  title?: string;
  author?: string;
  tags?: string[];
  category?: string;
}

// Интерфейс для обновления поста
export interface UpdatePostData extends Partial<CreatePostData> {
  id: number;
}

// API Response типы
export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Состояние списка постов
export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: Error | null;
}

// Пропсы для компонентов
export interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  showActions?: boolean;
}

export interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePostData | UpdatePostData) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: Error | null;
}

// Навигационные пропсы
export interface NavigationProps {
  onNavigate: (path: string) => void;
}

// Константы для API endpoints
export const API_ENDPOINTS = {
  POSTS: '/posts',
  POST_BY_ID: (id: number) => `/posts/${id}`,
} as const;

// HTTP методы
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

// Статусы загрузки
export const LOADING_STATES = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type LoadingState = typeof LOADING_STATES[keyof typeof LOADING_STATES];

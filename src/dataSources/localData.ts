import type { Post } from '@/models/type';

// Локальные данные для постов
export const localPosts: Post[] = [
  {
    id: 1,
    content: 'Привет! Это мой первый пост в приложении.',
    title: 'Первый пост',
    author: 'Тестовый пользователь',
    created: '2024-01-15T10:00:00Z',
    tags: ['приветствие', 'тест'],
    category: 'Общее',
    published: true,
  },
  {
    id: 2,
    content: 'Сегодня я изучал React и TypeScript. Было очень интересно!',
    title: 'Изучение React',
    author: 'Разработчик',
    created: '2024-01-16T14:30:00Z',
    updated: '2024-01-16T15:00:00Z',
    tags: ['react', 'typescript', 'обучение'],
    category: 'Разработка',
    published: true,
  },
  {
    id: 3,
    content: 'Погода сегодня отличная! Решил прогуляться в парке.',
    title: 'Прогулка',
    author: 'Пользователь',
    created: '2024-01-17T16:45:00Z',
    tags: ['погода', 'прогулка'],
    category: 'Личное',
    published: true,
  },
];

// Функция для получения всех постов
export const getPosts = (): Post[] => {
  return localPosts;
};

// Функция для получения поста по ID
export const getPostById = (id: number): Post | undefined => {
  return localPosts.find(post => post.id === id);
};

// Функция для создания нового поста
export const createPost = (postData: Omit<Post, 'id' | 'created'>): Post => {
  const newPost: Post = {
    ...postData,
    id: Math.max(...localPosts.map(p => p.id), 0) + 1,
    created: new Date().toISOString(),
  };

  localPosts.push(newPost);
  return newPost;
};

// Функция для обновления поста
export const updatePost = (id: number, postData: Partial<Omit<Post, 'id' | 'created'>>): Post | null => {
  const index = localPosts.findIndex(post => post.id === id);

  if (index === -1) {
    return null;
  }

  const updatedPost: Post = {
    ...localPosts[index],
    ...postData,
    id,
    updated: new Date().toISOString(),
  };

  localPosts[index] = updatedPost;
  return updatedPost;
};

// Функция для удаления поста
export const deletePost = (id: number): boolean => {
  const index = localPosts.findIndex(post => post.id === id);

  if (index === -1) {
    return false;
  }

  localPosts.splice(index, 1);
  return true;
};

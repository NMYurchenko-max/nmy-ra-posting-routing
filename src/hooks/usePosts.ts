import { useState, useCallback } from "react";
import useJsonFetch from "@/hooks/useJsonFetch";
import type { Post, CreatePostData, UpdatePostData } from "@/models/type";
import { API_ENDPOINTS, HTTP_METHODS } from "@/models/type";
import { localPosts, getPosts, getPostById, createPost, updatePost, deletePost } from "@/dataSources/localData";

/**
 * Кастомный хук для работы с постами через CRUD операции
 * Гибридная работа: сначала внешний API, при ошибке - локальные данные
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(localPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [useLocalData, setUseLocalData] = useState<boolean>(false);

  // Получение всех постов через API с fallback на локальные данные
  const [apiPosts, apiLoading, apiError] = useJsonFetch<Post[]>(
    useLocalData ? '' : API_ENDPOINTS.POSTS
  );

  // Если есть ошибка API и мы еще не перешли на локальные данные, переходим
  if (apiError && !useLocalData) {
    console.warn('API не доступен, переходим на локальные данные:', apiError);
    setUseLocalData(true);
  }

  // Используем API данные если они есть, иначе локальные
  const currentPosts = useLocalData ? posts : (apiPosts && !apiError ? apiPosts : posts);
  const currentLoading = useLocalData ? loading : (apiLoading || loading);
  const currentError = useLocalData ? error : (apiError || error);

  // Создание поста
  const createPostHandler = useCallback(async (postData: CreatePostData): Promise<Post | null> => {
    setLoading(true);
    setError(null);

    try {
      // Сначала пытаемся создать через API
      const response = await fetch(API_ENDPOINTS.POSTS, {
        method: HTTP_METHODS.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0, // Backend сам присвоит ID
          created: new Date().toISOString(),
          ...postData,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts(prev => [...prev, newPost]);
        return newPost;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      // При ошибке API используем локальные данные
      console.warn("API не доступен, используем локальные данные:", err);
      setUseLocalData(true);

      try {
        const newPost = createPost(postData);
        setPosts(prev => [...prev, newPost]);
        return newPost;
      } catch (localErr) {
        const errorObj = localErr instanceof Error ? localErr : new Error("Unknown error");
        setError(errorObj);
        return null;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление поста
  const updatePostHandler = useCallback(async (postData: UpdatePostData): Promise<Post | null> => {
    setLoading(true);
    setError(null);

    try {
      // Сначала пытаемся обновить через API
      const response = await fetch(API_ENDPOINTS.POST_BY_ID(postData.id), {
        method: HTTP_METHODS.PUT,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...postData,
          updated: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(prev => prev.map(post =>
          post.id === postData.id ? updatedPost : post
        ));
        return updatedPost;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      // При ошибке API используем локальные данные
      console.warn("API не доступен, используем локальные данные:", err);
      setUseLocalData(true);

      try {
        const updatedPost = updatePost(postData.id, postData);

        if (!updatedPost) {
          throw new Error("Post not found");
        }

        setPosts(prev => prev.map(post =>
          post.id === postData.id ? updatedPost : post
        ));
        return updatedPost;
      } catch (localErr) {
        const errorObj = localErr instanceof Error ? localErr : new Error("Unknown error");
        setError(errorObj);
        return null;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Удаление поста
  const deletePostHandler = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Сначала пытаемся удалить через API
      const response = await fetch(API_ENDPOINTS.POST_BY_ID(id), {
        method: HTTP_METHODS.DELETE,
      });

      if (response.ok) {
        setPosts(prev => prev.filter(post => post.id !== id));
        return true;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      // При ошибке API используем локальные данные
      console.warn("API не доступен, используем локальные данные:", err);
      setUseLocalData(true);

      try {
        const success = deletePost(id);

        if (!success) {
          throw new Error("Post not found");
        }

        setPosts(prev => prev.filter(post => post.id !== id));
        return true;
      } catch (localErr) {
        const errorObj = localErr instanceof Error ? localErr : new Error("Unknown error");
        setError(errorObj);
        return false;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Получение поста по ID
  const getPostByIdHandler = useCallback((id: number): Post | undefined => {
    return getPostById(id);
  }, []);

  // Обновление локального состояния постов
  const refreshPosts = useCallback(() => {
    if (useLocalData) {
      setPosts(getPosts());
    } else {
      // Принудительное обновление будет происходить через useJsonFetch
      window.location.reload();
    }
  }, [useLocalData]);

  return {
    // Данные
    posts: currentPosts,
    loading: currentLoading,
    error: currentError,

    // CRUD операции
    createPost: createPostHandler,
    updatePost: updatePostHandler,
    deletePost: deletePostHandler,
    getPostById: getPostByIdHandler,
    refreshPosts,

    // Состояния операций
    isCreating: loading,
    isUpdating: loading,
    isDeleting: loading,

    // Информация о режиме работы
    useLocalData,
  };
};

export default usePosts;

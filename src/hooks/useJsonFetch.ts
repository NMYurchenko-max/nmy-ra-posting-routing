import { useState, useEffect } from 'react';


type UseJsonFetchOptions = RequestInit | undefined;

/**
 * Пользовательский React-хук для выполнения HTTP-запросов с автоматическим управлением состояниями загрузки и ошибок.
 *
 * @template T Тип данных, ожидаемых в ответе (по умолчанию unknown).
 * @param {string} url URL для запроса.
 * @param {UseJsonFetchOptions} [options] Опции запроса (RequestInit).
 * @returns {[T | null, boolean, Error | null]} Массив с данными, состоянием загрузки и ошибкой.
 */
function useJsonFetch<T = unknown>(
  url: string,
  options?: UseJsonFetchOptions): [T | null, boolean, Error | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    let isCancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      setData(null);

      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const fullUrl = baseUrl + url;

      try {
        const response = await fetch(fullUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (!isCancelled) {
          setData(json);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error('Unknown error'));
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [options, url]);

  return [data, loading, error];
}

export default useJsonFetch;

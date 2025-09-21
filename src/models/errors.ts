/**
 * Константы ошибок для приложения
 */

// HTTP ошибки
export const HTTP_ERRORS = {
  BAD_REQUEST: {
    code: 400,
    message: 'Неверный запрос. Проверьте данные.',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Не авторизован. Требуется вход в систему.',
  },
  FORBIDDEN: {
    code: 403,
    message: 'Доступ запрещен.',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Ресурс не найден.',
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: 'Метод не разрешен.',
  },
  CONFLICT: {
    code: 409,
    message: 'Конфликт данных.',
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: 'Невозможно обработать данные.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Внутренняя ошибка сервера.',
  },
  BAD_GATEWAY: {
    code: 502,
    message: 'Ошибка шлюза.',
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: 'Сервис недоступен.',
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    message: 'Превышено время ожидания.',
  },
} as const;

// Сетевые ошибки
export const NETWORK_ERRORS = {
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
  TIMEOUT: 'Превышено время ожидания запроса.',
  CONNECTION_REFUSED: 'Соединение отклонено сервером.',
  NO_INTERNET: 'Отсутствует подключение к интернету.',
} as const;

// Валидационные ошибки
export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: 'Это поле обязательно для заполнения.',
  INVALID_EMAIL: 'Неверный формат email.',
  INVALID_URL: 'Неверный формат URL.',
  TOO_SHORT: (minLength: number) => `Минимальная длина: ${minLength} символов.`,
  TOO_LONG: (maxLength: number) => `Максимальная длина: ${maxLength} символов.`,
  INVALID_FORMAT: 'Неверный формат данных.',
} as const;

// Ошибки приложения
export const APP_ERRORS = {
  POST_NOT_FOUND: 'Пост не найден.',
  POST_CREATE_FAILED: 'Не удалось создать пост.',
  POST_UPDATE_FAILED: 'Не удалось обновить пост.',
  POST_DELETE_FAILED: 'Не удалось удалить пост.',
  LOAD_POSTS_FAILED: 'Не удалось загрузить посты.',
  SAVE_DRAFT_FAILED: 'Не удалось сохранить черновик.',
  INVALID_POST_DATA: 'Неверные данные поста.',
} as const;

// Функция для получения сообщения об ошибке по коду HTTP
export function getHttpErrorMessage(statusCode: number): string {
  const error = Object.values(HTTP_ERRORS).find(err => err.code === statusCode);
  return error?.message || `Неизвестная ошибка (код: ${statusCode})`;
}

// Функция для получения пользовательского сообщения об ошибке
export function getUserFriendlyErrorMessage(error: Error | string): string {
  const errorMessage = typeof error === 'string' ? error : error.message;

  // Проверяем на HTTP ошибки
  const httpError = Object.values(HTTP_ERRORS).find(err =>
    errorMessage.includes(err.code.toString())
  );
  if (httpError) return httpError.message;

  // Проверяем на сетевые ошибки
  if (errorMessage.includes('fetch')) return NETWORK_ERRORS.NETWORK_ERROR;
  if (errorMessage.includes('timeout')) return NETWORK_ERRORS.TIMEOUT;

  // Проверяем на ошибки приложения
  if (Object.values(APP_ERRORS).some(appError => errorMessage.includes(appError))) {
    return errorMessage;
  }

  return 'Произошла неожиданная ошибка. Попробуйте еще раз.';
}

/**
 * Форматирует объект Date в строку времени в формате HH:mm:ss
 *
 * Механизм работы:
 * 1. Использует toLocaleTimeString с русской локалью ('ru-RU')
 * 2. Устанавливает 24-часовой формат (hour12: false)
 * 3. С помощью регулярного выражения извлекает только HH:mm:ss
 *
 * Пример использования:
 * const now = new Date();
 * console.log(formatTime(now)); // "14:30:25"
 *
 * @param date - Объект Date для форматирования
 * @returns Строка времени в формате HH:mm:ss или пустая строка при ошибке
 */
export function formatTime(date: Date): string {
  try {
    // Проверяем, что передан корректный объект Date
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.warn('formatTime: Передан некорректный объект Date');
      return '';
    }

    // Форматируем время в русской локали без AM/PM
    const timeString = date.toLocaleTimeString('ru-RU', { hour12: false });

    // Извлекаем только часы:минуты:секунды с помощью регулярного выражения
    const formattedTime = timeString.replace(/^(\d{2}:\d{2}:\d{2}).*$/, '$1');

    return formattedTime;
  } catch (error) {
    console.error('formatTime: Ошибка при форматировании времени:', error);
    return '';
  }
}

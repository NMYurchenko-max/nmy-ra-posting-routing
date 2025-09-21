/**
 * Утилитарная функция formatDateTime для форматирования даты и времени
 * @param {string | Date | number} dateTime - Дата/время для форматирования (ISO строка, Date объект или timestamp в миллисекундах)
 * @param {string} [dateFormat] - Формат даты ('DD.MM.YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY')
 * @param {boolean} [showTime] - Показывать ли время (по умолчанию true)
 * @returns {string} Отформатированная дата и время
 *
 * @description
 * Функция принимает дату/время в различных форматах и возвращает строку с датой и временем.
 * Поддерживает локализацию и обработку ошибок.
 *
 * @author N.Yurchenko
 *
 * @example
 * formatDateTime('2023-07-20T14:30:25', 'DD.MM.YYYY', true); // "20.07.2023 14:30"
 * formatDateTime(new Date(), 'YYYY-MM-DD', false); // "2023-07-20"
 * formatDateTime(1758402721907, 'DD.MM.YYYY', true); // "20.09.2025 14:30"
 */
import formatDate from './formatDate';
import { formatTime } from './formatTime';

export function formatDateTime(
  dateTime: string | Date | number,
  dateFormat: string = "DD.MM.YYYY",
  showTime: boolean = true
): string {
  try {
    // Преобразуем входные данные в объект Date
    let dateObj: Date;
    if (typeof dateTime === "number") {
      // Если передан timestamp в миллисекундах
      dateObj = new Date(dateTime);
    } else if (typeof dateTime === "string") {
      dateObj = new Date(dateTime);
    } else {
      dateObj = dateTime;
    }

    // Проверяем валидность даты
    if (isNaN(dateObj.getTime())) {
      throw new Error("Неверный формат даты/времени");
    }

    const formattedDate = formatDate(dateObj, dateFormat);

    if (!showTime) {
      return formattedDate;
    }

    const formattedTime = formatTime(dateObj);

    return formattedTime ? `${formattedDate} ${formattedTime}` : formattedDate;
  } catch (error) {
    console.error("Ошибка форматирования даты и времени:", error);
    return "Неверная дата";
  }
}

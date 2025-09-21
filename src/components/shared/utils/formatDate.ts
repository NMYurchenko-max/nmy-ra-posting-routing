/**
 * Утилитарная функция formatDate для форматирования дат
 * @param {string | Date | number} date - Дата для форматирования (ISO строка, Date объект или timestamp в миллисекундах)
 * @param {string} [format] - Формат вывода ('DD.MM.YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY')
 * @returns {string} Отформатированная дата
 *
 * @description
 * Функция принимает дату в различных форматах и возвращает строку в указанном формате.
 * Поддерживает локализацию и обработку ошибок.
 *
 * @author N.Yurchenko
 *
 * @example
 * formatDate('2023-07-20', 'DD.MM.YYYY'); // "20.07.2023"
 * formatDate(new Date(), 'YYYY-MM-DD'); // "2023-07-20"
 * formatDate(1758402721907, 'DD.MM.YYYY'); // "20.09.2025"
 */
const formatDate = (date: string | Date | number, format: string = "DD.MM.YYYY"): string => {
  try {
    // Преобразуем входные данные в объект Date
    let dateObj: Date;
    if (typeof date === "number") {
      // Если передан timestamp в миллисекундах
      dateObj = new Date(date);
    } else if (typeof date === "string") {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }
    // Проверяем валидность даты
    if (isNaN(dateObj.getTime())) {
      throw new Error("Неверный формат даты");
    }
    // Получаем компоненты даты
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    // Форматируем в зависимости от указанного формата
    switch (format) {
      case "DD.MM.YYYY":
        return `${day}.${month}.${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      default:
        // По умолчанию используем DD.MM.YYYY
        return `${day}.${month}.${year}`;
    }
  } catch (error) {
    console.error("Ошибка форматирования даты:", error);
    return "Неверная дата";
  }
};
export default formatDate;

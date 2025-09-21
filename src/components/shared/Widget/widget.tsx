import type { FC, ReactNode } from 'react';

/**
 * @component
 * @description Компонент-обёртка для виджетов с заголовком и содержимым.
 * Используется для обрамления различных секций интерфейса (например, новости, погода, котировки и т.д.)
 * @param {string} title - Заголовок виджета
 * @param {ReactNode} children - Содержимое виджета (может включать другие компоненты/элементы)
 */
export interface WidgetProps {
  title?: string;
  children: ReactNode;
}

export const Widget: FC<WidgetProps> = ({ title, children }) => {
  return (
    <section>
      {title && <h2>{title}</h2>}
      <div>
        {children}
      </div>
    </section>
  );
};

import type { ReactNode } from 'react';

/**
 * @template T
 * @component
 * @description Универсальный компонент для отображения одного элемента с помощью render-функции.
 * @param {T} item - Элемент любого типа
 * @param {(item: T) => ReactNode} renderItem - Функция для рендеринга этого элемента
 */
export interface WidgetItemProps<T> {
  item: T;
  renderItem: (item: T) => ReactNode;
}

export function WidgetItem<T>({ item, renderItem }: WidgetItemProps<T>) {
  return <div>{renderItem(item)}</div>;
}

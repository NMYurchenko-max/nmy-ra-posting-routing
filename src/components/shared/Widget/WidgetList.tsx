// src/components/Widget/WidgetList.tsx
import React, { type ReactNode, type ElementType } from 'react';

export interface WidgetListProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => ReactNode;
  getKey?: (item: T, idx: number) => React.Key;
  as?: ElementType;
  className?: string;
  emptyState?: ReactNode;
}

export function WidgetList<T>({
  items,
  renderItem,
  getKey,
  as: As = 'div',
  className,
  emptyState = null
}: WidgetListProps<T>) {
  if (!items || items.length === 0) {
    return <As className={className}>{emptyState}</As>;
  }

  return (
    <As className={className}>
      {items.map((item, idx) => {
        const key = getKey ? getKey(item, idx) : idx;
        return <React.Fragment key={key}>{renderItem(item, idx)}</React.Fragment>;
      })}
    </As>
  );
}

export default WidgetList;

/**
 * Универсальные и специализированные type guard'ы для приложения.
 * Позволяют выполнять рантайм-валидацию данных из внешних источников.
 */
import { isValidElement, type ReactNode } from 'react'

/**
 * Проверяет, что значение является непустым объектом (не массив и не null).
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Универсальный валидатор массива с проверкой каждого элемента через переданный guard.
 */
export function isArrayOf<T>(
  value: unknown,
  itemGuard: (v: unknown) => v is T
): value is T[] {
  return Array.isArray(value) && value.every(itemGuard)
}

/**
 * Универсальный guard для generic-пропсов компонентов с item и renderItem.
 */
export function isGenericProps<T, Base extends object = object>(
  props: unknown
): props is Base & { item: T; renderItem: (item: T) => ReactNode } {
  if (!isRecord(props)) return false
  const maybe = props as { item?: unknown; renderItem?: unknown }
  return typeof maybe.renderItem === 'function' && 'item' in maybe
}

/**
 * Корректная проверка на ReactNode:
 * - допускаются: string, number, boolean, null, undefined;
 * - массив — если каждый элемент ReactNode;
 * - ReactElement (isValidElement).
 * Не допускаются: function, symbol, bigint, произвольные plain-объекты.
 */
export function isReactNode(value: unknown): value is ReactNode {
  if (value == null) return true // null | undefined — валидные ReactNode
  const t = typeof value
  if (t === 'string' || t === 'number' || t === 'boolean') return true
  if (Array.isArray(value)) return value.every(isReactNode)
  if (isValidElement(value)) return true
  return false
}

/* Дополнительные точечные guards под часто встречающиеся типы,
   которые можно безопасно привести к строке для рендера. */

export function isURL(value: unknown): value is URL {
  return typeof URL !== 'undefined' && value instanceof URL
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

/**
 * Приведение произвольного значения к ReactNode:
 * - если value уже валидный ReactNode — возвращаем как есть;
 * - URL/Date/RegExp — преобразуем в строку через .toString();
 * - bigint/symbol — преобразуем безопасно в строку;
 * - массив — приводим элементы рекурсивно;
 * - прочие объекты — возвращаем null (не рендерим).
 *
 * Примеры:
 *   coerceToReactNode(new URL('https://ex.com'))  // 'https://ex.com'
 *   coerceToReactNode(new Date('2023-01-01'))     // '2023-01-01T00:00:00.000Z' (или локальный формат)
 *   coerceToReactNode(/foo/i)                     // '/foo/i'
 *   coerceToReactNode(123n)                       // '123'
 *   coerceToReactNode(Symbol('x'))                // 'Symbol(x)'
 */
export function coerceToReactNode(value: unknown): ReactNode {
  if (isReactNode(value)) return value

  // Удобные «допуски» для часто встречающихся объектов
  if (isURL(value) || isDate(value) || isRegExp(value)) {
    return String(value)
  }

  // Примитивы вне стандартного ReactNode — приводим к строке
  const t = typeof value
  if (t === 'bigint' || t === 'symbol') {
    try {
      return String(value)
    } catch {
      return null
    }
  }

  // Массивы с произвольным содержимым — приводим каждый элемент
  if (Array.isArray(value)) {
    return value.map(coerceToReactNode)
  }

  // Прочие объекты не рендерим (оставляем решение за вызывающим кодом)
  return null
}

/**
 * Безопасная версия: обеспечивает ReactNode (всегда возвращает либо валидное значение, либо fallback).
 * По умолчанию fallback = null.
 */
export function ensureReactNode(value: unknown, fallback: ReactNode = null): ReactNode {
  const coerced = coerceToReactNode(value)
  return coerced === null || coerced === undefined ? fallback : coerced
}

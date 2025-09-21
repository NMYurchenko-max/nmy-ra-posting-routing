/**
 * Минимальная декларация типов для пакета "react-node" без использования any.
 * Базовая сигнатура со всеми параметрами опционально
 * (selector/component, props?, children?).
 * Построчные комментарии прилагаются для обучения.
 */
declare module 'react-node' {
  // Импортируем типы React для описания сигнатур
  import type { ReactElement, ReactNode, ComponentType } from 'react'
  // Типы для параметров функции reactNode
  type ComponentInput = string | ComponentType
  type Props = Record<string, unknown>
  type Children = ReactNode[]
  // Базовая сигнатура со всеми параметрами опционально, для совместимости вызовов
  function reactNode(
    component: ComponentInput, // Селектор или компонент
    props?: Props | Children, // Либо объект пропсов, либо массив детей
    children?: Children // Необязательный массив детей
  ): ReactElement

  // Экспорт по умолчанию — сама функция
  export default reactNode
}

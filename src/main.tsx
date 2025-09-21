import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * Точка входа в приложение
 * @module main
 * @description
 * Инициализирует корневой элемент React и рендерит главный компонент `App`.
 * 1. Импортирует стили из `index.css` для базовой настройки приложения.
 * 2. Создаёт корневой DOM-элемент с id="root".
 * 3. Рендерит компонент `App` в этом элементе.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
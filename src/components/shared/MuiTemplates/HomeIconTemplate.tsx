import { Home } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона домашней иконки.
 * Отображает иконку `Home` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию '#1976d2')
 */
export function HomeIconTemplate(props: { color?: string }) {
  const { color = '#1976d2' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Home sx={{ color }} />
    </Stack>
  );
}

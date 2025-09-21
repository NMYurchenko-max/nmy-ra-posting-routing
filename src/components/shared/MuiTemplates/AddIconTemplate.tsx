import { Add } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона иконки добавления.
 * Отображает иконку `Add` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию '#1976d2')
 */
export function AddIconTemplate(props: { color?: string }) {
  const { color = '#1976d2' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Add sx={{ color }} />
    </Stack>
  );
}

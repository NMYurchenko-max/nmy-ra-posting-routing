import { Error } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона иконки ошибки.
 * Отображает иконку `Error` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию '#d32f2f')
 */
export function ErrorIconTemplate(props: { color?: string }) {
  const { color = '#d32f2f' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Error sx={{ color }} />
    </Stack>
  );
}

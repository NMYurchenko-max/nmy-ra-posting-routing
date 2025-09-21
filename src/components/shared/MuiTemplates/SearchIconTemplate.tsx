import { Search } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона поисковой иконки.
 * Отображает иконку `Search` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию `#EE1F4)
 */
export function SearchIconTemplate(props: { color?: string }) {
  const { color = '#EE1F4' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Search sx={{ color }} />
    </Stack>
  );
}

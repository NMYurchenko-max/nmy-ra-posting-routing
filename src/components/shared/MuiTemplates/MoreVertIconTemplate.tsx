import { MoreVert } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона иконки меню (три точки).
 * Отображает иконку `MoreVert` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию '#666666')
 */
export function MoreVertIconTemplate(props: { color?: string }) {
  const { color = '#666666' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <MoreVert sx={{ color }} />
    </Stack>
  );
}

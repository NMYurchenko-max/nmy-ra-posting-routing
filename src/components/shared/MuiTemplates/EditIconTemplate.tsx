import { Edit } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона иконки редактирования.
 * Отображает иконку `Edit` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию '#1976d2')
 */
export function EditIconTemplate(props: { color?: string }) {
  const { color = '#1976d2' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Edit sx={{ color }} />
    </Stack>
  );
}

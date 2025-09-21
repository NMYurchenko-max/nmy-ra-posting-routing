import { Schedule } from '@mui/icons-material';
import { Stack } from '@mui/material';

/**
 * Компонент шаблона иконки расписания/даты.
 * Отображает иконку `Schedule` внутри контейнера `Stack` с настраиваемым цветом.
 *
 * @param props - Свойства компонента
 * @param props.color - Цвет иконки (по умолчанию '#666666')
 */
export function ScheduleIconTemplate(props: { color?: string }) {
  const { color = '#666666' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Schedule sx={{ color }} />
    </Stack>
  );
}

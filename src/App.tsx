import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';

// Импорт компонентов
import MainLayout from '@/components/layouts/MainLayout';
import PostList from '@/components/pages/PostList';
import PostNew from '@/components/pages/PostNew';
import PostView from '@/components/pages/PostView';
import PostEdit from '@/components/pages/PostEdit';

// Импорт темы Material-UI
import { appTheme } from '@/theme';

/**
 * Главный компонент приложения
 * Настраивает маршрутизацию и тему Material-UI
 */
function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Container maxWidth="lg">
            <Routes>
              {/* Главная страница - список постов */}
              <Route path="/" element={<PostList />} />

              {/* Создание нового поста */}
              <Route path="/posts/new" element={<PostNew />} />

              {/* Просмотр поста */}
              <Route path="/posts/:id" element={<PostView />} />

              {/* Редактирование поста */}
              <Route path="/posts/:id/edit" element={<PostEdit />} />

              {/* Редирект для несуществующих роутов */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

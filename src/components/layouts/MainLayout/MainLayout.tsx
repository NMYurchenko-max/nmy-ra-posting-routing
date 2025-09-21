import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Основной layout приложения
 * Содержит навигацию и общую структуру страниц
 */
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => handleNavigate('/')}
          >
            📝 Посты
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              onClick={() => handleNavigate('/')}
              startIcon={<HomeIcon />}
              variant={isActiveRoute('/') ? 'outlined' : 'text'}
              size={isMobile ? 'small' : 'medium'}
            >
              {!isMobile && 'Главная'}
            </Button>

            <Button
              color="inherit"
              onClick={() => handleNavigate('/posts/new')}
              startIcon={<AddIcon />}
              variant={isActiveRoute('/posts/new') ? 'outlined' : 'text'}
              size={isMobile ? 'small' : 'medium'}
            >
              {!isMobile && 'Создать пост'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Основное содержимое */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.grey[100],
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            N. Yurchenko © 2025 Создано с ❤️
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;

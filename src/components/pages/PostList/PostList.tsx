import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PostCard from '@/components/entities/PostCard';
import ErrorModal from '@/components/shared/ErrorModal';
import usePosts from '@/hooks/usePosts';
import type { Post } from '@/models/type';

/**
 * Страница списка постов
 * Отображает все посты в виде карточек
 */
const PostList: React.FC = () => {
  const navigate = useNavigate();
  const {
    posts,
    loading,
    error,
    deletePost: deletePostHandler,
    useLocalData,
  } = usePosts();

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      setErrorModalOpen(true);
    }
  }, [error]);

  const handleCreatePost = () => {
    navigate('/posts/new');
  };

  const handleViewPost = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const handleEditPost = (post: Post) => {
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      setDeleteLoading(id);
      const success = await deletePostHandler(id);
      setDeleteLoading(null);

      if (!success) {
        setErrorModalOpen(true);
      }
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  if (loading && posts.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Загрузка постов...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Заголовок и кнопка создания */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" component="h1">
          Все посты
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePost}
          size="large"
        >
          Создать пост
        </Button>
      </Box>

      {/* Сообщение об ошибке или информация о локальном режиме */}
      {error && !useLocalData && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Не удалось загрузить посты. Попробуйте обновить страницу.
        </Alert>
      )}
      {useLocalData && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Вы работаете в локальном режиме. Данные сохраняются только в браузере.
        </Alert>
      )}

      {/* Список постов */}
      {posts.length === 0 && !loading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          textAlign="center"
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Посты не найдены
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Создайте первый пост, чтобы начать работу с приложением.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreatePost}
            size="large"
          >
            Создать первый пост
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {posts.map((post) => (
            <Box key={post.id} sx={{ position: 'relative' }}>
              <PostCard
                post={post}
                onView={handleViewPost}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                showActions={true}
              />
              {deleteLoading === post.id && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 1,
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Модальное окно ошибки */}
      <ErrorModal
        open={errorModalOpen}
        error={error}
        onClose={handleCloseErrorModal}
        title="Ошибка"
      />
    </Container>
  );
};

export default PostList;

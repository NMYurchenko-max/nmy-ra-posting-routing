import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Schedule as DateIcon,
} from '@mui/icons-material';
import PostCard from '@/components/entities/PostCard';
import ErrorModal from '@/components/shared/ErrorModal';
import usePosts from '@/hooks/usePosts';
import { formatDateTime } from '@/components/shared/utils';
import type { Post } from '@/models/type';

/**
 * Страница просмотра поста
 */
const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, deletePost: deletePostHandler, loading, error } = usePosts();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const postId = id ? parseInt(id, 10) : null;
  const post = postId ? posts.find(p => p.id === postId) : null;

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      setErrorModalOpen(true);
    }
  }, [error]);

  const handleEdit = (post: Post) => {
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDelete = async () => {
    if (!postId || !window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      return;
    }

    const success = await deletePostHandler(postId);

    if (success) {
      navigate('/');
    } else {
      setErrorModalOpen(true);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  if (!postId) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mb: 3 }}>
          Неверный ID поста
        </Alert>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={handleBack}
        >
          Назад к списку
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Загрузка поста...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning" sx={{ mb: 3 }}>
          Пост не найден
        </Alert>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={handleBack}
        >
          Назад к списку
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Кнопка назад */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={handleBack}
        >
          Назад к списку
        </Button>
      </Box>

      {/* Пост */}
      <PostCard
        post={post}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
      />

      {/* Дополнительная информация */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Детальная информация
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
          {/* Дата создания */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Дата создания
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <DateIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body1">
                {formatDateTime(post.created)}
              </Typography>
            </Box>
          </Box>

          {/* Дата обновления */}
          {post.updated && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Последнее обновление
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <DateIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {formatDateTime(post.updated)}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Автор */}
          {post.author && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Автор
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {post.author}
              </Typography>
            </Box>
          )}

          {/* Категория */}
          {post.category && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Категория
              </Typography>
              <Chip
                label={post.category}
                sx={{ mt: 1 }}
                variant="outlined"
              />
            </Box>
          )}

          {/* Теги */}
          {post.tags && post.tags.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Теги
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Статус публикации */}
          {post.published !== undefined && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Статус
              </Typography>
              <Chip
                label={post.published ? 'Опубликовано' : 'Черновик'}
                color={post.published ? 'success' : 'default'}
                sx={{ mt: 1 }}
              />
            </Box>
          )}
        </Box>
      </Box>

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

export default PostView;

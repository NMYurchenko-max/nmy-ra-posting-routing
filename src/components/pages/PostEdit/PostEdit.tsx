import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import PostForm from '@/components/entities/PostForm';
import ErrorModal from '@/components/shared/ErrorModal';
import usePosts from '@/hooks/usePosts';
import type { Post, UpdatePostData, CreatePostData } from '@/models/type';

/**
 * Страница редактирования поста
 */
const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, updatePost: updatePostHandler, loading, error } = usePosts();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const postId = id ? parseInt(id, 10) : null;

  // Находим пост для редактирования
  useEffect(() => {
    if (postId) {
      const foundPost = posts.find(p => p.id === postId);
      setPost(foundPost || null);
    }
  }, [postId, posts]);

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      setErrorModalOpen(true);
    }
  }, [error]);

  const handleSubmit = async (data: CreatePostData | UpdatePostData) => {
    if (!postId) return;

    // Гарантируем, что передаем UpdatePostData с id
    const updateData: UpdatePostData = {
      id: postId,
      ...data,
    };

    const updatedPost = await updatePostHandler(updateData);

    if (updatedPost) {
      // Успешное обновление - переходим к просмотру поста
      navigate(`/posts/${postId}`);
    } else {
      // Ошибка обновления - показываем модальное окно
      setErrorModalOpen(true);
    }
  };

  const handleCancel = () => {
    if (postId) {
      navigate(`/posts/${postId}`);
    } else {
      navigate('/');
    }
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4
          }}
        >
          <CircularProgress size={60} />
        </Box>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Редактирование поста
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Внесите изменения в пост и нажмите &ldquo;Сохранить&rdquo;
        </Typography>
      </Box>

      <PostForm
        post={post}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

      {/* Модальное окно ошибки */}
      <ErrorModal
        open={errorModalOpen}
        error={error}
        onClose={handleCloseErrorModal}
        title="Ошибка сохранения поста"
      />
    </Container>
  );
};

export default PostEdit;

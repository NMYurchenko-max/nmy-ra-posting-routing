import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import PostForm from '@/components/entities/PostForm';
import ErrorModal from '@/components/shared/ErrorModal';
import usePosts from '@/hooks/usePosts';
import type { CreatePostData, UpdatePostData } from '@/models/type';

/**
 * Страница создания нового поста
 */
const PostNew: React.FC = () => {
  const navigate = useNavigate();
  const { createPost: createPostHandler, loading, error } = usePosts();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  // Обработка ошибок
  React.useEffect(() => {
    if (error) {
      setErrorModalOpen(true);
    }
  }, [error]);

  const handleSubmit = async (data: CreatePostData | UpdatePostData) => {
    // Гарантируем, что передаем CreatePostData без id
    const createData: CreatePostData = {
      content: data.content || '',
      title: data.title || '',
      author: data.author || '',
      tags: data.tags || [],
      category: data.category || '',
    };

    const newPost = await createPostHandler(createData);

    if (newPost) {
      // Успешное создание - переходим к списку постов
      navigate('/');
    } else {
      // Ошибка создания - показываем модальное окно
      setErrorModalOpen(true);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Создание нового поста
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Заполните форму ниже, чтобы создать новый пост
        </Typography>
      </Box>

      <PostForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

      {/* Модальное окно ошибки */}
      <ErrorModal
        open={errorModalOpen}
        error={error}
        onClose={handleCloseErrorModal}
        title="Ошибка создания поста"
      />
    </Container>
  );
};

export default PostNew;

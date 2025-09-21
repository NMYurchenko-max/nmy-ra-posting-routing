import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { PostFormProps, CreatePostData, UpdatePostData } from '@/models/type';

/**
 * Компонент формы для создания и редактирования постов
 */
const PostForm: React.FC<PostFormProps> = ({
  post,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreatePostData>({
    content: '',
    title: '',
    author: '',
    tags: [],
    category: '',
  });

  const [tagInput, setTagInput] = useState('');

  const isEditing = !!post;

  // Инициализация формы при редактировании
  useEffect(() => {
    if (post) {
      setFormData({
        content: post.content,
        title: post.title || '',
        author: post.author || '',
        tags: post.tags || [],
        category: post.category || '',
      });
    }
  }, [post]);

  const handleInputChange = (field: keyof CreatePostData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.content.trim()) {
      return;
    }

    const submitData: CreatePostData | UpdatePostData = isEditing && post
      ? { ...formData, id: post.id }
      : formData;

    await onSubmit(submitData);
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          {isEditing ? 'Редактирование поста' : 'Создание нового поста'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Заголовок */}
          <TextField
            fullWidth
            label="Заголовок"
            value={formData.title}
            onChange={handleInputChange('title')}
            margin="normal"
            variant="outlined"
            helperText="Необязательное поле"
          />

          {/* Автор */}
          <TextField
            fullWidth
            label="Автор"
            value={formData.author}
            onChange={handleInputChange('author')}
            margin="normal"
            variant="outlined"
            helperText="Необязательное поле"
          />

          {/* Содержание поста */}
          <TextField
            fullWidth
            required
            multiline
            rows={6}
            label="Содержание поста"
            value={formData.content}
            onChange={handleInputChange('content')}
            margin="normal"
            variant="outlined"
            error={!formData.content.trim()}
            helperText={!formData.content.trim() ? 'Это поле обязательно' : ''}
            placeholder="Введите текст поста..."

          />

          {/* Категория */}
          <TextField
            fullWidth
            label="Категория"
            value={formData.category}
            onChange={handleInputChange('category')}
            margin="normal"
            variant="outlined"
            helperText="Необязательное поле"
          />

          {/* Теги */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Теги
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                label="Добавить тег"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ flexGrow: 1 }}
              />
              <Button
                type="button"
                variant="outlined"
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                startIcon={<AddIcon />}
              >
                Добавить
              </Button>
            </Box>

            {/* Отображение тегов */}
            {formData.tags && formData.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    deleteIcon={<DeleteIcon />}
                    size="small"
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
          startIcon={<CancelIcon />}
        >
          Отмена
        </Button>

        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formData.content.trim()}
          startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}

        >
          {loading ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Опубликовать')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostForm;

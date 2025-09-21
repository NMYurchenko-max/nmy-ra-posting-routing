import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Schedule as DateIcon,
} from '@mui/icons-material';
import type { PostCardProps } from '@/models/type';
import { formatDateTime } from '@/components/shared/utils';
import styles from './PostCard.module.css';

/**
 * Компонент карточки поста
 * Отображает пост в виде карточки с действиями
 */
const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  onView,
  showActions = true,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(post.id);
    }
  };

  return (
    <Card className={styles.postCard}>
      <CardContent className={styles.cardContent}>
        {/* Заголовок поста */}
        {post.title && (
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            className={styles.postTitle}
          >
            {post.title}
          </Typography>
        )}

        {/* Содержание поста */}
        <Typography
          variant="body1"
          color="text.secondary"
          className={styles.postContent}
        >
          {post.content}
        </Typography>

        {/* Метаданные поста */}
        <Box className={styles.postMeta}>
          {/* Дата создания */}
          <Box>
            <DateIcon className={styles.dateIcon} />
            <Typography variant="caption" color="text.secondary">
              {formatDateTime(post.created)}
            </Typography>
          </Box>

          {/* Категория */}
          {post.category && (
            <Chip
              label={post.category}
              size="small"
              variant="outlined"
            />
          )}

          {/* Теги */}
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {post.tags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                />
              ))}
              {post.tags.length > 3 && (
                <Chip
                  label={`+${post.tags.length - 3}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          )}
        </Box>

        {/* Автор */}
        {post.author && (
          <Typography variant="caption" color="text.secondary">
            Автор: {post.author}
          </Typography>
        )}
      </CardContent>

      {/* Действия */}
      {showActions && (
        <CardActions className={styles.cardActions}>
          <Box>
            <IconButton
              size="small"
              onClick={handleView}
              title="Просмотреть"
            >
              <ViewIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleEdit}
              title="Редактировать"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDelete}
              title="Удалить"
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          {/* Статус публикации */}
          {post.published !== undefined && (
            <Chip
              label={post.published ? 'Опубликовано' : 'Черновик'}
              color={post.published ? 'success' : 'default'}
              size="small"
            />
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;

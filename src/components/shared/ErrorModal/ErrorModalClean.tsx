import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, Error as ErrorIcon } from '@mui/icons-material';
import { getUserFriendlyErrorMessage } from '../../../models/errors';
import styles from './ErrorModal.module.css';

interface ErrorModalProps {
  open: boolean;
  error: Error | string | null;
  onClose: () => void;
  title?: string;
}

/**
 * Модальное окно для отображения ошибок
 * Всплывающее окно без заголовка с содержанием ошибки
 */
const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  error,
  onClose,
  title = 'Ошибка',
}) => {
  if (!error) return null;

  const errorMessage = getUserFriendlyErrorMessage(error);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: styles.dialog,
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <Box className={styles.header}>
          <ErrorIcon className={styles.errorIcon} />
          <Typography
            variant="h6"
            component="div"
            className={styles.title}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            className={styles.closeButton}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body1"
          className={styles.message}
        >
          {errorMessage}
        </Typography>
      </DialogContent>

      <DialogActions className={styles.actions}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          className={styles.closeButtonAction}
        >
          Понятно
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
